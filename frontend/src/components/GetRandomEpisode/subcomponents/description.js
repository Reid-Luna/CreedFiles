import React, { Component } from "react";

import { Title } from "bloomer";

class Description extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.children,
      length: this.props.children.split("").length,
      expand: false
    };
    this.Expand = this.Expand.bind(this);
  }
  Expand(e) {
    this.setState({ expand: !this.state.expand });
  }
  render() {
    if (this.state.length <= 100) {
      return (
        <p>
          {this.state.description}
          <a style={{ color: "#fff" }}>
            {" "}
            {"#".repeat(100 - this.state.length)}
          </a>
        </p>
      );
    } else if (!this.state.expand && this.state.length > 100) {
      return (
        <p>
          {this.state.description.substring(0, 245)}
          <a onClick={this.Expand}>[...]</a>
        </p>
      );
    } else if (this.state.expand && this.state.length > 100) {
      return (
        <p>
          {this.state.description}
          <a onClick={this.Expand}>[...]</a>
        </p>
      );
    }
  }
}

export default Description;
