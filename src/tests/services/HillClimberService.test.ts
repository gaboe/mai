import {
  getFirstDejongStats,
  getSecondDejongStats
} from "../../services/hillClimber/HillClimberService";

it("First dejong has right structure", () => {
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
    expect(x.length).toEqual(50);
    x.forEach(e => {
      expect(e.costValue).not.toBeNaN();
      expect(e.id).toBeGreaterThanOrEqual(0);
      expect(e.inputs.length).toEqual(1);
      e.inputs.forEach(i => {
        expect(i).toBeGreaterThanOrEqual(-5.12);
        expect(i).toBeLessThanOrEqual(5.12);
      });
    });
  });
});

it("First dejong has right count of iterations", () => {
  const stat = getFirstDejongStats();
  expect(stat).toBeDefined();
  expect(
    stat.winners.sort(
      (a, b) => a.winningRecord.costValue - b.winningRecord.costValue
    )[0].winningRecord.costValue
  ).toBeLessThan(0.05);
});

it("Second dejong has right structure", () => {
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
    expect(x.length).toEqual(50);
    x.forEach(e => {
      expect(e.costValue).not.toBeNaN();
      expect(e.id).toBeGreaterThanOrEqual(0);
      expect(e.inputs.length).toEqual(1);
      e.inputs.forEach(i => {
        expect(i).toBeGreaterThanOrEqual(-2.048);
        expect(i).toBeLessThanOrEqual(2.048);
      });
    });
  });
});

it("Second dejong has right count of iterations", () => {
  const stat = getSecondDejongStats();
  expect(stat).toBeDefined();
  expect(
    stat.winners.sort(
      (a, b) => a.winningRecord.costValue - b.winningRecord.costValue
    )[0].winningRecord.costValue
  ).toBeLessThan(0.05);
});
