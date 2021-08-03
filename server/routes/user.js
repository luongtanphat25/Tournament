const router = require("express").Router();
const passport = require("passport");

let User = require("../models/user.model");
passport.use(User.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

//CREATE USER
router.route("/signup").post((req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.findOne({ username }, (err, doc) => {
    if (err) throw err;
    if (doc) {
      res.json("User already exists.");
    } else {
      User.register({ username }, password, function (err) {
        if (!err) {
          passport.authenticate("local")(req, res, function () {
            res.json("User added!");
          });
        } else {
          res.status(400).json("Error: " + err);
        }
      });
    }
  });
});

//LOGIN
router.route("/login").post((req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });

  req.login(user, function (err) {
    if (err) {
      return err;
    } else {
      passport.authenticate("local")(req, res, function () {
        res.json(req.user.username);
      });
    }
  });
});

//LOGOUT
router.route("/logout").get((req, res) => {
  req.logout();
});

module.exports = router;
