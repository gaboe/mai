import * as React from "react";
import { getSecondDejongStats as randomSearch } from "../../services/randomSearch/RandomSearchService";
import { getSecondDejongStats as hillClimber } from "../../services/hillClimber/HillClimberService";
import { getSecondDejongStats as sa } from "../../services/simulatedAnnealing/simulatedAnneualingService";
import { getSecondDejongStats as tabu } from "../../services/tabu/TabuService";
import { Comparsion } from "./Comparsion";

const SecondDejongComparsion: React.SFC = () => {
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

export { SecondDejongComparsion };
