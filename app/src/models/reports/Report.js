'use strict';

const ReportListStorage = require('./ReportListStorage');

class Report {
  async showReport() {
    try {
      const response = await ReportListStorage.getReport();
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Report;
