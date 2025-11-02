// ESM import statement
import mysql from 'mysql'; // require -> import

// (수정 없음) process.env는 ESM에서도 동일하게 접근 가능
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

// (수정) module.exports -> export default
export default db;
