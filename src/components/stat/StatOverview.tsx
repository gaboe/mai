import * as React from "react";
import { Header, Table } from "semantic-ui-react";
import { Row, Col } from "react-grid-system";
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryLabel
} from "victory";

import { VictoryVoronoiContainer } from "victory-chart";
import { getRandomColor } from "../../services/ColorService";
import { Stat as StatType } from "../../models/Model";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
type Props = {
  functionName: string;
  algorithmName: string;
  stats: StatType;
};

const fadeInAnimation = keyframes`${fadeIn}`;
const FadeDiv = styled.div`
  animation: 1s ${fadeInAnimation};
`;
const StatOverview: React.SFC<Props> = (props: Props) => {
  const graphData = props.stats.winners.map(x =>
    x.allInputs.sort((a, b) => b.costValue - a.costValue).map((e, i) => {
      return { x: i, y: e.costValue, roundNo: x.roundID };
    })
  );

  return (
    <>
      <Row>
        <Header as="h1">{props.algorithmName}</Header>
      </Row>
      <Row>
        <Header as="h1">{props.functionName}</Header>
      </Row>
      <Row>
        <Header as="h4">Min: {props.stats.min.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">Max: {props.stats.max.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">Mean: {props.stats.average.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">Median: {props.stats.median.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">
          Standard deviation: {props.stats.standardDeviation.toFixed(10)}
        </Header>
      </Row>
      <FadeDiv>
        <Row>
          <Col lg={6}>
            <Table celled={true}>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Round</Table.HeaderCell>
                  {props.stats.winners[0].winningRecord.inputs.map((_, i) => (
                    <Table.HeaderCell key={i}>{`x${i}`}</Table.HeaderCell>
                  ))}
                  <Table.HeaderCell>Cost value</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {props.stats.winners.map(x => {
                  return (
                    <Table.Row
                      positive={x.winningRecord.costValue === props.stats.min}
                      negative={x.winningRecord.costValue === props.stats.max}
                      key={x.roundID}
                    >
                      <Table.Cell>{x.roundID}</Table.Cell>
                      {x.winningRecord.inputs.map(i => (
                        <Table.Cell key={i}>{i.toFixed(10)}</Table.Cell>
                      ))}
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
                    labels={(d: { y: number; roundNo: number }) => {
                      return `Round No.:${d.roundNo} value: ${d.y.toFixed(10)}`;
                    }}
                    labelComponent={
                      <VictoryTooltip
                        renderInPortal={true}
                        cornerRadius={0}
                        flyoutStyle={{ fill: "white" }}
                      />
                    }
                  />
                }
              >
                <VictoryLabel
                  text="All iterations"
                  x={200}
                  y={30}
                  textAnchor="middle"
                />

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
                      return `Iteration No.${d.x} value: ${d.y.toFixed(10)}`;
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
                <VictoryLabel
                  text="Convergence"
                  x={200}
                  y={30}
                  textAnchor="middle"
                />
                <VictoryLine
                  style={{
                    data: { stroke: "#303F9F", strokeWidth: 2 },
                    parent: { border: "10px solid #000" }
                  }}
                  data={props.stats.convergence.map(x => {
                    return { x: x.iteration, y: x.costValue };
                  })}
                />
              </VictoryChart>
            </Row>
          </Col>
        </Row>
      </FadeDiv>
    </>
  );
};

export { StatOverview };
