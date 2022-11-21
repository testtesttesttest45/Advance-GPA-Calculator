/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unreachable */
/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable prefer-template */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable object-shorthand */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-undef */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-var */
/* eslint-disable one-var */
var _window$ReactQuery = window.ReactQuery,
    useQuery = _window$ReactQuery.useQuery,
    QueryClient = _window$ReactQuery.QueryClient,
    QueryClientProvider = _window$ReactQuery.QueryClientProvider;


function ResultsRow(props) {
    return React.createElement(
        "tr",
        null,
        React.createElement(
            "td",
            null,
            props.module
        ),
        React.createElement(
            "td",
            null,
            props.credit
        ),
        React.createElement(
            "td",
            null,
            props.grade
        )
    );
}
function ResultsTable(props) {
    return React.createElement(
        "table",
        { className: "spTable", id: "resultTable" },
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "Module"
                ),
                React.createElement(
                    "th",
                    null,
                    "Credit Unit"
                ),
                React.createElement(
                    "th",
                    null,
                    "Grade"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            props.rows.map(function (_ref) {
                var module = _ref.module,
                    credit = _ref.credit,
                    grade = _ref.grade;
                return React.createElement(ResultsRow, { module: module, credit: credit, grade: grade });
            })
        )
    );
}

function getResult() {
    var queryParams = new URLSearchParams(window.location.search);
    var key = queryParams.get('key');
    if (!key || key === '?') {
        // if key is not provided or enter  "?"
        console.log("Invalid key request");
        return;
    }
    return fetch("/storage/" + key).then(function (response) {
        return response.json(console.log("Status response", response.status));
    }).then(function (json) {
        console.log(json);
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
        // json stores userid and gpa
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

// eslint-disable-next-line no-unused-vars
function Results(props) {
    var _useQuery = useQuery('getResult', function () {
        return getResult();
    }, {
        refetchOnWindowFocus: false
    }),
        data = _useQuery.data,
        error = _useQuery.error,
        isLoading = _useQuery.isLoading;

    return (
        // if data is loading, show Loading...
        isLoading ? React.createElement(
            "div",
            { className: "spinner" },
            React.createElement(
                "h1",
                null,
                "Loading table data ..."
            )
        ) :

        // check if there is data then display the following
        data && data.length > 0 ? React.createElement(
            "div",
            null,
            isLoading ? React.createElement("p", null) : error ? React.createElement(
                "p",
                null,
                error.message
            ) : data && data[0].username != null ? React.createElement(
                "h2",
                null,
                data[0].username,
                "'s results"
            ) : React.createElement(
                "h2",
                null,
                "Guest User Result"
            ),
            isLoading ? React.createElement("p", null) : error ? React.createElement(
                "p",
                null,
                error.message
            ) : data && data[0].username != null ? React.createElement(
                "h4",
                null,
                "With key: ",
                data[0].key
            ) : React.createElement("h4", null),
            isLoading ? React.createElement("p", null) : error ? React.createElement(
                "p",
                null,
                error.message
            ) : React.createElement(ResultsTable, { rows: data[0].modules }),
            isLoading ? React.createElement("p", null) : error ? React.createElement(
                "p",
                null,
                error.message
            ) : React.createElement(
                "h2",
                null,
                "GPA: ",
                data[0].gpa
            )
        ) : // if there is no data, display the following
        React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                { className: "unfoundMessage" },
                "404 Error"
            ),
            React.createElement(
                "h2",
                { className: "unfoundMessage" },
                "The key you are looking for is not found!"
            )
        )
    );
}

var queryClient = new QueryClient();
function ResultsPage(props) {
    return React.createElement(
        QueryClientProvider,
        { client: queryClient },
        React.createElement(Results, null)
    );
}

window.addEventListener('DOMContentLoaded', function () {
    var root = ReactDOM.createRoot(document.querySelector('#root'));
    root.render(React.createElement(ResultsPage, null));
});