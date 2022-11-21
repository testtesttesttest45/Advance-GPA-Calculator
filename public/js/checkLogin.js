/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
function decode(jwt) {
    const payloadBase64 = jwt.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    return payload;
}

export function checkIsLoggedIn(redirectTo) {
    const token = localStorage.getItem('token');
    if (token) {
        document.getElementById('signupButton').style.display = 'none';
        const payload = decode(token);
        const expiry = payload.exp;
        const now = Math.floor(+new Date() / 1000);
        const isExpired = now > expiry;
        if (isExpired) {
            alert('Token expired. Please Login again.');
            localStorage.removeItem('token');
            localStorage.removeItem('userid');
            window.location = redirectTo;
        }
        return payload;
    } else {
        // Guest View
        document.getElementById('logoutButton').style.display = 'none';
    }
}