import * as React from "react";
import { StatOverview } from "../stat/StatOverview";
import { getSecondDejongStats } from "../../services/simulatedAnnealing/simulatedAnneualingService";

const SimulatedAnnealingSecondDejong: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"De Jong Second Function"}
        stats={getSecondDejongStats()}
      />
    </>
  );
};

export { SimulatedAnnealingSecondDejong };
