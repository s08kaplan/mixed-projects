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

router
  .post("/:roomId/invite-admin", Room.inviteAdmin)  

  router
  .post("/:roomId/accept-admin", Room.acceptAdmin);
  
  
module.exports = router;