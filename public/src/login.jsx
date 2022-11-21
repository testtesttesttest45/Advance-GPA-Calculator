const { useState, useEffect } = window.React;

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const history = useHistory();
    useEffect(() => {
        if (localStorage.getItem('token')) {
            return;
        }
    }, [])
    function login() {
        disableLoginForm();
        fetch(`/login`, {
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
    }
    return (
        <React.Fragment>
            <div className="container" style={{paddingTop: '150px'}}>
                <div style={{ width: '40%', height: '90%',  float: 'left', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '50px' }}>
                    <form id="login-form" style={{ alignItems: 'center', display: 'block', margin: 'auto' }}>
                        <strong style={{ textAlign: 'center', fontSize: '2.7em', color: 'white' }}>Log in</strong><br />
                        <label style={{ fontSize: '2em', color: 'white' }}>Email:</label>
                        <input type="text" placeholder="Email" style={{ width: '140%', fontSize: '1.5em', height: '100%' }} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" required />&nbsp;
                        <br />
                        <label style={{ fontSize: '2em', color: 'white' }}>Password:</label>
                        <input type="password" style={{ width: '140%', fontSize: '1.5em', height: '100%' }} placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="form-control" id="password" required />
                        &nbsp;
                        <div style={{ fontSize: '1.5em' }}>
                            <input type="checkbox" onClick={ShowPassword} />
                            <span style={{ color: 'white' }}>&nbsp;Show Password</span>
                        </div>
                        &nbsp;
                        <div style={{ padding: '10px', paddingLeft: '100px', fontSize: '1.5em' }}>
                            <button onClick={login} style= {{ width: 'auto', justifyContent: 'center', paddingLeft: '20px', paddingRight: '20px' }} id="loginButton" className="">Login</button><br />
                            <button type="button" style= {{ width: 'auto', textAlign: 'center' }} id="guestButton" onClick={() => window.location.replace("index.html")}>Continue as Guest</button>
                        </div>
                    </form>
                </div>
                <div style={{ width: '25%', height: '90%', float: 'right', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div>
                        <div style={{ textAlign: 'center', color: 'white', marginTop: '100px' }}>
                            <h1>No accounts?</h1>
                        </div>
                        &nbsp;
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontSize: '2em' }}><a href="signup.html" style={{ color: 'gold' }}>Click here to sign up!</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}

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
    ReactDOM.render(<Login />, document.getElementById('root'));
}
