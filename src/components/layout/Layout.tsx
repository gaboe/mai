import * as React from "react";
import { Container, Menu, } from "semantic-ui-react";

type Props = { children: React.ReactNode };

const Layout: React.SFC<Props> = (props: Props) => (
    <div>
        <Menu fixed="top" inverted={true}>
            <Container>
                <Menu.Item as="a" header={true}>
                    MAI
        </Menu.Item>
                <Menu.Item as="a">Home</Menu.Item>
            </Container>
        </Menu>

        <Container text={true} style={{ marginTop: "7em" }}>
            {props.children}
        </Container>

    </div>
);

export { Layout };
