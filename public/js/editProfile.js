try {
  $(document).ready(function () {
    let dataHTML = "";
    const user_id = localStorage.getItem("userid");

    $.ajax({
      url: `/user/${user_id}`,
      type: "GET",
      dataType: "json",
      success: function (data, textStatus, xhr) {
        // Ignore private here, can't be fixed with ESLint
        const { username, email, private } = data[0];

        document.getElementById("banner-username").innerHTML = username;
        document.getElementById("banner-email").innerHTML = email;
        document.getElementById("input-username").value = username;

        if (private == true) {
          document.getElementById("select-privacy").innerHTML =
            `<option value="true" selected>Private</option>` +
            `<option value="false">Public</option>`;
        } else {
          document.getElementById("select-privacy").innerHTML =
            `<option value="true">Private</option>` +
            `<option value="false" selected>Public</option>`;
        }
      },
    });
    $.ajax({
      url: `/users/${user_id}`,
      type: "GET",
      dataType: "json",
      success: function (data, textStatus, xhr) {
        if (data.length > 0) {
          let gpaArray = [];// take all data.gpa and parseFloat and put it in an array, then calculate average gpa
          for (let i = 0; i < data.length; i++) {
            gpaArray.push(parseFloat(data[i].gpa));
          }
          let averageGPA = gpaArray.reduce((a, b) => a + b, 0) / gpaArray.length;
          console.log(averageGPA.toFixed(2)); // toFixed(2) to round to 2 decimal places
          document.getElementById("banner-status").innerHTML = `Cumulative GPA: ${averageGPA.toFixed(2)}`;
          let dropdownList = document.getElementById("statusDroplist");
          let statusItems = document.getElementsByClassName("statusItems");
          // selectedItems has a  droplist of items.  When the user gets a good average gpa, the dropdown willl select the correct index of the dropdown list.
          if (averageGPA == 4) {
            document.getElementById("statusImage").src = "../media/galaxy.gif";
          }
          else if (averageGPA >= 3.8) {
            document.getElementById("statusImage").src = "../media/trophy.gif";
          }
          else if (averageGPA >= 3.2) {
            document.getElementById("statusImage").src = "../media/medal.png";
          }
          else if (averageGPA >= 2.6) {
            document.getElementById("statusImage").src = "../media/balance.png";
          }
          else if (averageGPA >= 2) {
            document.getElementById("statusImage").src = "../media/lazy.png";
          }
          else { // <2
            document.getElementById("statusImage").src = "../media/dodobird.png";
          }
          return;
        }
      }
    })
  });
} catch (ex) {
  console.log(ex);
}

try {
  const isLocalhost =
    location.hostname === "localhost" || location.hostname === "*";
  const STORAGE_API_HOST = isLocalhost
    ? `http://localhost:3002`
    : `https://poly-gpa-calculator.herokuapp.com`;

  document.addEventListener("DOMContentLoaded", () => {
    // if form is submitted
    $("#edit-profile-form").on("submit", function (e) {
      e.preventDefault();
      // get form data
      const formData = new FormData(this);
      // get form method
      const method = $(this).attr("method");

      // Extract the username and password from the form data
      const username = formData.get("username");
      const password = document.getElementById("password").value;
      const private = document.getElementById("select-privacy").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
      const user_id = localStorage.getItem("userid");

      // Create a new user object
      const user = JSON.stringify({
        username: username,
        password: password,
        confirmPassword: confirmPassword,
        user_id: user_id,
        private: private,
      });

      if (password !== confirmPassword) {
        swal({
          title: "Error",
          text: "Passwords do not match! Please check your passwords and try again",
          icon: "error",
          button: "OK",
        });
      }

      console.log(user);

      // send request
      $.ajax({
        url: `${STORAGE_API_HOST}/user/${user_id}`,
        type: method,
        data: user,
        contentType: "application/json",
        success: function (data, textStatus, xhr) {
          console.log(data);
          Swal.fire({
            title: "Success",
            text: "Profile updated successfully! Reloading now...",
            icon: "success",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(function () {
            window.location.reload();
          }
            , 2000);
        },
        error: function (xhr, textStatus, errorThrown) {
          console.log(xhr);
          Swal.fire({
            title: "Error",
            text: "Something went wrong! Please try again",
            icon: "error",
            showConfirmButton: false,
            timer: 2000,
          });
          // alert("Error updating profile!");
        },
      });
    });
  });
} catch (e) { }
