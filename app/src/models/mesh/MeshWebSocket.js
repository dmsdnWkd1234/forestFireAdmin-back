// wsController.js
'use strict';

const wss = require('../../../bin/www');
const MeshStorage = require('./MeshStorage'); // 경로 네 상황에 맞게 조정

// 클라이언트가 연결됐을 때 최신 데이터 보내기
wss.on('connection', async (ws) => {
  try {
    const data = await MeshStorage.getMeshInfo();
    ws.send(JSON.stringify(data));
  } catch (err) {
    ws.send(JSON.stringify({ error: 'DB error on initial fetch' }));
  }
});

// 15초마다 DB에서 데이터 가져와서 모든 클라이언트에 전송
setInterval(async () => {
  try {
    const data = await MeshStorage.getMeshInfo();
    const payload = JSON.stringify(data);
    wss.clients.forEach((client) => {
      if (client.readyState === 1) {
        // WebSocket.OPEN === 1
        client.send(payload);
      }
    });
  } catch (err) {
    console.error('DB 조회 에러:', err);
  }
}, 15000);
