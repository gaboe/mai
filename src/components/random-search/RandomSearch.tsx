import * as React from "react";
import { Header, Table } from "semantic-ui-react";
import { Row, Col } from "react-grid-system";
import { getDejongStats } from "../../services/randomSearch/randomSearchServiceFirstDejong";
import { VictoryChart, VictoryLine, VictoryTheme, VictoryTooltip, } from "victory";

import { VictoryVoronoiContainer } from "victory-chart";

const getRandomColor = () => {
  // tslint:disable-next-line:no-bitwise
  return `${"#" + ((1 << 24) * Math.random() | 0).toString(16)}`;
};

const RandomSearch: React.SFC = () => {
  const stats = getDejongStats();
  const graphData = stats
    .winners.map((x) => x
      .allInputs
      .sort((a, b) => b.costValue - a.costValue)
      .map((e, i) => { return { x: i, y: e.costValue }; }));

  //   const graphData = stats
  // .winners[0]
  // .allInputs
  // .sort((a, b) => b.costValue - a.costValue)
  // .map((e, i) => { return { x: i, y: e.costValue }; });

  console.log(graphData);

  // const data = [
  //   { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  //   { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  //   { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  //   { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  //   { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  //   { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  //   { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  // ];
  return (
    <>
      <Row>
        <Header as="h1">De Jong First Function</Header>
      </Row>
      <Row>
        <Header as="h4">Min: {stats.min.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">Max: {stats.max.toFixed(10)}</Header>
      </Row>
      <Row>
        <Header as="h4">Average: {stats.average.toFixed(10)}</Header>
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
              {
                stats
                  .winners
                  .map(x => {
                    return (
                      <Table.Row
                        positive={x.winningInput.costValue === stats.min}
                        negative={x.winningInput.costValue === stats.max}
                        key={x.roundID}
                      >
                        <Table.Cell>{x.roundID}</Table.Cell>
                        <Table.Cell>{x.winningInput.xi.toFixed(10)}</Table.Cell>
                        <Table.Cell>{x.winningInput.iterations}</Table.Cell>
                        <Table.Cell>{x.winningInput.costValue.toFixed(10)}</Table.Cell>
                      </Table.Row>
                    );
                  })}

            </Table.Body>
          </Table>

        </Col>
        <Col lg={6}>
          <VictoryChart
            theme={VictoryTheme.material}
            containerComponent={
              <VictoryVoronoiContainer
                style={{ width: "70%", height: "auto" }}
                voronoiDimension="x"
                labels={(d: { y: number, x: number }) => `iteration:${d.x} y: ${d.y}`}
                labelComponent={<VictoryTooltip cornerRadius={0} flyoutStyle={{ fill: "white" }} />}
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
        </Col>

      </Row>

    </>
  );
};

export { RandomSearch };