import { Stat, ConvergenceStat, RoundWinner, QBC } from "src/models/Model";
import { std, abs, random } from "mathjs";
import { append } from "ramda";
import { getIndexedArray } from "../utils/Utils";

const ITERATIONS = 500;
const arrAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

const getConvergenceStat = (roundWinners: RoundWinner[]) => {
  let convergence: ConvergenceStat[] = [];
  console.log("lengths", roundWinners.map(x => x.allInputs.length));
  for (let index = 0; index < roundWinners[0].allInputs.length - 1; index++) {
    const costsAtTime = roundWinners.map(x => x.allInputs[index].costValue);
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

const getRelativeDistance = ({ min, max }: QBC) => {
  const sizeOfSearchedArea = (abs(min) + abs(max)) / 2;
  return sizeOfSearchedArea * 0.1;
};

const getValuesCloseToPoint = (
  input: number[],
  count: number,
  boundary: QBC
) => {
  const distance = getRelativeDistance(boundary);
  return getIndexedArray(count).map(_ =>
    input.map(x => {
      const min = x - distance < boundary.min ? boundary.min : x - distance;
      const max = x + distance > boundary.max ? boundary.max : x + distance;
      return random(min, max);
    })
  );
};

export { getStats, ITERATIONS, getValuesCloseToPoint };
