/* eslint-disable prefer-const */
/* eslint-disable guard-for-in */
/* eslint-disable no-useless-return */
/* eslint-disable consistent-return */
/* eslint-disable spaced-comment */
/* eslint-disable no-restricted-globals */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-undef */
const isLocalhost = location.hostname === 'localhost' || location.hostname === '*';
const STORAGE_API_HOST = isLocalhost ? `http://localhost:3002` : `https://poly-gpa-calculator.herokuapp.com`;
function loadModuleStatistics(moduleid) {
    fetch(`${STORAGE_API_HOST}/modules/${moduleid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            const parentHtml = document.getElementById("moduleStatWrapper");
            const result = "";
            const allGrades = {};
            console.log(allGrades); // Grade percentages
            const gradeMap = { 4: "A", 3.5: "B+", 3: "B", 2.5: "C+", 2: "C", 1.5: "D+", 1: "D", 0.5: "D-", 0: "F" };
            const totalPeople = json.length;
            const GradesArray = [];
            json.forEach((gradeRecords) => {
                GradesArray.push(gradeRecords.grade);
                // const { name: moduleName, credit, grade } = module;
                // const newRow = createModuleWithId(moduleName, credit, grade);
                console.log("Grades for this.module:", gradeRecords.grade);
                if (allGrades[gradeRecords.grade] === undefined) {
                    // first time creating obj moduleid with value 1
                    allGrades[gradeRecords.grade] = 1;
                } else {
                    allGrades[gradeRecords.grade] += 1;
                }
                // console.log(newRow);
                // moduleTableBody.appendChild(newRow);
            });
            console.log("Array of only grades:", GradesArray);
            const x = GetMedian(GradesArray);
            console.log("The median is:", x);


            console.log("All Grade Records:", allGrades);
            console.log("Total Number of Records:", totalPeople);
            parentHtml.innerHTML = "";
            if (totalPeople < 1) {
                // print "no one taking this module"
                console.log("No data for this module");
                parentHtml.innerHTML += `<h3 style="color:red;margin:90px;">No data for this module yet!</h3>`
            }
            else {

                parentHtml.innerHTML += `<h3 class="statwords">${totalPeople} records under ${json[0].module} </h3>`

                for (const [moduleid, value] of Object.entries(allGrades)) {
                    // console.log(item);
                    allGrades[moduleid] = 100 * (value / totalPeople)
                    const onedecimalplace = Math.round(allGrades[moduleid] * 10) / 10
                    // console.log(onedecimalplace);
                    // parentHtml.innerHTML += `<div>GPA ${moduleid}: ${oi}%</div>`
                    parentHtml.innerHTML += `<h3 class="statwords">${onedecimalplace}% of people got GPA: ${moduleid} (Grade ${gradeMap[moduleid]})</h3>`
                }
                // updateResult();
                parentHtml.innerHTML += `<h2 class="statwords" style="color:green;">The median grade of ${json[0].module} is ${x}</h3>`
                if (x >= 3.5) {
                    console.log("You can relax")
                    parentHtml.innerHTML += `<h3 class="statwords" style="color:black;">Message: You can relax, easy module</h3>`
                } else if (x >= 2.5) {
                    console.log("Doing fine but please buck up")
                    parentHtml.innerHTML += `<h3 class="statwords" style="color:black;">Message: People are doing average only</h3>`
                } else {
                    console.log("oi just dropout")
                    parentHtml.innerHTML += `<h3 class="statwords" style="color:black;">Message: Just dropout</h3>`
                }
            }
        })
        .catch((error) => alert(error.message));

}
function GetMedian(GradesArray) {
    // let arr = ['1', '2', '3', '4']
    const lol = [];
    for (let i = 0; i < GradesArray.length; i++) {
        lol.push(parseFloat(GradesArray[i]));
    }
    console.log(lol)
    // sort the array
    lol.sort((a, b) => a - b)

    // declare median variable
    let median;
    // if else block to check for even or odd
    if (lol.length % 2 !== 0) {
        // odd case
        // find middle index
        const middleIndex = Math.floor(lol.length / 2)
        // find median
        median = lol[middleIndex]
    } else {
        // even case
        // find middle index
        const middleIndex = Math.floor(lol.length / 2)
        // find median
        median = (lol[middleIndex] + lol[middleIndex - 1]) / 2
    }
    // print median
    return median;
}

window.addEventListener('DOMContentLoaded', () => {
    const currentUrl = new URL(window.location.href);
    const modId = currentUrl.searchParams.get('moduleid');
    // if (modId) getModuleById(modId);
    getModuleById(modId);
    const textViewButton = document.getElementById('textViewButton');
    const piechartViewButton = document.getElementById('piechartViewButton');
    const barchartViewButton = document.getElementById('barchartViewButton');
    // create a function which stores these 3 buttons in an object, and a for each loop to iterate through the object to check which button is click and enable the rest
    function disableorenable(button) {

        piechartInfo.innerHTML = "";
        moduleStatWrapper.innerHTML = "";
        //create an object with the 3 buttons
        const buttons = {
            textViewButton,
            piechartViewButton,
            barchartViewButton,
        }
        //iterate through the object
        for (const [key, value] of Object.entries(buttons)) { //this means for each key in the object: buttons, do the following
            //disable the button that is clicked, and enable the rest
            if (value === button) { //if the value of the button is the button that is clicked do the following
                value.disabled = true; // disable the button that is clicked
            } else {
                value.disabled = false; // enable the rest of the buttons
            }
        }
    }
    function chartExists() {
        const tmpChart = Chart.getChart('myChart');
        if (tmpChart) {
            return tmpChart.destroy();

        }
    }

    // load image when page is opened
    moduleStatWrapper.innerHTML = `<img src="https://upload.wikimedia.org/wikipedia/commons/3/3a/Book-icon-bible.png" alt="logo" style="width:80%;height:80%; float: right;">`;
    const pieChart = document.getElementById('myChart');
    const piechartInfo = document.getElementById('piechartInfo');

    textViewButton.addEventListener('click', () => {
        chartExists();
        disableorenable(textViewButton);
        if (modId) loadModuleStatistics(modId);
        return;
    });
    piechartViewButton.addEventListener('click', () => {
        chartExists();
        disableorenable(piechartViewButton);
        if (modId) displayChart(modId, 'pie');
        return
    });
    barchartViewButton.addEventListener('click', () => {
        chartExists();
        disableorenable(barchartViewButton);
        if (modId) displayChart(modId, 'bar');
        return
    });

});



function getModuleById(moduleId) {
    console.log(moduleId);
    if (isNaN(moduleId) || moduleId === "") {
        document.getElementById("moduleInfo").innerHTML = `<h1 style="color:red">Error 400!</h1><h3 style="color:red">Bad request, please enter a proper module ID!</h3>`;
        return;
    }
    fetch(`/getOneModule/${moduleId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json(console.log(response.status)))
        .then((module) => {
            if (module.error) throw new Error(module.error);
            if (module.length > 0) {
                document.getElementById("viewbuttonContainer").style.visibility = "visible";
                document.getElementById("moduleInfo").innerHTML += `<h3>${module[0].module}: ${module[0].title}</h3><h3>\n${module[0].credits} Credits\n</h3><h3>${module[0].description}</h3>`;
            }
        })
        .catch((error) => {
            if (error.message === `Module ${moduleId} not found.`) {
                document.getElementById("moduleInfo").innerHTML = `<h1 style="color:red">Error 404!</h1><h3 style="color:red">Module ${moduleId} not found.</h3>`;
                return;
            }
        });
}


function displayChart(moduleid, pieOrBar) {
    fetch(`${STORAGE_API_HOST}/modules/${moduleid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((json) => {


            const GradesArray = [];
            const allGrades = {};
            json.forEach((gradeRecords) => {
                GradesArray.push(gradeRecords.grade);
                if (allGrades[gradeRecords.grade] === undefined) {
                    // first time creating obj moduleid with value 1
                    allGrades[gradeRecords.grade] = 1;
                } else {
                    allGrades[gradeRecords.grade] += 1;
                }

            });
            const parentHtml = document.getElementById("piechartInfo");
            const x = GetMedian(GradesArray);
            const totalPeople = json.length;
            const gradeMap = { 4: "A", 3.5: "B+", 3: "B", 2.5: "C+", 2: "C", 1.5: "D+", 1: "D", 0.5: "D-", 0: "F" };
            // convert property of allGrades to numeric version in gradeMap,  key means grade, value means number of people got that grade
            for (let key in allGrades) { // this means that initially key in allgrades is like 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 
                allGrades[gradeMap[key]] = allGrades[key]; // but now key in allgrades is like A, B+, B, C+, C, D+, D, D-, F, quite hard to understand...
                delete allGrades[key];
            }
            console.log(allGrades);

            if (totalPeople < 1) {
                // print "no one taking this module"
                console.log("No data for this module");
                parentHtml.innerHTML += `<h3 style="color:red;margin:30px;">No data for this module yet!</h3>`
            } else {
                parentHtml.innerHTML += `<h3 class="statwords">${totalPeople} records under ${json[0].module} </h3>`
                parentHtml.innerHTML += `<h2 class="statwords">The median grade of ${json[0].module} is ${x}</h3>`
                if (x > 3) {
                    console.log("You can relax")
                    parentHtml.innerHTML += `<h3 class="statwords">Message: You can relax, easy module</h3>`
                } else if (x > 2) {
                    console.log("Doing fine but please buck up")
                    parentHtml.innerHTML += `<h3 class="statwords">Message: People are doing average only</h3>`
                } else {
                    console.log("oi just dropout")
                    parentHtml.innerHTML += `<h3 class="statwords">Message: oi just dropout</h3>`
                }
                // with allGrades which is an object will all the grades and their respective counts, we can make a piechart
                const ctx = document.getElementById('myChart').getContext('2d');
                console.log(allGrades);
                const myChart = new Chart(ctx, {
                    type: `${pieOrBar}`,
                    data: {
                        labels: Object.keys(allGrades),
                        datasets: [{
                            label: 'Frequency',
                            data: Object.values(allGrades),
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                                'rgba(100, 99, 132, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                                'rgba(100, 99, 132, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {}
                });
                // return myChart;
            }
        })
        .catch((error) => alert(error.message));
}


