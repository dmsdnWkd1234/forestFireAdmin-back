'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (ReportListStorage.js 파일 확인 필요)
import ReportListStorage from './ReportListStorage.js';

class Report {
  async showReport() {
    try {
      // (수정 없음) 정적 메서드 호출은 ESM과 호환됩니다.
      const response = await ReportListStorage.getReport();
      return response;
    } catch (err) {
      // (개선 제안) 에러 로깅 추가 및 에러 객체 반환 방식 통일
      console.error('Error fetching report:', err);
      return {
        success: false,
        msg: typeof err === 'string' ? err : '리포트 조회 중 오류 발생',
      };
    }
  }
}

// (수정) module.exports -> export default
export default Report;
