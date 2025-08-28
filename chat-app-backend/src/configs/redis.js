"use strict";
const { createClient } = require("redis");

const redisConnection = async () => {
  const redisClient = createClient({ url: process.env.REDIS_URL });
  const redisSubscriber = redisClient.duplicate()
  redisClient.on("error", (err) =>
    console.error("Redis connection error: ", err)
  );
   redisSubscriber.on("error", (err) =>
    console.error("Redis subscriber error: ", err)
  );
  await redisClient.connect();
  await redisSubscriber.connect()
  console.log("Redis connected successfully...")
  return { redisClient, redisSubscriber };
};


module.exports = { redisConnection, getRedis: () => redisClient, getRedisSub: () => redisSubscriber };