import jwt from "jsonwebtoken";
import config from "./config";
const getToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    config.JWT_SECRET,
    {
      expiresIn: "30s",
      
    }
  );
};

const getInfo = (token) => {
  return jwt.decode(token);
};
const isAuth = (token) => {
  const onlyToken = token;
  jwt.verify(onlyToken, config.JWT_SECRET, (err, decode) => {
    console.log('onlyToken', onlyToken)
    if (err) {
      console.log('err', err)
      return "INVALID";
    }

    console.log('decode', decode);
  });
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    return next();
  }
  return res.status(401).send({ msg: "Admin Token is not valid." });
};
export { getToken, isAuth, isAdmin, getInfo };
