'use strict';

const NoticeList = require('./NoticeList');

class Notice {
  async showNotice() {
    try {
      const response = await NoticeList.getNoticeList();
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Notice;
