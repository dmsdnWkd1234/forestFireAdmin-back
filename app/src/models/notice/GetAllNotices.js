'use strict';

const db = require('../../config/db');

class GetAllNotices {
  static getAllNotices = () => {
    const query = 'SELECT * FROM notice;';
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  };
}

module.exports = GetAllNotices;
