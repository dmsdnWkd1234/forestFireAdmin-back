'use strict';
import app from '../app.js';
import logger from '../src/config/logger.js';
import dotenv from 'dotenv';
import 'dotenv/config';

dotenv.config();

// const app = require('../app');
// const logger = require('../src/config/logger');
// const PORT = process.env.PORT || 3002;

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`${PORT}번 포트에서 서버가 가동되었습니다.`);
});
//test
