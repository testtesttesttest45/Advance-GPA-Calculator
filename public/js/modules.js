/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-redeclare */
/* eslint-disable spaced-comment */
/* eslint-disable eqeqeq */
/* eslint-disable block-scoped-var */
/* eslint-disable prefer-template */
/* eslint-disable no-loop-func */
/* eslint-disable no-shadow */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-else-return */
/* eslint-disable no-unreachable */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
/* eslint-disable func-names */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
/* eslint-disable prefer-const */
let tokenExist = localStorage.getItem('token');

$(document).ready(function () {
    // call addModuleCollapser() after 1 second of page load
    setTimeout(function () { // this prevent the Add Module Form from going out of place  before the module data has loaded 
        addModuleCollapser();
    }, 1500);
    let sortButton = document.getElementById('sortButton');
    let sortByCredits = document.getElementsByClassName('credSort');
    let sortByLetters = document.getElementsByClassName('alphaSort');
    Sorter();
    let clearSearch = document.getElementById('clearSearch');
    clearSearch.addEventListener('click', function () {
        let searchInput = document.getElementById('searchContainer');
        searchInput.value = '';
    })
    $.ajax({
        url: `/modules`,
        type: 'GET',
        success: (response, txtStat, xhr) => {
            // create a backup response, which will be the original response.
            const originalResponse = response; // making a backup of the response, lifesaver code
            console.log(`Total rows retrieved: ${response.length}`);
            if (response.length > 0) { // if there are more than 10 modules, show the pagination, each page has 10 modules. create new pages if there are more than 10 modules
                // sortByCredits has 2 elements, so we need to loop through them and find the one that is checked. If the value of sortByCredits is 'Ascending', we sort alphabetically.
                Sorter();
                sortButton.addEventListener('click', function () {
                    response = response.filter((module) =>
                        module.module.toLowerCase().includes(searchInput.value.toLowerCase()) || module.title.toLowerCase().includes(searchInput.value.toLowerCase()));
                    console.log('the response now is: ', response);
                    // clear the modulelist first, THIS PART MADE ME STUCK 3 HR
                    let moduleList = document.getElementById('modulelist');
                    moduleList.innerHTML = '';
                    for (let i = 0; i < sortByCredits.length; i++) {
                        if (sortByCredits[i].checked) {
                            if (sortByCredits[i].value === 'Ascending') {
                                console.log("Ascending Credits");
                                response.sort(function (a, b) {
                                    return a.credits - b.credits;
                                });
                            } else {
                                console.log("Descending Credits");
                                // sort module by descending order of response.credit
                                response.sort(function (a, b) {
                                    return b.credits - a.credits;
                                });
                            }
                            // console.log("Response after Sorting", response);
                            // we now have the sorted response, so we need to display the modules in the table
                        }
                    }
                    for (let i = 0; i < sortByLetters.length; i++) {
                        if (sortByLetters[i].checked) {
                            if (sortByLetters[i].value === 'Ascending') {
                                console.log("Ascending Alphabetical");
                                response.sort(function (a, b) {
                                    // sort by alphabetical ascending order of response.module
                                    // but convert all response.modules to same case first
                                    // this is because the current is like A, B, C, a, b ,c . I thought it would be alphabetical regardless of casing, but it is case sensitive
                                    let moduleA = a.module.toUpperCase();
                                    let moduleB = b.module.toUpperCase();
                                    if (moduleA < moduleB) { // this means moduleA is alphabetically before moduleB, example, module A is English, moduleB is Math ,so English is alphabetically before Math
                                        return -1; // return  -1 means Math is alphabetically before English
                                        if (moduleA > moduleB) { // this means moduleA is alphabetically after moduleB, example, module A is English, moduleB is Math , so English is alphabetically after Math
                                            return 1; // return 1 means English is alphabetically after Math
                                        } else {
                                            return 0; // return 0 means they are the same
                                        }
                                    }
                                });
                            } else {
                                console.log("Descending Alphabetical");
                                response.sort(function (a, b) {
                                    // sort by alphabetical descending order of response.module
                                    // but convert all response.modules to same case first
                                    // this is because the current is like A, B, C, a, b ,c . I thought it would be alphabetical regardless of casing, but it is case sensitive
                                    let moduleA = a.module.toUpperCase();
                                    let moduleB = b.module.toUpperCase();
                                    if (moduleA > moduleB) {
                                        return -1;
                                        if (moduleA < moduleB) {
                                            return 1;
                                        } else {
                                            return 0;
                                        }
                                    }
                                })
                            }
                            // we now have the sorted response, so we need to
                        }
                    }
                    console.log("Response after Sorting", response);
                    let pageContainer = document.getElementById('pageContainer');
                    pageContainer.innerHTML = ''; // clear the current pagination
                    // create a new pagination based on the filtered modules
                    let pageNumber = Math.ceil(response.length / 10);
                    for (var j = 1; j <= pageNumber; j++) {
                        let pageContainer = document.getElementById('pageContainer');
                        let pageNumber = document.createElement('button');
                        pageNumber.className = 'pagingButtons';
                        pageNumber.innerHTML = j;
                        pageNumber.setAttribute('id', j);
                        pageContainer.appendChild(pageNumber);
                        // when the page button is clicked, the filtered modules will be displayed, each page has 10 modules
                        pageNumber.addEventListener('click', function () {
                            let n = pageNumber.id;
                            console.log("Page clicked: " + n);
                            // take all button with class of pagingButtons and change their color to white if they are not the current page, if they are the current page, change their color to different
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
                            // n starts at 1, and the first 10 modules are displayed on the first page(array index 0 to 9)
                            let start = (n - 1) * 10;
                            // clicking the last page button will display the last 10 modules
                            if (n == pageNumber) {
                                start = response.length - 10;
                            }
                            let end = start + 10;
                            let modules = response.slice(start, end); // slice is used to get the 10 modules from the filtered modules
                            let moduleList = document.getElementById('modulelist');
                            moduleList.innerHTML = '';
                            for (var i = 0; i < modules.length; i++) {
                                if (modules[i] && tokenExist) {
                                    let collapsibleDiv = document.getElementById('collapsibleDiv');
                                    //turn the collapsiblediv visibility to visible
                                    collapsibleDiv.style.visibility = 'visible';
                                    var modulehtml = `
                                    <button class="deleteButton" id=${modules[i].module_id} onclick="deleteModule(${modules[i].module_id})">Delete Set</button>
                                    <button class='editButton' id= '${modules[i].module_id}' onclick="editModule(${modules[i].module_id})">Edit</button>
                                    <button class='detailsbutton' id= '${modules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${modules[i].module_id}'">More Details</button>
                                    <div class='modulename'>${modules[i].module}</div><br>
                                    <div class='moduletitle'>${modules[i].title} </div><br>
                                    <div class='modulecredits'>Credits: ${modules[i].credits} </div><br><hr/>
                                    `;
                                } else if (modules[i] && !tokenExist) {
                                    var modulehtml = `
                                    <button class='detailsbutton' id= '${modules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${modules[i].module_id}'">More Details</button>
                                    <div class='modulename'>${modules[i].module}</div><br>
                                    <div class='moduletitle'>${modules[i].title} </div><br>
                                    <div class='modulecredits'>Credits: ${modules[i].credits} </div><br><hr/>
                                    `;
                                }
                                moduleList.innerHTML += modulehtml;
                                console.log('backupResponse1', originalResponse)
                            }
                        })
                    }
                    let allButtons = document.getElementsByClassName('pagingButtons');
                    setTimeout(function () {
                        allButtons[0].click();
                    }, 0);

                    // set response back to the original response

                })
                // set response back to the original response
                response = originalResponse;
                console.log('backupResponse2', originalResponse)
                // the page will start with the first 10 modules loaded in the page, important checkpoint, cause of many problems is right here
                for (var i = 0; i < 10; i++) {
                    if (response[i] && tokenExist) {
                        let collapsibleDiv = document.getElementById('collapsibleDiv');
                        //turn the collapsiblediv visibility to visible
                        collapsibleDiv.style.visibility = 'visible';
                        var modulehtml = `
                        <button class="deleteButton" id=${response[i].module_id} onclick="deleteModule(${response[i].module_id})">Delete Set</button>
                        <button class='editButton' id= '${response[i].module_id}' onclick="editModule(${response[i].module_id})">Edit</button>
                        <button class='detailsbutton' id= '${response[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${response[i].module_id}'">More Details</button>
                        <div class='modulename'>${response[i].module}</div><br>
                        <div class='moduletitle'>${response[i].title} </div><br>
                        <div class='modulecredits'>Credits: ${response[i].credits} </div><br><hr/>
                        `;
                    } else if (response[i] && !tokenExist) {
                        var modulehtml = `
                        <button class='detailsbutton' id= '${response[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${response[i].module_id}'">More Details</button>
                        <div class='modulename'>${response[i].module}</div><br>
                        <div class='moduletitle'>${response[i].title} </div><br>
                        <div class='modulecredits'>Credits: ${response[i].credits} </div><br><hr/>
                        `;
                    }
                    setTimeout(getPageButtons, 0);
                    $('#modulelist').append(modulehtml);
                }
                let pageNumber = Math.ceil(response.length / 10);
                for (var j = 1; j <= pageNumber; j++) {
                    let pageContainer = document.getElementById('pageContainer');
                    let pageNumber = document.createElement('button');
                    pageNumber.className = 'pagingButtons';
                    pageNumber.innerHTML = j;
                    pageNumber.setAttribute('id', j);
                    pageContainer.appendChild(pageNumber);
                    if (j === 1) {
                        pageNumber.style.backgroundColor = '#007fff';
                    }
                    pageNumber.addEventListener('click', function () {
                        let n = pageNumber.id;
                        console.log("Page clicked: " + n);
                        // take all button with class of pagingButtons and change their color to white if they are not the current page, if they are the current page, change their color to different
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
                        // n starts at 1, and the first 10 modules are displayed on the first page(array index 0 to 9)
                        let start = (n - 1) * 10;
                        // clicking the last page button will display the last 10 modules
                        if (n == pageNumber) {
                            start = response.length - 10;
                        }
                        let end = start + 10;
                        let modules = response.slice(start, end);
                        let moduleList = document.getElementById('modulelist');
                        moduleList.innerHTML = '';
                        for (var i = 0; i < modules.length; i++) {
                            if (modules[i] && tokenExist) {
                                let collapsibleDiv = document.getElementById('collapsibleDiv');
                                //turn the collapsiblediv visibility to visible
                                collapsibleDiv.style.visibility = 'visible';
                                var modulehtml = `
                                <button class="deleteButton" id=${modules[i].module_id} onclick="deleteModule(${modules[i].module_id})">Delete Set</button>
                                <button class='editButton' id= '${modules[i].module_id}' onclick="editModule(${modules[i].module_id})">Edit</button>
                                <button class='detailsbutton' id= '${modules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${modules[i].module_id}'">More Details</button>
                                <div class='modulename'>${modules[i].module}</div><br>
                                <div class='moduletitle'>${modules[i].title} </div><br>
                                <div class='modulecredits'>Credits: ${modules[i].credits} </div><br><hr/>
                                `;
                            } else if (modules[i] && !tokenExist) {
                                var modulehtml = `
                                <button class='detailsbutton' id= '${modules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${modules[i].module_id}'">More Details</button>
                                <div class='modulename'>${modules[i].module}</div><br>
                                <div class='moduletitle'>${modules[i].title} </div><br>
                                <div class='modulecredits'>Credits: ${modules[i].credits} </div><br><hr/>
                                `;
                            }
                            moduleList.innerHTML += modulehtml;
                        }
                    })
                }
            }
            let searchInput = document.getElementById('searchContainer');
            let searchButton = document.getElementById('searchButton');
            searchInput.addEventListener('keyup', function () { // here i made it such that when the user presses enter, the search button will be clicked
                if (event.keyCode === 13) { // enter key pressed , the code is 13, but use keyup event
                    searchButton.click();
                }
            })
            searchButton.addEventListener('click', function () { // or they can just click the search button manually
                response = originalResponse;
                Sorter();
                if (searchInput.value !== '') {
                    setTimeout(getPageButtons, 0);
                    let filteredModules = response.filter(function (module) {// if the searchInput value matches any module name, the module will be filtered out
                        // filtered modules, the module is the module object which contains the module_id, module name, title, credits, and description
                        // but i just want to take the module name and title
                        // return module.module.toLowerCase().includes(searchInput.value.toLowerCase());                        // module search for module name(Abbrievation) and module title, dont anyhow search for Credits
                        return module.module.toLowerCase().includes(searchInput.value.toLowerCase()) || module.title.toLowerCase().includes(searchInput.value.toLowerCase());
                        // The properties "value" and "textContent" represent different things. Any node has a "textContent", including text nodes which are not elements. It represents the text content of the node itself along with any and all descendants.
                        // But only input elements have a "value". It represent the input data supplied by the user or provided initially by the code. Also, input elements may have a "textContent" property but it will always be empty since they are void elements.
                    }
                    );
                    let moduleList = document.getElementById('modulelist');
                    moduleList.innerHTML = '';
                    console.log('filteredModules from sort', filteredModules);
                    // when clicked, display the filtered modules only once, no repeats
                    for (var i = 0; i < filteredModules.length; i++) {
                        if (filteredModules[i] && tokenExist) {
                            let collapsibleDiv = document.getElementById('collapsibleDiv');
                            //turn the collapsiblediv visibility to visible
                            collapsibleDiv.style.visibility = 'visible';
                            var modulehtml = `
                            <button class="deleteButton" id=${filteredModules[i].module_id} onclick="deleteModule(${filteredModules[i].module_id})">Delete Set</button>
                            <button class='editButton' id= '${filteredModules[i].module_id}' onclick="editModule(${filteredModules[i].module_id})">Edit</button>
                            <button class='detailsbutton' id= '${filteredModules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${filteredModules[i].module_id}'">More Details</button>
                            <div class='modulename'>${filteredModules[i].module}</div><br>
                            <div class='moduletitle'>${filteredModules[i].title} </div><br>
                            <div class='modulecredits'>Credits: ${filteredModules[i].credits} </div><br><hr/>
                            `;
                        } else if (filteredModules[i] && !tokenExist) {
                            var modulehtml = `
                            <button class='detailsbutton' id= '${filteredModules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${filteredModules[i].module_id}'">More Details</button>
                            <div class='modulename'>${filteredModules[i].module}</div><br>
                            <div class='moduletitle'>${filteredModules[i].title} </div><br>
                            <div class='modulecredits'>Credits: ${filteredModules[i].credits} </div><br><hr/>
                            `;
                        }

                        moduleList.innerHTML = '';
                        moduleList.innerHTML += modulehtml;
                        let pagingButtons = document.getElementsByClassName('pagingButtons');
                        setTimeout(function () {
                            pagingButtons[0].click();
                        }, 0);
                    }


                    if (filteredModules.length === 0) { // if no modules are found, display a message
                        moduleList.innerHTML = '<h3 style="color:red">No modules found</h3>';
                    }
                    let pageContainer = document.getElementById('pageContainer');
                    pageContainer.innerHTML = ''; // clear the current pagination
                    // create a new pagination based on the filtered modules
                    let pageNumber = Math.ceil(filteredModules.length / 10);
                    for (var j = 1; j <= pageNumber; j++) {
                        let pageContainer = document.getElementById('pageContainer');
                        let pageNumber = document.createElement('button');
                        pageNumber.className = 'pagingButtons';
                        pageNumber.innerHTML = j;
                        pageNumber.setAttribute('id', j);
                        pageContainer.appendChild(pageNumber);
                        // when the page button is clicked, the filtered modules will be displayed, each page has 10 modules
                        pageNumber.addEventListener('click', function () {
                            let n = pageNumber.id;
                            console.log("Page clicked: " + n);
                            // take all button with class of pagingButtons and change their color to white if they are not the current page, if they are the current page, change their color to different
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
                            // n starts at 1, and the first 10 modules are displayed on the first page(array index 0 to 9)
                            let start = (n - 1) * 10;
                            // clicking the last page button will display the last 10 modules
                            if (n == pageNumber) {
                                start = filteredModules.length - 10;
                            }
                            let end = start + 10;
                            let modules = filteredModules.slice(start, end); // slice is used to get the 10 modules from the filtered modules
                            let moduleList = document.getElementById('modulelist');
                            moduleList.innerHTML = '';
                            for (var i = 0; i < modules.length; i++) {
                                if (modules[i] && tokenExist) {
                                    let collapsibleDiv = document.getElementById('collapsibleDiv');
                                    //turn the collapsiblediv visibility to visible
                                    collapsibleDiv.style.visibility = 'visible';
                                    var modulehtml = `
                                    <button class="deleteButton" id=${modules[i].module_id} onclick="deleteModule(${modules[i].module_id})">Delete Set</button>
                                    <button class='editButton' id= '${modules[i].module_id}' onclick="editModule(${modules[i].module_id})">Edit</button>
                                    <button class='detailsbutton' id= '${modules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${modules[i].module_id}'">More Details</button>
                                    <div class='modulename'>${modules[i].module}</div><br>
                                    <div class='moduletitle'>${modules[i].title} </div><br>
                                    <div class='modulecredits'>Credits: ${modules[i].credits} </div><br><hr/>
                                    `;
                                } else if (modules[i] && !tokenExist) {
                                    var modulehtml = `
                                    <button class='detailsbutton' id= '${modules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${modules[i].module_id}'">More Details</button>
                                    <div class='modulename'>${modules[i].module}</div><br>
                                    <div class='moduletitle'>${modules[i].title} </div><br>
                                    <div class='modulecredits'>Credits: ${modules[i].credits} </div><br><hr/>
                                    `;
                                }
                                moduleList.innerHTML += modulehtml;
                            }
                        })
                    }
                }
                else { //(searchInput.value == "")
                    // clear the current pagination and module list
                    let pageContainer = document.getElementById('pageContainer');
                    pageContainer.innerHTML = '';
                    let moduleList = document.getElementById('modulelist');
                    moduleList.innerHTML = '';
                    response = originalResponse.filter((module) =>
                        module.module.toLowerCase().includes(searchInput.value.toLowerCase()) || module.title.toLowerCase().includes(searchInput.value.toLowerCase()));
                    // now response is the unfiltered modules
                    console.log(response);
                    setTimeout(getPageButtons, 0);
                    if (response.length > 0) {
                        // the page will start with the first 10 modules loaded in the page
                        for (var i = 0; i < 10; i++) {
                            if (response[i] && tokenExist) {
                                let collapsibleDiv = document.getElementById('collapsibleDiv');
                                //turn the collapsiblediv visibility to visible
                                collapsibleDiv.style.visibility = 'visible';
                                var modulehtml = `
                                <button class="deleteButton" id=${response[i].module_id} onclick="deleteModule(${response[i].module_id})">Delete Set</button>
                                <button class='editButton' id= '${response[i].module_id}' onclick="editModule(${response[i].module_id})">Edit</button>
                                <button class='detailsbutton' id= '${response[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${response[i].module_id}'">More Details</button>
                                <div class='modulename'>${response[i].module}</div><br>
                                <div class='moduletitle'>${response[i].title} </div><br>
                                <div class='modulecredits'>Credits: ${response[i].credits} </div><br><hr/>
                                `;
                            } else if (response[i] && !tokenExist) {
                                var modulehtml = `
                                <button class='detailsbutton' id= '${response[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${response[i].module_id}'">More Details</button>
                                <div class='modulename'>${response[i].module}</div><br>
                                <div class='moduletitle'>${response[i].title} </div><br>
                                <div class='modulecredits'>Credits: ${response[i].credits} </div><br><hr/>
                                `;
                            }
                            $('#modulelist').append(modulehtml);
                        }
                        let pageNumber = Math.ceil(response.length / 10);
                        for (var j = 1; j <= pageNumber; j++) {
                            let pageContainer = document.getElementById('pageContainer');
                            let pageNumber = document.createElement('button');
                            pageNumber.className = 'pagingButtons';
                            pageNumber.innerHTML = j;
                            pageNumber.setAttribute('id', j);
                            pageContainer.appendChild(pageNumber);

                            pageNumber.addEventListener('click', function () {
                                let n = pageNumber.id;
                                console.log("Page clicked: " + n);
                                // take all button with class of pagingButtons and change their color to white if they are not the current page, if they are the current page, change their color to different
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
                                // n starts at 1, and the first 10 modules are displayed on the first page(array index 0 to 9)
                                let start = (n - 1) * 10;
                                // clicking the last page button will display the last 10 modules
                                if (n == pageNumber) {
                                    start = response.length - 10;
                                }
                                let end = start + 10;
                                let modules = response.slice(start, end);
                                let moduleList = document.getElementById('modulelist');
                                moduleList.innerHTML = '';
                                for (var i = 0; i < modules.length; i++) {
                                    if (modules[i] && tokenExist) {
                                        let collapsibleDiv = document.getElementById('collapsibleDiv');
                                        //turn the collapsiblediv visibility to visible
                                        collapsibleDiv.style.visibility = 'visible';
                                        var modulehtml = `
                                        <button class="deleteButton" id=${modules[i].module_id} onclick="deleteModule(${modules[i].module_id})">Delete Set</button>
                                        <button class='editButton' id= '${modules[i].module_id}' onclick="editModule(${modules[i].module_id})">Edit</button>
                                        <button class='detailsbutton' id= '${modules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${modules[i].module_id}'">More Details</button>
                                        <div class='modulename'>${modules[i].module}</div><br>
                                        <div class='moduletitle'>${modules[i].title} </div><br>
                                        <div class='modulecredits'>Credits: ${modules[i].credits} </div><br><hr/>
                                        `;
                                    } else if (modules[i] && !tokenExist) {
                                        var modulehtml = `
                                        <button class='detailsbutton' id= '${modules[i].module_id}' onclick="window.location.href='/modulestats.html?moduleid=${modules[i].module_id}'">More Details</button>
                                        <div class='modulename'>${modules[i].module}</div><br>
                                        <div class='moduletitle'>${modules[i].title} </div><br>
                                        <div class='modulecredits'>Credits: ${modules[i].credits} </div><br><hr/>
                                        `;
                                    }
                                    moduleList.innerHTML += modulehtml;
                                }
                            })
                        }
                    }
                }
            })
        },
        error(xhr, txtStat, error) {
            console.log('Got ajax problems', error);
        }
    });

});
function getPageButtons() {
    let pagingButtons = document.getElementsByClassName('pagingButtons')
    for (var i = 0; i < pagingButtons.length; i++) { // clear any background colours first, this is for preventing page button to stay as blue when example, Search button is pressed
        pagingButtons[i].disabled = false;
        pagingButtons[i].style.backgroundColor = 'white';
    }
    // console.log(pagingButtons.length)
    if (pagingButtons.length > 0) {
        pagingButtons[0].click;
        pagingButtons[0].style.backgroundColor = '#007fff';
    }
}

