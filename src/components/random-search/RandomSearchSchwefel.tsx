import * as React from "react";
import { getSchwefelStats } from "../../services/randomSearch/RandomSearchService";
import { StatOverview } from "../stat/StatOverview";

const RandomSearchSchwefel: React.SFC = () => {
  return (
    <>
      <StatOverview
        algorithmName="Random search"
        functionName={"Schwefel Function"}
        stats={getSchwefelStats()}
      />
    </>
  );
};

export { RandomSearchSchwefel };
