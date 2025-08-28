"use strict"

const amqp = require("amqplib")

const rabbitmqConnection = async () => {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL)
        const channel = await connection.createChannel()
        await channel.assertQueue("messages")
        console.log("RabbitMQ connected successfully :)))")
        return channel
    } catch (error) {
        console.error("RabbitMQ connection error :((((", error);
        
    }
}

module.exports = { rabbitmqConnection, getChannel: () => channel}