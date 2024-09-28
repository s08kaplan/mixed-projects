"use strict";

const User = require("../models/user");
const Token = require("../models/token");

const {
  encryptFunc,
  passwordEncrypt,
} = require("../helpers/validationHelpers");

module.exports = {
  login: async (req, res) => {

    const { username, email, password } = req.body;

    if (!(username && email && password)) {
      res.errorStatusCode = 400;
      throw new Error("Username,email and password must be entered");
    }

    const user = await User.findOne({ $and: [{ username }, { email }], password });

    if (!user) {
      res.errorStatusCode = 401;
      throw new Error(
        "Credentials are wrong please check your username,email and password"
      );
    }

    if (user && user.password == passwordEncrypt(password) && user.isActive) {
      // console.log("user password checked");
      let tokenData = await Token.findOne({ userId: user.id });
      // console.log("tokenData: ",tokenData);
      if (!tokenData) {
        const tokenKey = encryptFunc(Date.now() + user._id);
        // console.log("tokenKey: ",tokenKey);
        tokenData = await Token.create({ userId: user._id, token: tokenKey });
        // console.log("tokenData",tokenData);
      }

       res.status(200).send({
      error: false,
      token: tokenData.token,
      user,
    });
    }

   
  },

  logout: async (req, res) => {
  
    const token = req.headers?.authorization.split(" ")[1];

    const { deletedCount } = await Token.deleteOne({ token });
    res.status(deletedCount ? 204 : 404).send({
      error: !!!deletedCount,
      message: deletedCount
        ? "Logged out successfully"
        : "Something went wrong",
    });
  },
};
