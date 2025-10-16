'use strict';

const Mesh = require('../../models/mesh/Mesh');
const Notice = require('../../models/notice/Notice');
const Report = require('../../models/reports/Report');
const User = require('../../models/user/User');

const output = {
  home: (req, res) => {
    res.render('home');
  },

  mesh: async (req, res) => {
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

const process = {
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
        // 1. req.body가 아닌 req.query에서 파라미터를 가져옵니다.
        const { types, startTime, endTime } = req.query;

        if (!types) {
          return res.status(400).json({
            success: false,
            msg: "Data types must be provided via the 'types' query parameter.",
          });
        }

        // 2. 기본 시간 설정 (파라미터가 없을 경우 최근 24시간)
        const now = new Date();
        const finalEndTime =
          endTime || now.toISOString().slice(0, 19).replace('T', ' ');
        const finalStartTime =
          startTime ||
          new Date(now.getTime() - 24 * 60 * 60 * 1000)
            .toISOString()
            .slice(0, 19)
            .replace('T', ' ');

        const options = {
          dataTypes: types.split(','), // 콤마로 구분된 문자열을 배열로 변환
          startTime: finalStartTime,
          endTime: finalEndTime,
        };

        const mesh = new Mesh(); // 인스턴스 생성
        // 3. 수정한 모델 메소드 호출
        const response = await mesh.showHistoryByData(options);
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

module.exports = {
  output,
  process,
};
