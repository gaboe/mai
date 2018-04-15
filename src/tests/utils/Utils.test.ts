import { getIndexedArray } from "../../utils/Utils";

it("Generates indexed array", () => {
  const arr = getIndexedArray(5);
  expect(arr.length).toEqual(5);
  expect(arr[0]).toEqual(0);
  expect(arr[1]).toEqual(1);
  expect(arr[2]).toEqual(2);
  expect(arr[3]).toEqual(3);
  expect(arr[4]).toEqual(4);
});
