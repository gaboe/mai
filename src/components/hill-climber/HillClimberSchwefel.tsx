import * as React from "react";
import { getSchwefelStats } from "../../services/hillClimber/HillClimberService";
import { StatOverview } from "../stat/StatOverview";

const HillClimberSchwefel: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"Schwefel Function"}
        stats={getSchwefelStats()}
      />
    </>
  );
};

export { HillClimberSchwefel };
