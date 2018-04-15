import { sin, sqrt, abs } from "mathjs";
import { getIndexedArray } from "../utils/Utils";

const evaluateFirstDejongFunction = (input: number[]) => {
  return input.map(x => Math.pow(x, 2)).reduce((a, b) => a + b);
};

const evaluateSecondDejongFunction = (input: number[]) => {
  return getIndexedArray(input.length - 1)
    .map(
      i =>
        100 * Math.pow(input[i + 1] - Math.pow(input[i], 2), 2) +
        Math.pow(1 - input[i], 2)
    )
    .reduce((a, b) => a + b);
};

const evaluatedSchwefelFunction = (input: number[]) => {
  const sum = input.map(x => x * sin(sqrt(abs(x)))).reduce((a, b) => a + b);
  const cost = 418.9829 * input.length - sum;
  return cost;
};

export {
  evaluatedSchwefelFunction,
  evaluateFirstDejongFunction,
  evaluateSecondDejongFunction
};