function Sorter() {
    let sortButton = document.getElementById('sortButton');
    let sortByCredits = document.getElementsByClassName('credSort');
    let sortByLetters = document.getElementsByClassName('alphaSort');
    // uncheck all the checkbox
    for (var i = 0; i < sortByCredits.length; i++) {
        sortByCredits[i].checked = false;
    }
    for (var i = 0; i < sortByLetters.length; i++) {
        sortByLetters[i].checked = false;
    }
    sortByLetters[0].checked = true; // this is because the default sort is by alphabetical order(by backend), so page start liddat
    for (let i = 0; i < sortByCredits.length; i++) { // what am i doing here? i'm looping through the elements in sortByCredits and adding a listener to each one
        sortByCredits[i].addEventListener('click', function () { // when an element in sortByCredits is clicked, uncheck all other elements in the same class
            for (let j = 0; j < sortByCredits.length; j++) {
                sortByCredits[j].checked = false;
                // uncheck all other elements in sortByLetters as well
                sortByLetters[j].checked = false;
            }
            sortByCredits[i].checked = true; // check myself
        })
    }
    for (let i = 0; i < sortByLetters.length; i++) { // what am i doing here? i'm looping through the elements in sortByLetters and adding a listener to each one
        sortByLetters[i].addEventListener('click', function () { // when an element in sortByLetters is clicked, uncheck all other elements in the same class
            for (let j = 0; j < sortByLetters.length; j++) {
                sortByLetters[j].checked = false;
                // uncheck all elements in sortByLetters
                for (let k = 0; k < sortByLetters.length; k++) {
                    sortByLetters[k].checked = false;
                    sortByCredits[k].checked = false;
                }
            }
            sortByLetters[i].checked = true; // check myself
        })
    }
}

