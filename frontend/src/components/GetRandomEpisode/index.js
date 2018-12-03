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
  Image
} from "bloomer";

import {
  Loading,
  Progress,
  Opinion,
  TitleComponent,
  Description
} from "./subcomponents";

class GRE extends Component {
  constructor() {
    super();
    this.componentDidMount = this.componentDidMount.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onDecide = this.onDecide.bind(this);
    this.expand = this.expand.bind(this);
    this.colors = {
      creed: "#FE9FBE",
      deangelo: "#FF2400"
    };
    this.state = {
      liked: null,
      authenticated: false,
      loaded: false,
      titleExpand: false,
      descExpand: false
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated !== null) {
      this.setState({ authenticated: this.props.auth.isAuthenticated });
    }
    if (this.state.authenticated) {
      this.props.GetRandomForUser(this.props.auth.user);
    } else {
      this.props.GetEpisode();
    }
    if (this.props.episode.length !== 0) {
      this.setState({ loaded: true });
    }
    this.props.GetTotal();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated !== null) {
      this.setState({ authenticated: nextProps.auth.isAuthenticated });
    }
    if (nextProps.episode.length !== 0) {
      this.setState({ loaded: true, titleExpand: false, descExpand: false });
    }
    if (this.state.authenticated) {
      if (
        this.props.auth.user.likedEpisodes.indexOf(nextProps.episode.id) > -1
      ) {
        this.setState({ liked: true });
      }
    }
  }

  onClick() {
    this.props.ClearState();
    if (this.state.liked !== null && this.state.authenticated) {
      if (this.state.liked) {
        this.props.LikeEpisode(this.props.episode.id);
      } else {
        this.props.DislikeEpisode(this.props.episode.id);
      }
    }
    if (this.state.authenticated) {
      this.props.GetRandomForUser(this.props.auth.user);
    } else {
      this.props.GetEpisode();
    }
    this.setState({
      titleExpand: false,
      descExpand: false,
      liked: null,
      loaded: false
    });
  }

  onDecide(e) {
    this.setState({
      liked: e.currentTarget.id === "creed" ? true : false
    });
  }

  expand(e) {
    if (e.target.id === "desc") {
      this.setState({ descExpand: !this.state.descExpand });
    } else {
      this.setState({ titleExpand: !this.state.titleExpand });
    }
  }

  render() {
    return (
      <Container>
        <Columns isCentered hasTextAlign="centered">
          {this.state.loaded ? (
            <Column isSize="1/3">
              <Card>
                <CardImage>
                  <Image src={this.props.episode.image} isRatio="2:1" />
                </CardImage>
                <CardContent>
                  <Content>
                    <TitleComponent>{this.props.episode.title}</TitleComponent>
                    <Title isSize={5}>
                      Season {this.props.episode.season} Episode{" "}
                      {this.props.episode.number}
                    </Title>
                    <Description>{this.props.episode.description}</Description>
                    <br />
                  </Content>
                  <Columns className="is-mobile">
                    {this.state.authenticated && (
                      <Opinion
                        isLike
                        decide={this.onDecide}
                        isLiked={this.state.liked}
                      />
                    )}
                    <Column>
                      <Button onClick={this.onClick}>another one</Button>
                    </Column>
                    {this.state.authenticated && (
                      <Opinion isDislike decide={this.onDecide} />
                    )}
                  </Columns>
                </CardContent>
              </Card>
              {this.state.authenticated && (
                <Progress
                  sorted={this.props.user.totalSorted}
                  total={this.props.total}
                />
              )}
            </Column>
          ) : (
            <Loading />
          )}
        </Columns>
      </Container>
    );
  }
}

export default GRE;
