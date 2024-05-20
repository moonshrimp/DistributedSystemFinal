const kafka = require('kafka-node');
const Producer = kafka.Producer;
const client = new kafka.KafkaClient();
const producer = new Producer(client);

const payloads = [
  { topic: 'buy_topic', messages: 'Buy Now', partition: 0 }
];

producer.on('ready', function () {
  producer.send(payloads, function (err, data) {
    console.log(data);
  });
});

producer.on('error', function (err) {
  console.log(err);
});
