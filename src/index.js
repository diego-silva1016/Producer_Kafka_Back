const express = require('express');

var cors = require('cors')

var producer = require('./kafkaService')

const app = express();

app.use(express.json())

app.use(cors())

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

app.listen(3333)