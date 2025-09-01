"use strict";

const http = require("http")
const socketIo = require("socket.io")
const express = require("express");
const app = express();
const process = require("node:process")

const server = http.createServer(app)
const io = socketIo(server)

const { socketMiddleware } = require("./src/middlewares/authentication")

process.loadEnvFile(".env")

const PORT = process.env?.PORT || 8002;
const HOST = process.env?.HOST || "127.0.0.1";


// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

const { redisConnection, getRedis, getRedisSub } = require("./src/configs/redis");
const { rabbitmqConnection, getChannel } = require("./src/configs/rabbitmq");


/* ------------------------------------------------------- */
// Middlewares:

// Accept JSON:
app.use(express.json());

app.use(express.urlencoded({extended: true}))

app.use(require("cors")())

app.use('/uploads', express.static('./uploads'))

// Query Handler:
app.use(require("./src/middlewares/queryHandler"));



// Auhentication:
app.use(require("./src/middlewares/authentication")); 
io.use(socketMiddleware)

// Routes:



// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Chat API",
    user: req.user
  });
});

// routes/index.js:
app.use("/", require("./src/routes/"));

/* app.all("*", (req, res) => {
  res.status(404).send({
    error: true,
    message: "There is no valid route",
    user: req.user
  });
}); */

/* ------------------------------------------------------- */

// ! SOCKET
/* io.on('connection', (socket) => {
  console.log(`User connected: ${socket.userId}`);

  // Join a room (group chat) or DM
  socket.on('join_room', (roomId) => {
    socket.join(roomId);
  });

  // Send message to a room
  socket.on('send_message', async ({ roomId, receiverId, content }) => {
    const messageData = {
      sender: socket.userId,
      content,
    };

    if (roomId) {
      // Group chat
      messageData.room = roomId;
      await new Message(messageData).save();
      io.to(roomId).emit('receive_message', messageData);
    } else if (receiverId) {
      // Direct message
      messageData.receiver = receiverId;
      await new Message(messageData).save();

      // Create a unique room for the DM
      const dmRoom = [socket.userId, receiverId].sort().join('_');
      io.to(dmRoom).emit('receive_message', messageData);
    }
  });

  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.userId}`);
  });
}); */


(async () => {
  await redisConnection();
  await rabbitmqConnection();

  const redisClient = getRedis();
  const redisSubscriber = getRedisSub();
  const channel = getChannel();

  io.on("connection", (socket) => {
    console.log(`⚡ User connected: ${socket.id}`);

    // Join room
    socket.on("join_room", (roomId) => {
      socket.join(roomId);
    });

    // Send message
    socket.on("send_message", async ({ roomId, receiverId, content }) => {
      const message = {
        sender: socket.userId,
        content,
        roomId,
        receiverId,
        createdAt: new Date(),
      };

      // Publish live event via Redis
      await redisClient.publish("chat", JSON.stringify(message));

      // Store in RabbitMQ queue for reliability
      channel.sendToQueue("messages", Buffer.from(JSON.stringify(message)));
    });

    socket.on("disconnect", () => {
      console.log(`❌ User disconnected: ${socket.id}`);
    });
  });

  // Redis subscriber listens for all messages and broadcasts
  await redisSubscriber.subscribe("chat", (msg) => {
    const message = JSON.parse(msg);
    if (message.roomId) {
      io.to(message.roomId).emit("receive_message", message);
    } else if (message.receiverId) {
      const dmRoom = [message.sender, message.receiverId].sort().join("_");
      io.to(dmRoom).emit("receive_message", message);
    }
  });
})();
// !------

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
// app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
server.listen(PORT, () => console.log(`${process.env.HOST}:` + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
