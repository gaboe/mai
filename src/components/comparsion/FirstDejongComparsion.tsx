import * as React from "react";
import { Row, Col } from "react-grid-system";
import {
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryLine,
  VictoryLegend
} from "victory";
import { VictoryVoronoiContainer } from "victory-chart";
import { getFirstDejongStats as randomSearch } from "../../services/randomSearch/RandomSearchService";
import { getFirstDejongStats as hillClimber } from "../../services/hillClimber/HillClimberService";
import { getFirstDejongStats as sa } from "../../services/simulatedAnnealing/simulatedAnneualingService";
import { getFirstDejongStats as tabu } from "../../services/tabu/TabuService";
import { Header } from "semantic-ui-react";

const FirstDejongComparsion: React.SFC = () => {
  const randomSearchData = randomSearch();
  const hillClimberData = hillClimber();
  const saData = sa();
  const tabuData = tabu();

  return (
    <>
      <Header
        size="huge"
        textAlign="center"
        content="Comparsion of First Dejong function"
      />
      <Row>
        <Col sm={8} offset={{ sm: 3 }}>
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
            <VictoryLegend
              x={100}
              data={[
                {
                  name: "Random search",
                  symbol: { fill: "#0f0" }
                },
                { name: "Hill climber", symbol: { fill: "#f00" } },
                { name: "Simulated annealing", symbol: { fill: "#00f" } },
                { name: "Tabu search", symbol: { fill: "#000" } }
              ]}
            />
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
        </Col>
      </Row>
    </>
  );
};

export { FirstDejongComparsion };
