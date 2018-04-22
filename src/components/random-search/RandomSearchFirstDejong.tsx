import * as React from "react";
import { getFirstDejongStats } from "../../services/randomSearch/RandomSearchService";
import { StatOverview } from "../stat/StatOverview";

const RandomSearchFirstDejong: React.SFC = () => {
  return (
    <>
      <StatOverview
        algorithmName="Random search"
        functionName={"De Jong First Function"}
        stats={getFirstDejongStats()}
      />
    </>
  );
};

export { RandomSearchFirstDejong };
