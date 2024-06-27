const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3000;

async function connect() {

    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Create a direct exchange
    await channel.assertExchange('direct_exchange','direct',{ durable: true })
    
    app.get('/send', async (req, res) => {
        const msg = 'Hello World!, from Publisher. Direct Exchange with routing key R-key';
        await channel.publish('direct_exchange', 'R-key', Buffer.from(JSON.stringify(msg)));
        res.send(msg);
    });

    app.listen(port, () => {
        console.log(`Publisher running at http://localhost:${port}`);
    }); 


}

connect();