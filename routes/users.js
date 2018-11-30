const router = require("express").Router();

const { RegisterValidator, LoginValidator } = require("./validator");
const Users = require("../models/User");

const bcrypt = require("bcrypt");
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
const passport = require("passport");

router.post("/new", async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "body is required" });
  const { username, password, email } = req.body;
  let errors = await new RegisterValidator(
    username,
    password,
    email
  ).validate();
  if (errors) {
    return res.status(400).json({ errors });
  } else {
    const newUser = new Users(req.body);
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then(user => res.status(200).json(user))
          .catch(errors => res.status(400).json({ errors }));
      });
    });
  }
});

router.post("/login", async (req, res) => {
  if (!req.body) return res.status(400).json({ error: "body is required" });
  const { loginName, password } = req.body;
  let validator = new LoginValidator(loginName, password);
  let errors = validator.validate();
  let type = validator.getType(loginName);
  console.log(errors);
  if (errors) {
    return res.status(400).json({ errors });
  } else {
    let query = {};
    query[type] = loginName;
    Users.findOne(query).then(user => {
      if (user) {
        bcrypt.compare(password, user.password).then(correct => {
          if (correct) {
            const {
              id,
              username,
              likedEpisodes,
              dislikedEpisodes,
              totalSorted
            } = user;
            const payload = {
              id,
              username,
              likedEpisodes,
              dislikedEpisodes,
              totalSorted
            };
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.status(200).json({
                  success: true,
                  token: "Bearer " + token
                });
              }
            );
          } else {
            return res
              .status(400)
              .json({ errors: { password: ["password incorrect"] } });
          }
        });
      } else {
        return res
          .status(400)
          .json({ errors: { username: ["user does not exist"] } });
      }
    });
  }
});

router.delete(
  "/remove/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    Users.findByIdAndDelete(id)
      .then(user => {
        if (user) return res.status(200).json(user);
        return res
          .status(400)
          .json({ errors: { username: ["user does not exist"] } });
      })
      .catch(errors => res.status(400).json({ errors }));
  }
);

module.exports = router;
