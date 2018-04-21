import {
  getStats,
  ITERATIONS,
  getValuesCloseToPointWithTabuList
} from "../StatService";
import {
  GeneratedValues,
  RoundWinner,
  RoundRecord,
  QBC,
  TabuList,
  TabuItem
} from "../../models/Model";
import { randomInt, random } from "mathjs";
import {
  evaluateFirstDejongFunction,
  evaluateSecondDejongFunction,
  evaluatedSchwefelFunction
} from "../Functions";
import { getIndexedArray } from "../../utils/Utils";
import { Fifo } from "../../utils/Fifo";

const getRound = (
  roundID: number,
  costFn: (x: number[]) => GeneratedValues,
  getInitialPosition: () => number[],
  boundary: QBC
) => {
  let initialPosition = costFn(getInitialPosition());
  const fifo = new Fifo<number[]>(1000);
  const inputs: RoundRecord[] = getIndexedArray(ITERATIONS / 10).map(
    iterationInRoundID => {
      const closeDistanceValues = getValuesCloseToPointWithTabuList(
        initialPosition.input,
        10,
        boundary,
        fifo.items
      ).map(x => costFn(x));
      closeDistanceValues.forEach(x => fifo.pop(x.input));

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
  getInitialPosition: () => number[],
  boundary: QBC
) => {
  const winners: RoundWinner[] = Array.from({ length: 30 })
    .map((_, i) => i)
    .map(e => getRound(e, costFn, getInitialPosition, boundary));

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
      () => getIndexedArray(2).map(_ => random(-5, 5)),
      { min: -5, max: 5 }
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
      () => getIndexedArray(2).map(_ => random(-2, 2)),
      { min: -2, max: 2 }
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
      () => getIndexedArray(2).map(_ => random(-500, 500)),
      { min: -500, max: 500 }
    )
  );
};

export { getFirstDejongStats, getSecondDejongStats, getSchwefelStats };
