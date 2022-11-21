/* eslint-disable no-unreachable */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable no-var */
// eslint-disable-next-line import/prefer-default-export
export function getResult() {
    var queryParams = new URLSearchParams(window.location.search);
    var key = queryParams.get('key');
    if (!key || key === '?') {
        // if key is not provided or enter  "?"
        console.log("Invalid key request");
        return;
    }
    return fetch('/storage/' + key).then(function (response) {
        return response.json(console.log("Status response", response.status));
    }).then(function (json) {
        if (json.error) throw new Error(json.error);
        // convert json from Object to Array with For Iteration
        var series = [];
        var modData = JSON.parse(json.data);
        for (var i = 0; i < modData.length; i++) {
            series.push({
                module: modData[i].name,
                credit: modData[i].credit,
                grade: modData[i].grade
            });
        }
        // series stores module data with credit and grade


        console.log("Siri", json);
        // json stores username and gpa
        var x = {
            username: json.username,
            gpa: json.gpa,
            modules: series,
            key: json.key
            // convert x into array
        };var y = [];
        y.push(x);

        console.log("x is", x);
        console.log("y", y);
        return y;

        if (json.error) throw new Error(json.error);else return json;
    }).catch(function (error) {
        console.log(error);
    });
}