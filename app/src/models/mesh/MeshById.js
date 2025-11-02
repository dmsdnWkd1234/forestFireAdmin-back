'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (db.js 파일 확인 필요)
import db from '../../config/db.js';

class MeshById {
  static getMeshInfoById = (id) => {
    const query = `
          SELECT Temp, Humidity, CO2, TVOC, Pressure, Emergency, Battery_Persent, Voltage, Time, unicast_address
          FROM mesh
          WHERE unicast_address = ?
          ORDER BY Time DESC
          LIMIT 1;
        `;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err)
          return reject(`${err}`); // Reject with error
        else resolve(data); // Resolve with data on success
      });
    });
  };
}

// (수정) module.exports -> export default
export default MeshById;
