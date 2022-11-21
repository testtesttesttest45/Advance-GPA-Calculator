/* eslint-disable radix */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable prefer-template */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable spaced-comment */
/* eslint-disable no-undef */
$(document).ready(function Planner() { //document.ready is used to call the function when the page is loaded
    const currentGPA = document.getElementById('currentGPA');
    const targetGPA = document.getElementById('targetGPA');
    const currentCredits = document.getElementById('currentCredits');
    const futureCredits = document.getElementById('futureCredits');
    const GPA = document.getElementById('GPA');
    const totalCredits = document.getElementById('totalCredits');
    const saveButton = document.getElementById('saveButton');
    const user_id = localStorage.getItem('userid');
    const planButtons = document.getElementById('planButtons');
    $.ajax({
        url: '/plan/' + user_id, //  or `/plan/${user_id}`
        type: 'GET',  // first, we get plans if any. Retrieved plans are all unfulfilled. If got, we will display them, if not, we will create manually
        dataType: 'json',
        success: (response, txtStat, xhr) => {
            console.log('Plan retrieved successfully!');
            if (response.length === 0) {
                console.log('No plans found!');
                let calculateButton = document.getElementById('calculateGPA');
                // each time we click the calculate button, we display whats on GPA and totalCredits to currentGPA and currentCredits
                calculateButton.addEventListener('click', function () {
                    currentGPA.value = GPA.value;
                    currentCredits.value = totalCredits.value;
                })
                // no plans so we will make one when button is clicked
                saveButton.addEventListener('click', function () {
                    $.ajax({
                        url: '/plans2',
                        type: 'POST',
                        dataType: 'json',
                        data: {
                            current_gpa: currentGPA.value,
                            target_gpa: targetGPA.value,
                            current_credits: currentCredits.value,
                            future_credits: futureCredits.value,
                            fk_userid: user_id
                        },
                        success: (response, txtStat, xhr) => {
                            console.log('Plan added successfully!');
                            // alert("OK");
                            Swal.fire({
                                title: "Success!",
                                text: "Plan added successfully! Reloading now...",
                                icon: "success",
                                showConfirmButton: false,
                                timer: 1500
                            })
                            setTimeout(function () {
                                window.location.reload();
                            }, 1500);
                        },
                        error: (xhr, txtStat, error) => {
                            // alert("Problem posting plan");
                            Swal.fire({
                                title: "Error!",
                                text: "There was an error while posting your plan, please try again!",
                                icon: "error"
                            })
                        }
                    })
                })
            }
            else { // got 1 plan , isFulfilled is false
                console.log('Plan found!');
                console.log(response);
                //disable all these inputs first, we will allow edits via the edit button
                currentGPA.disabled = true;
                targetGPA.disabled = true;
                currentCredits.disabled = true;
                futureCredits.disabled = true;
                currentGPA.value = response.current_gpa;
                targetGPA.value = response.target_gpa;
                currentCredits.value = response.current_credits;
                futureCredits.value = response.future_credits;
                document.getElementById('createdText').innerHTML = `Created/Updated on ${response.created_on}`;
                saveButton.textContent = 'Edit Plan';
                saveButton.addEventListener('click', function () { // do a loop check, if button is clicked, then enable 2 inputs, and change the button to save. Only when the button text is Save, will we be able to send a Put request to update the plan
                    if (saveButton.textContent === 'Edit Plan') {
                        targetGPA.disabled = false;
                        futureCredits.disabled = false;
                        currentGPA.value = GPA.value; // from the current dom, we get the current GPA we just calculated
                        currentCredits.value = totalCredits.value; // from the current dom, we can get the total credits
                        saveButton.textContent = 'Confirm Edit';
                        CancelEditPlan(response);
                    } else {
                        saveButton.disabled = true; // prevent spamming, disable the button, but enable after data is confirmed
                        const planner_id = response.planner_id;
                        console.log(planner_id);
                        // if savedButton is clicked while the textContent is "Confirm Edit", we will check again if the GPA and Credits is enough than specified to show fulfils

                        let tga = parseFloat(document.getElementById('targetGPA').value); // totalcredits and future credits are always whole numbers. convert string to number
                        let fc = parseInt(document.getElementById('futureCredits').value);
                        let tc = parseInt(document.getElementById('totalCredits').value); // just to update the fulfill button if plan got edited
                        if (tga && fc && parseFloat(GPA.value) && tc !== '') {
                            if (parseFloat(GPA.value) >= tga && tc >= fc) {
                                fulfillButton.style.visibility = 'visible';
                            }
                            else {
                                fulfillButton.style.visibility = 'hidden';
                            }
                        }

                        $.ajax({
                            url: '/plan/' + planner_id,
                            type: 'PUT',
                            dataType: 'json',
                            data: {
                                current_gpa: currentGPA.value,
                                target_gpa: targetGPA.value,
                                current_credits: currentCredits.value,
                                future_credits: futureCredits.value,
                            },
                            success: (response, txtStat, xhr) => {
                                // console.log('Plan updated successfully!');
                                // alert("Plan updated successfully!");
                                Swal.fire({
                                    title: "Success!",
                                    text: "Plan updated successfully!",
                                    icon: "success"
                                })
                                saveButton.disabled = false;
                                fetch('/plan/' + user_id) // get a new response from the server to updated the created_on data
                                    .then(response => response.json())
                                    .then(response => {
                                        document.getElementById('createdText').innerHTML = `Created/Updated on ${response.created_on}`;
                                    })
                                if (document.getElementById('cancelButton')) { // remove the cancel button only if there is one
                                    document.getElementById('cancelButton').disabled = true;
                                    document.getElementById('cancelButton').remove();
                                }
                            },
                            error: (xhr, txtStat, error) => {
                                // alert("Problem updating plan");
                                Swal.fire({
                                    title: "Error!",
                                    text: "There was a problem updating your plan",
                                    icon: "error"
                                })
                            }
                        })
                        currentGPA.disabled = true;
                        targetGPA.disabled = true;
                        currentCredits.disabled = true;
                        futureCredits.disabled = true;
                        saveButton.textContent = 'Edit Plan';
                    }
                });
                const fulfillButton = document.getElementById('fulfillButton'); // this will be the button to fulfill the plan, but will be hidden until our gpa and credits has surpasesed the planned
                const plannerID = response.planner_id;
                fulfillButton.onclick = function () {
                    Swal.fire({
                        title: 'Congratulations!',
                        text: 'Your current GPA and credits have met your target GPA and credits! Do you want to fulfill your plan? You will still be able to view fulfilled plans in your profile.',
                        icon: 'success',
                        showCancelButton: true,
                        confirmButtonColor: 'blue',
                        cancelButtonColor: 'gray',
                        confirmButtonText: 'Yes, fulfill my plan!'
                    }).then((result) => {
                        if (result.value) {
                            $.ajax({
                                url: '/fulfilplan/' + plannerID,
                                type: 'PUT',
                                dataType: 'json',
                                // data: {
                                //     fk_userid: user_id // no need data, we will just update the isFulfilled to true
                                // },
                                success: (response2, txtStat, xhr) => {
                                    Swal.fire({
                                        title: 'Congratulations!',
                                        // text: 'Your plan has been fulfilled! Reloading now...', // I do not know how to do without reloading... 
                                        text: 'Your plan has been fulfilled! Do you want to reload?',
                                        icon: 'question',
                                        showCancelButton: true,
                                        confirmButtonColor: 'blue',
                                        cancelButtonColor: 'gray',
                                        confirmButtonText: 'Yes, reload!'
                                    }).then((result) => {
                                        if (!result.value) {
                                            fulfillButton.disabled = true;
                                            fulfillButton.remove();
                                            document.getElementById('createdText').innerHTML = "";
                                            saveButton.textContent = "Create"; targetGPA.disabled = false;
                                            futureCredits.disabled = false;
                                            currentGPA.value = GPA.value;
                                            currentCredits.value = totalCredits.value;
                                            targetGPA.value = "";
                                            futureCredits.value = "";
                                            saveButton.removeEventListener('click', function () { }); // secretly having Edit function, but we must not allow edits to old plans
                                            Planner(); // example of Recursive function
                                            // a recursive function is a function that calls itself until it reaches a certain condition
                                            // now we no need reload. Difficulty level : S TIER
                                        } else {
                                            window.location.reload();

                                        }
                                    })


                                },
                                error: (xhr, txtStat, error) => {
                                    // alert("Problem fulfilling plan");
                                    Swal.fire({
                                        title: "Error!",
                                        text: "Error in fulfilling plan",
                                        icon: "error"
                                    })
                                }
                            })
                        }
                    })



                }

            }
        },
        error: (xhr, txtStat, error) => {
            console.log(error);
        }
    })


})


function CancelEditPlan(response) {
    let currentGPA = document.getElementById('currentGPA');
    let targetGPA = document.getElementById('targetGPA');
    let currentCredits = document.getElementById('currentCredits');
    let futureCredits = document.getElementById('futureCredits');
    const abc = document.getElementById('saveButton');
    const xyz = document.getElementById('planButtons');
    if (abc.textContent === 'Confirm Edit') {
        const cancelButton = document.createElement('button'); //creates a cancel button beside the save button
        cancelButton.textContent = 'Cancel';
        cancelButton.type = 'button';
        cancelButton.id = 'cancelButton'; // to remove later when Edit button is clicked
        cancelButton.addEventListener('click', function () {
            abc.textContent = 'Edit Plan';
            currentGPA.disabled = true;
            targetGPA.disabled = true;
            currentCredits.disabled = true;
            futureCredits.disabled = true;
            currentGPA.value = response.current_gpa;
            targetGPA.value = response.target_gpa;
            currentCredits.value = response.current_credits;
            futureCredits.value = response.future_credits;
            xyz.removeChild(cancelButton);
        })
        xyz.appendChild(cancelButton);
    }
}