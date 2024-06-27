const express = require('express');
const amqp = require('amqplib');

async function connect() {

    const connection = await amqp.connect('amqp://localhost:5672');
    const channel = await connection.createChannel();

    // Create exchange
    await channel.assertExchange('header_exchange', 'headers', { durable: false });

    // create queue
    await channel.assertQueue('header_queue', { durable: false });

    // bind queue
    await channel.bindQueue('header_queue', 'header_exchange', '', { 'x-match': 'all', 'description': 'Message description' });

    // consume message
    channel.consume('header_queue', message => {
        console.log(`Received message: ${message.content.toString()}`);
    }, { noAck: true });

}                   

connect();