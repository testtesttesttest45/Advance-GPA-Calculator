/* eslint-disable func-names */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */



// To team: Dont remvoe the comments here  - they are very useful





let moduleInput = document.getElementById('module-name');
let dropList = document.getElementById('module-drop-list');
let creditInput = document.getElementById('credit');
let addmodulebutton = document.getElementById('add-module-btn');
let moduleList = [];


window.onload = () => {
    moduleInput = document.getElementById('module-name');
    dropList = document.getElementById('module-drop-list');
    creditInput = document.getElementById('credit');
    addmodulebutton = document.getElementById('add-module-btn');
    addmodulebutton.disabled = true;
    moduleInput.addEventListener('input', () => autoComplete(moduleInput.value));
    moduleInput.addEventListener('input', () => autoHighlighter());
}




// search the database and filter it
const autoComplete = async searchText => {
    const res = await fetch(`${STORAGE_API_HOST}/modules`);
    const modules = await res.json();
    // console.log(modules);
    // get matches to current text input


    // this is a strict search - only match the exact text
    // let matches = modules.filter(module => {
    //     const regex = new RegExp(`^${searchText}`, 'gi');
    //     return module.module.match(regex);
    // });

    // addmodulebutton.disabled = true;
    // if (searchText.length === 0) {
    //     matches = [];
    //     dropList.innerHTML = '';
    // }



    // this is a more lenient search, it will match the text anywhere in the module name, syncing with the autoHighlighter search
    // search for the module name based on the input toLowerCase().indexOf(input) > -1 and return the filtered modules
    let matches = modules.filter(module => module.module.toLowerCase().indexOf(searchText.toLowerCase().trim()) > -1);
    // if no matches, clear the drop list
    if (matches.length === 0) {
        dropList.innerHTML = '';
        return;
    }

    addmodulebutton.disabled = true;
    if (searchText.length === 0) {
        matches = [];
        dropList.innerHTML = '';
    }

    // console.log(matches);


    matches = matches.filter((a) => {
        if (addedinlist.includes(a.module)) return false
        return true;
    })

    outputHtmlDropList(matches);
}



// show results in HTML
const outputHtmlDropList = matches => {
    moduleList = matches
    if (matches.length > 0) {
        const html = matches.map((match, i) => `
        <div class="moduledropitem" style="width:100%" id="${match.module}-item" onclick="populateModuleData(${i})">
            ${match.module}
        </div>
        `).join('');

        dropList.innerHTML = html;
        // console.log(dropList)
    }
}

function populateModuleData(index) {
    console.log("Module item clicked");
    console.log(moduleList[index])
    const moduleData = moduleList[index];
    dropList.innerHTML = "";
    moduleInput.value = moduleData.module;
    creditInput.value = moduleData.credits;
    addmodulebutton.disabled = false;
    // when the module is clicked, we also need to call autoHighlighter to update the highlighted text
    autoHighlighter();
    
    
}



