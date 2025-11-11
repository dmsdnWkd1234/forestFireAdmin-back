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
}

export default Dashboard;
