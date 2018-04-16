import * as React from "react";
import { RandomSearchFirstDejong } from "./../../../components/random-search/RandomSearchFirstDejong";
import { RandomSearchSecondDejong } from "./../../../components/random-search/RandomSearchSecondDejong";
import { RandomSearchSchwefel } from "./../../../components/random-search/RandomSearchSchwefel";
import * as renderer from "react-test-renderer";
import { getTestData } from "../../fixtures/StatFixture";

beforeEach(() => {
  const color = require("../../../services/ColorService");
  color.getRandomColor = jest.fn(() => "#16031f");
});
afterEach(() => {
  jest.unmock("../../../services/randomSearch/RandomSearchService");
  jest.unmock("../../../services/ColorService");
});

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
