// webSocketServer.js 中的消費者會從 buy_topic 主題中讀取消息，
// 並透過 WebSocket 將其發送到連接的 Dashboard 客戶端。

const WebSocket = require('ws');
const kafka = require('kafka-node');
const Consumer = kafka.Consumer;
const client = new kafka.KafkaClient();
const consumer = new Consumer(
  client,
  [{ topic: 'buy_topic', partition: 0 }],
  { autoCommit: false }
);

const wss = new WebSocket.Server({ port: 8081 });

let todayDemand = 0;
let todayKafkaData = 0;

wss.on('connection', ws => {
  ws.send(JSON.stringify({
    todayDemand,
    todayKafkaData
  }));

  consumer.on('message', function (message) {
    todayDemand++;
    todayKafkaData++;
    const data = {
      todayDemand,
      todayKafkaData
    };
    ws.send(JSON.stringify(data));
  });

  ws.on('message', message => {
    console.log(`Received message => ${message}`);
  });
});

console.log('WebSocket server is running on ws://localhost:8081');
