'use strict';

const db = require('../../config/db');

class MeshStorage {
    static getMeshInfo = () => {
        const query = 'SELECT * FROM meshs;';
        return new Promise((resolve, reject) => {
            db.query(query, (err, data) => {
                if (err) reject(`${err}`);
                resolve(data);
            });
        });
    };
}

module.exports = MeshStorage;
