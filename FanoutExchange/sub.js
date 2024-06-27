const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3000;

async function connect() {
    try{

        const connection = await amqp.connect('amqp://localhost:5672');
        const channel = await connection.createChannel();

        // Create exchange
        await channel.assertExchange('fanout_exchange', 'fanout', { durable: false });

        // Create queue
        const q = await channel.assertQueue('', { exclusive: true });
         console.log(q);
        // Bind queue

        await channel.bindQueue(q.queue, 'fanout_exchange', '');

        // Consume message

        channel.consume(q.queue, (msg) => {
            console.log(`Message received: ${msg.content.toString()}`);
        }, { noAck: true });

    }
    catch (error) {
        console.error(error);
    }
}

connect();