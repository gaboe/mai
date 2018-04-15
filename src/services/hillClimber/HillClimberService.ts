import { getStats, ITERATIONS } from "../StatService";
import { GeneratedValues, RoundWinner, RoundRecord } from "../../models/Model";
import { randomInt, random } from "mathjs";
import { evaluateFirstDejongFunction } from "../Functions";
import { getIndexedArray } from "../../utils/Utils";

const CLOSE_DISTANCE = 0.5;

const getValuesCloseToPoint = (x: number, count: number) => {
  return getIndexedArray(count).map(_ =>
    random(x - CLOSE_DISTANCE, x + CLOSE_DISTANCE)
  );
};

const getRound = (
  roundID: number,
  costFn: (x: number) => GeneratedValues,
  getInitialPosition: () => number
) => {
  let initialPosition = costFn(getInitialPosition());
  const inputs: RoundRecord[] = getIndexedArray(ITERATIONS / 100).map(
    iterationInRoundID => {
      const closeDistanceValues = getValuesCloseToPoint(
        initialPosition.input[0],
        5
      ).map(x => costFn(x));
      if (
        closeDistanceValues.filter(c => c.output < initialPosition.output)
          .length > 0
      ) {
        initialPosition = closeDistanceValues.sort(
          (a, b) => a.output - b.output
        )[0];
      }
      return {
        id: iterationInRoundID,
        iterations: initialPosition.iterations,
        inputs: initialPosition.input,
        costValue: initialPosition.output
      };
    }
  );

  const winner: RoundWinner = {
    winningRecord: inputs[0],
    allInputs: inputs,
    roundID
  };
  return winner;
};

const getRounds = (
  costFn: (x: number) => GeneratedValues,
  getInitialPosition: () => number
) => {
  const winners: RoundWinner[] = Array.from({ length: 30 })
    .map((_, i) => i)
    .map(e => getRound(e, costFn, getInitialPosition));

  return winners;
};

const getFirstDejongStats = () => {
  return getStats(() =>
    getRounds(
      x => {
        const iterations = randomInt(1, 10);
        const o = evaluateFirstDejongFunction(x, iterations);
        const values: GeneratedValues = {
          input: [x],
          iterations,
          output: o
        };
        return values;
      },
      () => random(-5, 5)
    )
  );
};

export { getFirstDejongStats };
