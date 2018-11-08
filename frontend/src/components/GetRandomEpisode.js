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
    this.state = {
      season: "",
      number: "",
      description: "",
      title: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onComponentDidMount = this.onComponentDidMount.bind(this);
  }

  onComponentDidMount() {
    const { season, number, title, description } = this.props.episodes;
    this.setState({ season, number, title, description });
  }

  onClick() {
    this.props.onGetEpisode();
    const { season, number, title, description } = this.props.episodes;
    this.setState({
      season,
      number,
      title,
      description
    });
    console.log(this.state);
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
                    {this.state.description}
                    <br />
                    <small>
                      season {this.state.season} episode {this.state.number}
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
