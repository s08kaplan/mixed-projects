"use strict";
const router = require("express").Router();


const Room = require("../controllers/room");

router
.route("/")
.get(Room.list)
.post(Room.create);

router
  .route("/:roomId")
  .get(Room.read)
  .put(Room.update)
  .patch(Room.update)
  .delete(Room.delete);

  
module.exports = router;