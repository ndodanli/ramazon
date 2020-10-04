import express from "express";
import config from "./config";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import chatRoomRoute from "./routes/chatRoom";
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
 db.sequelize.sync();

const models = require("./database/models");
const http = require("http");
const server = app.listen(5000);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
  socket.on("join", async (room) => {
    socket.join(room);
    io.emit("roomJoined", room);
  });
  socket.on("message", async (data) => {
    const { chatRoomName, author, message } = data;
    const chatRoom = await models.ChatRoom.findAll({
      where: { name: chatRoomName },
    });
    const chatRoomId = chatRoom[0].id;
    console.log('chatRoomId', chatRoomId)
    const chatMessage = await models.ChatMessage.create({
      FK_chat_room_id: chatRoomId,
      author: author,
      message: message,
    });
    io.emit("newMessage", chatMessage);
  });
});

//  * Listen on provided port, on all network interfaces.
//  */ server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
/**
 * Normalize a port into a number, string, or false.
 */ function normalizePort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}
/**
 * Event listener for HTTP server "error" event.
 */ function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port; // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}
/**
 * Event listener for HTTP server "listening" event.
 */ function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  console.log("Listening on " + bind);
}


app.set(
  (async function test() {
    const [results, metadata] = await sequelize.query(
      'SELECT  "Students"."id" AS "Students.id", "Students"."name" AS "Students.name", "Students"."no" AS "Students.no" FROM "standard"."Class" AS "Class" INNER JOIN ( standard."ClassStudent" AS "Students->ClassStudent" INNER JOIN "standard"."Student" AS "Students" ON "Students"."id" = "Students->ClassStudent"."student_id") ON "Class"."id" = "Students->ClassStudent"."class_id" WHERE "Class"."name" = \'className2\';'
    );
    console.log("results", results);
    console.log("metadata", metadata);


    // await Object.keys(db.sequelize.models).forEach((currentItem) => {
    //     if(currentItem.toString() !== "Mac" && currentItem.toString() !== "Computer"){
    //       console.log('currentItem', currentItem)
    //       db.sequelize.models[currentItem].schema("standard").sync();
    //     }
    //   });

    // console.log('TESTTTTTTTTTTTTTTTTTTTTTTTTT')
    // const user = await db.sequelize.models['User'].findOne({where:{id:1}, raw:true})
    // console.log('user', user)
    // await Object.keys(db.sequelize.models).forEach((currentItem) => {
    //   console.log("db.models[currentItem]", db.sequelize.models[currentItem]);
    //   db.sequelize.models[currentItem]
    //     .sync({ alter: true });
    // });
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
  db: db.sequelize,
  // checkExpirationInterval: 15 * 60 * 1000, // The interval at which to cleanup expired sessions in milliseconds.
  // expiration: 24 * 60 * 60 * 1000  // The maximum age (in milliseconds) of a valid session.
});
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
app.use("/chatroom", chatRoomRoute);
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
//   else res.status(404).send({ message: "Product Not Found." });
// });
// app.get("/api/products", (req, res) => {
//   res.send(data.products);
// });
process.on("uncaughtException", () => console.log("crashed"));
process.on("SIGTERM", () => console.log("on kill"));
