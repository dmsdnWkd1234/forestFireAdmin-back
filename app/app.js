'use strict';

//nodejs server default setting

//모듈
import express from 'express'; // require -> import
import bodyParser from 'body-parser'; // require -> import
import dotenv from 'dotenv'; // require -> import
import cors from 'cors'; // require -> import
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();
const app = express();

// (신규) ESM에서 __dirname, __filename 정의
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: '*', // 혹은 'http://localhost:5173'
    methods: ['GET', 'POST'],
  })
);

//라우팅
// (수정) require -> import, .js 확장자 추가 (나중에 home.js 파일 확인 필요)
import home from './src/routes/home/index.js';

app.set('views', './src');
app.set('view engine', 'ejs');
// (수정) __dirname 사용 방식 변경
app.use(express.static(path.join(__dirname, 'src/public')));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home); // use -> 미들 웨어를 등록

// (수정) module.exports -> export default
export default app;
