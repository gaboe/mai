import { getStats, ITERATIONS } from "../StatService";
import { GeneratedValues, RoundWinner, RoundRecord } from "../../models/Model";
import { randomInt, random } from "mathjs";
import {
  evaluateFirstDejongFunction,
  evaluateSecondDejongFunction,
  evaluatedSchwefelFunction
} from "../Functions";
import { getIndexedArray } from "../../utils/Utils";

const CLOSE_DISTANCE = 0.005;

const getValuesCloseToPoint = (input: number[], count: number) => {
  return getIndexedArray(count).map(_ =>
    input.map(x => random(x - CLOSE_DISTANCE, x + CLOSE_DISTANCE))
  );
};

const getRound = (
  roundID: number,
  costFn: (x: number[]) => GeneratedValues,
  getInitialPosition: () => number[]
) => {
  let initialPosition = costFn(getInitialPosition());
  const inputs: RoundRecord[] = getIndexedArray(ITERATIONS / 100).map(
    iterationInRoundID => {
      const closeDistanceValues = getValuesCloseToPoint(
        initialPosition.input,
        100
      ).map(x => costFn(x));
      if (
        closeDistanceValues.filter(c => c.output < initialPosition.output)
          .length > 0
      ) {
        const lower = closeDistanceValues
          .filter(c => c.output < initialPosition.output)
          .sort((a, b) => a.output - b.output);
        initialPosition = lower[0];
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
    winningRecord: inputs[inputs.length - 1],
    allInputs: inputs,
    roundID
  };
  return winner;
};

const getRounds = (
  costFn: (x: number[]) => GeneratedValues,
  getInitialPosition: () => number[]
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
        const o = evaluateFirstDejongFunction(x);
        const values: GeneratedValues = {
          input: x,
          iterations: x.length,
          output: o
        };
        return values;
      },
      () => getIndexedArray(2).map(_ => random(-5, 5))
    )
  );
};

const getSecondDejongStats = () => {
  return getStats(() =>
    getRounds(
      x => {
        const iterations = randomInt(2, 10);
        const o = evaluateSecondDejongFunction(x);
        const values: GeneratedValues = {
          input: x,
          iterations,
          output: o
        };
        return values;
      },
      () => getIndexedArray(2).map(_ => random(-2, 2))
    )
  );
};

const getSchwefelStats = () => {
  return getStats(() =>
    getRounds(
      () => {
        const x = getIndexedArray(2).map(_ => random(-500, 500));
        const o = evaluatedSchwefelFunction(x);
        const values: GeneratedValues = {
          input: x,
          iterations: 2,
          output: o
        };
        return values;
      },
      () => getIndexedArray(2).map(_ => random(-500, 500))
    )
  );
};

export { getFirstDejongStats, getSecondDejongStats, getSchwefelStats };
