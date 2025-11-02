'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (db.js 파일 확인 필요)
import db from '../../config/db.js';

class MeshByData {
  static getLatestDataTime = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT MAX(Time) AS lastDataTime FROM mesh;';
      db.query(query, (err, data) => {
        if (err) return reject(err);
        // data[0].lastDataTime이 null일 수 있으므로 (테이블이 비었을 때) 그대로 반환
        resolve(data[0]?.lastDataTime || null);
      });
    });
  };

  static getHistoryData = async (options) => {
    let { dataTypes, startTime, endTime } = options;

    // --- 1. 시간 옵션 처리 ---
    // startTime이나 endTime이 제공되지 않았을 경우, DB의 마지막 데이터 기준으로 24시간을 계산
    if (!startTime || !endTime) {
      // (수정 없음) this.getLatestDataTime() 호출은 ESM과 호환
      const lastDataTime = await this.getLatestDataTime();

      // DB에 데이터가 전혀 없으면 빈 객체를 반환하고 종료
      if (!lastDataTime) {
        return {};
      }

      // 마지막 데이터 시간을 기준으로 종료/시작 시간 설정
      const latestDate = new Date(lastDataTime);
      const twentyFourHoursBefore = new Date(
        latestDate.getTime() - 24 * 60 * 60 * 1000
      );

      // DB 쿼리에 맞는 'YYYY-MM-DD HH:MM:SS' 형식으로 변환
      endTime = latestDate.toISOString().slice(0, 19).replace('T', ' ');
      startTime = twentyFourHoursBefore
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ');
    }

    // --- 2. 동적 쿼리 생성 (보안 처리 포함) ---
    const allowedColumns = [
      'Temp',
      'Humidity',
      'CO2',
      'TVOC',
      'Pressure',
      'Battery_Persent',
      'Voltage',
    ];
    const filteredDataTypes = dataTypes.filter((type) =>
      allowedColumns.includes(type)
    );

    if (filteredDataTypes.length === 0) {
      // 요청된 데이터 타입이 유효하지 않으면 에러 발생
      throw new Error('Invalid or no data types specified.');
    }

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

    // --- 3. DB 조회 및 데이터 가공 ---
    return new Promise((resolve, reject) => {
      db.query(query, params, (err, data) => {
        if (err) return reject(`Database error: ${err.message}`);

        // 요청하신 JSON 구조로 데이터를 재조립 (reduce 사용)
        const result = data.reduce((acc, row) => {
          const { unicast_address, Time, ...values } = row;
          if (!acc[unicast_address]) {
            acc[unicast_address] = [];
          }
          acc[unicast_address].push({ time: Time, ...values });
          return acc;
        }, {}); // 초기값은 빈 객체 {}

        resolve(result);
      });
    });
  };
}

// (수정) module.exports -> export default
export default MeshByData;
