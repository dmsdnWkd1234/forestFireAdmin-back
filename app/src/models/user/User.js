'use strict';

// ESM import statement
// (수정) .js 확장자 추가 필요 (UserStorage.js 파일 확인 필요)
import UserStorage from './UserStorage.js';

class User {
  constructor(body) {
    this.body = body;
  }

  async login() {
    const client = this.body;
    try {
      // (참고) UserStorage.getUserInfo가 null/undefined를 반환할 경우 구조 분해 할당 에러 발생 가능
      const userInfo = await UserStorage.getUserInfo(client.id);
      if (userInfo) {
        if (
          userInfo.id === client.id &&
          userInfo.password === client.password
        ) {
          return { success: true };
        }
        return { success: false, msg: '비밀번호가 틀렸습니다' };
      }
      return { success: false, msg: '존재하지 않는 아이디입니다.' };
    } catch (err) {
      // (개선 제안) 에러 로깅 추가 및 에러 객체 반환 방식 통일
      console.error('Login error:', err);
      return {
        success: false,
        msg: typeof err === 'string' ? err : '로그인 중 오류 발생',
      };
    }
  }

  async register() {
    const client = this.body;
    try {
      // UserStorage.save는 { success: true } 또는 에러를 던짐
      const response = await UserStorage.save(client);
      return response; // { success: true }
    } catch (err) {
      // (개선 제안) 에러 로깅 추가 및 에러 객체 반환 방식 통일
      console.error('Registration error:', err);
      return {
        success: false,
        msg: typeof err === 'string' ? err : '회원가입 중 오류 발생',
      };
    }
  }
}

// (수정) module.exports -> export default
export default User;
