/* eslint-disable radix */
/* eslint-disable no-loop-func */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable func-names */
/* eslint-disable no-restricted-globals */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
function deleteRecord(resultId) {
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this record!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      axios({
        method: "delete",
        url: `/result/${resultId}`,
        headers: { "Content-Type": "application/json" },
      })
        .then(function (response) {
          swal({
            title: "Success!",
            text: "Poof! Your record has been deleted!",
            icon: "success",
            button: "OK",
          }).then((value) => {
            location.reload();
          });
        })
        .catch(function (response) {
          swal({
            title: "Error!",
            text: "Record could not be deleted",
            icon: "error",
          }).then((value) => {
            location.reload();
          });
        });
    } else {
      swal("Your record is safe!");
    }
    
  });
}


try {
  $(document).ready(function () {
    let dataHTML = "";
    const user_id = localStorage.getItem('userid');

    $.ajax({
      url: `/user/${user_id}`,
      type: "GET",
      dataType: "json",
      success: function (data, textStatus, xhr) {
        const {
          username,
          email
        } = data[0];

        document.getElementById("banner-username").innerHTML = username;
        document.getElementById("banner-email").innerHTML = email;
        document.getElementById("panel-body-username").innerHTML = username;
        document.getElementById("panel-body-email").innerHTML = email;
      },
    });
  });
}

catch (ex) {
  console.log(ex)
}

