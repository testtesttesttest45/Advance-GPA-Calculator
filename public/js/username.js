/* eslint-disable no-else-return */
/* eslint-disable spaced-comment */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
// function username() {
//   try {
//     const tmpToken = localStorage.getItem("token");
//     const userData = localStorage.getItem("userInfo");
//     if (tmpToken) {
//       const arr = JSON.parse(userData);
//       document.getElementById("thisusername").innerHTML = `${arr[0].username}`;
//       if (document.getElementById("signupbutton")) {
//         document.getElementById("signupbutton").innerHTML = "";
//       }
//       return;
//     }

//     document.getElementById("logoutbutton").style.display = "none";
//     return;
//   } catch (e) {
//     console.log("Error at username.js username function", e);
//   }
// }
window.onload = function () {
  ProceedProfileorLogin();
}
// eslint-disable-next-line no-unused-vars
function ProceedProfileorLogin() {
  try {
    const abc = document.getElementById("thisusername");
    // const userData = localStorage.getItem("userInfo");
    const token = localStorage.getItem("token");
    // eslint-disable-next-line no-unused-vars
    // const arr = JSON.parse(userData);
    if (!token) {
      console.log("Logged in as a guest");
      abc.href = "login.html";
      //document.getElementById("custom-share-id").style.display = "none";
      document.getElementById("logoutButton").style.display = "none";
      return;
    } else {
      console.log("Logged in as a user");
      abc.href = "profile.html";
      return;
    }
  } catch {
    console.log("Error at username.js username function");
  }

  //document.getElementById("logoutbutton").style.display = "none";
}
