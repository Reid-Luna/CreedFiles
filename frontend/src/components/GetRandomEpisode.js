import React, { Component } from "react";

import {
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
    this.onDecide = this.onDecide.bind(this);
    this.state = {
      clicked: {
        creed: "#FE9FBE",
        deangelo: "#FF2400"
      },
      aliases: {
        creed: "loveIcon",
        deangelo: "hateIcon"
      },
      liked: null,
      authenticated: false
    };
  }

  componentDidMount() {
    this.props.GetEpisode();
    this.props.GetTotal();
    if (this.props.auth.isAuthenticated !== null) {
      this.setState({ authenticated: this.props.auth.isAuthenticated });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated !== null) {
      this.setState({ authenticated: nextProps.auth.isAuthenticated });
    }
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
                    Season {this.props.episode.season} Episode{" "}
                    {this.props.episode.number}
                  </Title>
                  {this.props.episode.description}
                  <br />
                </Content>
                <Columns className="is-mobile">
                  {this.state.authenticated && (
                    <Column>
                      <Button
                        style={{ borderColor: "#fff" }}
                        id="creed"
                        onClick={this.onDecide}
                        title="like this episode"
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
                  )}

                  <Column>
                    <Button onClick={this.onClick}>another one</Button>
                  </Column>
                  {this.state.authenticated && (
                    <Column>
                      <Button
                        style={{ borderColor: "#fff" }}
                        id="deangelo"
                        onClick={this.onDecide}
                        title="dislike this episode"
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
                  )}
                </Columns>
              </CardContent>
            </Card>
            {this.state.authenticated && (
              <Progress
                isSize="small"
                value={15}
                max={this.props.total}
                style={{ marginTop: "10px" }}
              />
            )}
          </Column>
        </Columns>
      </Container>
    );
  }
}

export default GRE;
