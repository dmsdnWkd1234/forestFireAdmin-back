'use strict';

const db = require('../../config/db');

class NoticeList {
  static getNoticeList = () => {
    const query = 'SELECT * FROM notice;';
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  };
}

module.exports = NoticeList;
