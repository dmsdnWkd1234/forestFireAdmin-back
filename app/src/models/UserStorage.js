'use strict';

//데이터를 가지고 있는 파일
//그러한 데이터를 처리해주는 로직

class UserStorage {
    static #user = {
        id: ['kew0620', '김은우'],
        password: ['kew0620', '김은우'],
        name: ['으노밍', '으노밍의 부하'],
    };

    static getUsers(...fields) {
        const users = this.#user;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static getUserInfo(id) {
        const users = this.#user;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // => [id, password, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static save(userInfo) {
        const users = this.#user;
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.password.push(userInfo.password);
        return { success: true };
    }
}

module.exports = UserStorage;
