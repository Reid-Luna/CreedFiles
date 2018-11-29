const Users = require("../../models/User");

class ErrorObject {
  constructor() {
    this.errors = {};
    this.regex = {
      email: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    };
  }
  exists(name) {
    return this.errors[name] ? true : false;
  }
  addSection(name) {
    if (!this.exists(name)) {
      this.errors[name] = [];
    }
  }
  addItem(name, item) {
    this.addSection(name);
    this.errors[name].push(item);
  }
  getErrors() {
    if (Object.keys(this.errors).length > 0) {
      return this.errors;
    } else {
      return false;
    }
  }
}

class RegisterValidator extends ErrorObject {
  constructor(username, password, email) {
    super();
    this.username = username;
    this.password = password;
    this.email = email;
  }
  validUsername(username) {
    return new Promise(async resolve => {
      if (!username) {
        this.addItem("username", "username is required");
        return resolve();
      } else {
        if (username.length < 2 || username.length > 50) {
          this.addItem(
            "username",
            "username must be between 2 and 50 characters"
          );
        }
        Users.findOne({ username }).then(user => {
          if (user) {
            this.addItem("username", "username already exists");
          }
          return resolve();
        });
      }
    });
  }

  validPassword(password) {
    return new Promise(async resolve => {
      if (!password) {
        this.addItem("password", "password is required");
        return resolve();
      } else {
        if (password.length < 8 || password.length > 50) {
          this.addItem(
            "password",
            "password must be between 8 and 50 characters"
          );
        }
        return resolve();
      }
    });
  }

  validEmail(email) {
    return new Promise(async resolve => {
      if (!email) {
        this.addItem("email", "email is required");
      }
      if (email && !this.regex.email.test(email)) {
        this.addItem("email", "email not valid");
      }
      Users.findOne({ email }).then(user => {
        if (user) {
          this.addItem("email", "email already in use");
        }
        return resolve();
      });
    });
  }

  validate() {
    return new Promise(async resolve => {
      await this.validUsername(this.username);
      await this.validPassword(this.password);
      await this.validEmail(this.email);
      return resolve(this.getErrors());
    });
  }
}

const bcrypt = require("bcrypt");

class LoginValidator extends ErrorObject {
  constructor(loginName, password) {
    super();
    this.loginName = loginName;
    this.password = password;
  }

  getType(login) {
    if (this.regex.email.test(login)) {
      return "email";
    } else {
      return "username";
    }
  }

  validUsername(username) {
    if (!username) {
      this.addItem("username", "username is required");
    } else {
      if (username.length < 2 || username.length > 50) {
        this.addItem(
          "username",
          "username must be between 2 and 50 characters"
        );
      }
    }
  }

  validEmail(email) {
    if (!email) {
      this.addItem("email", "email is required");
    }
    if (email && !this.regex.email.test(email)) {
      this.addItem("email", "email not valid");
    }
  }

  validPassword(password) {
    if (!password) {
      this.addItem("password", "password is required");
    } else {
      if (password.length < 8 || password.length > 50) {
        this.addItem(
          "password",
          "password must be between 8 and 50 characters"
        );
      }
    }
  }

  validate() {
    if (this.getType(this.loginName) == "email") {
      this.validEmail(this.loginName);
    } else {
      this.validUsername(this.loginName);
    }
    this.validPassword(this.password);
    return this.getErrors();
  }
}

module.exports.RegisterValidator = RegisterValidator;
module.exports.LoginValidator = LoginValidator;
