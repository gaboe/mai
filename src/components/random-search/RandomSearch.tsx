import * as React from "react";
import { Header, Table } from "semantic-ui-react";
import { randomInt, random } from "mathjs";
import { Row, Col } from "react-grid-system";

type DejongInput = {
  id: number;
  iterations: number;
  xi: number;
  costValue: number;
};

type RoundWinner = {
  input: DejongInput;
  roundID: number;
};

const evaluateDejongFunction = (iterations: number, x: number) => {
  return Array.from({ length: iterations })
    .map(_ => Math.pow(x, 2))
    .reduce((a, b) => a + b);
};

// const getDejongOptimalInput = () => {
//   const dejongInput: DejongInput = {
//     id: -1,
//     iterations: 100,
//     xi: 0,
//     costValue: dejongFunction(100, 0)
//   };
//   return dejongInput;
// };

const getDejongRoundWinner = () => {
  const winner: DejongInput = Array
    .from({ length: 1000 })
    .map((u, i) => i)
    .map(e => {
      const iterations = randomInt(1, 100);
      const randomX = random(-5, 5);
      const costValue = evaluateDejongFunction(iterations, randomX);
      return { id: e, iterations: iterations, xi: randomX, costValue: costValue };
    })
    .sort((a, b) => (a.costValue - b.costValue))
  [0];
  return winner;
};

const getDejongRoundWinners = () => {
  const winners: RoundWinner[] = Array
    .from({ length: 30 })
    .map((u, i) => i)
    .map(e => {
      const winner: RoundWinner = {
        roundID: e,
        input: getDejongRoundWinner(),
      };
      return winner;
    });

  return winners;
};

type DejongStat = {
  winners: RoundWinner[],
  min: number,
  max: number,
  average: number;
};

const arrAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

const getDejongStats = () => {
  const winners = getDejongRoundWinners();
  const costValues = [...winners.map(x => x.input.costValue)];
  const min = Math.min(...costValues);
  const max = Math.max(...costValues);
  const average = arrAvg(costValues);
  const stat: DejongStat = { winners, min, max, average };
  return stat;
};

const RandomSearch: React.SFC = () => {
  const stats = getDejongStats();
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
                        positive={x.input.costValue === stats.min}
                        negative={x.input.costValue === stats.max}
                        key={x.roundID}
                      >
                        <Table.Cell>{x.roundID}</Table.Cell>
                        <Table.Cell>{x.input.xi.toFixed(10)}</Table.Cell>
                        <Table.Cell>{x.input.iterations}</Table.Cell>
                        <Table.Cell>{x.input.costValue.toFixed(10)}</Table.Cell>
                      </Table.Row>
                    );
                  })}

            </Table.Body>
          </Table>
        </Col>

      </Row>

    </>
  );
};

export { RandomSearch };