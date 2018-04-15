import { Stat, ConvergenceStat, RoundWinner } from "src/models/Model";
import { std } from "mathjs";
import { append } from "ramda";

const ITERATIONS = 1000;
const arrAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

const getConvergenceStat = (rounds: RoundWinner[]) => {
  let convergence: ConvergenceStat[] = [];
  for (let index = 0; index < rounds[0].allInputs.length - 1; index++) {
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

const getStats = (getRounds: () => RoundWinner[]) => {
  const winners = getRounds();
  const costValues = [...winners.map(x => x.winningRecord.costValue)];
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

export { getStats, ITERATIONS };
