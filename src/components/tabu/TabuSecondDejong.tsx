import * as React from "react";
import { StatOverview } from "../stat/StatOverview";
import { getSecondDejongStats } from "../../services/tabu/TabuService";

const TabuSecondDejong: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"De Jong Second Function"}
        stats={getSecondDejongStats()}
      />
    </>
  );
};

export { TabuSecondDejong };
