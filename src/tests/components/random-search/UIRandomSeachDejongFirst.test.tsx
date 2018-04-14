import * as React from "react";
import { RandomSearchFirstDejong } from "./../../../components/random-search/RandomSearchFirstDejong";
import { RandomSearchSecondDejong } from "./../../../components/random-search/RandomSearchSecondDejong";
import { RandomSearchSchwefel } from "./../../../components/random-search/RandomSearchSchwefel";
import * as renderer from "react-test-renderer";
import {
  getFirstDejongStats,
  getSecondDejongStats,
  getSchwefelStats,
  Stat
} from "../../../services/randomSearch/RandomSearchService";
import { getRandomColor } from "../../../services/ColorService";

const getTestData = () => {
  const response: Stat = {
    average: 666,
    max: 999,
    min: 111,
    median: 555,
    standardDeviation: 77,
    convergence: [
      { iteration: 0, costValue: 14 },
      { iteration: 1, costValue: 24 },
      { iteration: 2, costValue: 34 },
      { iteration: 3, costValue: 44 }
    ],
    winners: [
      {
        roundID: 0,
        winningInput: { costValue: 77, id: 1, iterations: 7, inputs: [71] },
        allInputs: [
          { costValue: 66, id: 0, iterations: 5, inputs: [41] },
          { costValue: 77, id: 1, iterations: 7, inputs: [71] },
          { costValue: 88, id: 2, iterations: 4, inputs: [51] }
        ]
      },
      {
        roundID: 1,
        winningInput: { costValue: 88, id: 3, iterations: 7, inputs: [51] },
        allInputs: [
          { costValue: 66, id: 0, iterations: 5, inputs: [41] },
          { costValue: 77, id: 1, iterations: 7, inputs: [71] },
          { costValue: 88, id: 2, iterations: 7, inputs: [51] }
        ]
      }
    ]
  };
  return response;
};

test("Render first dejong function", () => {
  getFirstDejongStats = jest.fn(() => getTestData());
  getRandomColor = jest.fn(() => "#16031f");
  const component = renderer.create(<RandomSearchFirstDejong />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Render second dejong function", () => {
  getSecondDejongStats = jest.fn(() => getTestData());
  getRandomColor = jest.fn(() => "#16031f");
  const component = renderer.create(<RandomSearchSecondDejong />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Render Schwefel", () => {
  getSchwefelStats = jest.fn(() => getTestData());
  getRandomColor = jest.fn(() => "#16031f");
  const component = renderer.create(<RandomSearchSchwefel />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
