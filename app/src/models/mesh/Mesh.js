'use strict';

const MeshStorage = require('./MeshStorage');

class Mesh {
  async showMesh() {
    try {
      const response = await MeshStorage.getMeshInfo();
      return response;
    } catch (err) {
      return { success: false, msg: err };
    }
  }
}

module.exports = Mesh;
