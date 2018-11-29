import React, { Component } from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarMenu,
  NavbarEnd,
  NavbarItem,
  NavbarBurger,
  Title
} from "bloomer";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      active: false
    };
    this.onClick = this.onClick.bind(this);
  }
  componentDidMount() {
    const loggedIn = this.props.IsLoggedIn();
    this.setState({ loggedIn: loggedIn ? true : false });
  }
  componentWillReceiveProps(props) {
    this.setState({ ...props });
  }
  onClick() {
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <Navbar>
        <NavbarBrand>
          <NavbarItem>
            <Title isSize={3}>
              <a href="/">Creed Files</a>
            </Title>
          </NavbarItem>
          <NavbarBurger isActive={this.state.active} onClick={this.onClick} />
        </NavbarBrand>
        <NavbarMenu isActive={this.state.active}>
          <NavbarEnd>
            <NavbarItem>
              {console.log(this.state.signedIn)}
              {this.state.signedIn ? (
                <a href="/logout">Logout</a>
              ) : (
                <div>
                  <a href="/login">Login </a> /{" "}
                  <a href="/register"> Register</a>
                </div>
              )}
            </NavbarItem>
          </NavbarEnd>
        </NavbarMenu>
      </Navbar>
    );
  }
}

export default Header;
