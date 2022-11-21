/* eslint-disable no-console */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-use-before-define */
const isLocalhost = location.hostname === 'localhost' || location.hostname === '*';
const STORAGE_API_HOST = isLocalhost ? `http://localhost:3002` : `https://poly-gpa-calculator.herokuapp.com`;

document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signup-form');
    signupForm.onsubmit = () => {
        const usernameRegister = signupForm.querySelector('#username');
        const emailRegister = signupForm.querySelector('#email');
        const passwordRegister = signupForm.querySelector('#password');
        const confirmPassword = signupForm.querySelector('#confirmPassword');

        const username = usernameRegister.value;
        const email = emailRegister.value;
        const password = passwordRegister.value;
        const confirmPassword1 = confirmPassword.value;

        if (password !== confirmPassword1){
            Swal.fire({
                title: "Error",
                text: "Passwords do not match!",
                icon: "error",
                confirmButtonText: 'OK'
            });
            return false;
        }
        disableRegisterForm();
        fetch(`${STORAGE_API_HOST}/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username, email, password,
            }),
        })
            .then((response) => {
                if (response.ok) {
                    // alert("Successfully Registered!");
                    Swal.fire({
                        title: 'Successfully Registered!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    // go to window.location = "login.html" after 1 second
                setTimeout(() => {
                    window.location.replace("login.html")
                }, 1500);
                    return {};
                }
                return response.json();

            })
            .then((json) => {
                if (!json.error) return;
                throw new Error(json.error);
            })
            .catch((error) => {
                console.error(error);
                // alert(error.message);
                Swal.fire({
                    title: 'Error',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                
            }).finally(() => enableRegisterForm());
        return false; // prevents default and prevents propagation
    };
})

function disableRegisterForm() {
    setIsDisabledForm(true)
};


function enableRegisterForm() {
    setIsDisabledForm(false)
}

function setIsDisabledForm(isDisabled) {
    document.querySelectorAll('#signup-form input, #signup-form button')
        .forEach((element) => (element.disabled = isDisabled));
}





// The Baby Method↓↓↓↓↓↓↓↓↓↓

/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
// eslint-disable-next-line no-restricted-globals
// const isLocalhost = location.hostname === 'localhost' || location.hostname === '*';
// const STORAGE_API_HOST = isLocalhost ? `http://localhost:3002` : `https://poly-gpa-calculator.herokuapp.com`;

// window.addEventListener('DOMContentLoaded', () => {
//     // Details
//     const usernameInput = document.querySelector('#username');
//     const emailInput = document.querySelector('#email');
//     const passwordInput = document.querySelector('#password');
//     const createAcc = document.querySelector('#create');

//     const controls = [
//         // createAcc,
//     ]

//     /**
//      * Disable controls in page
//      */
//     function disablePage() {
//         controls.forEach((control) => (control.disabled = true));
//     }

//     /**
//      * Enables controls in page
//      */
//     function enablePage() {
//         controls.forEach((control) => (control.disabled = false));
//     }

//     // Signup
//     createAcc.onclick = () => {
//         disablePage();
//         const username = usernameInput.value;
//         const email = emailInput.value;
//         const password = passwordInput.value;


//         const postBody = {
//             "username": username,
//             "email": email,
//             "password": password
//         }
//         const signupHTML = document.getElementById("signupwrapper");
//         signupHTML.innerHTML = "";
//         const errors = [];
//         if (!username || !email || !password) {
//             errors.push({ message: "Please enter all fields" });
//             signupHTML.innerHTML += `<h4>Please enter all fields!</h4>`
//         }
//         if (password.length < 5) {
//             errors.push({ message: "Password should be at least 5 characters !" });
//             signupHTML.innerHTML += `<h4>Password should be at least 5 characters!</h4>`
//         }
//         if (errors.length > 0) {
//             console.log(errors);
//             // signupHTML.innerHTML += `<h4>WALAOEH!</h4>`
//             // window.stop();
//         }
//         else {
//             fetch(`${STORAGE_API_HOST}/signup`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(postBody),
//             }).then((response) => {
//                 console.log("Sign up successful", response);
//                 if (response.status !== 400) {
//                     const jsonObj = response.json();
//                     jsonObj.then((json) => {
//                         console.log(json);
//                         console.log("Added user:", json[0].username);
//                         alert("Registration success! Please Login");
//                         window.location.replace("login.html")
//                     })
//                         .catch((error) => {
//                             console.log(error)
//                             alert(error)
//                         })
//                 }
//                 else {
//                     alert("Problem");
//                 }
//             })
//                 .catch((error) => {
//                     console.log(error)
//                     alert("Something went wrong")
//                 })
//                 .finally(() => enablePage());
//         }
//     }
// })