function autoHighlighter() {
    let searched = document.getElementById("module-name").value.trim();
    let options = document.getElementById("listofmodules").getElementsByTagName("option");
    if (searched !== "") {
        // the div with id listofmodules is the parent of the options. So i need to get all the options, dont know whats that? go back index.js line 410 onwards

        // first, i highlight the searched text if there is searched text, if no search text, then remove the highlight
        for (let i = 0; i < options.length; i++) {
            if (options[i].innerHTML.toLowerCase().indexOf(searched.toLowerCase()) > -1) {
                options[i].style.backgroundColor = "yellow";
            } else {
                options[i].style.backgroundColor = "white";
            }

            // if search text is empty, then remove the highlight
            // if (searched === "") { // NOTE TO my team: WHY U ASK? CAUSE we cannot simply remove the highlight like this, we need to use loop to remove the highlight because the options are dynamically created
            //    options[i].style.backgroundColor = "white"; // look at line 167+ to see the else statement
            // }
        }
        // store the highlighted options id in an array
        let highlightedOptions = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].style.backgroundColor === "yellow") {
                highlightedOptions.push(options[i].id);
            }
        }
        console.log("Initially:", highlightedOptions);
        // with this array of highlighted options, i can now scroll to the first highlighted option
        // scroll the div with id listofmodules to the first index of the highlightedOptions array, ensuring that it is on the top of the list
        if (highlightedOptions.length > 0) {
            // if there is at least one highlighted option, then scroll to the first highlighted option
            // document.getElementById("listofmodules").scrollTop = document.getElementById(highlightedOptions[0]).offsetTop - document.getElementById("listofmodules").offsetTop; // I subtracted here because the scrollTop is relative to the top of the div, not the top of the window, and Math;
            
            // set the first highlighted option to be at the top of the list, with smooth scrolling, the line on top like bullet train liddat
            document.getElementById("listofmodules").scrollTo({
                top: document.getElementById(highlightedOptions[0]).offsetTop - document.getElementById("listofmodules").offsetTop,
                behavior: "smooth"
            });
        }
        let moduleListButtonsNext = document.getElementById("moduleListButtonsNext");
        let moduleListButtonsPrev = document.getElementById("moduleListButtonsPrev");
        // moduleListButtonsNext will loop through the highlightedOptions array and scroll to the next index of the array on each click
        moduleListButtonsNext.onclick = function () {
            // each time i click the button, i need to scroll to the next index of the highlightedOptions array
            // remove the index of the first element of the array, and add the index of the next element of the array
            let index = highlightedOptions.shift(); // over here, i am removing the first element of the array by shift(), and adding the next element of the array
            highlightedOptions.push(index); // over here i am adding the removed element back to the array, so i can use Reverse Engineering for moduleListButtonsPrev click events to scroll to the previous index of the array
            // scroll to the next index of the array
            // document.getElementById("listofmodules").scrollTop = document.getElementById(highlightedOptions[0]).offsetTop - document.getElementById("listofmodules").offsetTop;
            // set the first highlighted option to be at the top of the list, with smooth scrolling, the line on top like bullet train liddat
            document.getElementById("listofmodules").scrollTo({
                top: document.getElementById(highlightedOptions[0]).offsetTop - document.getElementById("listofmodules").offsetTop,
                behavior: "smooth"
            });
            console.log("Next:", highlightedOptions); // open your browser and see how this changes the highlightedOptions array
        }
        // similarly for moduleListButtonsPrev, i need to scroll to the previous index of the array on each click
        moduleListButtonsPrev.onclick = function () {
            let index = highlightedOptions.pop(); // over here, i are removing the last element of the array by .pop(), and adding the previous element of the array
            highlightedOptions.unshift(index); // over here i are adding the removed element back to the array, so i can use Reverse Engineering for moduleListButtonsNext click events to scroll to the next index of the array. 
            // I am  using unshift because i want to add the removed element to the beginning of the array
            // document.getElementById("listofmodules").scrollTop = document.getElementById(highlightedOptions[0]).offsetTop - document.getElementById("listofmodules").offsetTop;
            // set the first highlighted option to be at the top of the list, with smooth scrolling, the line on top like bullet train liddat
            document.getElementById("listofmodules").scrollTo({
                top: document.getElementById(highlightedOptions[0]).offsetTop - document.getElementById("listofmodules").offsetTop,
                behavior: "smooth"
            });
            console.log("Prev:", highlightedOptions); // open your browser and see how this changes the highlightedOptions array
        }
        // this will keep looping through the array as long as the string in the input field is not empty

    } else {
        for (let i = 0; i < options.length; i++) { // I use a for loop to remove the highlight because the options are dynamically created
            options[i].style.backgroundColor = "white";
        }
    }
    // create a function that unhighlights the options when addmodulebutton is clicked and display listofmodules right at the top
    addmodulebutton.addEventListener('click', () => {
        for (let i = 0; i < options.length; i++) {
            options[i].style.backgroundColor = "white";
        }
        document.getElementById("listofmodules").scrollTop = 0;
    });


}





// Mr Jeremiah, this feature was way too tough requires deep thinking ! lucky i did it 





