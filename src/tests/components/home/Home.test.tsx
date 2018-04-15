import * as React from "react";
import { Home } from "./../../../components/home/Home";
import * as renderer from "react-test-renderer";
import { HashRouter as Router } from "react-router-dom";

test("Render Home Page", () => {
  const component = renderer.create(
    <Router>
      <Home />
    </Router>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
