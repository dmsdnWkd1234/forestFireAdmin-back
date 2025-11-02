'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (db.js 파일 확인 필요)
import db from '../../config/db.js';

class MeshStorage {
  static getMeshInfo = () => {
    const query = 'SELECT * FROM mesh;';
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err)
          reject(`${err}`); // Reject with error
        else resolve(data); // Resolve with data on success
      });
    });
  };
}

// (수정) module.exports -> export default
export default MeshStorage;
