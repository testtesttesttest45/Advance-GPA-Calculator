
/* eslint-disable no-useless-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-template */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable spaced-comment */
/* eslint-disable no-console */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
function loadResult() {
    let queryParams = new URLSearchParams(window.location.search);
    let key = queryParams.get('key');
    if (!key || key === '?') { // if key is not provided or enter  "?"
        $("h2").text("Invalid Request");
        $("p").text("Please provide valid key");
        return;
    }
    fetch(`/storage/${key}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json(
            console.log("Status response", response.status)
        ))
        .then((json) => {
            //$("table").show();
            var dataHtml = '';
            var nameHTML = '';
            var gpaHTML = '';
            if (json.error) throw new Error(json.error);
            console.log("json:", json);
            console.log(JSON.parse(json.data));
            var modData = JSON.parse(json.data);
            if (json.username != null) {
                nameHTML += `<h4>${json.username}'s results</h4></br>
                    <h5>With key: ${json.key}</h5>`
            }
            else {
                nameHTML += `<h4>Guest User Result</h4></br>`
            }
            gpaHTML = `<h4>GPA: ${json.gpa}`;
            if (modData != null) {
                dataHtml += `
                <thead>
                    <tr>
                        <th>Module</th>
                        <th>Credit Unit</th>
                        <th>Grade</th>
                    </tr>
                    </thead>
                `;
                for (var i = 0; i < modData.length; i++) {
                    console.log(modData[i].name + ", " + modData[i].credit + ", " + modData[i].grade);
                    dataHtml += `
                    <tr>
                        <td>${modData[i].name}</td>
                        <td>${modData[i].credit}</td>
                        <td>${modData[i].grade}</td>
                    </tr>
                `;
                }
            }
            $('#resultTable').append(dataHtml);
            $('#UsernameResult').append(nameHTML);
            $('#GPA').append(gpaHTML);
        })
        .catch((error) => {
            $("table").hide();
            console.log(error)
            if (error == `Error: Key ${key} not found`) {
                // alert(error.message);
                $("h2").text("404 Error");
                $("p").text("The key you are looking for is not found!");
                return;
            }

        })
}

// execute loadResult() when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
    //$("table").hide();
    loadResult();
});

// old codes for Results Page using AJAX, 
// var queryParams = new URLSearchParams(window.location.search);
// var key = queryParams.get('key');
// var dataHtml = '';
// var nameHTML = '';
// var gpaHTML = '';
// console.log('Key name: ' + key);
// $.ajax({
//     url: `/storage/:key`,
//     type: 'GET',
//     dataType: 'json',
//     success: function (data, textStatus, xhr) {
//         console.log("data ↓↓↓");
//         console.log(data);
//         console.log(JSON.stringify(data.gpa), JSON.stringify(data.username), JSON.stringify(data.key));
//         console.log(JSON.parse(data.data));
//         var modData = JSON.parse(data.data);
//         if (data.username != null) {
//             nameHTML += `<h4>${data.username}'s results</h4></br>
//                                     <h5 style="color:red;text-decoration:underline;">With key: ${data.key}</h5>`
//         }
//         else {
//             nameHTML += `<h4>Guest User Result</h4></br>
//                             `
//         }
//         gpaHTML = `<h4>GPA: ${data.gpa}`;
//         if (modData != null) {
//             for (var i = 0; i < modData.length; i++) {
//                 console.log(modData[i].name + ", " + modData[i].credit + ", " + modData[i].grade);
//                 dataHtml += `
//                                     <tr>
//                                         <td>${modData[i].name}</td>
//                                         <td>${modData[i].credit}</td>
//                                         <td>${modData[i].grade}</td>
//                                     </tr>
//                                 `;
//             }
//         }
//         $('#resultTable').append(dataHtml);
//         $('#UsernameResult').append(nameHTML);
//         $('#GPA').append(gpaHTML);
//     },
//     error: function (jqXHR, exception) {
//         var msg = '';
//         if (jqXHR.status === 404) {
//             msg = "Failed";
//             $("table").hide();
//             $("h2").text("404 Error");
//             $("p").text("The key you are looking for is not found!");
//         }
//         console.log(jqXHR, msg);
//     }
// });


