import React, { Component } from "react";

import { Column, Image } from "bloomer";
import icon from "./icon.svg";

class Loading extends Component {
  render() {
    return (
      <Column isSize="1/3">
        <Image src={icon} isRatio="1:1" />
      </Column>
    );
  }
}

export default Loading;
