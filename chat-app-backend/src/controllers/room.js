"use strict";

const Room = require("../models/room");
const User = require("../models/user");


  
module.exports = {
  list: async (req, res) => {

    const data = await res.getModelList(Room);

    res.status(200).send({
      error: false,
      data,
    });
  },

  create: async (req, res) => {

   const userId = req.user?._id
// console.log(userId);
   const user = await User.findOne({_id: userId})

   if(!user)throw new Error("User not found")
    
   const data =  await Room.create({name: req.body.name, createdBy: userId, admins:[userId]})

    
    res.status(201).send({
      error: false,
      data,
    });
  },

  inviteAdmin: async (req, res) => {
    const userId = req.user._id; 
    const { roomId, newAdminId } = req.body;
     
    const room = await Room.findOne({_id:roomId})
    if(!room) throw new Error("Room not found!")

    const data = await room.inviteAdmin(userId, newAdminId);
      res.status(200).send({
        error: false,
        message: "New admin added to the room successfully ",
        data
      })
  },


  acceptAdmin: async (req, res) => {
    const userId = req.user._id; 
    const { roomId } = req.body;

    const room = await Room.findById(roomId);
      if (!room) throw new Error("Room not found");

   const data = await room.acceptAdmin(userId);

   res.status(200).send({
    error:false,
    message: "Admin invitation accepted successfully",
    data
   })

  },

  read: async (req, res) => {
   
    const customFilter = req.user.isAdmin ? {} : req.user._id
    const data = await Room.findOne({userId: {...customFilter}})

    res.status(202).send({
      error: false,
      data,
    });
  },

  update: async (req, res) => {
    const userIsAdmin = await Room.isAdminCheck(req.user?._id)
     
    if(userIsAdmin){
      const data = await Room.updateOne({_id: req.params.roomId}, req.body, { runValidators: true} ) 
      res.status(202).send({
        error: false,
        data: await Room.findOne({_id: req.params.roomId})
      })
    }
    
     res.status(403).send({
      error: true,
      message: "You are not an authorized person to do the changes"
     })
  },

  delete: async (req, res) => {
  
    const data = await Room.deleteOne({ _id: req.params.roomId})
    
    res.status(data.deletedCount ? 204 : 404).send({
      error: !(!!data.deletedCount),
      data,
    });
  },
};
