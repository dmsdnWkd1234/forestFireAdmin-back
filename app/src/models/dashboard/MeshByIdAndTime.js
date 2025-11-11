'use strict';
import db from '../../config/db.js';

class MeshByIdAndTime {
  static async getMeshByIdAndTime(id) {
    const query = `
      SELECT Temp, Humidity, CO2, TVOC, Pressure, Emergency, Battery_Persent, Voltage, Time, unicast_address
          FROM mesh
          WHERE unicast_address = ?
          ORDER BY Time DESC
          LIMIT 100;
    `;
    console.log('meshbyidandtime', id);
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) {
          console.error('쿼리 에러:', err);
          return reject(new Error(`Database error: ${err.message}`));
        }
        resolve(data);
      });
    });
  }
}

export default MeshByIdAndTime;
