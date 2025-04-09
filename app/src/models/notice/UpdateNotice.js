'use strict';

const db = require('../../config/db');

class UpdateNotice {
  static async update(notice) {
    const query = 'UPDATE notice SET title = ?, content = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      db.query(query, [notice.title, notice.content, notice.id], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = UpdateNotice;
