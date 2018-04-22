import * as React from "react";
import { getSchwefelStats as randomSearch } from "../../services/randomSearch/RandomSearchService";
import { getSchwefelStats as hillClimber } from "../../services/hillClimber/HillClimberService";
import { getSchwefelStats as sa } from "../../services/simulatedAnnealing/simulatedAnneualingService";
import { getSchwefelStats as tabu } from "../../services/tabu/TabuService";
import { Comparsion } from "./Comparsion";

const SchwefelComparsion: React.SFC = () => {
  return (
    <>
      <Comparsion
        randomSearch={randomSearch()}
        hillClimber={hillClimber()}
        simulatedAnnealing={sa()}
        tabuSearch={tabu()}
      />
    </>
  );
};

export { SchwefelComparsion };
