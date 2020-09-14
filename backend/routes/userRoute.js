import express from "express";
import User from "../models/userModel";
import passPortConfig from "../passportConfig";
import { getToken, isAuth } from "../util";
import Cookies from "js-cookie";
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("../database/models/index");

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    console.log('user', user)
    if (err) throw err;
    if (!user) res.send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) res.status(500).send({ message: "Error while logging in!" });
        if (req.body.kmLoggedIn)
          req.session.cookie.maxAge = 10 * 1000;
        // Cookies.set("testJWT", "dsadsa");
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
  console.log("REGISTER POST");
  const user = await db.sequelize.models["User"]
    .findOne({
      where: { Username: req.body.userName },
    })
    .catch(function (err) {
      throw err;
    });
  if (user) res.send("User already exists");
  if (!user) {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await db.sequelize.models["User"].create({
      Username: req.body.userName,
      Name: req.body.name,
      Email: req.body.email,
      Password: hashedPassword,
    });
    res.send("User Created");
  }
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
