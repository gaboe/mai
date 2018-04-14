import { evaluatedSchwefelFunction } from "../services/Functions";
import { getSchwefelStats } from "../services/randomSearch/RandomSearchService";

it("is almost zero", () => {
  const val = evaluatedSchwefelFunction(420.9687);
  expect(val).toBeLessThan(0.00003);
});

it("is not NaN", () => {
  const val = evaluatedSchwefelFunction(-420.9687);
  expect(val).not.toBeNaN();

  const val2 = evaluatedSchwefelFunction(-324.5042901227688);
  expect(val2).not.toBeNaN();

  const val3 = evaluatedSchwefelFunction(0);
  expect(val3).not.toBeNaN();

  const val4 = evaluatedSchwefelFunction(324);
  expect(val4).not.toBeNaN();
});

it("is never undefined", () => {
  const stat = getSchwefelStats();
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
      expect(e.xi).toBeGreaterThanOrEqual(-500);
      expect(e.xi).toBeLessThanOrEqual(500);
    })
  );
});
