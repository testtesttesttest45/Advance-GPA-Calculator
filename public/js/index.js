/* eslint-disable no-loop-func */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
/* eslint-disable camelcase */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable radix */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable no-console */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
/* eslint-disable no-undef */
const isLocalhost = location.hostname === 'localhost' || location.hostname === '*';
const STORAGE_API_HOST = isLocalhost ? `http://localhost:3002` : `https://poly-gpa-calculator.herokuapp.com`;
const letterGrades = {
    4: 'A',
    3.5: 'B+',
    3: 'B',
    2.5: 'C+',
    2: 'C',
    1.5: 'D+',
    1.0: 'D',
    0.5: 'D-',
    0: 'F',
};

const modules = {};
const addedinlist = [];

function setShareLinkInInputField(inputField, moduleId) {
    const url = new URL(window.location.href);
    url.searchParams.set('key', moduleId);
    inputField.value = url.toString();
}
// eslint-disable-next-line no-undef
window.addEventListener('DOMContentLoaded', () => {

    // when page loads, set the readonlyCheckbox to checked 
    const readonlyCheckbox = document.getElementById('read-only');
    readonlyCheckbox.checked = true;


    // Table of Module List
    const moduleTableBody = document.querySelector('#module-table tbody');
    const moduleRowTemplate = document.querySelector('#module-row-template');

    // Table  of Calculated Module List
    const tableCalculate = document.getElementById('tableCalculate');
    const moduleTableCalculated = document.querySelector('#tableCalculate tbody');
    const moduleRowTemplateCalculated = document.querySelector('#tableCalculate-row-template');
    const congratulations = document.querySelector('#congratulations');

    // Result
    const gpaResult = document.querySelector('#gpa-result');
    // const chickenRiceResult = document.querySelector('#chicken-rice-result');

    // Add module
    const addModuleForm = document.querySelector('#select-module-form');
    const moduleNameInput = document.querySelector('#module-name');
    const creditInput = document.querySelector('#credit');
    const gradeInput = document.querySelector('#grade');

    // Generate sharing link
    const customShareInput = document.querySelector('#custom-share-id');
    const generateLinkButton = document.querySelector('#generate-link');
    // const generateLinkButton2 = document.querySelector('#generate-link2');
    const shareLinkInput = document.querySelector('#share-link');
    const timeGeneratedField = document.querySelector('#time-generated');

    // Plan
    const currentGPAInput = document.querySelector('#currentGPA');
    const targetGPAInput = document.querySelector('#targetGPA');
    const currentCreditInput = document.querySelector('#currentCredits');
    const futureCreditInput = document.querySelector('#futureCredits');

    const GPA = document.querySelector('#GPA');
    const totalCredits = document.getElementById('totalCredits');
    const fulfillButton = document.getElementById('fulfillButton'); // this will be the button to fulfill the plan, but will be hidden until our gpa and credits has surpasesed the planned

    const planControls = [
        currentGPAInput,
        targetGPAInput,
        currentCreditInput,
        futureCreditInput,
        GPA
    ];

    if (localStorage.getItem('token') == null) {
        console.log("No token :(");
        let h1Plan = document.querySelector('#plan-h1');
        $(h1Plan).append('<span style="font-size: medium; color: crimson;">(For registered users only; Sign up <a style="color: #337AB7" href="signup.html">here</a>!)</span>')
        planControls.forEach((control) => (control.disabled = true));
    } else {
        let h1Plan = document.querySelector('#plan-h1');
        $(h1Plan).append('<span style="font-size: medium; color: crimson;">(Hover over each field to see what they mean)</span>')
        console.log("There's a token :)");
    }


    gradeInput.value = "";

    // const deleteLinkButton = document.querySelector('#delete-link');
    // All intractable controls (e.g. input, buttons, etc...)
    const controls = [
        addModuleForm.querySelector('button'),
        moduleNameInput,
        targetGPAInput,
        futureCreditInput,

        creditInput,
        gradeInput,
        generateLinkButton,
        // deleteLinkButton,
        customShareInput,
        readonlyCheckbox
    ];

    /**
     * Disable controls in page
     */
    function disablePage() {
        controls.forEach((control) => (control.disabled = true));
    }

    /**
     * Enables controls in page
     */
    function enablePage() {
        controls.forEach((control) => (control.disabled = false));
    }

    const token = localStorage.getItem("token");
    if (!token) {
        document.getElementById("custom-share-id").style.display = "none";
    }
    /**
     * Create a new row with delete button
     */
    function createRow(moduleName, credit, grade, onDelete) {
        const newRow = moduleRowTemplate.content.firstElementChild.cloneNode(true);
        newRow.querySelector('.row-name').textContent = moduleName;
        newRow.querySelector('.row-credit').textContent = credit;
        newRow.querySelector('.row-grade').textContent = grade;
        newRow.querySelector('.row-delete').onclick = () => onDelete(newRow);
        return newRow;
    }
    function createdCalculatedRow(moduleName, credit, grade) {
        const newRow = moduleRowTemplateCalculated.content.firstElementChild.cloneNode(true);
        newRow.querySelector('.row-moduleCalculated').textContent = moduleName;
        newRow.querySelector('.row-creditCalculated').textContent = credit;
        newRow.querySelector('.row-gradeCalculated').textContent = grade;
        newRow.querySelector('.row-calculation').textContent = `${credit} x ${grade} = ${credit * grade}`;
        return newRow;
    }

    function createTotalRow(moduleName, credit, grade, average) {
        const newRow = moduleRowTemplateCalculated.content.firstElementChild.cloneNode(true);
        newRow.querySelector('.row-moduleCalculated').textContent = moduleName;
        newRow.querySelector('.row-creditCalculated').textContent = credit;
        newRow.querySelector('.row-gradeCalculated').textContent = grade;
        newRow.querySelector('.row-calculation').textContent = average;
        return newRow;
    }

    async function createConfetti() {
        const jsConfetti = new JSConfetti();
        await jsConfetti.addConfetti({
            confettiColors: ['#ff0000', '#ffa500', '#ffff00', '#008000', '#0000ff', '#4b0082', '#ee82ee'] // colours of rainbow
        });
    }

    const buttonCalculate = document.getElementById('calculateGPA');
    // button will be disabled when page starts, because Module List of array is empty, and cannot be hovered
    buttonCalculate.disabled = true;
    buttonCalculate.style.backgroundColor = 'lightgray';
    buttonCalculate.textContent = 'Add some modules first';

    buttonCalculate.addEventListener('click', async () => {
        tableCalculate.style.visibility = "visible";
        // clear the table first before calling the function
        moduleTableCalculated.innerHTML = '';
        showCalculatedGPA();
        updateResult(); // calculates and display the GPA on the GPA result field

        // check the value of GPA and display congratulations if more than 3.5
        if (GPA.value >= 3.5) {
            congratulations.innerHTML = 'Congratulations! You have an excellent GPA!';
            // create confetti effect if you got an excellent GPA
            createConfetti();
            var audio = new Audio('../media/confettiSound.mp3');
            audio.play();
            // prevent the user from spamming the button, later he too gey kiang
            buttonCalculate.disabled = true;
        }
        else if (GPA.value >= 2.5) {
            congratulations.innerHTML = 'Your GPA is fine, but you should improve!';
        }
        else {
            congratulations.innerHTML = 'You have a bad GPA. Just dropout!';
        }

        // whenever we click Calculate, we will also want to update our GPA Planner to check if our GPA and Credits is enough than specified
        let targetGPA = parseFloat(document.getElementById('targetGPA').value); // totalcredits and future credits are always whole numbers. convert string to number
        let futureCredits = parseInt(document.getElementById('futureCredits').value);
        let totalCredits = parseInt(document.getElementById('totalCredits').value);
        if (targetGPA && futureCredits && parseFloat(GPA.value) && totalCredits !== '') {
            if (parseFloat(GPA.value) >= targetGPA && totalCredits >= futureCredits) {
                fulfillButton.style.visibility = 'visible';
            }
            else {
                fulfillButton.style.visibility = 'hidden';
            }
        }
        
    });
    // create a function that will be called when the button is clicked
    function showCalculatedGPA() {
        // when clicked, get every rows in the body of table #module-table and store them in an array
        const rows = moduleTableBody.querySelectorAll('tr');
        // if moduleTableBody is not empty, then 
        let storage = [];
        // loop through the array
        for (let i = 0; i < rows.length; i++) {
            // get the text content of the first td in each row
            const moduleName = rows[i].querySelector('.row-name').textContent;
            const credit = rows[i].querySelector('.row-credit').textContent;
            const grade = rows[i].querySelector('.row-grade').textContent;

            // push the text content of the first td in each row to the storage array
            storage.push({
                moduleName,
                credit,
                grade
            });
        }
        // loop through the storage array and create a new row in the table #tableX
        for (let i = 0; i < storage.length; i++) {
            const newRow = createdCalculatedRow(storage[i].moduleName, storage[i].credit, storage[i].grade);
            moduleTableCalculated.appendChild(newRow);
        }
        // create a new array that will store the sum of credits and grades
        let tally = [];
        // loop through the storage array and push the sum of every credits to the Total Credits property  and  every grades to the Total Grades nasus array
        for (let i = 0; i < storage.length; i++) {
            tally.push({
                TotalCredits: parseInt(storage[i].credit), // parseInt for integers
                TotalGradePoints: parseFloat(storage[i].credit * storage[i].grade) // parseFloat for decimals
            });
        }
        // console.log('tally', tally);
        // for each TotalCredits and TotalGrades in the nasus array, add them together
        let totalCredits = 0;
        let totalGradePoints = 0;
        for (let i = 0; i < tally.length; i++) {
            totalCredits += tally[i].TotalCredits;
            totalGradePoints += tally[i].TotalGradePoints;
        }
        console.log(totalCredits, totalGradePoints);
        let average = (totalGradePoints / totalCredits).toFixed(2);
        const newRow = createTotalRow('Total', `Total Credits=${totalCredits}`, `Total Grade Points=${totalGradePoints}`, `Average=${totalGradePoints}/${totalCredits}=${average}`);
        // query selector this new row and turn it to bold with background color white
        newRow.querySelector('.row-moduleCalculated').style.fontWeight = 'bold';
        newRow.querySelector('.row-moduleCalculated').style.backgroundColor = 'white';
        newRow.querySelector('.row-creditCalculated').style.fontWeight = 'bold';
        newRow.querySelector('.row-creditCalculated').style.backgroundColor = 'white';
        newRow.querySelector('.row-gradeCalculated').style.fontWeight = 'bold';
        newRow.querySelector('.row-gradeCalculated').style.backgroundColor = 'white';
        newRow.querySelector('.row-calculation').style.fontWeight = 'bold';
        newRow.querySelector('.row-calculation').style.backgroundColor = 'white';
        moduleTableCalculated.appendChild(newRow);
        // Notes: definitely better ways to do this, but I cannot handle
        // creating this table was really hard, and I do not want to come touch again
    }

    /**
     * Create a new row and update modules object
     */
    function createModuleWithId(moduleName, credit, grade) {
        let id = Date.now();
        // regenerate until find a non-existing id for module element
        while (modules[id] !== undefined) {
            id = Date.now();
        }
        modules[id] = {
            name: moduleName,
            credit,
            grade
        };
        const newRow = createRow(moduleName, credit, grade, (newRow1) => {
            moduleTableBody.removeChild(newRow1);
            delete modules[id];
            const delIndex = addedinlist.indexOf(moduleName);
            console.log(delIndex);
            addedinlist.splice(delIndex, 1);
            // updateResult(); // Thanks to Matthew for pointing out. I will not be calling this anymore over here
            // each time delete is clicked, the button will be enabled
            buttonCalculate.disabled = false;
            buttonCalculate.textContent = 'Recalculate GPA';
            // if deleted module is the last module in the list, then disable the button
            if (addedinlist.length === 0) {
                buttonCalculate.disabled = true;
                buttonCalculate.style.backgroundColor = 'lightgray';
                buttonCalculate.textContent = 'Add some modules first';
                tableCalculate.style.visibility = "hidden";
                totalCredits.value = '';
                GPA.value = '';
                congratulations.innerHTML = '';
                generateLinkButton.disabled = true;
                fulfillButton.style.visibility = 'hidden';
                currentCreditInput.value = '';
                currentGPAInput.value = '';
            }
        });
        newRow.id = id;
        return newRow;
    }







    /**
     * Create an array of module based on the table
     */
    function getModules() {
        const rows = moduleTableBody.querySelectorAll('tr');
        const result = [];
        // gpaResult.textContent = gpa.toFixed(2);
        // chickenRiceResult.textContent = canBuyChickenRice ? 'YES' : 'NO';
        rows.forEach((row) => {
            const { id } = row;
            result.push(modules[id]);
            // console.log("getModules():" , result);
        });
        return result;

    }

    /**
     * Compute GPA based on the modules provided
     */
    function computeGpa(modulesArray) {
        let totalCredit = 0;
        let totalScore = 0;
        modulesArray.forEach((module) => {
            const {
                credit,
                grade
            } = module;
            totalScore += credit * grade;
            totalCredit += credit;
        });
        // currentCreditInput.value = totalCredit;
        document.getElementById('totalCredits').value = totalCredit;
        let saveButton = document.getElementById('saveButton');
        if (saveButton.textContent === 'Confirm Edit') {
            document.getElementById('currentCredits').value = totalCredit;
        }
        if (totalCredit === 0) return 0;
        return totalScore / totalCredit;
    }

    /**
     * Computes GPA based on the modules in the table and update the result
     */
    function updateResult() {
        const modulesArray = getModules(); // return of getModules() is result array, result array contains ADES, Cred 6 , Grade 4
        console.log(modulesArray);
        const gpa = computeGpa(modulesArray);
        // const canBuyChickenRice = gpa >= 3.5;
        const Rounded = gpa.toFixed(2);
        console.log("gpa ==>", gpa);
        GPA.value = Rounded;
        // currentGPAInput.value = Rounded;
        let saveButton = document.getElementById('saveButton');
        if (saveButton.textContent === 'Confirm Edit') {
            document.getElementById('currentGPA').value = Rounded;
        }

        if (modulesArray.length < 1) {
            generateLinkButton.disabled = true;
        }
        if (modulesArray.length > 0) {
            buttonCalculate.textContent = 'Recalculate GPA';
        }
    }

    /**
     * Add a new row to the table.
     */
    addModuleForm.onsubmit = (e) => {
        e.preventDefault();
        const moduleName = moduleNameInput.value;
        const credit = +creditInput.value;
        const grade = +gradeInput.value;
        const gpa = +GPA.value;

        // loop through the array, addedinlist to find duplicates
        for (const x of addedinlist) {
            if (x === moduleName) {
                return;
            }
        }
        moduleNameInput.value = "";
        creditInput.value = "";
        gradeInput.value = "";
        addedinlist.push(moduleName); // push the modulename into array
        console.log(`${moduleName} is added into the Module List of arrays!`);
        console.log(addedinlist);
        const newRow = createModuleWithId(moduleName, credit, grade, gpa);
        moduleTableBody.appendChild(newRow);
        generateLinkButton.disabled = false;
        // updateResult();

        buttonCalculate.disabled = false;
        buttonCalculate.style.backgroundColor = 'green';
        buttonCalculate.textContent = 'Calculate GPA';
        return false;
    };
    // delete share link
    // deleteLinkButton.onclick = function () {
    //     disablePage();
    //     fetch(`${STORAGE_API_HOST}/storage`, {
    //         method: 'DELETE',
    //     }).then((response) => response.json())
    //         .then((json) => {
    //             alert(json.statusMessage)
    //             console.log("delete successful")
    //         })
    //         .catch((err) => {
    //             console.log("delete fail")
    //             alert(err.message)
    //         }).finally(() => enablePage());
    // }

    /**
     * Uploads modules data to storage and generate sharing link based on returned key
     */




    generateLinkButton.onclick = () => {
        disablePage();
        copyToClipboard();
        openNewTab();
        let shareKey = customShareInput.value;
        const tmpToken = localStorage.getItem("token");
        const userid = parseInt(localStorage.getItem("userid")); // ensure userid is an integer


        console.log('userid: ' + userid);
        if (!tmpToken) { // Guest Mode, no tokens and no custom share available.
            let checkName = null;
            postwithNanoKey(checkName);
        } else if (shareKey.length === 0 && tmpToken) {
            let checkName = userid;
            postwithNanoKey(checkName);
        }
        else if (shareKey.length > 0 && tmpToken) {
            postwithCustomKey();
        }

    };

    function copyToClipboard() {
        const buttonCopyToClipboard = document.getElementById('buttonCopyToClipboard');
        buttonCopyToClipboard.style.visibility = 'visible';
        buttonCopyToClipboard.onclick = function () {
            let copyText = document.getElementById('share-link');
            copyText.select();
            copyText.setSelectionRange(0, 99999);  // For mobile devices
            navigator.clipboard.writeText(copyText.value);
            alert("Link is copied to your clipboard");
        }
    }
    function openNewTab() {
        const buttonNewTab = document.getElementById('buttonNewTab');
        buttonNewTab.style.visibility = 'visible';
        buttonNewTab.onclick = function () {
            window.open(document.getElementById('share-link').value);
        }
    }
    function postwithNanoKey(checkName) {
        const modulesArray = getModules();
        const shareKey = customShareInput.value;
        const gpa = GPA.value;

        const postBody = {
            "modules": modulesArray,
            "gpa": gpa,
            "fkuserid": checkName
        }
        fetch(`${STORAGE_API_HOST}/storageNano`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
        })
            .then((response) => response.json())
            .then((json) => {
                setShareLinkInInputField(shareLinkInput, json.nano_key);
                console.log("Key generated success: ", json.nano_key);
                const { nano_key } = json;
                const url = new URL(`${STORAGE_API_HOST}/results.html`);
                url.searchParams.set('key', nano_key);
                shareLinkInput.value = url.toString();
                timeGeneratedField.textContent = DateTime();
                postGrades(); // only post grades if no error in this function
            })

            .catch((error) => alert(error.message))
            .finally(() => enablePage());
    };

    function postwithCustomKey() {
        const modulesArray = getModules();
        const shareKey = customShareInput.value;
        const gpa = GPA.value;
        const userid = parseInt(localStorage.getItem("userid")); // ensure userid is an integer
        const postBody = {
            "modules": modulesArray,
            "shareKey": shareKey,
            "gpa": gpa,
            "fkuserid": userid
        }
        fetch(`${STORAGE_API_HOST}/storage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(postBody),
        })
            .then((response) => {
                console.log(response)
                if (response.status === 409) {
                    alert("This key is already used. Please try another one.");
                    return;
                }
                else if (response.status === 201) {
                    const jsonObj = response.json();
                    jsonObj.then((json) => {
                        console.log(json);
                        const { key } = json;
                        const url = new URL(`${STORAGE_API_HOST}/results.html`);
                        url.searchParams.set('key', key);
                        shareLinkInput.value = url.toString();
                        timeGeneratedField.textContent = DateTime();
                        postGrades(); // only post grades if no error in this function
                    })
                        .catch((error) => {
                            console.error(error)
                            alert(error)
                        })
                    // .finally(() => enablePage());
                } else {
                    // let jsonObj = res.clone().json();
                    // jsonObj.then((json) => {
                    //     console.log("error json==>",json);
                    //     const key = json.key;
                    //     const url = new URL(window.location.href);
                    //     url.searchParams.set('key', key);
                    //     shareLinkInput.value = url.toString();
                    //     timeGeneratedField.textContent = new Date().toLocaleString();
                    // })
                    // .catch((error) => {
                    //     console.log("err=>", error)
                    //     alert(error)
                    // })

                    alert("big problem area, what you doing?");
                }
            })
            .catch((error) => {
                console.log(error)
                alert("Invalid Key!")
            })
            .finally(() => enablePage());
    };
    function postGrades() {
        disablePage();
        const modulesArray = getModules();
        // const module = moduleNameInput.value;
        // const grade = gradeInput.value;
        const Body = {
            "modules": modulesArray
        }
        // console.log("test Body==>", JSON.stringify(Body));
        fetch(`${STORAGE_API_HOST}/grades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Body),
        }).then((response) => {
            console.log("success grades post=>", response);
            if (response.status !== 400) {
                const jsonObj = response.json();
                jsonObj.then((json) => {
                    console.log(json);
                    // console.log("added grades=>", JSON.parse(json.result));
                    // return alert("Grades added successfully!");
                    return Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Grades added successfully!',
                        showConfirmButton: false,
                        timer: 1500
                    })

                })
                    .catch((error) => {
                        console.log(error)
                        return alert(error)
                    })
            } else {
                alert("problem ");
            }
        })
            .catch((error) => {
                console.log(error)
                alert("what u doing")
            })
            .finally(() => enablePage());
    };




    // Check for key in url and loads module data

    const currentUrl = new URL(window.location.href);
    const key = currentUrl.searchParams.get('key');
    if (key) loadDataFromKey(key);
});



