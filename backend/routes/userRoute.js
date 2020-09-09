import express from "express";
import User from "../models/userModel";
import passPortConfig from "../passportConfig";
import { getToken, isAuth } from "../util";
import Cookies from "js-cookie"
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) res.status(500).send({ message: "Error while logging in!" });
        if (req.body.kmLoggedIn)
          req.session.cookie.maxAge = 24 * 60 * 60 * 1000;
          Cookies.set("testJWT", "dsadsa");
        res.send(req.isAuthenticated());
      });
    }
  })(req, res, next);
});

router.get("/user", (req, res, next) => {
  if (req.user) res.send(req.user);
  else res.send({});
});
router.get("/logout", (req, res) => {
  req.logOut();
  req.session.destroy(function (err) {
    if (err) {
      return next(err);
    }
    // the response should indicate that the user is no longer authenticated
    return res.send(req.isAuthenticated());
  });
});
router.post("/register", async (req, res) => {
  User.findOne(
    { username: req.body.userName, email: req.body.email },
    async (err, doc) => {
      if (err) throw err;
      if (doc) res.send("User already exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.userName,
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        });
        await newUser.save();
        res.send("User Created");
      }
    }
  );
});
router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "AdminName",
      email: "adminmail@gmail.com",
      password: "1234",
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(user);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
