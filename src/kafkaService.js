const { Kafka } = require('kafkajs');
require('dotenv').config();

let kafkaConnectionBindings;

kafkaConnectionBindings = {
    brokers: [process.env.BOOTSTRAP]
  };

  kafkaConnectionBindings.sasl = {
    mechanism: 'plain',
    username: process.env.CLIENT_ID,
    password: process.env.SECRET
  };
  kafkaConnectionBindings.ssl = true;

kafkaConnectionBindings.clientId = 'kafkajs-producer';

const kfk = new Kafka(kafkaConnectionBindings);

const producer = kfk.producer();

const run = async () => {
    await producer.connect();;
};
  
run().catch(console.error);

module.exports = producer
