import * as React from "react";
import { getFirstDejongStats } from "../../services/hillClimber/HillClimberService";
import { StatOverview } from "../stat/StatOverview";

const HillClimberFirstDejong: React.SFC = () => {
  return (
    <>
      <StatOverview
        functionName={"De Jong First Function"}
        stats={getFirstDejongStats()}
      />
    </>
  );
};

export { HillClimberFirstDejong };
