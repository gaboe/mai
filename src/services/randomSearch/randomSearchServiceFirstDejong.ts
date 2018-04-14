import { randomInt, random } from "mathjs";
import { append } from "ramda";
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

const evaluateDejongFunction = (iterations: number, x: number) => {
  return Array.from({ length: iterations })
    .map(_ => Math.pow(x, 2))
    .reduce((a, b) => a + b);
};

const getDejongRoundWinner = (roundID: number) => {
  const inputs: DejongInput[] = Array
    .from({ length: 1000 })
    .map((_, i) => i)
    .map(e => {
      const iterations = randomInt(1, 10);
      const randomX = random(-5, 5);
      const costValue = evaluateDejongFunction(iterations, randomX);
      return { id: e, iterations: iterations, xi: randomX, costValue: costValue };
    });

  let accumulator: DejongInput[] = [];
  inputs.forEach(element => {
    if (accumulator.length === 0 || accumulator[accumulator.length - 1].costValue > element.costValue) {
      accumulator = append(element, accumulator);
    } else {
      accumulator = append(accumulator[accumulator.length - 1], accumulator);
    }
  });
  const winner: RoundWinner = {
    winningInput: accumulator[accumulator.length - 1],
    allInputs: accumulator,
    roundID,
  };
  return winner;
};

const getDejongRoundWinners = () => {
  const winners: RoundWinner[] = Array
    .from({ length: 30 })
    .map((_, i) => i)
    .map(e => getDejongRoundWinner(e));

  return winners;
};

type DejongStat = {
  winners: RoundWinner[],
  min: number,
  max: number,
  average: number;
};

const arrAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

const getDejongStats = () => {
  const winners = getDejongRoundWinners();
  const costValues = [...winners.map(x => x.winningInput.costValue)];
  const min = Math.min(...costValues);
  const max = Math.max(...costValues);
  const average = arrAvg(costValues);
  const stat: DejongStat = { winners, min, max, average };
  return stat;
};

export { getDejongStats };