import * as React from "react";
import { Route } from "react-router-dom";
import { RandomSearchFirstDejong } from "../random-search/RandomSearchFirstDejong";
import { RandomSearchSecondDejong } from "../random-search/RandomSearchSecondDejong";

const Routes = () => {
  return (
    <>
      <Route exact={true} path="/" component={RandomSearchFirstDejong} />
      <Route exact={true} path="/random-search-dejong-second" component={RandomSearchSecondDejong} />
    </>
  );
};

export { Routes };