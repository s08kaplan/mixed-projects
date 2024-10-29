"use strict";

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const MessageSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref: "Room",
      index: true,
      required: true,
    },

    messages: [
      {
        sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
        content: { type: String, trim: true, required: true },
        receiver: { type: Schema.Types.ObjectId, ref: "User" },
        isRead: { type: Boolean, default: false },
      },
    ],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

module.exports = model("Message", MessageSchema);
