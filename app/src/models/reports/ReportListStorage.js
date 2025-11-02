'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (db.js 파일 확인 필요)
import db from '../../config/db.js';

class ReportListStorage {
  static getReport = () => {
    const query = 'SELECT * FROM reports;';
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data); // Return data on success
      });
    });
  };
}

// (수정) module.exports -> export default
export default ReportListStorage;
