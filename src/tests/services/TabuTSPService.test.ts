import { generateCities, getData } from "./../../services/tabu/TabuTSPService";

it("Generates cities", () => {
  const cities = generateCities(100);
  expect(cities.length).toEqual(100);
});

it("Gets data from TSP", () => {
  const data = getData();
});
