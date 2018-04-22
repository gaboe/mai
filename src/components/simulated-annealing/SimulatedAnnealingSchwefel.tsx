import * as React from "react";
import { StatOverview } from "../stat/StatOverview";
import { getSchwefelStats } from "../../services/simulatedAnnealing/simulatedAnneualingService";

const SimulatedAnnealingSchwefel: React.SFC = () => {
  return (
    <>
      <StatOverview
        algorithmName="Simulated annealing"
        functionName={"Schwefel Function"}
        stats={getSchwefelStats()}
      />
    </>
  );
};

export { SimulatedAnnealingSchwefel };
