const express = require('express');
const amqp = require('amqplib');
const e = require('express');

const app = express();
const port = 4000;

async function connect() {

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Create a direct exchange
    await channel.assertExchange('direct_exchange','direct',{ durable: true })
    
    // Create a queue
    const q = await channel.assertQueue('direct_queue',{ durable: true });
    console.log(q);
    
    // Bind the queue to the exchange
    await channel.bindQueue('direct_queue', 'direct_exchange', 'R-key');
    
    // Consume from the queue
    await channel.consume(q.queue, (msg) => {
        if(msg.content){
            console.log(`Message received: ${msg.content.toString()}`);
            // Acknowledge the message
            channel.ack(msg);
        }
        else{
            console.log('No message');
      
        }
    }, { noAck: false });

   console.log('Subscriber is waiting for messages');

}

connect();

