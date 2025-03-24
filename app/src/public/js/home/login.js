'use strict';

const id = document.querySelector('#id');
const ps = document.querySelector('#password');
const loginbtn = document.querySelector('#login');

loginbtn.addEventListener('click', login);

const login = () => {
    const req = {
        id: id.value,
        password: ps.value,
    };
};
