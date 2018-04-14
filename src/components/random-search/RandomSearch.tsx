import * as React from "react";
import { Header, Table } from "semantic-ui-react";
import { Row, Col } from "react-grid-system";
import { getDejongStats } from "../../services/randomSearch/randomSearchServiceFirstDejong";

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