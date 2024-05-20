// dashboard.js 中的 WebSocket 客戶端會接收消息，並更新 Dashboard 上的實時數據。

const ws = new WebSocket('ws://localhost:8081');

ws.onopen = () => {
  console.log('Connected to WebSocket server');
};

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  document.getElementById('todayDemand').innerText = `今日需求量: ${data.todayDemand}`;
  document.getElementById('todayKafkaData').innerText = `今日Kafka數據: ${data.todayKafkaData}`;
};

ws.onclose = () => {
  console.log('Disconnected from WebSocket server');
};
