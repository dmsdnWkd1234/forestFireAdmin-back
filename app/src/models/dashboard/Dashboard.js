import GetAbnormal from './GetAbnormal.js';
import MeshByIdAndTime from './MeshByIdAndTime.js';

class Dashboard {
  constructor(body) {
    this.body = body;
  }
  async MeshByIdAndTime(id) {
    try {
      const response = await MeshByIdAndTime.getMeshByIdAndTime(id);
      return response;
    } catch (err) {
      console.error(`Error in showMeshById for ID ${id}:`, err); // 개선 제안: 에러 로깅
      return {
        success: false,
        msg: typeof err === 'string' ? err : '특정 메쉬 정보 조회 중 오류 발생',
      };
    }
  }

  async GetAbnormal() {
    try {
      const response = await GetAbnormal.GetAbnormal();
      return response;
    } catch (err) {
      console.error('somthing wrong', err);
      return {
        success: false,
      };
    }
  }
}

export default Dashboard;
