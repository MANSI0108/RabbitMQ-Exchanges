const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3000;

async function connect() {

    try {
        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        // Create exchange
        await channel.assertExchange('fanout_exchange', 'fanout', { durable: false });

        // Publish message

        const msg = {
            description: 'Hello World',
            timestamp: Date.now()
        }
        channel.publish('fanout_exchange', '', Buffer.from(JSON.stringify(msg)));
        console.log(`Message sent: ${msg.description}`);

    } catch (error) {
        console.error(error);
    }
}

connect();