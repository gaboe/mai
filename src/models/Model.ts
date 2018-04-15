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

export { DejongInput, RoundWinner, ConvergenceStat, Stat, GeneratedValues };
