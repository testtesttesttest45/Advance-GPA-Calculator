/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-useless-return */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable import/extensions */
import { checkIsLoggedIn } from "./checkLogin.js";

const payload = checkIsLoggedIn('login.html');
document.addEventListener('DOMContentLoaded', () => {
    if (payload) {
        console.log(payload, "Token expires on ", new Date(payload.exp * 1000).toLocaleString());
        document.getElementById('thisusername').textContent = payload.username;
        localStorage.setItem("userid", payload.userid);
        return;
    }
});

$(document).ready(function () {
    $("#logoutButton").click(function () {
        window.localStorage.clear();
        window.location.assign("login.html");
    });
}); 