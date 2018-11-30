import React, { Component } from "react";

import {
  Container,
  Columns,
  Column,
  Field,
  Label,
  Control,
  Input,
  Button,
  Help
} from "bloomer";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      username: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.Submit = this.Submit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  Submit(e) {
    e.preventDefault();
    this.props.Login(this.state.username, this.state.password);
  }

  render() {
    return (
      <Container>
        <Columns>
          <Column isSize="1/3" isOffset="1/3">
            <Field>
              <Label>Username / Email</Label>
              <Control>
                <Input
                  type="text"
                  placeholder="username or email"
                  id="username"
                  onChange={this.onChange}
                  value={this.state.username}
                />
              </Control>

              {this.state.errors && this.state.errors.username && (
                <Help isColor="danger">{this.state.errors.username[0]}</Help>
              )}
            </Field>
            <Field>
              <Label>Password</Label>
              <Control>
                <Input
                  type="password"
                  placeholder="password"
                  id="password"
                  onChange={this.onChange}
                />
              </Control>

              {this.state.errors && this.state.errors.password && (
                <Help isColor="danger">{this.state.errors.password[0]}</Help>
              )}
            </Field>
            <Field isGrouped className="is-grouped-centered">
              <Control>
                <Button isColor="white" id="submit" onClick={this.Submit}>
                  Login
                </Button>
              </Control>
              <Control>
                <Button isLink href="/register">
                  Register
                </Button>
              </Control>
            </Field>
          </Column>
        </Columns>
      </Container>
    );
  }
}

export default Login;
