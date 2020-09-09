import User from "./models/userModel";
const bcrypt = require("bcryptjs");
const localStrategy = require("passport-local").Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy((username, password, cb) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) throw err;
        if (!user) return cb(null, false);
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result === true) {
            return cb(null, user); 
          } else {
            return cb(null, false);
          }
        });
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  passport.deserializeUser((id, cb) => {
    User.findOne({ _id: id }, (err, user) => {
      //query database cause user's information can be change while session
      cb(err, user);
    });
  });
};
