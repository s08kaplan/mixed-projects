"use strict";

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const MessageSchema = new Schema(
  {
    roomId: {
      type: Schema.Types.ObjectId,
      ref:"Room",
      index: true,
      required: true,
    },

    messages: [
      {
        userId: {type:Schema.Types.ObjectId, ref:"Room", required: true},
        message: { type: String, trim: true },
      },
    ],
  },
  {
    collection: "messages",
    timestamps: true,
  }
);

module.exports = model("Message", MessageSchema);
