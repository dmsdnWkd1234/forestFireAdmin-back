'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/api/mesh', ctrl.output.mesh);
router.get('/api/mesh/:id', ctrl.process.mesh.get);

router.get('/api/report', ctrl.output.report);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);

// notice
router.get('/api/notice/:id', ctrl.process.notice.get);
router.get('/api/notice', ctrl.process.notice.getAll);
router.post('/api/createNotice', ctrl.process.notice.post);
router.delete('/api/deleteNotice', ctrl.process.notice.delete);
router.patch('/api/updateNotice', ctrl.process.notice.update);

module.exports = router;
