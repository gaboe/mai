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
  xi: number;
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

type DejongStat = {
  winners: RoundWinner[];
  min: number;
  max: number;
  average: number;
  median: number;
  convergence: ConvergenceStat[];
  standardDeviation: number;
};

const getRound = (
  roundID: number,
  costFn: (iterations: number, value: number) => number,
  randMin: number,
  randMax: number
) => {
  const inputs: DejongInput[] = Array.from({ length: 1000 })
    .map((_, i) => i)
    .map(e => {
      const iterations = randomInt(1, 10);
      const randomX = random(randMin, randMax);
      const costValue = costFn(randomX, iterations);
      return {
        id: e,
        iterations: iterations,
        xi: randomX,
        costValue: costValue
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

const getRounds = (
  costFn: (iterations: number, value: number) => number,
  randMin: number,
  randMax: number
) => {
  const winners: RoundWinner[] = Array.from({ length: 30 })
    .map((_, i) => i)
    .map(e => getRound(e, costFn, randMin, randMax));

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

const getStats = (
  costFn: (iterations: number, value: number) => number,
  randMin: number,
  randMax: number
) => {
  const winners = getRounds(costFn, randMin, randMax);
  const costValues = [...winners.map(x => x.winningInput.costValue)];
  const min = Math.min(...costValues);
  const max = Math.max(...costValues);
  const average = arrAvg(costValues);
  const convergence = getConvergenceStat(winners);
  const median = getMedian(costValues);
  const standardDeviation = std(costValues);
  const stat: DejongStat = {
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
  return getStats(evaluateFirstDejongFunction, -5, 5);
};

const getSecondDejongStats = () => {
  return getStats(evaluateSecondDejongFunction, -2, 2);
};

const getSchwefelStats = () => {
  return getStats(evaluatedSchwefelFunction, -500, 500);
};

export { getFirstDejongStats, getSecondDejongStats, getSchwefelStats };
