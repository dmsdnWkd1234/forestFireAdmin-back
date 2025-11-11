'use strict';

// ESM import statements
import express from 'express';
// (수정) .js 확장자 추가 (home.ctrl.js 파일 확인 필요)
import { output, process } from './home.ctrl.js';

const router = express.Router();

router.get('/', output.home);
router.get('/api/mesh', output.mesh);
router.get('/api/mesh/data', process.mesh.getByData);
router.get('/api/mesh/:id', process.mesh.get);

router.get('/api/report', output.report);

router.post('/login', process.login);
router.post('/register', process.register);

// notice
router.get('/api/notice/:id', process.notice.get);
router.get('/api/notice', process.notice.getAll);
router.post('/api/createNotice', process.notice.post);
router.delete('/api/deleteNotice', process.notice.delete);
router.patch('/api/updateNotice', process.notice.update);

//chat
router.post('/api/postToAi', process.chat.post);
router.get('api/getByAi');

//dashboard
router.post('/api/dashboard', process.dashboard.get);

// (수정) module.exports -> export default
export default router;
