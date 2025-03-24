'use strict';

//모듈
const express = require('express');
const app = express();

//라우팅
const home = require('./routes/home');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use('/', home); // use -> 미들 웨어를 등록

module.exports = app;
