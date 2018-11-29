const router = require("express").Router();

const passport = require("passport");

router.get(
  "/verify",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    return res.status(200).json({ loggedIn: true });
  }
);

module.exports = router;
