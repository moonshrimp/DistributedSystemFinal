// const kafka = require('kafka-node');
// const Consumer = kafka.Consumer;
// const client = new kafka.KafkaClient();
// const consumer = new Consumer(
//   client,
//   [{ topic: 'buy_topic', partition: 0 }],
//   { autoCommit: false }
// );

// consumer.on('message', function (message) {
//   console.log(message);
// });

// consumer.on('error', function (err) {
//   console.log(err);
// });

const kafka = require('kafka-node');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'ecommerce';
const client = new kafka.KafkaClient();
const consumer = new kafka.Consumer(
  client,
  [{ topic: 'buy_topic', partition: 0 }],
  { autoCommit: false }
);

MongoClient.connect(url, (err, dbClient) => {
  if (err) throw err;
  console.log("Connected to database");
  const db = dbClient.db(dbName);
  const collection = db.collection('orders');

  consumer.on('message', function (message) {
    console.log('Received message:', message);
    const order = { message: message.value, timestamp: new Date() };
    collection.insertOne(order, (err, res) => {
      if (err) throw err;
      console.log('Order saved to database');
    });
  });

  consumer.on('error', function (err) {
    console.log(err);
  });
});
