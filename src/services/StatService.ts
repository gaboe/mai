import { Stat, ConvergenceStat, RoundWinner, QBC } from "src/models/Model";
import { std, abs, random } from "mathjs";
import { append } from "ramda";
import { getIndexedArray } from "../utils/Utils";
import {} from "fast.js";

const ITERATIONS = 500;
const MAX_RECURSION = 10;

const arrAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

const getConvergenceStat = (roundWinners: RoundWinner[]) => {
  let convergence: ConvergenceStat[] = [];
  const minimalInputsLength = roundWinners
    .map(x => x.allInputs.length)
    .sort((a, b) => a - b)[0];
  for (let index = 0; index < minimalInputsLength - 1; index++) {
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
  dimensions: number[],
  count: number,
  boundary: QBC
) => {
  const distance = getRelativeDistance(boundary);
  return getIndexedArray(count).map(_ =>
    dimensions.map(x => {
      const min = x - distance < boundary.min ? boundary.min : x - distance;
      const max = x + distance > boundary.max ? boundary.max : x + distance;
      return random(min, max);
    })
  );
};

const areCoordinatesEqual = (a: number[], b: number[]) => {
  if (a.length !== b.length) {
    return false;
  }
  const areEqual = a.reduce<boolean>((acc, x, index) => {
    const q = x.toFixed(4) === b[index].toFixed(4);
    return acc && q;
    // tslint:disable-next-line:align
  }, true);
  return areEqual;
};

const listContainsCoordinate = (list: number[][], coordinate: number[]) => {
  for (let index = 0; index < list.length; index++) {
    const areEqual = areCoordinatesEqual(list[index], coordinate);
    if (areEqual) {
      return true;
    }
  }
  return false;
};

const getCoordinate = (
  dimensions: number[],
  boundary: QBC,
  list: number[][],
  recursionLevel: number
): number[] => {
  const distance = getRelativeDistance(boundary);
  const randomCoordinate = dimensions.map(x => {
    const min = x - distance < boundary.min ? boundary.min : x - distance;
    const max = x + distance > boundary.max ? boundary.max : x + distance;
    return random(min, max);
  });

  if (listContainsCoordinate(list, randomCoordinate)) {
    // console.log("exists");
    if (recursionLevel < MAX_RECURSION) {
      return getCoordinate(dimensions, boundary, list, recursionLevel + 1);
    }
  }
  return randomCoordinate;
};

const getValuesCloseToPointWithTabuList = (
  dimensions: number[],
  count: number,
  boundary: QBC,
  list: number[][]
) => {
  return getIndexedArray(count).map(_ => {
    const coordinate = getCoordinate(dimensions, boundary, list, 0);
    return coordinate;
  });
};

export {
  getStats,
  ITERATIONS,
  getValuesCloseToPoint,
  getValuesCloseToPointWithTabuList,
  areCoordinatesEqual
};
