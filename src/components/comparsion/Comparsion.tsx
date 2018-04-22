import * as React from "react";
import { Row, Col } from "react-grid-system";
import { Header } from "semantic-ui-react";
import { ComparsionChart } from "./ComparsionChart";
import { Stat } from "../../models/Model";

type Props = {
  randomSearch: Stat;
  hillClimber: Stat;
  simulatedAnnealing: Stat;
  tabuSearch: Stat;
};

const Comparsion: React.SFC<Props> = (props: Props) => {
  return (
    <>
      <Header
        size="huge"
        textAlign="center"
        content="Comparsion of First Dejong function"
      />
      <Row>
        <Col sm={10} offset={{ sm: 3 }}>
          <ComparsionChart
            randomSearch={props.randomSearch.convergence}
            hillClimber={props.hillClimber.convergence}
            simulatedAnnealing={props.simulatedAnnealing.convergence}
            tabuSearch={props.tabuSearch.convergence}
          />
        </Col>
      </Row>
    </>
  );
};

export { Comparsion };
