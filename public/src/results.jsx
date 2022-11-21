const { useQuery, QueryClient, QueryClientProvider } = window.ReactQuery;

function ResultsRow(props) {
    return <tr>
        <td>{props.module}</td>
        <td>{props.credit}</td>
        <td>{props.grade}</td>
    </tr>
}
function ResultsTable(props) {
    return (
        <table className="spTable" id="resultTable">
            <thead >
                <tr>
                    <th>Module</th>
                    <th>Credit Unit</th>
                    <th>Grade</th>
                </tr>
            </thead>
            <tbody>
                {props.rows.map(({ module, credit, grade }) => (
                    <ResultsRow module={module} credit={credit} grade={grade} />
                ))}
            </tbody>
        </table>
    );
}


function getResult() {
    let queryParams = new URLSearchParams(window.location.search);
    let key = queryParams.get('key');
    if (!key || key === '?') { // if key is not provided or enter  "?"
        console.log("Invalid key request")
        return;
    }
    return fetch(`/storage/${key}`)
        .then((response) => response.json(console.log("Status response", response.status)))
        .then((json) => {
            console.log(json)
            if (json.error) throw new Error(json.error);
            //convert json from Object to Array with For Iteration
            let series = [];
            let modData = JSON.parse(json.data);
            for (let i = 0; i < modData.length; i++) {
                series.push({
                    module: modData[i].name,
                    credit: modData[i].credit,
                    grade: modData[i].grade
                });
            }
            // series stores module data with credit and grade


            console.log("Siri", json);
            // json stores userid and gpa
            let x = {
                username: json.username,
                gpa: json.gpa,
                modules: series,
                key: json.key
            }
            
            //convert x into array
            let y = [];
            y.push(x);

            console.log("x is", x)
            console.log("y", y);
            return y;


            if (json.error) throw new Error(json.error);
            else return json;
        })
        .catch((error) => {
            console.log(error);
        })

}

function Results(props) {
    const { data, error, isLoading } = useQuery('getResult', () => getResult(), {
        refetchOnWindowFocus: false,
    });
    return (
        // if data is loading, show Loading...
        isLoading ? <div className="spinner"><h1>Loading table data ...</h1></div> : (

            // check if there is data then display the following
            data && data.length > 0 ? (
                <div>
                    {/* not sure why keep having undefined error here if i dont duplicate like that */}
                    {/* check if username from data is not null. if not null, display username, else display Guest User */}
                    {isLoading ? <p></p> : error ? <p>{error.message}</p> : data && data[0].username != null ? <h2>{data[0].username}'s results</h2> : <h2>Guest User Result</h2>}
                    {isLoading ? <p></p> : error ? <p>{error.message}</p> : data && data[0].username != null ? <h4>With key: {data[0].key}</h4> : <h4></h4>}
                    {/* if loading table data, show react loading spinner */}
                    {isLoading ? <p></p> : error ? <p>{error.message}</p> : <ResultsTable rows={data[0].modules} />}
                    {isLoading ? <p></p> : error ? <p>{error.message}</p> : <h2>GPA: {data[0].gpa}</h2>}
                </div>
            ) : (   // if there is no data, display the following
                <div>
                    <h1 className="unfoundMessage">404 Error</h1><h2 className="unfoundMessage">The key you are looking for is not found!</h2>
                </div>
            )
        )
    );
}

const queryClient = new QueryClient();
function ResultsPage(props) {
    return (
        <QueryClientProvider client={queryClient}>
            <Results />
        </QueryClientProvider>
    )
}



window.addEventListener('DOMContentLoaded', function () {
    const root = ReactDOM.createRoot(document.querySelector('#root'));
    root.render(<ResultsPage />);
})