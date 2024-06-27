# RabbitMQ Exchanges with Node.js and Express.js

This repository contains examples of implementing RabbitMQ exchanges using Node.js with Express.js. It includes examples for Direct, Topic, Fanout, and Headers exchanges, demonstrating the pub/sub pattern.

## Prerequisites

- [Node.js](https://nodejs.org/en/download/) (v12 or higher)
- [RabbitMQ](https://www.rabbitmq.com/download.html)


## Explanation

## Overview Of RabbitMQ
* Basically RabbitMQ provides Communication facility between different components of a 
distributed system. It acts as an intermediary for a messaging, allowing applications, system, services to communicate with each other asynchronously. 
* RabbitMQ supports several messaging protocols, including AMQP, MQTT, and STOMP, with AMQP being the most popular.


![image](https://github.com/MANSI0108/RabbitMQ-Exchanges/assets/90252252/02c20ed0-456a-47e2-8e9e-6004df3a9354)

Messages are not published directly to a queue; instead, the producer sends messages to an exchange. An exchange is responsible for routing the messages to different queues with the help of bindings and routing keys. A binding is a link between a queue and an exchange.

Exchange is nothing but the message routing agent. 
 An exchange is responsible for routing the messages to different queues with the help of header attributes, bindings, and routing keys.

## Binding 
* link that is set up by you to bind a queue to an exchange.
## Routing key 
* depends on exchange type 
This is a message attribute the exchange looks at when deciding how to route the message to queues


![image](https://github.com/MANSI0108/RabbitMQ-Exchanges/assets/90252252/35fb205c-d468-4232-b109-4e4038b9fcd8)


### Direct Exchange

Messages are routed to queues based on the message routing key. The routing key must exactly match the binding key.

### Topic Exchange

Messages are routed to queues based on wildcard matches between the routing key and the routing pattern specified in the binding. `*` matches exactly one word, and `#` matches zero or more words.

### Fanout Exchange

Messages are broadcast to all queues bound to the exchange, regardless of the routing key.

### Headers Exchange

Messages are routed based on the message headers instead of the routing key. Headers can be used to add more complex routing logic.

