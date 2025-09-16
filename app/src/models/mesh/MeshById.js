'use strict';

const db = require('../../config/db');

class MeshById {
  static getMeshInfoById = (id) => {
    const query = `
      SELECT Temp, Humidity, CO2, TVOC, Pressure, Emergency, Battery_Persent, Voltage, Time
      FROM mesh
      WHERE unicast_address = ?
      ORDER BY Time DESC
      LIMIT 1;
    `;
    return new Promise((resolve, reject) => {
      db.query(query, [id], (err, data) => {
        if (err) return reject(`${err}`);
        resolve(data);
      });
    });
  };
}

module.exports = MeshById;
