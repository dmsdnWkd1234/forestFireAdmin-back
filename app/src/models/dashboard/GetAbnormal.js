'use strict';
import db from '../../config/db.js';

class GetAbnormal {
  static async GetAbnormal() {
    const TEMP_LIMIT = 40; // 40도 이상
    const BATTERY_LIMIT = 20;
    const query = `
      SELECT * FROM mesh 
            WHERE 
                Temp >= ? OR 
                Battery_Persent <= ? OR 
                Emergency > 0
            ORDER BY Time DESC
            LIMIT 50;
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [TEMP_LIMIT, BATTERY_LIMIT], (err, data) => {
        if (err) {
          console.error('쿼리 에러:', err);
          return reject(new Error(`Database error: ${err.message}`));
        }
        resolve(data);
      });
    });
  }
}

export default GetAbnormal;
