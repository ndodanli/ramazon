import express from "express";
import User from "../models/userModel";
import passPortConfig from "../passportConfig";
import { getToken, isAuth } from "../util";
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        if (user.email !== "dsa") { 
          console.log('test')
          req.session.cookie.maxAge = 5000;
        }

        res.send("Successfully Authenticated");
        console.log(req.user);
      });
    }
  })(req, res, next);
});

router.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
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
