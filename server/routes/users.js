var express = require("express");
var router = express.Router();

const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", (req, res, next) => {
  res.send("respond with a resource");
});

router.post("/signup", (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "please fill out both fields" });
  }

  User.findOne({ username: req.body.username })
    .then((foundUser) => {
      if (foundUser) {
        return res.status(400).json({ message: "Username is already taken" });
      } else {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hashedPass = bcrypt.hashSync(req.body.password, salt);

        User.create({
          username: req.body.username,
          password: hashedPass,
          email: req.body.email
        })
          .then((createdUser) => {
            const payload = { _id: createdUser._id };

            const token = jwt.sign(payload, process.env.SECRET, {
              algorithm: "HS256",
              expiresIn: "24hr",
            });
            res.json({ token: token, id: createdUser._id });
          })
          .catch((err) => {
            res.status(400).json(err.message);
          });
      }
    })
    .catch((err) => {
      res.status(400).json(err.message);
    });
});

router.post("/login", (req, res, next) => {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ message: "please fill out both fields" });
  }

  User.findOne({ username: req.body.username })
    .then((foundUser) => {
      if (!foundUser) {
        return res.status(401).json({ message: "Username or Password is incorrect!!!" });
      }

      const doesMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );

      if (doesMatch) {
        const payload = { _id: foundUser._id, username: foundUser.username };

        const token = jwt.sign(payload, process.env.SECRET, {
          algorithm: "HS256",
          expiresIn: "24hr",
        });
        res.json({ token: token, id: foundUser._id, message: `Welcome ${foundUser.username}` });
      } else {
        return res.status(402).json({ message: "Username or Password is incorrect" });
      }
    })
    .catch((err) => {
      res.json(err.message);
    });
});

router.get("/login-test", isLoggedIn, (req, res) => {
  return res.status(200).json(req.user);
});

router.post("/delete-user", isLoggedIn, (req, res, next) => {
  User.findById(req.user._id)
    .then((foundUser) => {
      const doesMatch = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (doesMatch) {
        foundUser.delete();
        res.json({ message: "success" });
      } else {
        res.status(401).json({ message: "password doesn't match" });
      }
    })
    .catch((error) => {
      res.status(400).json(error.message);
    });
});

module.exports = router;
