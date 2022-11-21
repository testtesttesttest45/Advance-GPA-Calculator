/* eslint-disable no-undef */
/* eslint-disable no-console */
/* eslint-disable arrow-body-style */
/* eslint-disable import/order */
const jwt = require("jsonwebtoken")
const { pool } = require('./js/database');
const config = require('./config');
const { UserExistsError, NoSuchUserError, WrongPasswordError } = require('./error');
const bcrypt = require('bcryptjs');


function hashedPassword(password) {
    return bcrypt.hash(password, 10);
}

module.exports.hashedPassword = (password) => {
    return bcrypt.hash(password, 10);
};



function insertIntoDatabase(username, email, hash) {
    const query = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *`;
    const params = [username, email, hash];
    return pool.query(query, params).catch((error) => {
        if (error.code === '23505') {
            throw new UserExistsError(email);
        } else {
            throw error;
        }
    });
}

module.exports.signup = (username, email, password) => {
    return hashedPassword(password).then((hash) => insertIntoDatabase(username, email, hash));
};

function getUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email=$1`;
    const params = [email];
    return pool.query(query, params).then((response) => {
        console.log(response.rows);
        if (response.rows.length === 0) {
            throw new NoSuchUserError(email);
        }
        return response.rows[0];
    });
}

module.exports.hashCompare = (email, password) => {
    tempRes = null;
    return getUserByEmail(email)
        .then((result) => { 
            console.log("here", result);
            tempRes = result;
            return bcrypt.compare(password, result.password);
        })
        .then((isMatched) => {
            // console.log("here 2", isMatched);
            if (!isMatched) {
                throw new WrongPasswordError(email);
            }
            return tempRes;
        })
}

module.exports.createJWT = (userid, username, email) => {
    return jwt.sign({ userid, username, email }, config.key, {
        expiresIn: 3600 // expires in 1 hour
    });
}


// Below is Cheapo version of the above:

// const userDB = {
//     loginUser(email, password, callback) {
//         // var dbConn = client.getConnection();
//         // eslint-disable-next-line no-console
//         console.log(email, password);
//         // eslint-disable-next-line consistent-return
//         pool.connect((err) => {
//             if (err) {
//                 // eslint-disable-next-line no-console
//                 console.log(err, 'probleminloginUSerfunction1');
//                 return callback(err, null);
//             }
//             const sql = "SELECT * FROM users WHERE email=$1 and password =$2";
//             // eslint-disable-next-line no-shadow
//             pool.query(sql, [email, password], (err, result) => {
//                 if (err) {
//                     // eslint-disable-next-line no-console
//                     console.log(err, 'probleminloginUSerfunction2');
//                     return callback(err, null, null);
//                 }
//                 let token = "";
//                 if (result.rows.length === 1) {
//                     token = jwt.sign({ userid: result.rows[0].username }, config.key, {
//                         expiresIn: '10min'
//                     });
//                     // eslint-disable-next-line no-console
//                     console.log(`Your JWT Token: ${token}`);
//                     return callback(null, token, result);
//                 }
//                 const err2 = new Error("Email or password does not match.");
//                 // eslint-disable-next-line no-console
//                 console.log(err2);
//                 err2.statusCode = (401);
//                 return callback(err2, null, null);


//             });

//         });
//     },// end loginuser
    

// };

// module.exports = userDB;