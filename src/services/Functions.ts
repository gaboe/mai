import { sin, sqrt, abs } from "mathjs";

const evaluateFirstDejongFunction = (x: number, iterations: number) => {
  return Array.from({ length: iterations })
    .map(_ => Math.pow(x, 2))
    .reduce((a, b) => a + b);
};

const evaluateSecondDejongFunction = (x: number, iterations: number) => {
  const xiPlusOne = x === 2.048 ? 2.048 : x + 0.0001;

  return Array.from({ length: iterations - 1 })
    .map(
      _ => 100 * Math.pow(xiPlusOne - Math.pow(x, 2), 2) + Math.pow(1 - x, 2)
    )
    .reduce((a, b) => a + b);
};

const evaluatedSchwefelFunction = (x: number, dimensions: number = 2) => {
  const sum = Array.from({ length: dimensions })
    .map(_ => x * sin(sqrt(abs(x))))
    .reduce((a, b) => a + b);
  const cost = 418.9829 * dimensions - sum;
  return cost;
};

export {
  evaluatedSchwefelFunction,
  evaluateFirstDejongFunction,
  evaluateSecondDejongFunction
};
