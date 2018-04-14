import { randomInt, random, std } from "mathjs";
import { append } from "ramda";
import {
  evaluateFirstDejongFunction,
  evaluateSecondDejongFunction,
  evaluatedSchwefelFunction
} from "./../Functions";
type DejongInput = {
  id: number;
  iterations: number;
  inputs: number[];
  costValue: number;
};

type RoundWinner = {
  winningInput: DejongInput;
  roundID: number;
  allInputs: DejongInput[];
};

type ConvergenceStat = {
  iteration: number;
  costValue: number;
};

type Stat = {
  winners: RoundWinner[];
  min: number;
  max: number;
  average: number;
  median: number;
  convergence: ConvergenceStat[];
  standardDeviation: number;
};

type GeneratedValues = {
  input: number[];
  output: number;
  /**
   * Dimension or iteration
   */
  iterations: number;
};

const getRound = (roundID: number, costFn: () => GeneratedValues) => {
  const inputs: DejongInput[] = Array.from({ length: 1000 })
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

const arrAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

const getConvergenceStat = (rounds: RoundWinner[]) => {
  let convergence: ConvergenceStat[] = [];
  for (let index = 0; index < 999; index++) {
    const costsAtTime = rounds.map(x => x.allInputs[index].costValue);
    const c: ConvergenceStat = {
      iteration: index,
      costValue: arrAvg(costsAtTime)
    };
    convergence = append(c, convergence);
  }
  return convergence;
};

const getMedian = (values: number[]) => {
  values.sort(function(a: number, b: number) {
    return a - b;
  });

  if (values.length === 0) {
    return 0;
  }

  var half = Math.floor(values.length / 2);
  if (values.length % 2 === 0) {
    return values[half];
  } else {
    return (values[half - 1] + values[half]) / 2.0;
  }
};

const getStats = (costFn: () => GeneratedValues) => {
  const winners = getRounds(costFn);
  const costValues = [...winners.map(x => x.winningInput.costValue)];
  const min = Math.min(...costValues);
  const max = Math.max(...costValues);
  const average = arrAvg(costValues);
  const convergence = getConvergenceStat(winners);
  const median = getMedian(costValues);
  const standardDeviation = std(costValues);
  const stat: Stat = {
    winners,
    min,
    max,
    average,
    convergence,
    median,
    standardDeviation
  };
  return stat;
};

const getFirstDejongStats = () => {
  return getStats(() => {
    const iterations = randomInt(1, 10);
    const x = random(-5, 5);
    const o = evaluateFirstDejongFunction(x, iterations);
    const values: GeneratedValues = {
      input: [x],
      iterations,
      output: o
    };
    return values;
  });
};

const getSecondDejongStats = () => {
  return getStats(() => {
    const iterations = randomInt(2, 10);
    const x = random(-2, 2);
    const o = evaluateSecondDejongFunction(x, iterations);
    const values: GeneratedValues = {
      input: [x],
      iterations,
      output: o
    };
    return values;
  });
};

const getSchwefelStats = () => {
  return getStats(() => {
    const x = random(-500, 500);
    const o = evaluatedSchwefelFunction(x, 2);
    const values: GeneratedValues = {
      input: [x],
      iterations: 2,
      output: o
    };
    return values;
  });
};

export { getFirstDejongStats, getSecondDejongStats, getSchwefelStats, Stat };