$(document).ready(function () {
    $.ajax({
        url: `${STORAGE_API_HOST}/modules`,
        type: 'GET',
        success: (resBdy, txtState, xhr) => {
            console.log(`Total rows retrieved on homepage's side module list: ${resBdy.length}`);
            // console.log("here", resBdy);
            let mama = document.getElementById('searchInput');
            let papa = document.getElementById("listofmodules");
            // display in the papa div first , for each Module Name = module, Credits = credits
            for (let i = 0; i < resBdy.length; i++) {
                let module_id = resBdy[i].module_id;
                let module = resBdy[i].module;
                let credits = resBdy[i].credits;
                let option = document.createElement("option");
                // give option a class
                option.className = "option";
                // give each option an id
                option.id = module_id; // I set module_id as id to be used for the autoscroll to
                option.value = module;
                // since each module in the list has an id, make these options clickable and bring up a new page with the module_id
                option.onclick = function () {
                    window.open(`${STORAGE_API_HOST}/modulestats.html?module_id=${module_id}`);
                }
                // set a border bottom after each module set
                option.style.borderBottom = "2px solid #0099CC";
                option.innerHTML = module + " (" + credits + ")";
                papa.appendChild(option);
                let readonlyCheckbox = document.getElementById('read-only');
                if (readonlyCheckbox.checked) {
                    // disable clicking events on all the children options
                    papa.children[i].onclick = function () {
                        return false;
                    }

                }

                // create a boolean function which can loop that checks if the readonlyCheckbox is checked with each time i click
                // if it is checked return the function true, if not return false and repeat the loop
                readonlyCheckbox.onclick = function () {
                    if (readonlyCheckbox.checked) { // boolean evaluates to true

                        console.log("readonlyCheckbox is checked");

                        // for each option, set the color to default black when the checkbox is checked
                        for (let i = 0; i < papa.children.length; i++) {
                            papa.children[i].style.color = "black";
                            papa.children[i].style.cursor = "text";
                            papa.children[i].onclick = function () {
                                return false;
                            }
                        }


                        // since read only is set to true, we must not be able to click on the options to go to the module stats page

                        // loop through all the options and set their onclick to nothing
                        // for (let i = 0; i < papa.children.length; i++) {
                        //     papa.children[i].onclick = function () {
                        //         // alert("You are in read-only mode. Cannot anyhow run away");
                        //         // disable click event
                        //         return false;
                        //     }
                        // }
                        // disable this whole div
                    } else { // boolean evaluates to false
                        console.log("readonlyCheckbox is not checked");

                        // for each option, set the color to blue when the checkbox is unchecked
                        for (let i = 0; i < papa.children.length; i++) {
                            papa.children[i].disabled = false;
                            papa.children[i].style.cursor = "pointer";  // set cursor to hand, instead of I for text
                            papa.children[i].style.color = "#007fff";
                        }
                        // since read only is set to false, we can click on the items in the listofmodules which opens a new window linking to the module's url
                        // loop through all the options and set their onclick to the function which opens a new window
                        for (let i = 0; i < papa.children.length; i++) {
                            // take the option's id and use it to open a new window, i use this.id, cannot use module_id, else all the options will open the same window with module_id of the last option
                            papa.children[i].onclick = function () {
                                window.open(`${STORAGE_API_HOST}/modulestats.html?moduleid=${this.id}`);
                            }
                        }
                    }
                    console.log("readonlyCheckbox is checked:", readonlyCheckbox.checked);
                }
            }
            // search for the module name based on searchInput value and display in the papa div
            mama.addEventListener("keyup", function () {
                let input = mama.value.toLowerCase().trim(); // trim removes whitespace left and right, so spacebar wont affect the result
                let options = papa.getElementsByTagName("option");
                for (let i = 0; i < options.length; i++) {
                    if (options[i].innerHTML.toLowerCase().indexOf(input) > -1) { // options[i].innerHTML.toLowerCase().indexOf(input) > -1 means if the input is in the option
                        options[i].style.display = "";
                    } else {
                        options[i].style.display = "none";
                    }
                }
            });
        },
        error(xhr, txtStat, error) {
            console.log('Got ajax problems', error);
        }
    })
});





