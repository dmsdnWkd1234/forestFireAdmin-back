'use strict';

// ESM import statements
// (수정) 각 스토리지/서비스 파일 경로 뒤에 .js 확장자 추가 필요 (파일 확인 필요)
import MeshStorage from './MeshStorage.js';
import MeshById from './MeshById.js';
import MeshByData from './MeshByData.js';
import MeshDataForReg from './MeshDataForReg.js';
import db from '../../config/db.js'; // .js 확장자 추가

class Mesh {
  // (수정 없음) constructor는 ESM과 호환
  // constructor(body) {
  //     this.body = body; // This constructor seems unused based on other methods
  // }

  async showMesh() {
    try {
      const response = await MeshStorage.getMeshInfo();
      return response;
    } catch (err) {
      console.error('Error in showMesh:', err); // 개선 제안: 에러 로깅
      return {
        success: false,
        msg: typeof err === 'string' ? err : '메쉬 정보 조회 중 오류 발생',
      };
    }
  }

  async showMeshById(id) {
    try {
      const response = await MeshById.getMeshInfoById(id);
      return response;
    } catch (err) {
      console.error(`Error in showMeshById for ID ${id}:`, err); // 개선 제안: 에러 로깅
      return {
        success: false,
        msg: typeof err === 'string' ? err : '특정 메쉬 정보 조회 중 오류 발생',
      };
    }
  }

  async getAllDataForRag() {
    try {
      const data = await MeshDataForReg.getMeshDataForReg();
      return { success: true, data: data };
    } catch (err) {
      console.error('RAG 데이터 조회 에러 (Mesh):', err);
      // msg는 이미 toString()으로 변환되어 있으므로 그대로 사용
      return { success: false, msg: err.toString() };
    }
  }

  async createMesh(data) {
    try {
      // (수정 없음) DB 쿼리 로직은 ESM과 호환
      const query =
        'INSERT INTO mesh (Temp, Humidity, CO2, Pressure, Emergency, Battery_Persent, Voltage, Time) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

      // (주의!) db.promise()가 ESM 환경에서도 정상 작동하는지 확인 필요
      // mysql2 라이브러리는 promise()를 지원하지만, mysql 라이브러리는 기본 지원하지 않을 수 있음
      const [result] = await db
        .promise()
        .query(query, [
          data.Temp,
          data.Humidity,
          data.CO2,
          data.Pressure,
          data.Emergency,
          data.Battery_Persent,
          data.Voltage,
          data.Time,
        ]);

      const insertedId = result.insertId;
      console.log(`[RDS] Mesh ID ${insertedId} 저장 성공`);

      const pageContent = `메쉬 데이터: 온도 ${data.Temp}도, 습도 ${data.Humidity}%, CO2 ${data.CO2} PPM, 기압 ${data.Pressure} hPa, 배터리 ${data.Battery_Persent}%, 전압 ${data.Voltage}V, 측정시간 ${data.Time}`;
      const metadata = {
        source: 'mesh',
        id: insertedId,
        date: data.Time,
      };

      // (수정 없음) chatService는 import된 변수이므로 그대로 사용
      chatService.addRealtimeDocument(pageContent, metadata);

      return { success: true, id: insertedId };
    } catch (err) {
      console.error('Mesh 생성 또는 RAG 인덱싱 실패:', err);
      // msg는 이미 toString()으로 변환되어 있으므로 그대로 사용
      return { success: false, msg: err.toString() };
    }
  }

  async showMeshByData(options) {
    try {
      let { dataTypes, startTime, endTime } = options;
      if (!startTime || !endTime) {
        // (수정 없음) MeshByData는 import된 모듈이므로 그대로 사용
        const lastDataTime = await MeshByData.getLatestDataTime();
        if (!lastDataTime) {
          return { success: true, data: {} };
        }
        const latestDate = new Date(lastDataTime);
        const twentyFourHoursBefore = new Date(
          latestDate.getTime() - 24 * 60 * 60 * 1000
        );
        endTime = latestDate.toISOString().slice(0, 19).replace('T', ' ');
        startTime = twentyFourHoursBefore
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ');
      }
      const finalOptions = { dataTypes, startTime, endTime };
      const data = await MeshByData.getHistoryData(finalOptions);
      return { success: true, data };
    } catch (err) {
      console.error('Error in showMeshByData:', err); // 개선 제안: 에러 로깅
      // msg는 이미 err.message이므로 그대로 사용
      return { success: false, msg: err.message };
    }
  }
}

// (수정) module.exports -> export default
export default Mesh;
