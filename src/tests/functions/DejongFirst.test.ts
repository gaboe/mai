import { evaluateFirstDejongFunction } from "../../services/Functions";
import { getFirstDejongStats } from "../../services/randomSearch/RandomSearchService";

it("is almost zero", () => {
  const val = evaluateFirstDejongFunction([0, 0]);
  expect(val).toBeLessThan(0.00003);
});

it("is not NaN", () => {
  const val = evaluateFirstDejongFunction([-5.12, -5.12]);
  expect(val).not.toBeNaN();

  const val2 = evaluateFirstDejongFunction([-2.12, -2.12]);
  expect(val2).not.toBeNaN();

  const val3 = evaluateFirstDejongFunction([0, 0]);
  expect(val3).not.toBeNaN();

  const val4 = evaluateFirstDejongFunction([2.12, 2.12]);
  expect(val4).not.toBeNaN();

  const val5 = evaluateFirstDejongFunction([5.12, 5.12]);
  expect(val5).not.toBeNaN();
});

it("is never undefined", () => {
  const stat = getFirstDejongStats();
  expect(stat).toBeDefined();
  expect(stat.winners.length).toEqual(30);
  expect(stat.average).not.toBeNaN();
  expect(stat.min).not.toBeNaN();
  expect(stat.max).not.toBeNaN();
  expect(stat.min).not.toBeNaN();
  expect(stat.median).not.toBeNaN();
  const inputs = stat.winners.map(x => x.allInputs);
  inputs.forEach(x =>
    x.forEach(e => {
      expect(e.costValue).not.toBeNaN();
      expect(e.id).toBeGreaterThanOrEqual(0);
      expect(e.inputs.length).toEqual(2);
      e.inputs.forEach(i => {
        expect(i).toBeGreaterThanOrEqual(-5.12);
        expect(i).toBeLessThanOrEqual(5.12);
      });
    })
  );
});
