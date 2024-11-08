"use strict";


const Token = require("../models/token");

module.exports = async (req, res, next) => {
  const auth = req.headers?.authorization; // Token ...tokenKey...
  const tokenKey = auth ? auth.split(" ") : null; // ['Token', '...tokenKey...']

  if (tokenKey) {
    if (tokenKey[0] == "Token") {
      // SimpleToken

      const tokenData = await Token.findOne({ token: tokenKey[1] }).populate(
        "userId"
      );
      req.user = tokenData ? tokenData.userId : false;
    } 
  }
  next();
};

exports.socketMiddleware = (socket, next) => {
  const token = socket.handshake.auth.token
  if(token) {
    socket.userId = getUserIdFromToken(token)
    next()
  }else{
    next(new Error("Authentication error"))
  }
}
