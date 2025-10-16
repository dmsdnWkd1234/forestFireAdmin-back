'use strict';

const MeshStorage = require('./MeshStorage');
const MeshById = require('./MeshById');

class Mesh {
  async showMesh() {
    try {
      const response = await MeshStorage.getMeshInfo();
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async showMeshById(id) {
    try {
      const response = await MeshById.getMeshInfoById(id);
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }

  async showMeshByData(options) {
    try {
      const response = await MeshHistoryStorage.getHistoryData(options);
      return response;
    } catch (err) {
      return { success: false, msg: err.message };
    }
  }
}

module.exports = Mesh;