//try {
$(document).ready(function () {
  let dataHTML = "";
  const user_id = localStorage.getItem('userid');

  const displayingNumbers = document.getElementById('displayingNumbers');

  $.ajax({
    url: `/users/${user_id}`,
    type: "GET",
    dataType: "json",
    success: function (data, textStatus, xhr) {
      //change to if user is logged in , get data from database
      if (data.length > 0) {
        let gpaArray = [];// take all data.gpa and parseFloat and put it in an array, then calculate average gpa
        for (let i = 0; i < data.length; i++) {
          gpaArray.push(parseFloat(data[i].gpa));
        }
        let averageGPA = gpaArray.reduce((a, b) => a + b, 0) / gpaArray.length;
        console.log(averageGPA.toFixed(2)); // toFixed(2) to round to 2 decimal places
        document.getElementById("banner-status").innerHTML += `Cumulative GPA: ${averageGPA.toFixed(2)}`;
        let dropdownList = document.getElementById("statusDroplist");
        let statusItems = document.getElementsByClassName("statusItems");
        // selectedItems has a  droplist of items.  When the user gets a good average gpa, the dropdown willl select the correct index of the dropdown list.
        if (averageGPA == 4) {
          statusItems[0].setAttribute("selected", "selected"); //prodigy
          // find img src id "statusImage" and replace picture to ../media/galaxy.gif
          document.getElementById("statusImage").src = "../media/galaxy.gif";
        }
        else if (averageGPA >= 3.8) {
          statusItems[1].setAttribute("selected", "selected"); //ace
          document.getElementById("statusImage").src = "../media/trophy.gif";
        }
        else if (averageGPA >= 3.2) {
          statusItems[2].setAttribute("selected", "selected"); //good
          document.getElementById("statusImage").src = "../media/medal.png";
        }
        else if (averageGPA >= 2.6) {
          statusItems[3].setAttribute("selected", "selected"); //normal
          document.getElementById("statusImage").src = "../media/balance.png";
        }
        else if (averageGPA >= 2) {
          statusItems[4].setAttribute("selected", "selected"); //bad
          document.getElementById("statusImage").src = "../media/lazy.png";
        }
        else { // <2
          statusItems[5].setAttribute("selected", "selected"); //hopeless
          document.getElementById("statusImage").src = "../media/dodobird.png";
        }

        const sortButton = document.getElementById('sortButton');
        const sortByGpa = document.getElementsByClassName('gpaSort');
        const sortByCreation = document.getElementsByClassName('creationSort');
        const profileDetails2 = document.getElementById('profileDetails2');
        setTimeout(function () { // I am not sure why I always have to setTimeout here, it appears the data is not loaded yet, without setTimeout, sortButton.click() alone will not get triggered
          sortButton.click();
        }, 0);
        for (var i = 0; i < sortByGpa.length; i++) {
          sortByGpa[i].checked = false;
        }
        for (var i = 0; i < sortByCreation.length; i++) {
          sortByCreation[i].checked = false;
        }
        sortByCreation[1].checked = true;
        for (let i = 0; i < sortByGpa.length; i++) {
          sortByGpa[i].addEventListener('click', function () {
            for (let j = 0; j < sortByGpa.length; j++) {
              sortByGpa[j].checked = false;
              sortByCreation[j].checked = false;
            }
            sortByGpa[i].checked = true; // check myself
          })
        }
        for (let i = 0; i < sortByCreation.length; i++) {
          sortByCreation[i].addEventListener('click', function () { // when an element in sortByCreation is clicked, uncheck all other elements in the same class
            for (let j = 0; j < sortByCreation.length; j++) {
              sortByCreation[j].checked = false;
              // uncheck all elements in sortByCreation
              for (let k = 0; k < sortByCreation.length; k++) {
                sortByCreation[k].checked = false;
                sortByGpa[k].checked = false;
              }
            }
            sortByCreation[i].checked = true; // check myself
          })
          //return parseFloat(b.gpa) - parseFloat(a.gpa);
        }
        // depending on what sort option is checked, sort the data accordingly. example if sortByGPA[0] is checked, sort by gpa descending
        sortButton.addEventListener('click', function () {
          for (let i = 0; i < sortByGpa.length; i++) {
            if (sortByGpa[i].checked) {
              if (sortByGpa[i].value === 'Descending') {
                console.log("Descending GPA, best first");
                data.sort(function (a, b) {
                  // convert to parseFloat to avoid NaN error
                  return parseFloat(b.gpa) - parseFloat(a.gpa);
                });
              } else {
                console.log("Ascending GPA, worst first");
                data.sort(function (a, b) {
                  // convert to parseFloat to avoid NaN error
                  return parseFloat(a.gpa) - parseFloat(b.gpa);
                });
              }
              console.log("after  sorting by gpa", data);
            }
          }
          // similarly for sortByCreation, if sortByCreation[0] is checked, sort by creation date descending
          for (let i = 0; i < sortByCreation.length; i++) {
            if (sortByCreation[i].checked) {
              if (sortByCreation[i].value === 'Descending') {
                console.log("Descending creation date, newest first");
                data.sort(function (a, b) {
                  // compare dates, convert to miliseconds using  new Date(x).getTime(), visit test.js . in this case, my created_on is stored as  "30 July 2022, 5:20:17 pm"
                  return new Date(b.created_on).getTime() - new Date(a.created_on).getTime();
                });
              } else {
                console.log("Ascending creation date, oldest first");
                data.sort(function (a, b) {
                  return new Date(a.created_on).getTime() - new Date(b.created_on).getTime();
                });
              }
              console.log("after  sorting by creation date", data);
            }
          }
          // console.log("finallised sorting", data);

          for (let i = 0; i < data.length; i++) {
            // Variables
            let gpa = 0;
            let totalCredit = 0;
            let arr = JSON.parse(data[i].data);
            // Extracting the gpa and total credit
            arr.map((item) => {
              const {
                name,
                credit,
                grade,
                key
              } = item;

              // gpa += credit * grade;
              totalCredit += credit;
            });

            // create pagination buttons, each page button stores 4
            let pageContainer = document.getElementById('pageContainer');
            pageContainer.innerHTML = ''; // clear the current pagination
            displayingNumbers.innerHTML = ''; // clear the current displaying numbers
            // create a new pagination based on the filtered modules 
            let pageNumber = Math.ceil(data.length / 4);
            for (var j = 1; j <= pageNumber; j++) {
              let pageContainer = document.getElementById('pageContainer');
              let pageNumber = document.createElement('button');
              pageNumber.className = 'pagingButtons';
              pageNumber.innerHTML = j;
              pageNumber.setAttribute('id', j);
              pageContainer.appendChild(pageNumber);
              pageNumber.addEventListener('click', function () {
                let n = pageNumber.id;
                let start = (n - 1) * 4;
                let end = n * 4;
                let allButtons = document.getElementsByClassName('pagingButtons');
                for (var i = 0; i < allButtons.length; i++) {
                  if (allButtons[i].id != n) {
                    allButtons[i].style.backgroundColor = 'white';
                    allButtons[i].disabled = false;
                  } else {
                    allButtons[i].style.backgroundColor = '#007fff';
                    allButtons[i].disabled = true;
                  }
                }
                // if current page is not the last page, i will "Displaying 1-4 of 10 results", but if page 2 is last, i will "Displaying 5-10 of 10 results"
                if (n != allButtons.length) {
                  displayingNumbers.innerHTML = `Displaying ${start + 1} - ${end} of ${data.length} semesters`;
                } // else if n is the last page and there are more than 4 results, i will "Displaying 5-10 of 10 results"
                else if (n == allButtons.length) {
                  displayingNumbers.innerHTML = `Displaying ${start + 1} - ${data.length} of ${data.length} semesters`;
                }


                let dataHTML = "";
                for (let i = start; i < end; i++) {
                  if (i < data.length) {
                    let gpa = 0;
                    let totalCredit = 0;
                    let arr = JSON.parse(data[i].data);
                    // Extracting the gpa and total credit
                    arr.map((item) => {
                      const {
                        name,
                        credit,
                        grade,
                        key
                      } = item;

                      gpa += credit * grade;
                      totalCredit += credit;
                      // console.log((data[1].gpa) + (data[2].gpa)) // testing: 3.50 + 4.00 = 3.504.00 
                      // console.log(parseFloat(data[1].gpa) + parseFloat(data[2].gpa)) // testing: 3.50 + 4.00 = 7.5
                      //  <h1 style="margin-bottom:0;color:navy;font-weight:bold">GPA For Semester ${i + 1}: ${data[i].gpa}</h1>
                    });
                    dataHTML += `
                                      <div class="col-md-12">
                                          <div class="row" style="border:2px solid navy;margin:10px;">
                                          <div class="panel-body bio-graph-info">
                                              <h1 style="margin-bottom:0;color:navy;font-weight:bold">GPA For Semester: ${data[i].gpa}</h1>
                                              <p style="margin-bottom:0;color:navy;font-style:italic;">${data[i].created_on}</p>
                                              <br />
                                              <button class="btn btn-info" id="${data[i].key}" onclick="href(this.id)">Go to Result</button>
                                              <button class="btn btn-danger" id="deleteSet" onclick="deleteRecord(${parseInt(data[i].result_id)})">Delete Set</button>
                                          </div>`;
                    arr.map((item) => {
                      dataHTML +=
                        `<div class="col-md-3"> 
                                                  <div class="panel" style="border:2px solid navy;width:95px;padding:0px;margin: 0px 0px 10px 0px">
                                                      <div class="panel-body" style="width:100px;">
                                                          <div class="bio-desk" style="width:100px">
                                                              <h4 class="terques" style="color:navy">${item.name}</h4>
                                                              <p>Grade : ${item.grade}</p>
                                                              <p>Credit : ${item.credit}</p>
                                                          </div>
                                                      </div>
                                                  </div>
                                              </div>
                                          `;
                    });
                    dataHTML += `</div></div>`
                  } // Notes: This was different from the pagination in modules page. There is mapping here, along with classifying them in the correct sets
                }
                document.getElementById('profileDetails2').innerHTML = dataHTML;
              })
            }
            let allButtons = document.getElementsByClassName('pagingButtons');
            setTimeout(function () {
              allButtons[0].click();
            }, 0);
          }
        })
      } else {
        dataHTML = `
                          <div class="panel-body bio-graph-info">
                          <h1 style="margin-bottom: 0; color: red; text-align: center;">No records available; Click <a href="index.html" style="color: blue;">here</a> to make some!</h1>
                          </div>`}
      $("#profileDetails2").append(dataHTML);
    },
  });
});
// } catch (ex) {
//     console.log(ex)
// }
function href(id) {
  const isLocalhost = location.hostname === 'localhost' || location.hostname === '*';
  const STORAGE_API_HOST = isLocalhost ? `http://localhost:3002` : `https://poly-gpa-calculator.herokuapp.com`;     //window.open = `${STORAGE_API_HOST}/results.html?key=${id}`
  return window.open(`${STORAGE_API_HOST}/results.html?key=${id}`);
}

