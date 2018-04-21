import * as React from "react";
import { StatOverview } from "../stat/StatOverview";
import { getFirstDejongStats } from "../../services/tabu/TabuService";

const TabuFirstDejong: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"De Jong First Function"}
        stats={getFirstDejongStats()}
      />
    </>
  );
};

export { TabuFirstDejong };
