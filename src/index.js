const express = require('express');
const serveless = require('serverless-http');

var cors = require('cors')

var producer = require('./kafkaService')

const app = express();

app.use(express.json())

app.use(cors())

app.get('/teste', async (req,res) => { 
   res.status(200).json({teste: 'funcionou'});
 })

app.post('/mesage', async (req,res) => {
 const {mesage} = req.body;

 try {
    const msg = { key: 'example', value: mesage, partition: 0 };

    await producer.send({
      topic: 'countries',
      messages: [msg]
    });
  } catch (err) {
    console.log(err);
  }

  res.status(200).send();
})

module.exports.handler = serveless(app)