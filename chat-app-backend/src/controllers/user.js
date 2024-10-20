"use strict";

const { encryptFunc } = require("../helpers/validationHelpers");
const User = require("../models/user");
const Token = require("../models/token");

module.exports = {
  list: async (req, res) => {
    const auth = req.headers?.authorization || null;
    const token = auth ? auth.split(" ")[1] : null;
    if (!token) {
      throw new Error("Please log in first");
    }

    const data = await User.find();

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {
    req.body.isAdmin = false; //* if user sends isAdmin = true it would be accepted as false
    const data = await User.create(req.body);
    // console.log("data in user create:", data);
    // //! AUTO LOGIN:

    const tokenData = await Token.create({
      userId: data._id,
      token: encryptFunc(data._id + Date.now()),
    });

    res.status(201).send({
      error: false,
      token: tokenData.token,
      data,
    });
  },

  read: async (req, res) => {
    // console.log("--------------");
    const userId = req.params.userId;
    const data = await res.getModelList(User, { _id: userId },[
      {path:"sentRequests", select:"_id username email image"}, 
      {path:"receivedRequests", select:"_id username email image"}
    ]);
    // const data = await User.findOne({_id: userId})
    // console.log(data);
    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    if (!req.user?.isAdmin) {
      //! if the user is not Admin, he/she cannot change isActive, isStaff and isAdmin status
      delete req.body.isAdmin;
    }
    const customFilter = !req.user?.isAdmin
      ? { _id: req.user?._id }
      : { _id: req.params.userId };
    const data = await User.updateOne({ ...customFilter }, req.body, {
      runValidators: true,
    });
    // console.log(data);
    res.status(202).send({
      error: false,
      data: await User.findOne({ ...customFilter }),
    });
  },

  delete: async (req, res) => {
    const data = await User.deleteOne({ _id: req.params.userId });
    res.status(data.deletedCount ? 204 : 404).send({
      error: !!!data.deletedCount,
      data,
    });
  },

  sendFriendRequest: async (req, res) => {
    const { recipientId } = req.body;
    const senderId = req.user._id;

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!recipient) {
      res.errorStatusCode = 404;
      throw new Error("Recipient not found!");
    }

    if (recipient.friends.includes(senderId)) {
      res.errorStatusCode = 400;
      throw new Error("You are already friends");
    }

    if (recipient.receivedRequests.includes(senderId)) {
      res.errorStatusCode = 400;
      throw new Error("Friend request already sent");
    }

    sender.sentRequests.push(recipientId);
    recipient.receivedRequests.push(senderId);

    const data = await sender.save();
    await recipient.save();

    res.status(200).send({
      error: false,
      message: "Friend request sent",
      data,
    });
  },

  acceptFriendRequest: async (req, res) => {
    const { senderId } = req.body;
    const recipientId = req.user._id;

    const recipient = await User.findById(recipientId);
    const sender = await User.findById(senderId);

    if (!sender || !recipient) {
      res.errorStatusCode = 404;
      throw new Error("User not found");
    }

    if (!recipient.receivedRequests.includes(senderId)) {
      res.errorStatusCode = 400;
      throw new Error("No friend request from this user");
    }

    recipient.receivedRequests = recipient.receivedRequests.filter(
      (id) => id.toString() !== senderId.toString()
    );
    sender.sentRequests = sender.sentRequests.filter(
      (id) => id.toString() !== recipientId.toString()
    );

    recipient.friends.push(senderId);
    sender.friends.push(recipientId);

    const data = await recipient.save();
    await sender.save();

    res.status(200).send({
      error: false,
      message: " Friend request accepted",
      data,
    });
  },

  declineFriendRequest: async (req, res) => {
    const { senderId } = req.body;
    const recipientId = req.user._id;

    const recipient = await User.findById(recipientId);
    const sender = await User.findById(senderId);

    if (!sender || !recipient) {
      res.errorStatusCode = 404;
      throw new Error("User not found");
    }

    if (!recipient.receivedRequests.includes(senderId)) {
      res.errorStatusCode = 400;
      throw new Error("No friend request from this user");
    }

    recipient.receivedRequests = recipient.receivedRequests.filter(
      (id) => id.toString() !== senderId.toString()
    );
    sender.sentRequests = sender.sentRequests.filter(
      (id) => id.toString() !== recipientId.toString()
    );

    await recipient.save();
    await sender.save();

    res.status(200).send({
      error: false,
      message: "Friend request declined",
    });
  },
};
