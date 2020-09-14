import express from "express";
import config from "./config";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { sequelize } from "./database/models/index";
const cors = require("cors");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const db = require("./database/models/index");
let SequelizeStore = require("connect-session-sequelize")(session.Store);
dotenv.config();

db.sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
//  db.sequelize.sync({ alter: true });

app.set(
  (async function test() {
    await Object.keys(db.sequelize.models).forEach((currentItem) => {
      console.log("db.models[currentItem]", db.sequelize.models[currentItem]);
      db.sequelize.models[currentItem]
        .sync({ alter: true });
    });
    console.log("db.models", db.sequelize.models);
    // await db.sequelize.createSchema('TestSchema').then(async () => {
    // });
  })()
);

const sessionSecret = config.SESSION_SECRET;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
const sessionStore = new SequelizeStore({
  db: sequelize,
})
app.use(cookieParser(sessionSecret));
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.post("/api/testPost", async (req, res) => {
  try {
  } catch (error) {
    console.log("error", error);
  }
});
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
process.on("uncaughtException", () => console.log("crashed"));
process.on("SIGTERM", () => console.log("on kill"));
