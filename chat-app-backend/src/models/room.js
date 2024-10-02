"use strict";

const {
  mongoose: { Schema, model },
} = require("../configs/dbConnection");

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    image:{
      type: String,
      trim: true
    },

    admins: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    adminInvitations: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    users: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
          index: true,
        },
      },
    ],
  },
  {
    collection: "rooms",
    timestamps: true,
  }
);

RoomSchema.methods.isAdminCheck = function (userId) {
  return (
    this.createdBy.toString() === userId.toString() ||
    this.admins.some((adminId) => adminId.toString() === userId.toString())
  );
};

RoomSchema.methods.inviteAdmin = async function (inviterId, newAdminId) {
  if (!this.isAdminCheck(inviterId)) {
    throw new Error('Only admins can invite other admins.');
  }
  if (this.admins.includes(newAdminId) || this.adminInvitations.includes(newAdminId)) {
    throw new Error('User is already an admin or has a pending invitation.');
  }
  
  this.adminInvitations.push(newAdminId);
  return this.save();
};


RoomSchema.methods.acceptAdmin = async function (userId) {
  const invitationIndex = this.adminInvitations.indexOf(userId);
  
  if (invitationIndex === -1) {
    throw new Error('No admin invitation found for this user.');
  }

  // Remove from invitations and add to admins
  this.adminInvitations.splice(invitationIndex, 1);
  this.admins.push(userId);
  
  return this.save();
};

module.exports = model("Room", RoomSchema);
