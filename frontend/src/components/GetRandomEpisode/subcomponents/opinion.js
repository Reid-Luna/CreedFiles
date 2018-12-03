import React, { Component } from "react";

import { Column, Button, Icon } from "bloomer";

class Opinion extends Component {
  constructor(props) {
    super();
    this.state = {
      isLiked: false
    };
    if (props.isLike !== undefined) {
      this.isLike = true;
      this.isDislike = false;
    }
    if (props.isDislike !== undefined) {
      this.isDislike = true;
      this.isLike = false;
    }
    if (props.isLiked !== null && props.isLiked !== undefined) {
      this.state.isLiked = props.isLiked ? true : false;
    }
    this.onClick = props.decide;
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLiked !== null && nextProps.isLiked !== undefined) {
      this.setState({ isLiked: nextProps.isLiked });
    }
  }
  render() {
    return (
      <Column>
        <Button
          id={this.isLike ? "creed" : "deangelo"}
          style={{ borderColor: "#fff" }}
          onClick={this.onClick}
          title={`${this.isLike ? "" : "dis"}like this episode`}
        >
          {this.isLike ? (
            <Icon
              id="creed"
              className="far fa-heart"
              style={{
                color: this.state.isLiked === true ? "#FE9FBE" : null
              }}
            />
          ) : (
            <Icon
              className="far fa-times-circle"
              style={{
                color: this.state.isLiked === false ? "#FF2400" : null
              }}
            />
          )}
        </Button>
      </Column>
    );
  }
}

export default Opinion;
