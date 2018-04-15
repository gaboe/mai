import * as React from "react";
import { Header, Table } from "semantic-ui-react";
import { Row, Col } from "react-grid-system";
import { getFirstDejongStats } from "../../services/randomSearch/RandomSearchService";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip
} from "victory";

import { VictoryVoronoiContainer } from "victory-chart";
import { getRandomColor } from "../../services/ColorService";

const RandomSearchSecondDejong: React.SFC = () => {
  const stats = getFirstDejongStats();
  const graphData = stats.winners.map(x =>
    x.allInputs.sort((a, b) => b.costValue - a.costValue).map((e, i) => {
      return { x: i, y: e.costValue };
    })
  );

  return (
    <>
      <Row>
        <Header as="h1">De Jong Second Function</Header>
      </Row>
      <Row>
        <Header as="h4">Min: {stats.min.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">Max: {stats.max.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">Mean: {stats.average.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">Median: {stats.median.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">
          Standard deviation: {stats.standardDeviation.toFixed(10)}
        </Header>
      </Row>
      <Row>
        <Col lg={6}>
          <Table celled={true}>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Round</Table.HeaderCell>
                <Table.HeaderCell>x</Table.HeaderCell>
                <Table.HeaderCell>i</Table.HeaderCell>
                <Table.HeaderCell>Cost value</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {stats.winners.map(x => {
                return (
                  <Table.Row
                    positive={x.winningRecord.costValue === stats.min}
                    negative={x.winningRecord.costValue === stats.max}
                    key={x.roundID}
                  >
                    <Table.Cell>{x.roundID}</Table.Cell>
                    <Table.Cell>
                      {x.winningRecord.inputs[0].toFixed(10)}
                    </Table.Cell>
                    <Table.Cell>{x.winningRecord.iterations}</Table.Cell>
                    <Table.Cell>
                      {x.winningRecord.costValue.toFixed(10)}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Col>
        <Col lg={6}>
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
              {graphData.map((x, i) => {
                return (
                  <VictoryLine
                    key={i}
                    style={{
                      data: { stroke: getRandomColor() },
                      parent: { border: "1px solid #ccc" }
                    }}
                    data={x}
                  />
                );
              })}
            </VictoryChart>
          </Row>
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
                  data: { stroke: "#303F9F", strokeWidth: 2 },
                  parent: { border: "10px solid #000" }
                }}
                data={stats.convergence.map(x => {
                  return { x: x.iteration, y: x.costValue };
                })}
              />
            </VictoryChart>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export { RandomSearchSecondDejong };
