'use strict';

const NoticeList = require('./NoticeList');
const CreateNotice = require('./CreateNotice');

class Notice {
  constructor(body) {
    this.body = body;
  }
  async showNotice() {
    try {
      const response = await NoticeList.getNoticeList();
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
}

module.exports = Notice;
