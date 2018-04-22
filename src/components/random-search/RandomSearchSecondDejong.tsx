import * as React from "react";
import { getFirstDejongStats } from "../../services/randomSearch/RandomSearchService";
import { StatOverview } from "../stat/StatOverview";

const RandomSearchSecondDejong: React.SFC = () => {
  return (
    <>
      <StatOverview
        algorithmName="Random search"
        functionName={"De Jong Second Function"}
        stats={getFirstDejongStats()}
      />
    </>
  );
};

export { RandomSearchSecondDejong };
