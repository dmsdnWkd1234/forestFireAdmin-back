'use strict';

const db = require('../../config/db');

class DeleteNotice {
  static async delete(notice) {
    const query = 'DELETE FROM notice WHERE id=?';
    return new Promise((resolve, reject) => {
      db.query(query, [notice.id], (err) => {
        if (err) reject(`${err}`);
        resolve({ success: true });
      });
    });
  }
}

module.exports = DeleteNotice;
