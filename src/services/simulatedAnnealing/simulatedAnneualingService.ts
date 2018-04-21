import { getStats, getValuesCloseToPoint, ITERATIONS } from "../StatService";
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

  const perIteration = ITERATIONS / 115;
  let accumulator = 0;
  const arr = [];
  for (let index = 0; index < 115; index++) {
    let toAdd = 0;
    if (accumulator > 1) {
      const takenFromAccumulator = Math.ceil(perIteration) - perIteration;
      toAdd = takenFromAccumulator + perIteration;
      accumulator -= takenFromAccumulator;
    } else if (index === 114) {
      toAdd = Math.round(perIteration) + Math.ceil(accumulator);
    } else {
      toAdd = perIteration;
    }
    const delta = toAdd - Math.floor(toAdd);
    accumulator += delta;
    arr.push(Math.floor(toAdd));
    console.log(toAdd, accumulator);
  }
  console.log("array cisle", arr);
  console.log("suma", arr.reduce((a, b) => a + b));

  while (temperature > MIN_TEMP) {
    const nextPoint = getValuesCloseToPoint(currentRecord.inputs, 1, boundary);
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
    } else {
      const rand = gaussianRand();
      const probability = Math.exp(
        -(nextRecord.costValue - currentRecord.costValue) / temperature
      );
      if (rand < probability) {
        records = append(nextRecord, records);
        currentRecord = nextRecord;
      }
    }

    i++;
    temperature *= COOLING;
  }
  const w: RoundWinner = {
    winningRecord: records[records.length - 1],
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
  const winners: RoundWinner[] = Array.from({ length: 1 })
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
