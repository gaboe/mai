import * as React from "react";
import * as renderer from "react-test-renderer";
import { getTestData } from "../../fixtures/StatFixture";
import { HillClimberFirstDejong } from "./../../../components/hill-climber/HillClimberFirstDejong";
import { HillClimberSecondDejong } from "./../../../components/hill-climber/HillClimberSecondDejong";
import { HillClimberSchwefel } from "./../../../components/hill-climber/HillClimberSchwefel";

beforeEach(() => {
  const color = require("../../../services/ColorService");
  color.getRandomColor = jest.fn(() => "#16031f");
});
afterEach(() => {
  jest.unmock("../../../services/hillClimber/HillClimberService");
  jest.unmock("../../../services/ColorService");
});

test("Render first dejong function", () => {
  const mock = require("../../../services/hillClimber/HillClimberService");
  mock.getFirstDejongStats = jest.fn(() => getTestData());

  const component = renderer.create(<HillClimberFirstDejong />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Render second dejong function", () => {
  const mock = require("../../../services/hillClimber/HillClimberService");
  mock.getSecondDejongStats = jest.fn(() => getTestData());

  const component = renderer.create(<HillClimberSecondDejong />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Render Schwefel", () => {
  const mock = require("../../../services/hillClimber/HillClimberService");
  mock.getSchwefelStats = jest.fn(() => getTestData());

  const component = renderer.create(<HillClimberSchwefel />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
