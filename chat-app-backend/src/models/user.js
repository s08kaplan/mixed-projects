"use strict";

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");
// User Model:

const {
  passwordEncrypt,
  emailValidate,
} = require("../helpers/validationHelpers");

// User Schema
const UserSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      trim: true,
      unique: true,
      index: true,
      required: true,
      set: (email) => emailValidate(email),
    },

    password: {
      type: String,
      trim: true,
      required: true,
      set: (password) => passwordEncrypt(password),
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    image: {
      type: String,
      trim: true,
    }, 

    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    sentRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    
    receivedRequests: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    collection: "users",
    timestamps: true,
  }
);

module.exports = model("User", UserSchema);
