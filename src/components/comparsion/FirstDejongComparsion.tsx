import * as React from "react";
import { getFirstDejongStats as randomSearch } from "../../services/randomSearch/RandomSearchService";
import { getFirstDejongStats as hillClimber } from "../../services/hillClimber/HillClimberService";
import { getFirstDejongStats as sa } from "../../services/simulatedAnnealing/simulatedAnneualingService";
import { getFirstDejongStats as tabu } from "../../services/tabu/TabuService";
import { Comparsion } from "./Comparsion";

const FirstDejongComparsion: React.SFC = () => {
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

export { FirstDejongComparsion };
