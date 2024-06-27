const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3000;

async function connect() {
    
        try {
            const connection = await amqp.connect('amqp://localhost:5672');
            const channel = await connection.createChannel();
    
            // Create exchange
            await channel.assertExchange('topic_exchange', 'topic', { durable: false });
    
            // Publish message
            setInterval(() => {
                const msg = {
                    description: 'Hello World',
                    timestamp: Date.now()
                }
                channel.publish('topic_exchange', 'sub.test', Buffer.from(JSON.stringify(msg)));
                console.log(`Message sent: ${msg.description}`);
            }, 1000);


    
        } catch (error) {
            console.error(error);
        }
    }

connect();