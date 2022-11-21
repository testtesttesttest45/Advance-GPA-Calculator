/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
/* eslint-disable no-else-return */
/* eslint-disable no-shadow */
/* eslint-disable no-return-await */
/* eslint-disable camelcase */
const express = require("express");
const cors = require("cors");
const createHttpError = require("http-errors");
const jwt = require("jsonwebtoken");
//const modules = require("./js/modules");
const { get, addResultsNanoKey, addGrades, addResultsCusKey, deleteExpired } = require("./storage");
const { pool } = require("./js/database");
const userDB = require("./user");
const userManager = require("./user.js");
// const planManager = require('./js/plan'); // u are turning frontend codes into backend, they cant detect windows DOM elements
const validateToken = require("../middleware/auth");
const { UserExistsError, WrongPasswordError, NoSuchUserError, DuplicateKey } = require("./error");


function Now() {
  let month = new Date().toLocaleString('default', { month: 'long' })
  let day = new Date().toLocaleString('default', { day: 'numeric' })
  let year = new Date().toLocaleString('default', { year: 'numeric' })
  let time = new Date().toLocaleString('default', { hour: 'numeric', minute: 'numeric', second: 'numeric' })
  return `${day} ${month} ${year}, ${time}`
}
module.exports = express()
  .use(cors())
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use(express.static("public"))

  // POST /signup
  .post('/signup', async (req, res, next) => {
    const { username, email, password } = req.body;
    // send to database
    await userManager.signup(username, email, password).then(() => {
      console.log(`User ${username} signed up successfully.`);
      return res.status(201).send(`User ${username} signed up successfully.`);
    })
      .catch((error) => {
        if (error instanceof UserExistsError) {
          console.log(`Email is already taken.`);
          return next(createHttpError(409, `Email is already in use.`));
        }
        return next(error);
      });
  })


  // .post("/signup", async (req, res) => {
  //   try {
  //     const { username, email, password } = req.body;
  //     // const hashedPassword= bcrypt.hashSync(password, bcrypt.genSaltSync(10)) 

  //     const newUser = await pool.query(
  //       "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
  //       [username, email, password]
  //     );
  //     res.json(newUser.rows);
  //   } catch (err) {
  //     // eslint-disable-next-line no-console
  //     console.error(err.message);
  //   }
  // })

  // POST /login
  .post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    return await userManager
      .hashCompare(email, password)
      .then((res) => {
        //console.log("Test1: ", res);
        return userManager.createJWT(res.user_id, res.username, email);
      })
      .then((token) => {
        //console.log("Test2: ", token);
        return res.status(201).json({ token });
      })
      .catch((error) => {
        console.log("Test3: ");
        if (error instanceof WrongPasswordError) {
          return next(createHttpError(401, `Password incorrect for ${email}.`));
          // return res.status(401).send(`Password incorrect for ${email}.`);
        }
        else if (error instanceof NoSuchUserError) {
          return next(createHttpError(404, `No such user found.`));
        } else {
          return next(error);
        }
      });
  })

  //   .post("/login", (req, res) => {
  //   const { email, password } = req.body;
  //   userDB.loginUser(email, password, (err, token, result) => {
  //     if (!err) {
  //       res.statusCode = 200;
  //       res.setHeader("Content-Type", "application/json")
  //       // eslint-disable-next-line no-console
  //       console.log("UserInfo:", result.rows);
  //       res.json({
  //         success: true,
  //         UserData: JSON.stringify(result.rows),
  //         token,
  //         status: "You are successfully logged in!",
  //       });
  //       res.send();
  //     } else {
  //       res.status(500);
  //       res.sendStatus(err.statusCode);
  //     }
  //   });
  // })

  // GET /modules
  .get("/modules", async (req, res) => {
    try {
      const modules1 = await pool.query(
        "SELECT * FROM modules ORDER BY module ASC;"
      );
      res.json(modules1.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  // GET /getOneModule/:id NOTE: THIS ENDPOINT IS USE TO SPECIFICALLY CHECK IF THE MODULE EXISTS
  .get("/getOneModule/:id", async (req, res, next) => {
    try {
      const modules1 = await pool.query(
        "SELECT * FROM modules WHERE module_id = $1;",
        [req.params.id]
      );
      // check if module exists, if not createHttp error 404
      if (modules1.rows.length === 0) {
        return next(createHttpError(404, `Module ${req.params.id} not found.`));
      }
      res.json(modules1.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  // GET /modules/:module_id NOTE: THIS ENDPOINT IS FOR LOADING DATA OF THE MODULE, DONT CARE IF NO DATA OR NOT
  .get("/modules/:module_id", async (req, res, next) => {
    const { module_id } = req.params;
    try {
      // const oneModule = await pool.query("SELECT * FROM modules where module_id = $1", [module_id]);
      console.log("get /modules/:module_id =>", module_id);
      const oneModule = await pool.query(
        "Select * FROM grades WHERE grades.module = (Select modules.module from modules where modules.module_id=$1) ORDER BY grade ASC;",
        [module_id]
      );
      res.json(oneModule.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  // POST /modules
  .post("/modules", async (req, res, next) => {
    try {
      const { module, title, credits, description } = req.body;
      const newModule = await pool.query(
        "INSERT INTO modules (module, title, credits, description) VALUES ($1, $2, $3, $4) RETURNING *",
        [module, title, credits, description]
      );
      res.json(newModule.rows);
    } catch (err) {
      //check if error code is '23505' which is for duplicates
      if (err.code === "23505") {
        return next(createHttpError(409, `Module already exists.`));
      }
      return next(err);
    }
  })

  // PUT /modules/:moduleId
  .put("/modules/:moduleId", async (req, res, next) => {
    try {
      const { moduleId } = req.params;
      const { module, title, credits, description } = req.body;
      const updateModule = await pool.query(
        "UPDATE modules SET module= $1, title = $2, credits = $3, description = $4 WHERE module_id = $5",
        [module, title, credits, description, moduleId]
      );
      res.json("Module information updated successfully!");
    } catch (err) {
      if (err.code === "23505") {
        return next(createHttpError(409, `Module already exists.`));
      }
      return next(err);
    }
  })

  // DELETE /modules/:moduleId 
  .delete("/modules/:moduleId", async (req, res) => {
    try {
      const { moduleId } = req.params;
      const deleteModule = await pool.query(
        "DELETE FROM modules where module_id = $1",
        [moduleId]
      );
      res.json("Module deleted successfully!");
    } catch (err) {
      console.error(err.message);
    }
  })
  //get all users who are public
  .get("/users", async (req, res) => {
    try {
      // select users that are not private
      const users = await pool.query(
        "SELECT * FROM users WHERE private = false;"
      );
      res.json(users.rows);
    } catch (err) {
      console.error(err.message);
    }
  })



  // PUT /user/userId 
  .put("/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;

      const { username, password, private } = req.body;
      const hashedPassword = await userDB.hashedPassword(password);

      const updateUser = await pool.query(
        "UPDATE users SET username = $1, password = $2, private = $3 WHERE user_id = $4",
        [username, hashedPassword, private, userId]
      );

      console.log("updated successfully!");
      res.json("user information updated successfully!");
    } catch (err) {
      console.error("edit profile err: ", err.message);
    }
  })



  // GET /user/:userId
  .get("/user/:userId", async (req, res) => {
    try {
      const { userId } = req.params;
      const user = await pool.query("SELECT * FROM users WHERE user_id = $1", [
        userId,
      ]);
      res.json(user.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  // GET /users/:username
  .get("/users/:userId", async (req, res) => {
    // .get("/users", async (req, res) => {
    const { userId } = req.params;
    // const { userId } = req.query;
    try {
      const oneUser = await pool.query(
        // "SELECT result_id,data FROM results, users WHERE users.user_id = $1 and results.username = users.username",
        "SELECT result_id, data, key, gpa, created_on FROM results, users WHERE results.fk_userid = users.user_id AND users.user_id = $1",
        [userId]
      );
      res.json(oneUser.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  // DELETE /result/:resultId
  .delete("/result/:resultId", async (req, res) => {
    try {
      const { resultId } = req.params;
      const deleteResult = await pool.query(
        "DELETE FROM results where result_id = $1",
        [resultId]
      );
      res.json("Result deleted successfully!");
    } catch (err) {
      console.error(err.message);
    }
  })

  // GET /storage/:KEY
  .get("/storage/:key", (req, res, next) => {
    const { key } = req.params;
    if (!key) {
      return next(createHttpError(400, "Please provide a key"));
    }
    return get(key)
      .then((data) => {
        console.log("right here", data)
        if (!data)
          return next(createHttpError(404, `Key ${key} not found`));
        return res.json(data);
      })
      .catch(next);
  })

  // GET /storage
  .get("/storage", async (req, res) => {
    try {
      const modules1 = await pool.query("SELECT * FROM results");
      res.json(modules1.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  // DELETE /storage
  .delete("/storage", (req, res, next) => {
    // console.log("delete api called");
    const result = deleteExpired();
    // console.log("result: ", result)
    result
      .then((data) =>
        // console.log("data:",data);
        res.json(data)
      )
      .catch(next);
  })

  // POST /storage
  .post("/storage", (req, res, next) => {
    const data = req.body;
    if (!data) {
      return next(createHttpError(400, "Please provide data"));
    }
    // const { expireDuration } = req.query;

    return addResultsCusKey(data.modules, data.shareKey, data.gpa, data.fkuserid)
      // return addResultsCusKey(data.modules, data.shareKey, expireDuration, data.gpa, data.username)
      .then((resultKey) => res.status(201).json({ key: resultKey }))
      .catch((error) => {
        if (error instanceof DuplicateKey) {
          console.log(`${Key} is in use!!`);
          return next(createHttpError(409, `${Key} is in use!!`));
        }
        return next(error);
      });
  })

  // POST /storageNano
  .post("/storageNano", (req, res, next) => {
    const data = req.body;
    if (!data) {
      return next(createHttpError(400, "Please provide data"));
    }
    const { nanoKey } = req.query;
    return addResultsNanoKey(data.modules, data.shareKey, data.gpa, nanoKey, data.fkuserid)
      // return addResultsNanoKey(data.modules, data.shareKey, expireDuration, data.gpa, nanoKey, data.username)
      .then((nano_key) => res.status(201).json({ nano_key }))
      .catch(next);
  })

  // POST /grades
  .post("/grades", (req, res, next) => {
    console.log("insert into grades  this is called");
    const grademodule = req.body;

    // const gradegrade = req.body;
    // console.log("test grademod==>", grademodule);
    if (!grademodule) {
      return next(createHttpError(400, "Please provide data"));
    }
    return addGrades(grademodule.modules)
      .then((resultKey) => {
        console.log("responding 201 for post grades");
        const response = res
          .status(201)
          .json({ result: JSON.stringify(resultKey) });
        // console.log("Response=>", response)
        return response;
      })
      .catch(next);
  })


  // GET /plan/:userID >>> This is for getting the current_gpa and current_credits columns from the planner table 
  // qwl here, using for index.html's autofill if the user has already created a planner
  .get("/plan/:userID", async (req, res, next) => {
    // console.log("Getting current_gpa and current_credits columns from the planner table!");
    try {
      const { userID } = req.params;
      const somePlannerColumnsQuery = await pool.query(
        `
        SELECT
        *
        FROM
        planner
        WHERE
        fk_userid
        =
        $1
        AND 
        is_fulfilled = false
        `,
        [
          userID,
        ]
      );
      if (somePlannerColumnsQuery.rows.length === 0) {
        return res.json(somePlannerColumnsQuery.rows); // send empty array
      } else {
        return res.json(somePlannerColumnsQuery.rows[somePlannerColumnsQuery.rows.length - 1]);
        // return res.json(somePlannerColumnsQuery.rows[somePlannerColumnsQuery.rows.length - 1]);
      }

      // res.json(somePlannerColumnsQuery.rows);
      // instead of sending back every row, send back the last row 
      //res.json(somePlannerColumnsQuery.rows[somePlannerColumnsQuery.rows.length - 1]);
      // console.log(somePlannerColumnsQuery.rows.length);
    } catch (e) {
      console.error(e);
    }
  })

  .get("/plan/:userID", async (req, res, next) => {
    // console.log("Getting current_gpa and current_credits columns from the planner table!");
    try {
      const { userID } = req.params;
      const somePlannerColumnsQuery = await pool.query(
        `
        SELECT
        *
        FROM
        planner
        WHERE
        fk_userid
        =
        $1
        AND 
        is_fulfilled = false
        `,
        [
          userID,
        ]
      );
      if (somePlannerColumnsQuery.rows.length === 0) {
        return res.json(somePlannerColumnsQuery.rows); // send empty array
      } else {
        return res.json(somePlannerColumnsQuery.rows[somePlannerColumnsQuery.rows.length - 1]);
        // return res.json(somePlannerColumnsQuery.rows[somePlannerColumnsQuery.rows.length - 1]);
      }

      // res.json(somePlannerColumnsQuery.rows);
      // instead of sending back every row, send back the last row 
      //res.json(somePlannerColumnsQuery.rows[somePlannerColumnsQuery.rows.length - 1]);
      // console.log(somePlannerColumnsQuery.rows.length);
    } catch (e) {
      console.error(e);
    }
  })

  // Assume the quiz in the brightspace can help me, where are the quiz anyway
  .get("/fulfilledplans/:userID", async (req, res, next) => {
    try{
      const { userID } = req.params;
      const getFulfilledQuery = await pool.query(
        `
        SELECT
        *
        FROM
        planner
        WHERE
        fk_userid
        =
        $1
        AND 
        is_fulfilled = true
        ORDER BY planner_id DESC
        `,
        [
          userID,
        ]
      );
      return res.json(getFulfilledQuery.rows);

      // res.json(somePlannerColumnsQuery.rows);
      // instead of sending back every row, send back the last row 
      //res.json(somePlannerColumnsQuery.rows[somePlannerColumnsQuery.rows.length - 1]);
      // console.log(somePlannerColumnsQuery.rows.length);
    }
    catch(err){
      console.error(err.message);
    }
  })

  .put("/plan/:plannerID", async (req, res, next) => {
    try {
      const { plannerID } = req.params;
      const created_on = Now();
      const { current_gpa, current_credits, target_gpa, future_credits } = req.body;
      const updatePlanner = await pool.query(
        `
        UPDATE planner
        SET
        current_gpa = $1,
        current_credits = $2,
        target_gpa = $3,
        future_credits = $4,
        created_on = $5
        WHERE
        planner_id = $6
        AND
        is_fulfilled = false
        `,
        [
          current_gpa,
          current_credits,
          target_gpa,
          future_credits,
          created_on,
          plannerID,
        ]
      );
      res.json("Planner updated successfully!");
    }
    catch(error) {
      console.log("error in put", error);
    }
  })

  // this is for updating fulfilled plans
  .put("/fulfilplan/:plannerID", async (req, res, next) => {
    try{
      const { plannerID } = req.params;
      const fulfillQuery = await pool.query(
        `UPDATE planner SET is_fulfilled = true WHERE planner_id = $1`,
        [plannerID,]);
      res.json("Planner fulfilled successfully!");
    }
    catch(err){
      console.error(err.message);
    }
  })

  // GET /plans/:userID >>> This is for getting all the columns of the planner table
  .get("/plans/:userID", async (req, res, next) => {
    // console.log("Getting all columns of the planner table!");
    try {
      const { userID } = req.params;
      const planByUserQuery = await pool.query(
        `
        SELECT
        *
        FROM
        planner
        WHERE
        fk_userid
        =
        $1
        `,
        [
          userID,
        ]);
      res.json(planByUserQuery.rows);
    } catch (err) {
      console.error(err.message);
    }
  })

  .delete("/plans/:plannerID", async (req, res, next) => {
    try {
      const { plannerID } = req.params;
      const deletePlanner = await pool.query(
        `
        DELETE FROM
        planner
        WHERE
        planner_id = $1
        `,
        [
          plannerID,
        ]
      );
      res.json("Planner deleted successfully!");
    } catch (err) {
      console.error(err.message);
    }
  })
  // DELETE /plan/:userID
  .delete("/plans/:userID", async (req, res, next) => {
  })

  // POST /plans
  .post("/plans", async (req, res, next) => {
    console.log('POSTing plans!');
    try {
      const {
        current_gpa,
        target_gpa,
        current_credits,
        future_credits,
        fk_userid
      } = req.body;
      const newPlanQuery = await pool.query(
        `
          INSERT INTO
          planner
          (current_gpa, target_gpa, current_credits, future_credits, fk_userid)
          VALUES
          ($1, $2, $3, $4, $5)
          RETURNING
          *
        `,
        [current_gpa, target_gpa, current_credits, future_credits, fk_userid]
      );
      res.json(newPlanQuery.rows);
    } catch (err) {
      if (err.code === '23505') {
        return next(createHttpError(409, 'User already made a plan'));
      } else if (err.code === '22003') {
        return next(createHttpError(400, 'User inputted to high of a value'))
      }
      return next(err);
    }
  })
  // POST /plans2
  .post("/plans2", async (req, res, next) => {
    let created_on = Now();
    try {
      const {
        current_gpa,
        target_gpa,
        current_credits,
        future_credits,
        fk_userid
      } = req.body;
      const newPlanQuery = await pool.query(
        `
          INSERT INTO
          planner
          (current_gpa, target_gpa, current_credits, future_credits, fk_userid, created_on)
          VALUES
          ($1, $2, $3, $4, $5, $6)
          RETURNING
          *
        `,
        [current_gpa, target_gpa, current_credits, future_credits, fk_userid, created_on]
      );
      res.json(newPlanQuery.rows);
    } catch (err) {
      console.log(err, "postplan2");
      return next(err);
    }
  })

  // GET /
  .get("/", (req, res) => {
    res.sendFile(`${__dirname}index.html`);
  })

  // GET /results.html
  .get("/results.html", (req, res) => {
    res.sendFile(`${__dirname}/results.html`);
  })

  // Small error handling
  .use((err, req, res, next) => {
    console.error(err);
    return res.status(err.status || 500).json({ error: err.message || `Unknown Error!` });
  });