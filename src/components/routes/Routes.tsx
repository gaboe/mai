import * as React from "react";
import { Route } from "react-router-dom";
import { RandomSearchFirstDejong } from "../random-search/RandomSearchFirstDejong";
import { RandomSearchSecondDejong } from "../random-search/RandomSearchSecondDejong";
import { RandomSearchSchwefel } from "../random-search/RandomSearchSchwefel";
import { Home } from "../home/Home";

const Routes = () => {
  return (
    <>
      <Route exact={true} path="/" component={Home} />
      <Route
        exact={true}
        path="/random-search-dejong-first"
        component={RandomSearchFirstDejong}
      />
      <Route
        exact={true}
        path="/random-search-dejong-second"
        component={RandomSearchSecondDejong}
      />
      <Route
        exact={true}
        path="/random-search-schwefel"
        component={RandomSearchSchwefel}
      />
    </>
  );
};

export { Routes };
