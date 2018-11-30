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
      active: false,
      authenticated: false
    };
    this.onClick = this.onClick.bind(this);
    this.Logout = this.Logout.bind(this);
    this.ChangePage = this.ChangePage.bind(this);
  }
  ChangePage(e) {
    this.props.history.push(e.target.href);
  }
  Logout() {
    this.props.Logout();
  }
  componentDidMount() {
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
    this.setState({ active: !this.state.active });
  }
  render() {
    return (
      <Navbar>
        <NavbarBrand>
          <NavbarItem>
            <Title isSize={3}>
              <a href="/" onClick={this.ChangePage}>
                Creed Files
              </a>
            </Title>
          </NavbarItem>
          <NavbarBurger isActive={this.state.active} onClick={this.onClick} />
        </NavbarBrand>
        <NavbarMenu isActive={this.state.active}>
          <NavbarEnd>
            <NavbarItem>
              {this.state.authenticated ? (
                <a onClick={this.Logout}>Logout</a>
              ) : (
                <div>
                  <a href="/login" onClick={this.ChangePage}>
                    Login{" "}
                  </a>{" "}
                  /{" "}
                  <a href="/register" onClick={this.ChangePage}>
                    {" "}
                    Register
                  </a>
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
