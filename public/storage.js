/* eslint-disable no-undef */
/* eslint-disable spaced-comment */
/* eslint-disable no-unreachable */
/* eslint-disable no-else-return */
/* eslint-disable arrow-body-style */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
const createHttpError = require('http-errors');
const { nanoid } = require('nanoid');
const { format } = require('path');
const { pool } = require('./js/database');
// eslint-disable-next-line no-unused-vars
// const { query, POSTGRES_ERROR_CODE } = require('./js/database');

const TABLE_NAME = 'results';
module.exports.TABLE_NAME = TABLE_NAME;

const CREATE_TABLE_SQL = `
    CREATE TABLE ${TABLE_NAME} (
        result_id SERIAL primary key,
        fk_user_id INT REFERENCES users(user_id) ON UPDATE CASCADE ON DELETE CASCADE,
        gpa VARCHAR not null,
        key VARCHAR unique not null,
        data VARCHAR not null,
        expire_on INT
    );
`;
// cascade purpose on delete: if delete a user from Users table, then the all records under
// this deleted person's user_id will also be deleted from the Results Table
// in this app case, i made foreign key of user_id can be null, as guest will not have their user_id 
// when they generate link. Generating link will add data records i.e the module and grades in 
// Results Table, but guest user_id null for the fk_user_id column, while a Tom has a value of 24.
// another null column is the expireon.  Guest has a expiry duration of few days, RegUsers has no expiry; null,never expires

module.exports.CREATE_TABLE_SQL = CREATE_TABLE_SQL;
// console.log(new Date(payload.exp).toLocaleString())
// function getTimestampAfterNDays(n) {
//     return Math.floor(new Date().getTime() / 1000) + n * 24 * 60 * 60;
// }
// module.exports.getTimestampAfterNDays = getTimestampAfterNDays;


function Now() {
    let month = new Date().toLocaleString('default', { month: 'long' })
    let day = new Date().toLocaleString('default', { day: 'numeric' })
    let year = new Date().toLocaleString('default', { year: 'numeric' })
    let time = new Date().toLocaleString('default', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
    return `${day} ${month} ${year}, ${time}`
}




// eslint-disable-next-line default-param-last
module.exports.addResultsCusKey = function add(data, key, gpa, userid) {
    // module.exports.addResultsCusKey = function add(data, key, expireAfterDays = 7, gpa, username) {
    // instant expiring keys
    let expiry = "Never Expires anymore";
    let created_on = Now();
    // const expireOn = getTimestampAfterNDays(0);
    // const expireOn = getTimestampAfterNDays(expireAfterDays);
    // let dayOfExpiry = new Date(expireOn * 1000).toLocaleString();
    return pool.query(`INSERT INTO results (key, data, fk_userid, expire_on, gpa, created_on) VALUES($1, $2, $3, $4, $5, $6) RETURNING key`, [
        key,
        JSON.stringify(data),
        userid,
        // dayOfExpiry,
        expiry,
        gpa,
        created_on
    ])
        .then((response) => response.rows[0].key)
        .catch((error) => {
            if (error.code === '23505') {
                throw createHttpError(409, `Key ${key} already exists`);
            } else throw error; // unexpected error
        });
};

// eslint-disable-next-line default-param-last
module.exports.addResultsNanoKey = function add(data, key, gpa, nanoKey = nanoid(), userid) {
    // const expireOn = getTimestampAfterNDays(expireAfterDays);
    let expiry = "Never Expires anymore";
    let created_on = Now();
    return pool.query(`INSERT INTO results (key, data, expire_on, gpa, fk_userid, created_on) VALUES($1, $2, $3, $4, $5, $6) RETURNING key`, [
        nanoKey,
        JSON.stringify(data),
        // expireOn,
        expiry,
        gpa,
        userid,
        created_on,
    ])
        .then((response) => response.rows[0].key)
        .catch((error) => {
            if (error.code === '23505') {
                throw createHttpError(400, `Key ${nanoKey} already exists`);
            } else throw error; // unexpected error
        });
};

module.exports.addGrades = function addGrades(moduleList) {
    // instant expiring keys
    // const expireOn = getTimestampAfterNDays(0);
    // eslint-disable-next-line no-console
    console.log("addGrades: moduleList ==>", moduleList);
    const gradeList = []
    // eslint-disable-next-line no-restricted-syntax
    for (const mod of moduleList) {
        gradeList.push([mod.name, mod.grade]);
    }
    /*
    INSERT INTO grades (username, module, grade)
    VALUES ('j', 'ADES', '2'),
    ('j','ECG', '2.5'),
    (NULL,'Deng', '3');
    */
    // eslint-disable-next-line global-require
    const format = require('pg-format');
    return pool.query(format('INSERT INTO grades (module, grade) VALUES %L RETURNING *', gradeList)).then((response) => {
        // response.rows[0].key
        // eslint-disable-next-line no-console
        console.log("res rows=>", response.rows);
        return response.rows;
    })
        // eslint-disable-next-line no-unused-vars
        .catch((error) => {
            // eslint-disable-next-line no-console
            console.error("Unexpected error"); // unexpected error
        });
    // return query(`INSERT INTO grades (module, grade) VALUES($1, $2) RETURNING *`, [

};


module.exports.get = function get(key) {
    // module.exports.get = function get(key, now = getTimestampAfterNDays(0)) {
    return pool.query(
        //`SELECT data, gpa, key, fk_userid FROM results where key = $1`, // old code before refactoring
        //`SELECT username, data, gpa, key FROM results, users WHERE results.fk_userid = users.user_id AND key = $1`,
        `SELECT fk_userid, data, gpa, key FROM results WHERE key = $1`,
        [key]).then((result) => {
            if (result.rows[0].fk_userid !== null) {
                // return this query instead of the above query
                return pool.query(
                    `SELECT username, data, gpa, key FROM results, users WHERE results.fk_userid = users.user_id AND key = $1`,
                    [key]).then((result) => {
                        return result.rows[0];
                    });
            } else {
                // the results here will have fk_userid = null
                return result.rows[0];
            }
            if (!result.rows.length) return null;
            // console.log(JSON.parse(result.rows[0].data));
            return result.rows[0];
        });
};


// deleteExpired 
module.exports.deleteExpired = function deleteExpired() {
    const now = getTimestampAfterNDays(0)
    return pool.query(`Delete FROM results where expire_on < $1`, [now]).then((result) => {
        //  console.log(result);
        if (result.rowCount > 0) {
            return { statusMessage: `Removed ${result.rowCount} expired links` };
        }
        return { statusMessage: "No expired links to removed" };
    });
}
