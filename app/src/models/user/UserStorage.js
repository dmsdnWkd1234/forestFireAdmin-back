'use strict';

//데이터를 가지고 있는 파일
//그러한 데이터를 처리해주는 로직

// ESM import statement
// (수정) .js 확장자 추가 필요 (db.js 파일 확인 필요)
import db from '../../config/db.js';

class UserStorage {
  // Private static methods (# prefix) are compatible with ESM
  static #getUserInfo(data, id) {
    const users = JSON.parse(data);
    const idx = users.id.indexOf(id);
    const usersKeys = Object.keys(users); // => [id, password, name]
    const userInfo = usersKeys.reduce((newUser, info) => {
      newUser[info] = users[info][idx];
      return newUser;
    }, {});

    return userInfo;
  }

  static #getUsers(data, isAll, fields) {
    const users = JSON.parse(data);
    if (isAll) {
      return users;
    }
    const newUsers = fields.reduce((newUsers, field) => {
      if (users.hasOwnProperty(field)) {
        newUsers[field] = users[field];
      }
      return newUsers;
    }, {});
    return newUsers;
  }

  // Static methods are compatible with ESM
  static getUsers(isAll, ...fields) {
    // (참고) 이 메서드는 구현이 비어있습니다.
  }

  static getUserInfo(id) {
    const query = 'SELECT * FROM users WHERE id = ?;';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        // (참고) data가 비어있을 경우 data[0] 접근 시 에러 발생 가능성 있음
        else resolve(data[0]);
      });
    });
  }

  static async save(userInfo) {
    const query = 'INSERT INTO users(id, name, password) VALUES(?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(
        query,
        [userInfo.id, userInfo.name, userInfo.password],
        (err) => {
          if (err) reject(`${err}`);
          else resolve({ success: true });
        }
      );
    });
  }
}

// (수정) module.exports -> export default
export default UserStorage;
