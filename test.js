// test.js , testing arena

let x = "30 July 2022, 5:20:17 pm"

let y = "31 July 2022, 6:45:17 pm"
let z = "1 Febraury 2000, 6:45:17 pm"
// convert to timestamp
let x_timestamp = new Date(x).getTime()
let y_timestamp = new Date(y).getTime()
let z_timestamp = new Date(z).getTime()
console.log(x_timestamp)
console.log(y_timestamp)
console.log(z_timestamp)



// sending back the first row, 
res.json(somePlannerColumnsQuery.rows[0])
// so similarly for last row, and index at 0
res.json(somePlannerColumnsQuery.rows[xxx.length-1])
res.json(somePlannerColumnsQuery.rows[somePlannerColumnsQuery.rows.length - 1]);