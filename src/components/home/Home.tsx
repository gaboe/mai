import * as React from "react";
import { Header, Container, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";

const Home: React.SFC = () => (
  <Container text={true}>
    <Header
      as="h1"
      style={{
        fontSize: "4em",
        fontWeight: "normal",
        marginBottom: 0,
        marginTop: "3em"
      }}
    >
      Made with
      <Icon name="heart" />
    </Header>
    <Header
      as="h2"
      content="By Gabo Ečegi"
      style={{
        fontSize: "1.7em",
        fontWeight: "normal",
        marginTop: "1.5em"
      }}
    />
    <Link to="/random-search-dejong-first">
      <Button primary={true} size="huge">
        Start with Random Search
        <Icon name="arrow right" />
      </Button>
    </Link>
  </Container>
);

export { Home };
