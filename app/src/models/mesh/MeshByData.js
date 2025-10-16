'use strict';

const db = require('../../config/db');

class MeshByData {
  static getHistoryData = (options) => {
    const { dataTypes, startTime, endTime } = options;

    // 1. 보안: 허용된 컬럼 이름 리스트 (SQL Injection 방지)
    const allowedColumns = [
      'Temp',
      'Humidity',
      'CO2',
      'TVOC',
      'Pressure',
      'Battery_Persent',
      'Voltage',
    ];

    // 요청된 데이터 타입 중 허용된 것만 필터링합니다.
    const filteredDataTypes = dataTypes.filter((type) =>
      allowedColumns.includes(type)
    );

    if (filteredDataTypes.length === 0) {
      return Promise.reject(new Error('Invalid or no data types specified.'));
    }

    // 2. 동적으로 SELECT 구문 생성
    const selectClause = filteredDataTypes.join(', ');

    const query = `
      SELECT
        unicast_address,
        Time,
        ${selectClause}
      FROM mesh
      WHERE Time BETWEEN ? AND ?
      ORDER BY unicast_address, Time ASC;
    `;

    const params = [startTime, endTime];

    return new Promise((resolve, reject) => {
      db.query(query, params, (err, data) => {
        if (err) return reject(`Database error: ${err.message}`);

        // 3. 프론트엔드에서 사용하기 쉽게 데이터 구조 가공
        const result = data.reduce((acc, row) => {
          const { unicast_address, Time, ...values } = row; // Time과 주소를 제외한 나머지 데이터는 values 객체로
          if (!acc[unicast_address]) {
            acc[unicast_address] = [];
          }
          acc[unicast_address].push({ time: Time, ...values });
          return acc;
        }, {});

        resolve(result);
      });
    });
  };
}

module.exports = MeshByData;
