import * as React from "react";
import { StatOverview } from "../stat/StatOverview";
import { getFirstDejongStats } from "../../services/simulatedAnnealing/simulatedAnneualingService";

const SimulatedAnnealingFirstDejong: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"De Jong First Function"}
        stats={getFirstDejongStats()}
      />
    </>
  );
};

export { SimulatedAnnealingFirstDejong };
