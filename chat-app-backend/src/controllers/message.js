"use strict";

const Message = require("../models/message");
const Room = require("../models/room");

module.exports = {
  list: async (req, res) => {
    const data = await res.getModelList(Message);
    res.status(200).send({
      error: false,
      data,
      details: await res.getModelListDetails(Message),
    });
  },

  create: async (req, res) => {
    const { sender, receiver, content } = req.body;
    // if (!roomId) {
    //   const room = await Room.create({
    //     name: "DM",
    //     createdBy: sender,
    //     members: [{ userId: sender }, { userId: receiver }],
    //   });
    //   console.log("room info in message create: ", room);
    //   const data = await Message.create({
    //     ...req.body,
    //     roomId: room._id,
    //     messages: [{ content, sender }],
    //   });
    //   res.status(201).send({
    //     error: false,
    //     data,
    //   });
    // } else {
    //   const data = await Message.findOneAndUpdate(
    //     { roomId },
    //     { $push: { messages: { content, sender } } },
    //     { new: true }
    //   );
    //   res.status(201).send({
    //     error: false,
    //     data,
    //   });
    // }
    const room = await Room.findOne({
      members: { $all: [{ userId: sender }, { userId: receiver }] },
    });

    let roomId;

    if (!room) {
    
      const newRoom = await Room.create({
        name: "DM",
        createdBy: sender,
        members: [{ userId: sender }, { userId: receiver }],
      });
      roomId = newRoom._id; 
    } else {
      roomId = room._id; 
    }

  
    const messageData = {
      content,
      sender,
      receiver,
    };

    const data = await Message.findOneAndUpdate(
      { roomId },
      { $push: { messages: messageData } },
      { new: true, upsert: true }
    );

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
