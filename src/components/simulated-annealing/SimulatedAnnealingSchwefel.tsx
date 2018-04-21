import * as React from "react";
import { StatOverview } from "../stat/StatOverview";
import { getSchwefelStats } from "../../services/simulatedAnnealing/simulatedAnneualingService";

const SimulatedAnnealingSchwefel: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"Schwefel Function"}
        stats={getSchwefelStats()}
      />
    </>
  );
};

export { SimulatedAnnealingSchwefel };
