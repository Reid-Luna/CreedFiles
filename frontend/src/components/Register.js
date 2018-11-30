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

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
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
  Submit() {
    this.props.Register(
      this.state.username,
      this.state.email,
      this.state.password
    );
  }
  render() {
    return (
      <Container>
        <Columns>
          <Column isSize="1/3" isOffset="1/3">
            <Field>
              <Label>Username</Label>
              <Control>
                <Input
                  type="text"
                  placeholder="username between 2 and 50 characters"
                  id="username"
                  onChange={this.onChange}
                />
              </Control>
              {this.state.errors && this.state.errors.username && (
                <Help isColor="danger">{this.state.errors.username[0]}</Help>
              )}
            </Field>
            <Field>
              <Label>Email</Label>
              <Control>
                <Input
                  type="text"
                  placeholder="email address"
                  id="email"
                  onChange={this.onChange}
                />
                {this.state.errors && this.state.errors.email && (
                  <Help isColor="danger">{this.state.errors.email[0]}</Help>
                )}
              </Control>
            </Field>
            <Field>
              <Label>Password</Label>
              <Control>
                <Input
                  type="password"
                  placeholder="password between 8 and 50 characters"
                  id="password"
                  onChange={this.onChange}
                />
                {this.state.errors && this.state.errors.password && (
                  <Help isColor="danger">{this.state.errors.password[0]}</Help>
                )}
              </Control>
            </Field>
            <Field isGrouped className="is-grouped-centered">
              <Control>
                <Button isColor="white" id="submit" onClick={this.Submit}>
                  Register
                </Button>
              </Control>
              <Control>
                <Button href="/login" isLink>
                  Login
                </Button>
              </Control>
            </Field>
          </Column>
        </Columns>
      </Container>
    );
  }
}

export default Register;
