type RoundRecord = {
  id: number;
  iterations: number;
  inputs: number[];
  costValue: number;
};

type RoundWinner = {
  winningRecord: RoundRecord;
  roundID: number;
  allInputs: RoundRecord[];
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

type QuadraticBoundaryCoordinate = { max: number; min: number };
type QBC = QuadraticBoundaryCoordinate;

export {
  RoundRecord,
  RoundWinner,
  ConvergenceStat,
  Stat,
  GeneratedValues,
  QBC
};
