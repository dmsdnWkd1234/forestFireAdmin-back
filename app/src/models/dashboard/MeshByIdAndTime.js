'use strict';
import db from '../../config/db.js';

class MeshByIdAndTime {
  // range 파라미터 추가 (기본값 '1h')
  static async getMeshByIdAndTime(id, range) {
    let query = '';
    let queryParams = [id];

    console.log(`요청 ID: ${id}, 기간: ${range}`);

    if (range === '7d') {
      // [7일 조회] 데이터가 너무 많으므로 '1시간 단위로 평균(AVG)'을 내서 가져옴 (다운샘플링)
      // 데이터양을 획기적으로 줄여줌 (10,000개 -> 168개)
      query = `
        SELECT 
          AVG(Temp) as Temp, 
          AVG(Humidity) as Humidity, 
          AVG(CO2) as CO2, 
          AVG(TVOC) as TVOC, 
          AVG(Battery_Persent) as Battery_Persent,
          MAX(Time) as Time, -- 해당 시간대의 가장 마지막 시간
          unicast_address
        FROM mesh
        WHERE unicast_address = ? 
          AND Time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
        GROUP BY DATE_FORMAT(Time, '%Y-%m-%d %H') -- 시간 단위로 그룹화
        ORDER BY Time ASC;
      `;
    } else if (range === '24h') {
      // [24시간 조회] LIMIT 없이 24시간 치 가져오기
      query = `
        SELECT Temp, Humidity, CO2, TVOC, Pressure, Emergency, Battery_Persent, Voltage, Time, unicast_address
        FROM mesh
        WHERE unicast_address = ? 
          AND Time >= DATE_SUB(NOW(), INTERVAL 24 HOUR)
        ORDER BY Time ASC; 
      `;
    } else {
      // [1시간(기본)] 기존처럼 디테일하게 보되, 개수 제한을 좀 넉넉히
      query = `
        SELECT Temp, Humidity, CO2, TVOC, Pressure, Emergency, Battery_Persent, Voltage, Time, unicast_address
        FROM mesh
        WHERE unicast_address = ? 
          AND Time >= DATE_SUB(NOW(), INTERVAL 1 HOUR)
        ORDER BY Time ASC;
      `;
    }

    return new Promise((resolve, reject) => {
      db.query(query, queryParams, (err, data) => {
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
