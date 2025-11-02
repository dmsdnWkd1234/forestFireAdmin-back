'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (db.js 파일 확인 필요)
import db from '../../config/db.js';

class UpdateNotice {
  static async update(notice) {
    const query =
      'UPDATE notice SET title = ?, type = ?, content = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [notice.title, notice.type, notice.content, notice.id],
        (err) => {
          if (err)
            reject(`${err}`); // Reject with error object/string
          else resolve({ success: true }); // Resolve on success
        }
      );
    });
  }
}

// (수정) module.exports -> export default
export default UpdateNotice;
