const jwt = require("jsonwebtoken");
const config = require('../public/config');
// var config = require('../public/config');
const verifyFn = {

    verifyToken(req, res, next) {

        let token = req.headers.authorization;

        res.type('json');
        if (!token || !token.includes("Bearer ")) {

            res.status(403);
            res.send(`{"Message":"Not Authorized"}`);

        } else {
            // token = token.split('Bearer ')[1]; //obtain the token’s value
            token = token.substring(7);
            jwt.verify(token, config.key, (err, decoded) => {
                if (err) {// key invalid
                    res.status(403);
                    res.send(`{"Message":"Not Authorized"}`);
                } else {
                    req.username = decoded.username;
                    req.role = decoded.role;
                    next();
                }

            });
        }

    },
    verifyAdmin(req, res, next) {

        // eslint-disable-next-line no-console
        console.log(`${req.role}`)
        if (req.role === "admin") {
            next();
        }
        else {
            res.status(403);
            res.send(`{"Message":"Not Authorized"}`);
        }
    }

}
module.exports = verifyFn;
