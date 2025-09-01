"use strict";
const { createClient } = require("redis");

let redisClient;    
let redisSubscriber;  

const redisConnection = async () => {
  redisClient = createClient({ url: process.env.REDIS_URL });
  redisSubscriber = redisClient.duplicate();

  redisClient.on("error", (err) =>
    console.error("Redis connection error: ", err)
  );
  redisSubscriber.on("error", (err) =>
    console.error("Redis subscriber error: ", err)
  );

  await redisClient.connect();
  await redisSubscriber.connect();

  console.log("Redis connected successfully...");
};

const getRedis = () => {
  if (!redisClient) {
    throw new Error("Redis client not initialized. Call redisConnection() first.");
  }
  return redisClient;
};

const getRedisSub = () => {
  if (!redisSubscriber) {
    throw new Error("Redis subscriber not initialized. Call redisConnection() first.");
  }
  return redisSubscriber;
};

module.exports = { redisConnection, getRedis, getRedisSub };
