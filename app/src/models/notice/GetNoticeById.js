'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (db.js 파일 확인 필요)
import db from '../../config/db.js';

class GetNoticeById {
  static getNoticeById = (id) => {
    const query = 'SELECT * FROM notice WHERE ID=?;';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        // (참고) data가 비어있을 경우 data[0] 접근 시 에러 발생 가능성 있음
        else resolve(data[0]);
      });
    });
  };
}

// (수정) module.exports -> export default
export default GetNoticeById;
