const express = require('express'); 
const amqp = require('amqplib');

const app = express();
const port = 3000;

async function connect() {
         
const connection = await amqp.connect('amqp://localhost:5672');
const channel = await connection.createChannel();

// Create exchange
await channel.assertExchange('header_exchange', 'headers', { durable: false });

// publish message
const message = {
    description: 'Message description',
    log: 'Message log'
};

const messageHeaders = {
    description: 'Message description',
    log: 'Message log'
};

channel.publish('header_exchange', '', Buffer.from(JSON.stringify(message)), { headers: messageHeaders });
console.log('Message sent');

}

connect();

