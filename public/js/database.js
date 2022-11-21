/* eslint-disable no-console */
// require('dotenv').config();
// const { Client } = require('pg');
// const { Pool } = require('pg');


// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
//   host: "ec2-107-22-238-112.compute-1.amazonaws.com",
//   user: "naehijpwaenvuc",
//   port: 5432,
//   password: "82ebc060a7e844acadb59b2f7cb35350ba0c6794fbb37f7736d7d3514b8b1616",
//   database: "db00pasnq9ukmm",
//   ssl: {
//     rejectUnauthorized: false,
//   },
// })

// client.connect((err, client, release) => {
//   if (!err) {
//     return console.log(`Connected to the database server postgres:${client.user}`);
//   } else {
//     return console.error('Error acquiring client', err.stack);
//   }
// });

// module.exports = {
//   query: (sql, params) => (client.query(sql, params)),
//   // console.log('SENDING QUERY | ', sql, params);
//   end: () => client.end(),
//   POSTGRES_ERROR_CODE: {
//     UNIQUE_CONSTRAINT: '23505',
//   },
// };

require("dotenv").config();

const { Pool } = require("pg");

const isProduction = process.env.NODE_ENV === "production";

const connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`
const pool = new Pool({
    connectionString: isProduction ? process.env.DATABASE_URL : connectionString,
    // ssl: {
    //     rejectUnauthorized: false,
    // }
});
console.log(`Connected to the database server postgres:${process.env.DB_user}`);
// pool.query(`SELECT * FROM users`, (err, res) =>{
//     if(!err) {
//         console.log(res.rows);
//     } else {
//         console.log(err.message);
//     }
//     pool.end;
// })

module.exports = { pool };