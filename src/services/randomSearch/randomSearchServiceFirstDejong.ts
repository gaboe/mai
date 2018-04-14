import { randomInt, random } from "mathjs";

type DejongInput = {
  id: number;
  iterations: number;
  xi: number;
  costValue: number;
};

type RoundWinner = {
  input: DejongInput;
  roundID: number;
};

const evaluateDejongFunction = (iterations: number, x: number) => {
  return Array.from({ length: iterations })
    .map(_ => Math.pow(x, 2))
    .reduce((a, b) => a + b);
};

const getDejongRoundWinner = () => {
  const winner: DejongInput = Array
    .from({ length: 1000 })
    .map((_, i) => i)
    .map(e => {
      const iterations = randomInt(1, 100);
      const randomX = random(-5, 5);
      const costValue = evaluateDejongFunction(iterations, randomX);
      return { id: e, iterations: iterations, xi: randomX, costValue: costValue };
    })
    .sort((a, b) => (a.costValue - b.costValue))
  [0];
  return winner;
};

const getDejongRoundWinners = () => {
  const winners: RoundWinner[] = Array
    .from({ length: 30 })
    .map((_, i) => i)
    .map(e => {
      const winner: RoundWinner = {
        roundID: e,
        input: getDejongRoundWinner(),
      };
      return winner;
    });

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
  const costValues = [...winners.map(x => x.input.costValue)];
  const min = Math.min(...costValues);
  const max = Math.max(...costValues);
  const average = arrAvg(costValues);
  const stat: DejongStat = { winners, min, max, average };
  return stat;
};

export { getDejongStats };