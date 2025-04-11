'use strict';
const swaggerOptions = require('./src/config/swagger.js');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const specs = swaggerJsDoc(swaggerOptions);
//nodejs server default setting

//모듈
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');

//CORS

app.use(cors());

const app = express();
dotenv.config();

//라우팅
const home = require('./src/routes/home');

app.set('views', './src');
app.set('view engine', 'ejs');
app.use(
  '/src/config/swagger',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
);
app.use(express.static(`${__dirname}/src/public`));
app.use(bodyParser.json());
// URL을 통해 전달되는 데이터에 한글, 공백 등과 같은 문자가 포함될 경우 제대로 인식되지 않는 문제 해결
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', home); // use -> 미들 웨어를 등록

module.exports = app;
