import React, { Component } from "react";

import { Title } from "bloomer";

class TitleComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.children,
      length: this.props.children.split("").length,
      expand: false
    };
    this.Expand = this.Expand.bind(this);
  }
  Expand(e) {
    this.setState({ expand: !this.state.expand });
  }
  render() {
    if (this.state.length <= 16) {
      return <Title isSize={3}>{this.state.title}</Title>;
    } else if (!this.state.expand && this.state.length > 16) {
      return (
        <Title isSize={3}>
          {this.state.title.substring(0, 11)}
          <a onClick={this.Expand}>[...]</a>
        </Title>
      );
    } else if (this.state.expand && this.state.length > 16) {
      return (
        <Title isSize={3}>
          {this.state.title}
          <a onClick={this.Expand}>[...]</a>
        </Title>
      );
    }
  }
}

export default TitleComp;
