'use strict';
//server file

const app = require('../app');
const PORT = 3000;

app.listen(PORT, () => {
    console.log('서버 가동');
});