function DateTime() {
    let month = new Date().toLocaleString('default', { month: 'long' })
    let day = new Date().toLocaleString('default', { day: 'numeric' })
    let year = new Date().toLocaleString('default', { year: 'numeric' })
    let time = new Date().toLocaleString('default', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    return `${day} ${month} ${year}, ${time}`
}


// function Fulfiller() {

//     fulfillButton.addEventListener('click', function () {
//         Swal.fire({
//             title: 'Congratulations',
//             text: 'Your current GPA and credits have met your target GPA and credits! Do you want to fulfill your plan?',
//             icon: 'success',
//             showCancelButton: true,
//             confirmButtonColor: 'blue',
//             cancelButtonColor: 'gray',
//             confirmButtonText: 'Yes, fulfill my plan!'
//         })
//             .then((result) => {
//                 if (result.value) { // ok is clicked
//                     $.ajax({
//                         url: '/fulfilplan/' + plannerID,
//                         type: 'PUT',
//                         dataType: 'json',
//                         data: {
//                             current_gpa: currentGPAValue,
//                             target_gpa: targetGPA,
//                             current_credits: currentCreditsValue,
//                             future_credits: futureCredits,
//                             fk_userid: localStorageUserID
//                         },
//                         success: (response, txtStat, xhr) => {
//                             console.log('Plan fulfilled successfully!');
//                             alert("OK")
//                         }
//                     })
//                 }
//             })
//     })

// }
