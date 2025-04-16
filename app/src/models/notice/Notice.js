'use strict';

const GetNoticeById = require('./GetNoticeById');
const GetAllNotices = require('./GetAllNotices');
const CreateNotice = require('./CreateNotice');
const DeleteNotice = require('./DeleteNotice');
const UpdateNotice = require('./UpdateNotice');

class Notice {
  constructor(body) {
    this.body = body;
  }
  async getNoticeById(id) {
    try {
      const response = await GetNoticeById.getNoticeById(id);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
  async getAllNotices() {
    try {
      const response = await GetAllNotices.getAllNotices();
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
  async postNotice() {
    const client = this.body;
    try {
      const response = await CreateNotice.postNotice(client);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async deleteNotice() {
    const client = this.body;
    try {
      const response = await DeleteNotice.delete(client);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async updateNotice() {
    const client = this.body;
    try {
      const response = await UpdateNotice.update(client);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Notice;
