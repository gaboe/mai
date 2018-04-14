import * as React from "react";
import { Route } from "react-router-dom";
import { RandomSearch } from "../random-search/RandomSearch";

const Routes = () => {
  return (
    <>
      <Route exact={true} path="/" component={RandomSearch} />
    </>
  );
};

export { Routes };