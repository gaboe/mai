import * as React from "react";
import { Header, List, ListItem } from "semantic-ui-react";
import { randomInt, random } from "mathjs";
import { Row } from "react-grid-system";

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
  console.log(winner.costValue);
  return winner;
};

const getDejongInput = () => {
  const input: RoundWinner[] = Array
    .from({ length: 30 })
    .map((u, i) => i)
    .map(e => {
      const winner: RoundWinner = {
        roundID: e,
        input: getDejongRoundWinner(),
      };
      return winner;
    })
    .sort((a, b) => (a.input.costValue - b.input.costValue));

  return input;
};

const RandomSearch: React.SFC = () =>
  (
    <>
      <Row>
        <Header as="h1">De Jong First Function</Header>
      </Row>
      <Row>
        <List>
          {getDejongInput()
            .map(x => {
              return (
                <ListItem key={x.roundID}>
                  {`${x.roundID}. round: ${x.input.iterations}, x(i): 
                ${x.input.xi}, costValue: ${x.input.costValue.toFixed(10)}`}
                </ListItem>
              );
            })}
        </List>
      </Row>

    </>
  );

export { RandomSearch };