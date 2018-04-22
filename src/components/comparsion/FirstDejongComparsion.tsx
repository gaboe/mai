import * as React from "react";
import { Row } from "react-grid-system";
import {
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryLine
} from "victory";
import { VictoryVoronoiContainer } from "victory-chart";
import { getFirstDejongStats as randomSearch } from "../../services/randomSearch/RandomSearchService";
import { getFirstDejongStats as hillClimber } from "../../services/hillClimber/HillClimberService";
import { getFirstDejongStats as sa } from "../../services/simulatedAnnealing/simulatedAnneualingService";
import { getFirstDejongStats as tabu } from "../../services/tabu/TabuService";

const FirstDejongComparsion: React.SFC = () => {
  const randomSearchData = randomSearch();
  const hillClimberData = hillClimber();
  const saData = sa();
  const tabuData = tabu();

  return (
    <>
      <Row>
        <VictoryChart
          theme={VictoryTheme.material}
          containerComponent={
            <VictoryVoronoiContainer
              style={{ width: "70%", height: "auto" }}
              voronoiDimension="x"
              labels={(d: { y: number; x: number }) => {
                return `iteration:${d.x} y: ${d.y.toFixed(10)}`;
              }}
              labelComponent={
                <VictoryTooltip
                  cornerRadius={0}
                  flyoutStyle={{ fill: "white" }}
                />
              }
            />
          }
        >
          <VictoryLine
            style={{
              data: { stroke: "#0f0", strokeWidth: 2 },
              parent: { border: "10px solid #000" }
            }}
            data={randomSearchData.convergence.map(x => {
              return { x: x.iteration, y: x.costValue };
            })}
          />
          <VictoryLine
            style={{
              data: { stroke: "#f00", strokeWidth: 2 },
              parent: { border: "10px solid #000" }
            }}
            data={hillClimberData.convergence.map(x => {
              return { x: x.iteration, y: x.costValue };
            })}
          />
          <VictoryLine
            style={{
              data: { stroke: "#00f", strokeWidth: 2 },
              parent: { border: "10px solid #000" }
            }}
            data={saData.convergence.map(x => {
              return { x: x.iteration, y: x.costValue };
            })}
          />
          <VictoryLine
            style={{
              data: { stroke: "#000", strokeWidth: 2 },
              parent: { border: "10px solid #000" }
            }}
            data={tabuData.convergence.map(x => {
              return { x: x.iteration, y: x.costValue };
            })}
          />
        </VictoryChart>
      </Row>
    </>
  );
};

export { FirstDejongComparsion };
