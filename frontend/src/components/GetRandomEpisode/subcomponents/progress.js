import React, { Component } from "react";

import { Progress } from "bloomer";

class ProgressBar extends Component {
  constructor({ sorted, total }) {
    super();
    this.sorted = sorted;
    this.total = total;
  }
  render() {
    return (
      <Progress
        isSize="small"
        value={this.sorted}
        max={this.total}
        style={{ marginTop: "10px" }}
      />
    );
  }
}

export default ProgressBar;
