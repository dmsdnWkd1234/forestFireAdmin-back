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
}

module.exports = UserStorage;
