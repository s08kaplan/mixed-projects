"use strict";

const Message = require("../models/message");
const Room = require("../models/room");

module.exports = {
  list: async (req, res) => {
    const data = await getModelList.find(Message);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(Message),
    });
  },

  create: async (req, res) => {
    const data = await Message.create(req.body);
    res.status(201).send({
      error: false,
      data,
    });
  },

  read: async (req, res) => {
    const data = await Message.findOne({ _id: req.body.roomId });
    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const data = await Message.updateOne({ _id: req.body.roomId }, req.body);

    res.status(202).send({
      error: false,
      data: await Message.findOne({ _id: req.body.roomId }),
    });
  },

  delete: async (req, res) => {
    const data = await Message.deleteOne({ _id: req.body.roomId });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !!!data.deletedCount,
      message: data.deletedCount
        ? "Message deleted successfully"
        : "Message not deleted ",
    });
  },
};
