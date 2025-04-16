'use strict';

const db = require('../../config/db');

class GetNoticeById {
  static getNoticeById = (id) => {
    const query = 'SELECT * FROM notice WHERE ID=?;';
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) reject(`${err}`);
        resolve(data[0]);
      });
    });
  };
}

module.exports = GetNoticeById;
