import { randomInt, random } from "mathjs";
import { append } from "ramda";
import {
  evaluateFirstDejongFunction,
  evaluateSecondDejongFunction,
  evaluatedSchwefelFunction
} from "./../Functions";

import {
  DejongInput,
  GeneratedValues,
  RoundWinner,
  Stat
} from "./../../models/Model";
import { getStats } from "../StatService";
const ITERATIONS = 500;

const getRound = (roundID: number, costFn: () => GeneratedValues) => {
  const inputs: DejongInput[] = Array.from({ length: ITERATIONS })
    .map((_, i) => i)
    .map(e => {
      const costValue = costFn();
      return {
        id: e,
        iterations: costValue.iterations,
        inputs: costValue.input,
        costValue: costValue.output
      };
    });

  let accumulator: DejongInput[] = [];
  inputs.forEach(element => {
    if (
      accumulator.length === 0 ||
      accumulator[accumulator.length - 1].costValue > element.costValue
    ) {
      accumulator = append(element, accumulator);
    } else {
      accumulator = append(accumulator[accumulator.length - 1], accumulator);
    }
  });
  const winner: RoundWinner = {
    winningInput: accumulator[accumulator.length - 1],
    allInputs: accumulator,
    roundID
  };
  return winner;
};

const getRounds = (costFn: () => GeneratedValues) => {
  const winners: RoundWinner[] = Array.from({ length: 30 })
    .map((_, i) => i)
    .map(e => getRound(e, costFn));

  return winners;
};

const getFirstDejongStats = () => {
  return getStats(() =>
    getRounds(() => {
      const iterations = randomInt(1, 10);
      const x = random(-5, 5);
      const o = evaluateFirstDejongFunction(x, iterations);
      const values: GeneratedValues = {
        input: [x],
        iterations,
        output: o
      };
      return values;
    })
  );
};

const getSecondDejongStats = () => {
  return getStats(() =>
    getRounds(() => {
      const iterations = randomInt(2, 10);
      const x = random(-2, 2);
      const o = evaluateSecondDejongFunction(x, iterations);
      const values: GeneratedValues = {
        input: [x],
        iterations,
        output: o
      };
      return values;
    })
  );
};

const getSchwefelStats = () => {
  return getStats(() =>
    getRounds(() => {
      const x = random(-500, 500);
      const o = evaluatedSchwefelFunction(x, 2);
      const values: GeneratedValues = {
        input: [x],
        iterations: 2,
        output: o
      };
      return values;
    })
  );
};

export { getFirstDejongStats, getSecondDejongStats, getSchwefelStats, Stat };
