'use strict';

const Mesh = require('../../models/mesh/Mesh');
const Notice = require('../../models/notice/Notice');
const Report = require('../../models/reports/report');
const User = require('../../models/user/User');

const output = {
  home: (req, res) => {
    res.render('home/index');
  },
  login: (req, res) => {
    res.render('home/login');
  },
  register: (req, res) => {
    res.render('home/register');
  },

  mesh: async (req, res) => {
    const mesh = new Mesh(req.body);
    const response = await mesh.showMesh();
    return res.json(response);
  },

  notice: async (req, res) => {
    const notice = new Notice(req.body);
    const response = await notice.showNotice();
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
