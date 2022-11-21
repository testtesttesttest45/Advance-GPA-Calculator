/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable radix */
/* eslint-disable no-multi-assign */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable object-shorthand */
/* eslint-disable camelcase */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */

// Getting a plan
$(document).ready(function () {




    // Getting a plan
    const user_id = localStorage.getItem('userid');
    let planHTML = '';
    $.ajax({
        url: `/plan/${user_id}`,
        type: 'GET',
        dataType: 'json',
        success: function (response, textStatus, xhr) {
            console.log(response)
            if (response.length == 0 || response == null) {
                document.getElementById('gpa-stat').style.color = 'red';
                document.getElementById('gpa-stat').innerHTML = "<h1>No plan yet.</h1>";

            } else {
                // // console.log('Reached line 98 of plan.js');
                // append this <div><button class="btn btn-danger" id="deleteButton" onclick="delete(PLANNERID)">Delete Plan</button></div> to class bio-row[3]
                document.getElementsByClassName('bio-row')[3].innerHTML += `<div><button class="btn btn-danger" id="${response.planner_id}" onclick="deletion(this.id)">Delete Plan</button></div>`;
                // const {
                //     current_gpa,
                //     target_gpa,
                //     current_credits,
                //     future_credits
                // } = data[0];
                const currentGPA = document.getElementById('panel-body-current-gpa').innerHTML = parseFloat(response.current_gpa);
                const targetGPA = document.getElementById('panel-body-target-gpa').innerHTML = parseFloat(response.target_gpa);
                const currentCredits = document.getElementById('panel-body-current-credits').innerHTML = parseInt(response.current_credits);
                const futureCredits = document.getElementById('panel-body-future-credits').innerHTML = parseInt(response.future_credits);




                // console.log(typeof (response.current_gpa));
                if ((currentGPA < targetGPA)) {
                    document.getElementById('gpa-stat').style.color = '#FA8072';
                    document.getElementById('gpa-stat').append(`
                My current GPA is ${(targetGPA - currentGPA).toFixed(2)} lower than my target GPA.
                `);
                } else if (currentGPA > targetGPA) {
                    document.getElementById('gpa-stat').style.color = '#228B22';
                    document.getElementById('gpa-stat').append(`
                My current GPA is ${(currentGPA - targetGPA).toFixed(2)} higher than my target GPA.
            `);
                } else {
                    document.getElementById('gpa-stat').style.color = '#87CEFA';
                    document.getElementById('gpa-stat').append(`
                My current GPA is the same as my target GPA.
            `);
                }

                if (currentCredits < futureCredits) {
                    document.getElementById('credit-stat').style.color = '#FA8072';
                    document.getElementById('credit-stat').append(`
                    I plan to take ${(futureCredits - currentCredits)} more credits in the next semester.
                `);
                } else if (currentCredits > futureCredits) {
                    document.getElementById('credit-stat').style.color = '#228B22';
                    document.getElementById('credit-stat').append(`
                    I plan to take ${(currentCredits - futureCredits)} fewer credits in the next semester.
                `);
                } else {
                    document.getElementById('credit-stat').style.color = '#87CEFA';
                    document.getElementById('credit-stat').append(`
                    I plan to take the same number of credits in the next semester.
                `)
                }
            }
        },
    });
    $.ajax({
        url: `/fulfilledplans/${user_id}`,
        type: 'GET',
        dataType: 'json',
        success: function (response, textStatus, xhr) {
            if (response) {
                console.log(response)
                // for each response, append to the div with id "fulfilled-plans", current_gpa, target_gpa, current_credits, future_credits
                for (let i = 0; i < response.length; i++) {
                    const {
                        current_gpa,
                        target_gpa,
                        current_credits,
                        future_credits
                    } = response[i];
                    planHTML += `
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title">${response[i].created_on}</h3>
                            
                        </div>
                        <div class="panel-body">
                            <div class="row">
                                <div class="col-md-6">
                                    <h4>Current GPA: ${current_gpa}</h4>
                                    <h4>Target GPA: ${target_gpa}</h4>
                                    <h4>Current Credits: ${current_credits}</h4>
                                    <h4>Future Credits: ${future_credits}</h4>
                                </div>
                                <div class="col-md-6">
                                    <button class="btn btn-danger" id="${response[i].planner_id}" onclick="deletion(this.id)">Delete Plan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;

                }
                document.getElementById('testing').innerHTML = planHTML;
                document.getElementById('banner-fulfillCount').innerHTML = "You have " + response.length + " fulfilled plans.";





            } else {
                document.getElementById('testing').style.color = 'red';
                document.getElementById('testing').innerHTML = "<h1>No plans fulfilled yet.</h1>";
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            console.log("problem");
        }

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
            }
        },
    });
    $.ajax({
        url: `/user/${user_id}`,
        type: "GET",
        dataType: "json",
        success: function (data, textStatus, xhr) {
            if (data.length > 0) {
                document.getElementById("banner-username").innerHTML = data[0].username;
                document.getElementById("banner-email").innerHTML = data[0].email;
            }
        }
    })

    function deletion(id) {
        // console.log(id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to restore it!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm'
        }).then((result) => {
            if (result.value) {
                $.ajax({
                    url: `/plans/${id}`,
                    type: 'DELETE',
                    dataType: 'json',
                    success: function (response, textStatus, xhr) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: 'Your plan has been deleted. Refresh the page to see the changes',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        })
                    },
                    error: function (response, textStatus, xhr) {
                        Swal.fire({
                            title: 'Error!',
                            text: 'Delete plan failed.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        })
                    }
                })
            }
        })


    }
})