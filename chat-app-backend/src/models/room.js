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

    admins: [
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

RoomSchema.methods.addAdmin = async function (userId, newAdminId) {
    if( !this.isAdminCheck(userId) ) {
        throw new Error('Only admins can add other admins.');
    }

    if(this.admins.includes(newAdminId)) {
        throw new Error('User is already an admin.');
    }

    this.admins.push(newAdminId)
    return this.save()
}

RoomSchema.pre("save", function(next) {
    if(this.isNew) {        //! isNew => when a new document created first time in Mongoose this property is set to true and once the document saved to the database for the first time isNew set to false 
        this.admins.push(this.createdBy);
    }
    next();
})

module.exports = model("Room", RoomSchema);
