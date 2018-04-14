import * as React from "react";
import { Container, Menu, } from "semantic-ui-react";
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
            </Container>
        </Menu>

        <div style={{ marginTop: "7em", marginLeft: "4em" }}>
            {props.children}
        </div>

    </div>
);

export { Layout };
