import * as React from "react";
import { Row, Col } from "react-grid-system";
import { Header } from "semantic-ui-react";
import { ComparsionChart } from "./ComparsionChart";
import { Stat } from "../../models/Model";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
type Props = {
  randomSearch: Stat;
  hillClimber: Stat;
  simulatedAnnealing: Stat;
  tabuSearch: Stat;
};

const fadeInAnimation = keyframes`${fadeIn}`;
const FadeDiv = styled.div`
  animation: 1s ${fadeInAnimation};
`;

const Comparsion: React.SFC<Props> = (props: Props) => {
  return (
    <>
      <Header
        size="huge"
        textAlign="center"
        content="Comparsion of First Dejong function"
      />
      <FadeDiv>
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
      </FadeDiv>
    </>
  );
};

export { Comparsion };
