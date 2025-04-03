'use strict';

//데이터를 가지고 있는 파일
//그러한 데이터를 처리해주는 로직

const db = require('../config/db');

class UserStorage {
    static #getUserInfo(data, id) {
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // => [id, password, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }

    static #getUsers(data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) {
            return users;
        }
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
    static getUsers(isAll, ...fields) {}

    static getUserInfo(id) {
        const query = 'SELECT * FROM users WHERE id = ?;';
        return new Promise((resolve, reject) => {
            db.query(query, [id], (err, data) => {
                if (err) reject(`${err}`);
                resolve(data[0]);
            });
        });
    }

    static async save(userInfo) {
        const query = 'INSERT INTO users(id, name, password) VALUES(?, ?, ?);';
        return new Promise((resolve, reject) => {
            db.query(query, [userInfo.id, userInfo.name, userInfo.password], (err) => {
                if (err) reject(`${err}`);
                resolve({ success: true });
            });
        });
    }
}

module.exports = UserStorage;
