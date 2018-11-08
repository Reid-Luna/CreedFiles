import React, { Component } from "react";

import {
  Hero,
  HeroBody,
  HeroHeader,
  Container,
  Columns,
  Column,
  Title,
  Button,
  Card,
  CardContent,
  Content
} from "bloomer";

class GRE extends Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  componentDidMount() {
    // this.props.onGetEpisode();
  }

  onClick() {
    this.props.onGetEpisode();
  }
  render() {
    return (
      <Hero isColor="white" isFullHeight>
        <HeroHeader style={{ marginTop: "20px" }}>
          <Container hasTextAlign="centered">
            <Title>TOREP (The Office Random Episode Picker)</Title>
          </Container>
        </HeroHeader>
        <HeroBody>
          <Columns isCentered hasTextAlign="centered">
            <Column>
              <Card>
                <CardContent>
                  <Content>
                    {this.props.episodes.description}
                    <br />
                    <small>
                      season {this.props.episodes.season} episode{" "}
                      {this.props.episodes.number}
                    </small>
                  </Content>
                  <Button onClick={this.onClick}>another one</Button>
                </CardContent>
              </Card>
            </Column>
          </Columns>
        </HeroBody>
      </Hero>
    );
  }
}

export default GRE;
