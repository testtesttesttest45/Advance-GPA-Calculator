/* eslint-disable no-unsafe-finally */
/* eslint-disable block-scoped-var */
/* eslint-disable no-else-return */
/* eslint-disable no-cond-assign */
/* eslint-disable no-undef-init */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
/* eslint-disable vars-on-top */
/* eslint-disable object-shorthand */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
/* eslint-disable one-var */
/* eslint-disable no-var */
var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i.return) _i.return(); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _window$React = window.React,
    useState = _window$React.useState,
    useEffect = _window$React.useEffect;


function Login() {
    var _useState = useState(""),
        _useState2 = _slicedToArray(_useState, 2),
        email = _useState2[0],
        setEmail = _useState2[1];

    var _useState3 = useState(""),
        _useState4 = _slicedToArray(_useState3, 2),
        password = _useState4[0],
        setPassword = _useState4[1];
    // const history = useHistory();


    useEffect(function () {
        if (localStorage.getItem('token')) {
            return;
        }
    }, []);
    function login() {
        disableLoginForm();
        fetch("/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            if (json.error) throw new Error(json.error);
            // alert("Successfully Logged In!");
            Swal.fire({
                title: 'Successfully Logged In!',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            var token = json.token;

            console.log(token);
            localStorage.setItem('token', token);
            // go to window.location = "index.html" after 1 second
            setTimeout(function () {
                window.location.replace("index.html");
            }, 1500);
        }).catch(function (error) {
            console.error(error);
            // alert(error.message);
            Swal.fire({
                title: 'Error',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }).finally(function () {
            return enableLoginForm();
        });
        return false; // prevents default and prevents propagation
    }
    return React.createElement(
        React.Fragment,
        null,
        React.createElement(
            "div",
            { className: "container", style: { paddingTop: '150px' } },
            React.createElement(
                "div",
                { style: { width: '40%', height: '90%', float: 'left', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '50px' } },
                React.createElement(
                    "form",
                    { id: "login-form", style: { alignItems: 'center', display: 'block', margin: 'auto' } },
                    React.createElement(
                        "strong",
                        { style: { textAlign: 'center', fontSize: '2.7em', color: 'white' } },
                        "Log in"
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        { style: { fontSize: '2em', color: 'white' } },
                        "Email:"
                    ),
                    React.createElement("input", {
                        type: "text", placeholder: "Email", style: { width: '140%', fontSize: '1.5em', height: '100%' }, onChange: function onChange(e) {
                            return setEmail(e.target.value);
                        }, className: "form-control", id: "email", required: true
                    }),
                    "\xA0",
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        { style: { fontSize: '2em', color: 'white' } },
                        "Password:"
                    ),
                    React.createElement("input", {
                        type: "password", style: { width: '140%', fontSize: '1.5em', height: '100%' }, placeholder: "Password", onChange: function onChange(e) {
                            return setPassword(e.target.value);
                        }, className: "form-control", id: "password", required: true
                    }),
                    "\xA0",
                    React.createElement(
                        "div",
                        { style: { fontSize: '1.5em' } },
                        React.createElement("input", { type: "checkbox", onClick: ShowPassword }),
                        React.createElement(
                            "span",
                            { style: { color: 'white' } },
                            "\xA0Show Password"
                        )
                    ),
                    "\xA0",
                    React.createElement(
                        "div",
                        { style: { padding: '10px', paddingLeft: '100px', fontSize: '1.5em' } },
                        React.createElement(
                            "button",
                            { onClick: login, style: { width: 'auto', justifyContent: 'center', paddingLeft: '20px', paddingRight: '20px' }, id: "loginButton", className: "" },
                            "Login"
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            {
                                type: "button", style: { width: 'auto', textAlign: 'center' }, id: "guestButton", onClick: function onClick() {
                                    return window.location.replace("index.html");
                                }
                            },
                            "Continue as Guest"
                        )
                    )
                )
            ),
            React.createElement(
                "div",
                { style: { width: '25%', height: '90%', float: 'right', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' } },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { style: { textAlign: 'center', color: 'white', marginTop: '100px' } },
                        React.createElement(
                            "h1",
                            null,
                            "No accounts?"
                        )
                    ),
                    "\xA0",
                    React.createElement(
                        "div",
                        { style: { textAlign: 'center' } },
                        React.createElement(
                            "p",
                            { style: { fontSize: '2em' } },
                            React.createElement(
                                "a",
                                { href: "signup.html", style: { color: 'gold' } },
                                "Click here to sign up!"
                            )
                        )
                    )
                )
            )
        )
    );
}

function disableLoginForm() {
    setIsDisabledForm(true);
};

function enableLoginForm() {
    setIsDisabledForm(false);
}

function setIsDisabledForm(isDisabled) {
    document.querySelectorAll('#login-form input, #login-form button').forEach(function (element) {
        return element.disabled = isDisabled;
    });
}

function ShowPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}

// render Login component into the root
window.onload = function () {
    ReactDOM.render(React.createElement(Login, null), document.getElementById('root'));
};