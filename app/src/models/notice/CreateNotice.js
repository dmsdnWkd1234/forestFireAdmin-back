'use strict';

const db = require('../../config/db');

class CreateNotice {
  static async postNotice(notice) {
    const query = 'INSERT INTO notice(title, type, content) VALUES(?, ?, ?);';
    return new Promise((resolve, reject) => {
      db.query(query, [notice.title, notice.type, notice.content], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = CreateNotice;
