import { getIndexedArray, revertSum } from "../../utils/Utils";

it("Generates indexed array", () => {
  const arr = getIndexedArray(5);
  expect(arr.length).toEqual(5);
  expect(arr[0]).toEqual(0);
  expect(arr[1]).toEqual(1);
  expect(arr[2]).toEqual(2);
  expect(arr[3]).toEqual(3);
  expect(arr[4]).toEqual(4);
});

it("Reverts sum of 500", () => {
  const arr = revertSum(500, 115);
  expect(arr.length).toEqual(115);
  expect(arr.reduce((a, b) => a + b)).toEqual(500);
});

it("Reverts sum of 5", () => {
  const arr = revertSum(5, 5);
  expect(arr.length).toEqual(5);
  expect(arr.reduce((a, b) => a + b)).toEqual(5);
  expect(arr[0]).toEqual(1);
  expect(arr[1]).toEqual(1);
  expect(arr[2]).toEqual(1);
  expect(arr[3]).toEqual(1);
  expect(arr[4]).toEqual(1);
});

it("Reverts sum of 14", () => {
  const arr = revertSum(14, 5);
  expect(arr.length).toEqual(5);
  expect(arr.reduce((a, b) => a + b)).toEqual(14);
  expect(arr[0]).toEqual(2);
  expect(arr[1]).toEqual(2);
  expect(arr[2]).toEqual(3);
  expect(arr[3]).toEqual(3);
  expect(arr[4]).toEqual(4);
});

it("Reverts sum of 28", () => {
  const arr = revertSum(28, 3);
  expect(arr.length).toEqual(3);
  expect(arr.reduce((a, b) => a + b)).toEqual(28);
  expect(arr[0]).toEqual(9);
  expect(arr[1]).toEqual(9);
  expect(arr[2]).toEqual(10);
});

it("Reverts sum of 3", () => {
  const arr = revertSum(3, 4);
  expect(arr.length).toEqual(4);
  expect(arr.reduce((a, b) => a + b)).toEqual(3);
  expect(arr[0]).toEqual(0);
  expect(arr[1]).toEqual(0);
  expect(arr[2]).toEqual(1);
  expect(arr[3]).toEqual(2);
});
