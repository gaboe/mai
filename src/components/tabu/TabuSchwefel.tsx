import * as React from "react";
import { StatOverview } from "../stat/StatOverview";
import { getSchwefelStats } from "../../services/tabu/TabuService";

const TabuSchwefel: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"Schwefel Function"}
        stats={getSchwefelStats()}
      />
    </>
  );
};

export { TabuSchwefel };