function deleteModule(moduleId) {
    //after clicking the button, show a confirmation pop up first
    swal({
        title: "Are you sure?",
        text: "You will not be able to recover this module!",
        icon: "warning",
        buttons: {
            confirm: 'Delete',
            cancel: 'Cancel'
        },
    }).then(function (isConfirm) {
        if (isConfirm) {
            swal({
                title: "Deleted!",
                text: `Module id:${moduleId} has been deleted successfully.`,
                icon: "success",
                buttons: {},
            });
            $.ajax({
                url: `/modules/${moduleId}`,
                type: 'DELETE',
                success: (response, txtStat, xhr) => {
                    console.log(`Module id: ${moduleId} deleted successfully`);
                    //reload after 1.5 seconds
                    setTimeout(function () {
                        window.location.reload();
                    }, 1500);
                }
            });
        }
        else {
            swal({
                title: "Cancelled",
                text: "Cancelled!",
                icon: "warning",
                button: "OK",
            });
        }
    });
}

function editModule(moduleId) {
    //when click the edit button, show a swal alert to edit all module name, title and credits, description
    $.ajax({
        url: `/getOneModule/${moduleId}`,
        type: 'GET',
        success: (response, txtStat, xhr) => {
            console.log(`Module id: ${moduleId} retrieved successfully`);
        }
    }).then(function (response) {
        swal({
            title: "Edit Module",
            text: `Please enter the new module name for\n ${response[0].module}`,
            icon: "info",
            content: {
                element: "input",
                attributes: {
                    placeholder: `${response[0].module}`,
                }
            },
            buttons: {
                confirm: 'Next',
                cancel: 'Cancel',
            },
        }).then(function (moduleName) {
            if (moduleName) {
                swal({
                    title: "Edit Module",
                    text: `Please enter the new module title for\n ${response[0].title}`,
                    icon: "info",
                    content: {
                        element: "input",
                        attributes: {
                            placeholder: `${response[0].title}`,
                        }
                    },
                    buttons: {
                        confirm: 'Next',
                        cancel: 'Cancel',
                    },
                }).then(function (moduleTitle) {
                    if (moduleTitle) {
                        swal({
                            title: "Edit Module",
                            text: `Please enter the new module description for\n ${moduleTitle}`,
                            icon: "info",
                            content: {
                                element: "input",
                                attributes: {
                                    placeholder: `${response[0].description}`,
                                }
                            },
                            buttons: {
                                confirm: 'Next',
                                cancel: 'Cancel',
                            },
                        }).then(function (moduleDescription) {
                            if (moduleDescription) {
                                swal({
                                    title: "Edit Module",
                                    text: `Please enter the new module credits for\n ${moduleTitle}`,
                                    icon: "info",
                                    content: {
                                        element: "input",
                                        attributes: {
                                            placeholder: `${response[0].credits}`,
                                        }
                                    },
                                    buttons: {
                                        confirm: 'Edit',
                                        cancel: 'Cancel',
                                    },
                                }).then(function (moduleCredits) {
                                    if (isNaN(moduleCredits)) {
                                        swal({
                                            title: "Error",
                                            text: "Invalid input for module credits",
                                            icon: "error",
                                            button: "OK",
                                        })
                                        return;
                                    }
                                    if (moduleCredits) {

                                        $.ajax({
                                            url: `/modules/${moduleId}`,
                                            type: 'PUT',
                                            data: {
                                                module: moduleName,
                                                title: moduleTitle,
                                                description: moduleDescription,
                                                credits: moduleCredits,
                                            },
                                            success: (response, txtStat, xhr) => {
                                                swal({
                                                    title: "Edited!",
                                                    text: `Module id:${moduleId} has been edited successfully. Reloading now...`,
                                                    icon: "success",
                                                    buttons: {},
                                                });
                                                console.log(`Module id: ${moduleId} edited successfully.`);
                                                //reload after 1.5 seconds
                                                setTimeout(function () {
                                                    window.location.reload();
                                                }, 1000);
                                            },
                                            error: (xhr, txtStat, error) => {
                                                // if new module name already exists, show error message
                                                if (xhr.status == 409) {
                                                    console.log(`Error: ${error}`);
                                                    swal({
                                                        title: "Error",
                                                        text: "Module name already exists",
                                                        icon: "error",
                                                        button: "OK",
                                                    })
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    }
    );
}

function addModuleCollapser() {
    var coll = document.getElementsByClassName("collapsible");
    var i;
    for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }
}

function createNewModule() {
    // use ajax to post the new module to the database
    var moduleName = $('#moduleNameAbbreviation').val();
    var moduleDescription = $('#moduleDescription').val();
    var moduleTitle = $('#moduleTitle').val();
    var moduleCredits = $('#moduleCredits').val();
    var createModuleButton = $('#createModuleButton');

    // ensure moduleCredits is a number
    if (isNaN(moduleCredits) || !moduleName || !moduleDescription || !moduleTitle || !moduleCredits) {
        swal({
            title: "Invalid Input",
            text: "Please check you have entered all the required fields correctly.",
            icon: "error",
            button: "OK",
        });
        return;
    }
    $.ajax({
        url: '/modules',
        type: 'POST',
        data: {
            module: moduleName,
            title: moduleTitle,
            credits: moduleCredits,
            description: moduleDescription,
        },
        success: (response, txtStat, xhr) => {
            console.log(`Module ${moduleName} created successfully`);
            //reload after 1.5 seconds
            swal({
                title: "Created!",
                text: `Module ${moduleName} has been created successfully. Reloading now...`,
                icon: "success",
                buttons: {},
            });
            createModuleButton.attr('disabled', true);
            setTimeout(function () {
                window.location.reload();
            }, 1000);
        },
        error: (xhr, txtStat, error) => {
            console.log(`Error: ${error}`);
            if (xhr.status == 409) {
                swal({
                    title: "Error",
                    text: "Module already exists",
                    icon: "warning",
                    button: "OK",
                });
            }
        }
    })





}







/* eslint-disable no-unreachable */
/* eslint-disable no-console */
// const { pool } = require('./database')

// const modulesDB = {
//     getModules: (callback) => {
//         console.log('Connected in modules.js ');
//         const sql = 'SELECT * FROM modules';
//         pool.query(sql, [], (err, result) => {

//             if (err) {
//                 console.log(err, 'modulesjs problem');
//                 return callback(err, null);
//             }
//             console.log(result);
//             return callback(null, result);

//             pool.end();
//         });
//     }
// };

// module.exports = modulesDB;

