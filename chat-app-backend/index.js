"use strict";

const http = require("http")
const socketIo = require("socket.io")
const express = require("express");
const app = express();

const server = http.createServer(app)
const io = socketIo(server)

const { socketMiddleware } = require("./src/middlewares/authentication")



const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";


// Connect to DB:
const { dbConnection } = require("./src/configs/dbConnection");
dbConnection();

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

app.all("*", (req, res) => {
  res.status(404).send({
    error: true,
    message: "There is no valid route",
    user: req.user
  });
});

/* ------------------------------------------------------- */

// ! SOCKET
io.on('connection', (socket) => {
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
});


// !------

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
// app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));
server.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
