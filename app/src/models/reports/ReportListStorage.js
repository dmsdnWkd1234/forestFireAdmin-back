'use strict';

import db from '../../config/db.js';

class ReportListStorage {
  static getReport = () => {
    // 1. WHERE Emergency > 0: 신고(Emergency) 값이 0보다 큰(1인) 녀석들만 가져와.
    // 2. ORDER BY Time DESC: 가장 최근에 터진 사건부터 위로 오게 정렬해.
    const query = 'SELECT * FROM mesh WHERE Emergency > 0 ORDER BY Time DESC;';

    return new Promise((resolve, reject) => {
      db.query(query, (err, data) => {
        if (err) reject(`${err}`);
        else resolve(data);
      });
    });
  };
}

export default ReportListStorage;
