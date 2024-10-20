"use strict";

// sync():

module.exports = async function () {
  // return null;

  /* CLEAR DATABASE */
  const { mongoose } = require("../configs/dbConnection");
  await mongoose.connection.dropDatabase();
  console.log("- Database and all data DELETED!");
  /* CLEAR DATABASE */
  const User = require("../models/user");

  await User.create([
    {
      _id: "65343222b67e9681f937f511",
      username: "admin",
      password: "aA?123456",
      email: "admin@site.com",
      image:"https://cdn.pixabay.com/photo/2013/07/13/13/46/padlock-161523_640.png",
      isAdmin: true,
    },

    {
      _id: "65343222b67e9681f937f514",
      username: "Ali",
      password: "aA?123456",
      email: "ali@site.com",
      image:"https://cdn.pixabay.com/photo/2022/10/20/19/55/muhammadaliofficial-official-7535685_640.jpg",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f515",
      username: "Veli",
      password: "aA?123456",
      email: "veli@site.com",
      image:"https://cdn.pixabay.com/photo/2018/11/08/23/52/man-3803551_640.jpg",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f516",
      username: "Aydan",
      password: "aA?123456",
      email: "aydan@site.com",
      image:"https://cdn.pixabay.com/photo/2022/11/12/15/43/reed-7587271_640.jpg",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f517",
      username: "Canan",
      password: "aA?123456",
      email: "canan@site.com",
      image:"https://cdn.pixabay.com/photo/2021/10/26/02/26/woman-6742425_640.jpg",
      isAdmin: false,
    },
    {
      _id: "65343222b67e9681f937f518",
      username: "Emel",
      password: "aA?123456",
      email: "emel@site.com",
      image:"https://cdn.pixabay.com/photo/2023/11/10/02/30/woman-8378634_640.jpg",
      isAdmin: false,
    },
  ]);

  console.log("---Users added---");

};