import express from "express";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const MongoStore = require('connect-mongo')(session);

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
const sessionSecret = config.SESSION_SECRET;
 mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const sessionStore = new MongoStore({ mongooseConnection: mongoose.connection, collection: 'sessions' })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(cookieParser(sessionSecret));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store:sessionStore,
    cookie:{
      maxAge:  60 * 60 * 1000
    }
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.get("/user", (req, res) => {
  res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});
// app.get("/api/products/:id", (req, res) => {
//   const productId = req.params.id;
//   const product = data.products.find((x) => x._id === productId);
//   if (product) res.send(product);
//   else res.status(404).Wsend({ message: "Product Not Found." });
// });
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });

app.listen(5000, () => console.log("Server started at http://localhost:5000"));
