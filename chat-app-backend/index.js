"use strict";

const express = require("express");
const app = express();



// envVariables to process.env:
require("dotenv").config();
const PORT = process.env?.PORT || 8000;
const HOST = process.env?.HOST || "127.0.0.1";

// asyncErrors to errorHandler:
require("express-async-errors");

/* ------------------------------------------------------- */
// Configrations:

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

// Routes:

// routes/index.js:
app.use("/", require("./src/routes/"));

// HomePath:
app.all("/", (req, res) => {
  res.send({
    error: false,
    message: "Welcome to Chat API",
    user: req.user
  });
});
app.all("*", (req, res) => {
  res.status(404).send({
    error: true,
    message: "There is no valid route",
    user: req.user
  });
});

/* ------------------------------------------------------- */

// errorHandler:
app.use(require("./src/middlewares/errorHandler"));

// RUN SERVER:
app.listen(PORT, () => console.log("http://127.0.0.1:" + PORT));

/* ------------------------------------------------------- */
// Syncronization (must be in commentLine):
// require('./src/helpers/sync')() // !!! It clear database.