// $(document).ready(function () {
//     const sortButton = document.getElementById('sortButton');
//     const sortByGpa = document.getElementsByClassName('gpaSort');
//     const sortByCreation = document.getElementsByClassName('creationSort');
//     const profileDetails2 = document.getElementById('profileDetails2');
//     const pageContainer = document.getElementById('pageContainer');

//     for (var i = 0; i < sortByGpa.length; i++) {
//         sortByGpa[i].checked = false;
//     }
//     for (var i = 0; i < sortByCreation.length; i++) {
//         sortByCreation[i].checked = false;
//     }
//     sortByCreation[1].checked = true;
//     for (let i = 0; i < sortByGpa.length; i++) { // what am i doing here? i'm looping through the elements in sortByGpa and adding a listener to each one
//         sortByGpa[i].addEventListener('click', function () { // when an element in sortByGpa is clicked, uncheck all other elements in the same class
//             for (let j = 0; j < sortByGpa.length; j++) {
//                 sortByGpa[j].checked = false;
//                 // uncheck all other elements in sortByCreation as well
//                 sortByCreation[j].checked = false;
//             }
//             sortByGpa[i].checked = true; // check myself
//         })
//     }
//     for (let i = 0; i < sortByCreation.length; i++) { // what am i doing here? i'm looping through the elements in sortByCreation and adding a listener to each one
//         sortByCreation[i].addEventListener('click', function () { // when an element in sortByCreation is clicked, uncheck all other elements in the same class
//             for (let j = 0; j < sortByCreation.length; j++) {
//                 sortByCreation[j].checked = false;
//                 // uncheck all elements in sortByCreation
//                 for (let k = 0; k < sortByCreation.length; k++) {
//                     sortByCreation[k].checked = false;
//                     sortByGpa[k].checked = false;
//                 }
//             }
//             sortByCreation[i].checked = true; // check myself
//         })
//     }

//     let dataHTML = "";
//     const user_id = localStorage.getItem('userid');
//     $.ajax({
//         url: `/users/${user_id}`,
//         type: "GET",
//         dataType: "json",
//         success: function (response, textStatus, xhr) {
//             console.log(response);
//             if (response.length > 0) {
//                 // parse each response.data into an array of objects
//                 for (let i = 0; i < response.length; i++) {
//                     let data = JSON.parse(response[i].data);
//                     console.log(data);
//                     // we now have data.credit, data.grade, data.name, response.gpa
//                     // now we want to create pagination based on the total results, each page stores 5 results

//                 }
//             }






//         },
//         error: function (xhr, textStatus, errorThrown) {
//             console.log(xhr);
//         }
//     });



// });






