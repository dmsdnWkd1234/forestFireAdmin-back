'use strict';

const Mesh = require('../../models/mesh/Mesh');
const Notice = require('../../models/notice/Notice');
const Report = require('../../models/reports/Report');
const User = require('../../models/user/User');

const output = {
  /**
   * @swagger
   * /:
   *   get:
   *     summary: 홈 페이지
   *     description: 메인 홈 화면을 반환합니다.
   *     responses:
   *       200:
   *         description: 성공
   */
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
