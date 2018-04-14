import * as React from "react";
import { Container, Menu, Dropdown } from "semantic-ui-react";
import { Link } from "react-router-dom";
type Props = { children: React.ReactNode };

const Layout: React.SFC<Props> = (props: Props) => (
    <div>
        <Menu fixed="top" inverted={true}>
            <Container>
                <Menu.Item as="a" header={true}>
                    MAI
                </Menu.Item>
                <Menu.Item as="a">
                    <Link to="/">
                        Random Search
                    </Link>
                </Menu.Item>
                <Dropdown item={true} simple={true} text="Random Search">
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to="/" style={{ color: "black" }}>
                                De Jong First Function
                            </Link>

                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/random-search-dejong-second" style={{ color: "black" }}>
                                De Jong Second Function
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/random-search-schwefel" style={{ color: "black" }}>
                                Schwefel Function
                            </Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Container>
        </Menu>

        <div style={{ marginTop: "7em", marginLeft: "4em" }}>
            {props.children}
        </div>

    </div>
);

export { Layout };
