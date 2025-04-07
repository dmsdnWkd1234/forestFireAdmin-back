'use strict';

const MeshStorage = require('./MeshStorage');

class Mesh {
    constructor(body) {
        this.body = body;
    }
    async showMesh() {
        const client = this.body;
        try {
            const response = await MeshStorage.getMeshInfo();
            return response;
        } catch (err) {
            return { success: false, msg: err };
        }
    }
}

module.exports = Mesh;
