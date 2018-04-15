import * as React from "react";
import { RandomSearchFirstDejong } from "./../../../components/random-search/RandomSearchFirstDejong";
import { RandomSearchSecondDejong } from "./../../../components/random-search/RandomSearchSecondDejong";
import { RandomSearchSchwefel } from "./../../../components/random-search/RandomSearchSchwefel";
import * as renderer from "react-test-renderer";
import { Stat } from "../../../services/randomSearch/RandomSearchService";

beforeEach(() => {
  const color = require("../../../services/ColorService");
  color.getRandomColor = jest.fn(() => "#16031f");
});
afterEach(() => {
  jest.unmock("../../../services/randomSearch/RandomSearchService");
  jest.unmock("../../../services/ColorService");
});

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
  const randomSearchServiceMock = require("../../../services/randomSearch/RandomSearchService");
  randomSearchServiceMock.getFirstDejongStats = jest.fn(() => getTestData());

  const component = renderer.create(<RandomSearchFirstDejong />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Render second dejong function", () => {
  const randomSearchServiceMock = require("../../../services/randomSearch/RandomSearchService");
  randomSearchServiceMock.getSecondDejongStats = jest.fn(() => getTestData());

  const component = renderer.create(<RandomSearchSecondDejong />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Render Schwefel", () => {
  const randomSearchServiceMock = require("../../../services/randomSearch/RandomSearchService");
  randomSearchServiceMock.getSchwefelStats = jest.fn(() => getTestData());

  const component = renderer.create(<RandomSearchSchwefel />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
