import React, { Component } from "react";

import GetRandomEpisode from "./containers/getRandomEpisode";
import Header from "./containers/header";
import Login from "./containers/login";
import { Switch, Route } from "react-router-dom";
import { Hero, HeroHeader, HeroBody } from "bloomer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Hero isColor="white" isFullHeight>
          <HeroHeader style={{ margin: "20px" }}>
            <Header />
          </HeroHeader>
          <HeroBody>
            <Switch>
              <Route exact path="/login" component={Login} />
              <GetRandomEpisode />
            </Switch>
          </HeroBody>
        </Hero>
      </div>
    );
  }
}

export default App;
