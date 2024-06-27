const amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, connection) => {

    if (err) {
        throw err;
    }

    connection.createChannel((err, channel) => {

        if (err) {
            throw err;
        }

        let queue = 'hello';

        channel.assertQueue(queue, {
            durable: false
        });

        console.log(`Waiting for messages in ${queue}`);

        channel.consume(queue, (msg) => {

            console.log(`Received: ${msg.content.toString()}`);

        }, {
            noAck: true
        });

    });

});
