import { areCoordinatesEqual } from "../../services/StatService";

it("Coordinates are not equal", () => {
  const a = [0, 0, 0];
  const b = [0, 0];
  const result = areCoordinatesEqual(a, b);
  expect(result).toBeFalsy();
});

it("Coordinates are not equal", () => {
  const a = [5, 0];
  const b = [0, 5];
  const result = areCoordinatesEqual(a, b);
  expect(result).toBeFalsy();
});

it("Coordinates are not equal decimal", () => {
  const a = [5.4457, 0];
  const b = [5.4452, 0];
  const result = areCoordinatesEqual(a, b);
  expect(result).toBeFalsy();
});

it("Coordinates are equal", () => {
  const a = [0, 0];
  const b = [0, 0];
  const result = areCoordinatesEqual(a, b);
  expect(result).toBeTruthy();
});

it("Coordinates are equal", () => {
  const a = [5, 0];
  const b = [5, 0];
  const result = areCoordinatesEqual(a, b);
  expect(result).toBeTruthy();
});

it("Coordinates are equal", () => {
  const a = [5, 0, 8, -5, -3, 8, 99];
  const b = [5, 0, 8, -5, -3, 8, 99];
  const result = areCoordinatesEqual(a, b);
  expect(result).toBeTruthy();
});
