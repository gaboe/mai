import * as React from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryTooltip,
  VictoryLine,
  VictoryLegend
} from "victory";
import { VictoryVoronoiContainer } from "victory-chart";
import { ConvergenceStat } from "../../models/Model";

type Props = {
  randomSearch: ConvergenceStat[];
  hillClimber: ConvergenceStat[];
  simulatedAnnealing: ConvergenceStat[];
  tabuSearch: ConvergenceStat[];
};

const ComparsionChart: React.SFC<Props> = (props: Props) => (
  <VictoryChart
    theme={VictoryTheme.material}
    containerComponent={
      <VictoryVoronoiContainer
        style={{ width: "50%", height: "auto" }}
        voronoiDimension="x"
        labels={(d: { y: number; x: number; name: string }) => {
          return `${d.name}, value: ${d.y.toFixed(8)}`;
        }}
        labelComponent={
          <VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />}
      />
    }
  >
    <VictoryLegend
      x={100}
      // tslint:disable-next-line:no-any
      style={{ border: { stroke: "black" } } as any}
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
      data={props.randomSearch.map(x => {
        return {
          x: x.iteration,
          y: x.costValue,
          name: "Random search"
        };
      })}
    />
    <VictoryLine
      style={{
        data: { stroke: "#f00", strokeWidth: 2 },
        parent: { border: "10px solid #000" }
      }}
      data={props.hillClimber.map(x => {
        return { x: x.iteration, y: x.costValue, name: "Hill climber" };
      })}
    />
    <VictoryLine
      style={{
        data: { stroke: "#00f", strokeWidth: 2 },
        parent: { border: "10px solid #000" }
      }}
      data={props.simulatedAnnealing.map(x => {
        return {
          x: x.iteration,
          y: x.costValue,
          name: "Simulated annealing"
        };
      })}
    />
    <VictoryLine
      style={{
        data: { stroke: "#000", strokeWidth: 2 },
        parent: { border: "10px solid #000" }
      }}
      data={props.tabuSearch.map(x => {
        return { x: x.iteration, y: x.costValue, name: "Tabu search" };
      })}
    />
  </VictoryChart>
);

export { ComparsionChart };
