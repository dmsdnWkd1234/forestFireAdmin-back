'use strict';

const id = document.querySelector('#id');
const ps = document.querySelector('#password');
const loginbtn = document.querySelector('#button');

loginbtn.addEventListener('click', login);

function login() {
    const req = {
        id: id.value,
        password: ps.value,
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    });
}
