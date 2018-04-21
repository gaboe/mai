import { getStats, getValuesCloseToPoint, ITERATIONS } from "../StatService";
import {
  GeneratedValues,
  QBC,
  RoundWinner,
  RoundRecord
} from "../../models/Model";
import {
  evaluateFirstDejongFunction,
  evaluateSecondDejongFunction,
  evaluatedSchwefelFunction
} from "../Functions";
import { getIndexedArray, revertSum, gaussianRand } from "../../utils/Utils";
import { random, randomInt } from "mathjs";

const MAX_TEMP = 10000;
const MIN_TEMP = 1000;
const COOLING = 0.98;

const getInitialRecord = (
  costFn: (x: number[]) => GeneratedValues,
  getInitialPosition: () => number[]
) => {
  let currentValue = costFn(getInitialPosition());
  let currentRecord = {
    id: 0,
    iterations: currentValue.iterations,
    costValue: currentValue.output,
    inputs: currentValue.input
  };
  return currentRecord;
};

const getRound = (
  roundID: number,
  costFn: (x: number[]) => GeneratedValues,
  getInitialPosition: () => number[],
  boundary: QBC
) => {
  let currentRecord = getInitialRecord(costFn, getInitialPosition);

  let temperature = MAX_TEMP;

  const temperatures: number[] = [];
  while (temperature > MIN_TEMP) {
    temperatures.push(temperature);
    temperature *= COOLING;
  }
  const costFnSeeks = revertSum(ITERATIONS, temperatures.length);

  const records = costFnSeeks.reduce<RoundRecord[]>(
    (accumulator, seeks, index) => {
      const nextValue = getValuesCloseToPoint(
        accumulator[accumulator.length - 1].inputs,
        seeks,
        boundary
      )
        .map(x => costFn(x))
        .sort((a, b) => a.output - b.output)[0];

      const nextRecord: RoundRecord = {
        id: index,
        inputs: nextValue.input,
        costValue: nextValue.output,
        iterations: nextValue.iterations
      };

      if (
        nextRecord.costValue < accumulator[accumulator.length - 1].costValue
      ) {
        accumulator.push(nextRecord);
      } else {
        const rand = gaussianRand();
        const delta =
          nextRecord.costValue - accumulator[accumulator.length - 1].costValue;
        const probability = Math.exp(-delta / temperatures[index]);
        if (rand < probability) {
          accumulator.push(nextRecord);
        }
      }
      return accumulator;
    },
    [currentRecord]
  );

  const winner: RoundWinner = {
    winningRecord: records[records.length - 1],
    allInputs: records,
    roundID: roundID
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
export {
  getRound,
  getFirstDejongStats,
  getSecondDejongStats,
  getSchwefelStats
};
