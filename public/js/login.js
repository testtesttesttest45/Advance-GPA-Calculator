/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable no-alert */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-globals */
const isLocalhost = location.hostname === 'localhost' || location.hostname === '*';
const STORAGE_API_HOST = isLocalhost ? `http://localhost:3002` : `https://poly-gpa-calculator.herokuapp.com`;

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    loginForm.onsubmit = () => {
        const emailRegister = loginForm.querySelector('#email');
        const passwordRegister = loginForm.querySelector('#password');

        const email = emailRegister.value;
        const password = passwordRegister.value;
        disableLoginForm();
        fetch(`${STORAGE_API_HOST}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email, password,
            }),
        })
            .then((response) => response.json())
            .then((json) => {
                if (json.error) throw new Error(json.error);
                // alert("Successfully Logged In!");
                swal({
                    title: 'Success',
                    text: 'Login Successful',
                    icon: 'success',
                    button: 'OK',
                });
                const { token } = json;
                console.log(token)
                localStorage.setItem('token', token);
                // go to window.location = "index.html" after 1 second
                setTimeout(() => {
                    window.location.replace("index.html")
                }, 1500);

            })
            .catch((error) => {
                console.error(error);
                // alert(error.message);
                swal({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    button: 'OK',
                });
            })
            .finally(() => enableLoginForm());
        return false; // prevents default and prevents propagation
    };
})

function disableLoginForm() {
    setIsDisabledForm(true)
};

function enableLoginForm() {
    setIsDisabledForm(false)
}

function setIsDisabledForm(isDisabled) {
    document.querySelectorAll('#login-form input, #login-form button')
        .forEach((element) => (element.disabled = isDisabled));
}


