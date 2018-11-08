import React, { Component } from "react";

import GetRandomEpisode from "./containers/getRandomEpisode";

class App extends Component {
  render() {
    return (
      <div className="App">
        <GetRandomEpisode />
      </div>
    );
  }
}

export default App;
