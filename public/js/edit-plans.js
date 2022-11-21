/* eslint-disable no-const-assign */
/* eslint-disable prefer-template */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
// Getting the "fixed" columns
$(document).ready(function () {
    const localStorageUserID = localStorage.getItem('userid');
    let planHTML = '';
    $.ajax({
        url: `/plan/${localStorageUserID}`,
        type: 'GET',
        dataType: 'json',
        success: function (data, textStatus, xhr) {
            // console.log('Reached line 98 of plan.js');
            const {
                current_gpa,
                current_credits
            } = data[0];
            console.log('current_gpa: ' + current_gpa);
            console.log('current_credits: ' + current_credits);
            document.getElementById('input-current-gpa').value = current_gpa;
            document.getElementById('input-current-credits').value = current_credits;
        },
    });
})

// Editing the columns
$(document).ready(function () {
    $('#edit-plan-form').on('submit', function (e) {
        const localStorageUserID = localStorage.getItem('userid');
        $.ajax({
            url: `/plan/${localStorageUserID}`,
            type: 'PUT',
            dataType: 'json',
            success: function (data, textStatus, xhr) {
                const {
                    targetGPA,
                    futureCredits
                } = data[0];
                targetGPA = document.getElementById('input-target-gpa').value ;
                futureCredits = document.getElementById('input-future-credits').value;
                swal({
                    title: 'Success'
                })
            }
        })
    })

})