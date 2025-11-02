'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (db.js 파일 확인 필요)
import db from '../../config/db.js';

class CreateNotice {
  static async postNotice(notice) {
    const query = 'INSERT INTO notice(title, type, content) VALUES(?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [notice.title, notice.type, notice.content], (err) => {
        if (err)
          reject(`${err}`); // Reject with error
        else resolve({ success: true }); // Resolve on success
      });
    });
  }
}

// (수정) module.exports -> export default
export default CreateNotice;
