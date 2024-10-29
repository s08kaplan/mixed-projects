"use strict";
const router = require("express").Router();

const Message = require("../controllers/message");

router
.route("/")
.get(Message.list)
.post(Message.create);

router
  .route("/:messageId")
  .get(Message.read)
  .put(Message.update)
  .patch(Message.update)
  .delete(Message.delete);

   
module.exports = router;