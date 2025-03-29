'use strict';

const id = document.querySelector('#id');
const ps = document.querySelector('#password');
const name = document.querySelector('#name');
const confirmPs = document.querySelector('#confirm-password');
const registerBtn = document.querySelector('#button');

registerBtn.addEventListener('click', register);
function register() {
    if (!id.value) {
        return alert('아이디를 입력하세요');
    }
    if (ps.value !== confirmPs.value) {
        return alert('비밀번호가 일치하지 않습니다');
    }
    const req = {
        id: id.value,
        name: name.value,
        password: ps.value,
    };

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                location.href = '/login';
            } else {
                alert(res.msg);
            }
        });
    // .catch((err) => console.error(new Error('회원가입 중 에러 발생')));
}
