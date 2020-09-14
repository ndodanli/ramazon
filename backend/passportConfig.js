import User from "./models/userModel";
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;
const db = require("./database/models/index");

module.exports = function (passport) {
  passport.use(
    new localStrategy({
      usernameField: 'Username',
      passwordField: 'Password',
    },(Username, Password, cb) => {
      const user = db.sequelize.models["User"]
        .findOne({ where: { Username: Username }, raw: true })
        .then((user) => {
          console.log("res", user);
          if (!user) return cb(null, false);
          bcrypt.compare(Password, user.Password, (err, result) => {
            if (err) throw err;
            if (result === true) {
              return cb(null, user);
            } else {
              return cb(null, false);
            }
          });
        })
        .catch((err) => cb(err, null));
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    db.sequelize.models["User"]
      .findOne({ where: { id: id }, raw: true })
      .then((res) => cb(null, res))
      .catch((err) => cb(err, null));
  });
};
