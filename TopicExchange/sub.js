const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3000;

async function connect() {

    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        // Create exchange
        await channel.assertExchange('topic_exchage', 'topic', { durable: false });
        const q = await channel.assertQueue('', { exclusive: true });

        // Bind the queue to the exchange
        channel.bindQueue(q.queue, 'topic_exchange', 'sub.*');

        channel.consume(q.queue, (msg) => {
            console.log(`Message: ${msg.content.toString()}`);
        }, { noAck: true });

    } catch (error) {
        console.error(error);
    }
}

connect();