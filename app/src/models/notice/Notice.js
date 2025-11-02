'use strict';

// ESM import statements
// (수정) 각 스토리지 파일 경로 뒤에 .js 확장자 추가 필요 (파일 확인 필요)
import GetNoticeById from './GetNoticeById.js';
import GetAllNotices from './GetAllNotices.js';
import CreateNotice from './CreateNotice.js';
import DeleteNotice from './DeleteNotice.js';
import UpdateNotice from './UpdateNotice.js';

class Notice {
  constructor(body) {
    this.body = body;
  }
  async getNoticeById(id) {
    try {
      // (수정 없음) 정적 메서드 호출은 ESM과 호환됩니다.
      const response = await GetNoticeById.getNoticeById(id);
      return response;
    } catch (err) {
      // (개선 제안) 에러 로깅 추가 및 에러 객체 반환 방식 통일
      console.error(`Error getting notice by ID ${id}:`, err);
      return {
        success: false,
        msg: typeof err === 'string' ? err : '공지 조회 중 오류 발생',
      };
    }
  }
  async getAllNotices() {
    try {
      const response = await GetAllNotices.getAllNotices();
      return response;
    } catch (err) {
      console.error('Error getting all notices:', err);
      return {
        success: false,
        msg: typeof err === 'string' ? err : '전체 공지 조회 중 오류 발생',
      };
    }
  }
  async postNotice() {
    const client = this.body;
    try {
      const response = await CreateNotice.postNotice(client);
      return response;
    } catch (err) {
      console.error('Error posting notice:', err);
      return {
        success: false,
        msg: typeof err === 'string' ? err : '공지 등록 중 오류 발생',
      };
    }
  }

  async deleteNotice() {
    const client = this.body;
    try {
      const response = await DeleteNotice.delete(client);
      return response;
    } catch (err) {
      console.error('Error deleting notice:', err);
      return {
        success: false,
        msg: typeof err === 'string' ? err : '공지 삭제 중 오류 발생',
      };
    }
  }

  async updateNotice() {
    const client = this.body;
    try {
      const response = await UpdateNotice.update(client);
      return response;
    } catch (err) {
      console.error('Error updating notice:', err);
      return {
        success: false,
        msg: typeof err === 'string' ? err : '공지 수정 중 오류 발생',
      };
    }
  }
}

// (수정) module.exports -> export default
export default Notice;
