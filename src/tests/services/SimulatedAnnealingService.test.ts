import {
  getFirstDejongStats,
  getSecondDejongStats,
  getSchwefelStats
} from "./../../services/simulatedAnnealing/simulatedAnneualingService";

it("First dejong has right structure for simulated annealing", () => {
  const stat = getFirstDejongStats();
  expect(stat).toBeDefined();
  expect(stat.winners.length).toEqual(30);
  expect(stat.average).not.toBeNaN();
  expect(stat.min).not.toBeNaN();
  expect(stat.max).not.toBeNaN();
  expect(stat.min).not.toBeNaN();
  expect(stat.median).not.toBeNaN();
  const inputs = stat.winners.map(x => x.allInputs);
  inputs.forEach(x => {
    expect(x.length).toEqual(115);
    x.forEach(e => {
      expect(e.costValue).not.toBeNaN();
      expect(e.id).toBeGreaterThanOrEqual(0);
      expect(e.inputs.length).toEqual(2);
      e.inputs.forEach(i => {
        expect(i).toBeGreaterThanOrEqual(-5.12);
        expect(i).toBeLessThanOrEqual(5.12);
      });
    });
  });
});

it("Simulated annealing for First DeJong has good best value", () => {
  const stat = getFirstDejongStats();
  expect(stat).toBeDefined();
  expect(
    stat.winners.sort(
      (a, b) => a.winningRecord.costValue - b.winningRecord.costValue
    )[0].winningRecord.costValue
  ).toBeLessThan(0.1);
});

it("Simulated annealing for Second DeJong has right structure", () => {
  const stat = getSecondDejongStats();
  expect(stat).toBeDefined();
  expect(stat.winners.length).toEqual(30);
  expect(stat.average).not.toBeNaN();
  expect(stat.min).not.toBeNaN();
  expect(stat.max).not.toBeNaN();
  expect(stat.min).not.toBeNaN();
  expect(stat.median).not.toBeNaN();
  const inputs = stat.winners.map(x => x.allInputs);
  inputs.forEach(x => {
    expect(x.length).toEqual(115);
    x.forEach(e => {
      expect(e.costValue).not.toBeNaN();
      expect(e.id).toBeGreaterThanOrEqual(0);
      expect(e.inputs.length).toEqual(2);
      e.inputs.forEach(i => {
        expect(i).toBeGreaterThanOrEqual(-2.048);
        expect(i).toBeLessThanOrEqual(2.048);
      });
    });
  });
});

it("Simulated annealing for Second dejong has good best value", () => {
  const stat = getSecondDejongStats();
  expect(stat).toBeDefined();
  expect(
    stat.winners.sort(
      (a, b) => a.winningRecord.costValue - b.winningRecord.costValue
    )[0].winningRecord.costValue
  ).toBeLessThan(0.1);
});

it("Simulated annealing for Schewel has right structure", () => {
  const stat = getSchwefelStats();
  expect(stat).toBeDefined();
  expect(stat.winners.length).toEqual(30);
  expect(stat.average).not.toBeNaN();
  expect(stat.min).not.toBeNaN();
  expect(stat.max).not.toBeNaN();
  expect(stat.min).not.toBeNaN();
  expect(stat.median).not.toBeNaN();
  const inputs = stat.winners.map(x => x.allInputs);
  inputs.forEach(x => {
    expect(x.length).toEqual(115);
    x.forEach(e => {
      expect(e.costValue).not.toBeNaN();
      expect(e.id).toBeGreaterThanOrEqual(0);
      expect(e.inputs.length).toEqual(2);
      e.inputs.forEach(i => {
        expect(i).toBeGreaterThanOrEqual(-500);
        expect(i).toBeLessThanOrEqual(500);
      });
    });
  });
});

it("Simulated annealing for Schewel has good best value", () => {
  const stat = getSchwefelStats();
  expect(stat).toBeDefined();
  expect(
    stat.winners.sort(
      (a, b) => a.winningRecord.costValue - b.winningRecord.costValue
    )[0].winningRecord.costValue
  ).toBeLessThan(70);
});
