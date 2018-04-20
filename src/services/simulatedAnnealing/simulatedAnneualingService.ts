import { getStats, getValuesCloseToPoint } from "../StatService";
import {
  GeneratedValues,
  QBC,
  RoundWinner,
  RoundRecord
} from "../../models/Model";
import { evaluateFirstDejongFunction } from "../Functions";
import { getIndexedArray } from "../../utils/Utils";
import { random } from "mathjs";
import { append } from "ramda";

const MAX_TEMP = 10000;
const MIN_TEMP = 1000;
const COOLING = 0.98;

const gaussianRand = () => {
  var rand = 0;

  for (var i = 0; i < 6; i += 1) {
    rand += Math.random();
  }

  return rand / 6;
};

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
  let records: Array<RoundRecord> = [currentRecord];

  let temperature = MAX_TEMP;
  let i = 1;
  while (temperature > MIN_TEMP) {
    const nextPoint = getValuesCloseToPoint(
      [currentRecord.inputs[0]],
      1,
      boundary
    );
    const nextValue = costFn(nextPoint[0]);
    const nextRecord: RoundRecord = {
      id: i,
      inputs: nextValue.input,
      costValue: nextValue.output,
      iterations: nextValue.iterations
    };
    if (nextRecord.costValue < currentRecord.costValue) {
      records = append(nextRecord, records);
      currentRecord = nextRecord;
      // console.log("next1", currentRecord.costValue, nextRecord.costValue);
    } else {
      const rand = gaussianRand();
      const probability = Math.exp(
        -(nextRecord.costValue - currentRecord.costValue) / temperature
      );
      if (rand < probability) {
        records = append(nextRecord, records);
        // console.log("next2", currentRecord.costValue, nextRecord.costValue);
        currentRecord = nextRecord;
      }
    }

    i++;
    temperature *= COOLING;
  }
  // console.log(roundID, currentRecord.costValue);
  // console.log(i);
  const best = records.sort((a, b) => a.costValue - b.costValue)[0];
  const w: RoundWinner = {
    winningRecord: best,
    allInputs: records,
    roundID: roundID
  };
  return w;
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

export { getRound, getFirstDejongStats };
