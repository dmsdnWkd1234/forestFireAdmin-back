'use strict';

// ESM import statements
// (수정) 각 모델/서비스 파일 경로 뒤에 .js 확장자 추가 필요 (파일 확인 필요)
import Mesh from '../../models/mesh/Mesh.js';
import Notice from '../../models/notice/Notice.js';
import Report from '../../models/reports/Report.js';
import User from '../../models/user/User.js';

// (수정) module.exports 대신 export const 사용
export const output = {
  home: (req, res) => {
    // (참고) res.render('home')은 ejs 템플릿 엔진을 사용합니다.
    // ejs는 CommonJS 기반으로 만들어졌을 수 있어 ESM 환경에서 추가 설정이 필요할 수 있습니다.
    res.render('home');
  },

  mesh: async (req, res) => {
    // (참고) new Mesh(req.body) 방식은 ESM과 호환됩니다.
    const mesh = new Mesh(req.body);
    const response = await mesh.showMesh();
    return res.json(response);
  },

  report: async (req, res) => {
    const report = new Report(req.body);
    const response = await report.showReport();
    return res.json(response);
  },
};

// (수정) module.exports 대신 export const 사용
export const process = {
  login: async (req, res) => {
    const user = new User(req.body);
    const response = await user.login();
    return res.json(response);
  },
  register: async (req, res) => {
    const user = new User(req.body);
    const response = await user.register();
    return res.json(response);
  },
  mesh: {
    get: async (req, res) => {
      const mesh = new Mesh();
      const response = await mesh.showMeshById(req.params.id);
      return res.json(response);
    },
    getByData: async (req, res) => {
      try {
        const { types, startTime, endTime } = req.query;
        if (!types) {
          return res.status(400).json({
            success: false,
            msg: "Data types must be provided via the 'types' query parameter. (e.g., ?types=Temp,Humidity)",
          });
        }
        const options = {
          dataTypes: types.split(','),
          startTime,
          endTime,
        };
        const mesh = new Mesh();
        const response = await mesh.showMeshByData(options);
        return res.json(response);
      } catch (err) {
        return res.status(500).json({ success: false, msg: err.message });
      }
    },
  },
  notice: {
    get: async (req, res) => {
      const notice = new Notice();
      const response = await notice.getNoticeById(req.params.id);
      return res.json(response);
    },
    getAll: async (req, res) => {
      const notice = new Notice(req.body);
      const response = await notice.getAllNotices();
      return res.json(response);
    },
    post: async (req, res) => {
      const notice = new Notice(req.body);
      const response = await notice.postNotice();
      return res.json(response);
    },
    delete: async (req, res) => {
      const notice = new Notice(req.body);
      const response = await notice.deleteNotice();
      return res.json(response);
    },
    update: async (req, res) => {
      const notice = new Notice(req.body);
      const response = await notice.updateNotice();
      return res.json(response);
    },
  },
};

// (삭제) module.exports 삭제됨
