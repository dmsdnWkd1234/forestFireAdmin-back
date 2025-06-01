'use strict';

const express = require('express');
const router = express.Router();

const ctrl = require('./home.ctrl');

router.get('/', ctrl.output.home);
router.get('/mesh', ctrl.output.mesh);
router.get('/mesh/:id', ctrl.process.mesh.get);

router.get('/report', ctrl.output.report);

router.post('/login', ctrl.process.login);
router.post('/register', ctrl.process.register);

// notice
router.get('/notice/:id', ctrl.process.notice.get);
router.get('/notice', ctrl.process.notice.getAll);
router.post('/createNotice', ctrl.process.notice.post);
router.delete('/deleteNotice', ctrl.process.notice.delete);
router.patch('/updateNotice', ctrl.process.notice.update);

module.exports = router;
