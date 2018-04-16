import * as React from "react";
import { getSecondDejongStats } from "../../services/hillClimber/HillClimberService";
import { StatOverview } from "../stat/StatOverview";

const HillClimberSecondDejong: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"De Jong Second Function"}
        stats={getSecondDejongStats()}
      />
    </>
  );
};

export { HillClimberSecondDejong };
