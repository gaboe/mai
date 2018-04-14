import * as React from "react";
import { Container, Header, Menu, } from "semantic-ui-react";

const Layout = () => (
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
            <Header as="h1">Semantic UI React Fixed Template</Header>
            <p>This is a basic fixed menu template using fixed size containers.</p>
            <p>A text container is used for the main container, which is useful for single column layouts.</p>

        </Container>

    </div>
);

export { Layout };
