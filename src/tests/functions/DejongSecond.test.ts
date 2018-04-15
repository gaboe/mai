import { evaluateSecondDejongFunction } from "../../services/Functions";
import { getSecondDejongStats } from "../../services/randomSearch/RandomSearchService";

it("is almost zero", () => {
  const val = evaluateSecondDejongFunction([1, 1]);
  expect(val).toBeLessThan(0.00003);
});

it("is not NaN", () => {
  const val = evaluateSecondDejongFunction([-2.048, -2.048]);
  expect(val).not.toBeNaN();

  const val2 = evaluateSecondDejongFunction([-1.12, -1.12]);
  expect(val2).not.toBeNaN();

  const val3 = evaluateSecondDejongFunction([0, 0]);
  expect(val3).not.toBeNaN();

  const val4 = evaluateSecondDejongFunction([1.12, 1.12]);
  expect(val4).not.toBeNaN();

  const val5 = evaluateSecondDejongFunction([2.048, 2.048]);
  expect(val5).not.toBeNaN();
});

it("is never undefined", () => {
  const stat = getSecondDejongStats();
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
      e.inputs.forEach(i => {
        expect(i).toBeGreaterThanOrEqual(-2.048);
        expect(i).toBeLessThanOrEqual(2.048);
      });
    })
  );
});
