'use strict';

const db = require('../../config/db');

class ReportListStorage {
  static getReport = () => {
    const query = 'SELECT * FROM reports;';
    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        resolve(data);
      });
    });
  };
}

module.exports = ReportListStorage;
