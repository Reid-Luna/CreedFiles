import React, { Component } from "react";

import {
  Container,
  Columns,
  Column,
  Field,
  Label,
  Control,
  Input,
  Button
} from "bloomer";
import { Redirect } from "react-router";

class RegisterForm extends Component {
  constructor({ click }) {
    super();
    this.onClick = click;
  }
  render() {
    return (
      <Column isSize="1/3" isOffset="1/3">
        <Field>
          <Label>Username</Label>
          <Control>
            <Input
              type="text"
              placeholder="username between 2 and 50 characters"
            />
          </Control>
        </Field>
        <Field>
          <Label>Email</Label>
          <Control>
            <Input type="text" placeholder="email address" />
          </Control>
        </Field>
        <Field>
          <Label>Password</Label>
          <Control>
            <Input
              type="password"
              placeholder="password between 8 and 50 characters"
            />
          </Control>
        </Field>
        <Field isGrouped className="is-grouped-centered">
          <Control>
            <Button isColor="white" id="submit" onClick={this.onClick}>
              Submit
            </Button>
          </Control>
          <Control>
            <Button id="in" onClick={this.onClick} isLink>
              Signin
            </Button>
          </Control>
        </Field>
      </Column>
    );
  }
}

class LoginForm extends Component {
  constructor({ click, change, state }) {
    super();
    this.onClick = click;
    this.onChange = change;
    this.state = state;
  }
  render() {
    return (
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
        </Field>
        <Field>
          <Label>Password</Label>
          <Control>
            <Input type="password" placeholder="password" />
          </Control>
        </Field>
        <Field isGrouped className="is-grouped-centered">
          <Control>
            <Button isColor="white" id="submit" onClick={this.onClick}>
              Submit
            </Button>
          </Control>
          <Control>
            <Button id="up" onClick={this.onClick} isLink>
              Signup
            </Button>
          </Control>
        </Field>
      </Column>
    );
  }
}

class Login extends Component {
  constructor() {
    super();
    this.state = {
      register: false,
      username: "",
      password: ""
    };
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
    this.Submit = this.Submit.bind(this);
  }
  onChange(e) {
    const newState = {};
    newState[e.target.id] = e.target.value;
    this.setState({ ...this.state, ...newState });
  }
  onClick(e) {
    if ((e.target.id = "up")) {
      this.setState({ register: true });
    }
  }
  Submit() {
    this.props.Login(this.state.username, this.state.password);
  }
  componentDidMount() {
    const loggedIn = this.props.IsLoggedIn();
    this.setState({ loggedIn: loggedIn ? true : false });
  }
  render() {
    return (
      <Container>
        <Columns>
          {this.state.register && <Redirect to="/register" />}
          {this.state.loggedIn && <Redirect to="/" />}
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
            </Field>
            <Field isGrouped className="is-grouped-centered">
              <Control>
                <Button isColor="white" id="submit" onClick={this.Submit}>
                  Submit
                </Button>
              </Control>
              <Control>
                <Button id="up" onClick={this.onClick} isLink>
                  Signup
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
