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
  Content,
  CardImage,
  Image,
  Icon,
  Progress
} from "bloomer";

class GRE extends Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onHover = this.onHover.bind(this);
    this.onDecide = this.onDecide.bind(this);
    this.state = {
      hover: {
        signedIn: {
          creed: "like this episode",
          deangelo: "dislike this episode (will not be shown again)"
        },
        signedOut: "sign in to use this feature"
      },
      clicked: {
        creed: "#FE9FBE",
        deangelo: "#FF2400"
      },
      aliases: {
        creed: "loveIcon",
        deangelo: "hateIcon"
      },
      liked: null
    };
  }

  componentDidMount() {
    this.props.GetEpisode();
    this.props.GetTotal();
    this.setState({ ...this.state, signedIn: true });
  }

  onClick() {
    if (this.state.liked !== null) {
      console.log(
        `remembering to ${this.state.liked ? "like" : "hate"} this episode`
      );
    }
    this.setState({ ...this.state, liked: null });
    this.props.GetEpisode();
  }

  onHover(e) {
    const action = e.target.id;
    const title = this.state.signedIn
      ? this.state.hover.signedIn[action]
      : this.state.hover.signedOut;
    e.target.title = title;
  }

  onDecide(e) {
    if (!this.state.signedIn)
      return window.open("/login", "Login to CreedFiles");
    this.setState({
      ...this.state,
      liked: e.currentTarget.id === "creed" ? true : false
    });
  }

  render() {
    return (
      <Hero isColor="white" isFullHeight>
        <HeroHeader style={{ marginTop: "20px" }}>
          <Container hasTextAlign="centered">
            <Title>Creed Files</Title>
          </Container>
        </HeroHeader>
        <HeroBody>
          <Container>
            <Columns isCentered hasTextAlign="centered">
              <Column isSize="1/3">
                <Card>
                  <CardImage>
                    <Image src={this.props.episode.image} isRatio="2:1" />
                  </CardImage>
                  <CardContent>
                    <Content>
                      <Title isSize={3}>{this.props.episode.title}</Title>
                      <Title isSize={5}>
                        season {this.props.episode.season} episode{" "}
                        {this.props.episode.number}
                      </Title>
                      {this.props.episode.description}
                      <br />
                    </Content>
                    <Columns>
                      <Column isSize="1/3">
                        <Button
                          style={{ borderColor: "#fff" }}
                          onMouseOver={this.onHover}
                          id="creed"
                          onClick={this.onDecide}
                        >
                          <Icon
                            className="far fa-heart"
                            id="loveIcon"
                            style={{
                              color:
                                this.state.liked === true
                                  ? this.state.clicked.creed
                                  : null
                            }}
                          />
                        </Button>
                      </Column>
                      <Column isSize="1/3">
                        <Button onClick={this.onClick}>another one</Button>
                      </Column>
                      <Column isSize="1/3">
                        <Button
                          style={{ borderColor: "#fff" }}
                          onMouseOver={this.onHover}
                          id="deangelo"
                          onClick={this.onDecide}
                        >
                          <Icon
                            className="far fa-times-circle"
                            id="hateIcon"
                            style={{
                              color:
                                this.state.liked === false
                                  ? this.state.clicked.deangelo
                                  : null
                            }}
                          />
                        </Button>
                      </Column>
                    </Columns>
                  </CardContent>
                </Card>
                <Progress
                  isSize="small"
                  value={15}
                  max={this.props.total}
                  style={{ marginTop: "10px" }}
                />
              </Column>
            </Columns>
          </Container>
        </HeroBody>
      </Hero>
    );
  }
}

export default GRE;
