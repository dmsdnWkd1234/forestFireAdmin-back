'use strict';

const http = require('http');
const app = require('../app');
const logger = require('../src/config/logger');
const WebSocket = require('ws');

const PORT = process.env.PORT || 3002;

// 1. HTTP 서버 직접 생성
const server = http.createServer(app);

// 2. WebSocket 서버 생성 (Express 서버랑 같은 포트 공유)
const wss = new WebSocket.Server({ server });

// 3. WebSocket 연결 처리
wss.on('connection', (ws) => {
  console.log('🔌 클라이언트 연결됨');

  ws.on('message', (message) => {
    console.log('받은 메시지:', message);
    // 필요하면 여기에 실시간 로직 넣어도 됨
  });

  ws.on('close', () => {
    console.log('❎ 클라이언트 연결 종료');
  });
});

// 4. 서버 실행
server.listen(PORT, () => {
  logger.info(`${PORT}번 포트에서 서버가 가동되었습니다.`);
});

module.exports = { server, wss };
// 서버와 WebSocket 서버를 모듈로 내보내서 다른 파일에서 사용할 수 있게 함
