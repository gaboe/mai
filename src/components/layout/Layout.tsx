import * as React from "react";
import { Container, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
type Props = { children: React.ReactNode };

const Layout: React.SFC<Props> = (props: Props) => (
  <div>
    <Menu fixed="top" inverted={true}>
      <Container>
        <Link to="/">
          <Menu.Item header={true}>MAI</Menu.Item>
        </Link>
        <Dropdown
          closeOnBlur={true}
          closeOnChange={true}
          item={true}
          simple={true}
          text="Random Search"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/random-search-dejong-first"
              style={{ color: "black" }}
            >
              De Jong First Function
            </Dropdown.Item>

            <Dropdown.Item
              as={Link}
              to="/random-search-dejong-second"
              style={{ color: "black" }}
            >
              De Jong Second Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/random-search-schwefel"
              style={{ color: "black" }}
            >
              Schwefel Function
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          closeOnBlur={true}
          closeOnChange={true}
          item={true}
          simple={true}
          text="Hill Climber"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/hill-climber-dejong-first"
              style={{ color: "black" }}
            >
              De Jong First Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/hill-climber-dejong-second"
              style={{ color: "black" }}
            >
              De Jong Second Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/hill-climber-schwefel"
              style={{ color: "black" }}
            >
              Schwefel Function
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          closeOnBlur={true}
          closeOnChange={true}
          item={true}
          simple={true}
          text="Simulated Annealing"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/sa-dejong-first"
              style={{ color: "black" }}
            >
              De Jong First Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/sa-dejong-second"
              style={{ color: "black" }}
            >
              De Jong Second Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/sa-schwefel"
              style={{ color: "black" }}
            >
              Schwefel Function
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          closeOnBlur={true}
          closeOnChange={true}
          item={true}
          simple={true}
          text="Tabu"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/tabu-dejong-first"
              style={{ color: "black" }}
            >
              De Jong First Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/tabu-dejong-second"
              style={{ color: "black" }}
            >
              De Jong Second Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/tabu-schwefel"
              style={{ color: "black" }}
            >
              Schwefel Function
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          closeOnBlur={true}
          closeOnChange={true}
          item={true}
          simple={true}
          text="Comparsion"
        >
          <Dropdown.Menu>
            <Dropdown.Item
              as={Link}
              to="/comparsion-dejong-first"
              style={{ color: "black" }}
            >
              De Jong First Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/comparsion-dejong-second"
              style={{ color: "black" }}
            >
              De Jong Second Function
            </Dropdown.Item>
            <Dropdown.Item
              as={Link}
              to="/comparsion-schwefel"
              style={{ color: "black" }}
            >
              Schwefel Function
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    </Menu>

    <div style={{ marginTop: "7em", marginLeft: "4em" }}>{props.children}</div>
  </div>
);

export { Layout };
