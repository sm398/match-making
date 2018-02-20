/**
 * This module handles end point for users. (Look at API documentation to see parameters and output of each endpoint)
 */

let express = require('express');
let router = express.Router();
let uc = require("../controllers/user.js");


router.post('/', function(req, res, next)
{
    uc.addUser(req.body).then(function(userId)
    {
        res.status = 201;
        res.json({"userId" : userId});
    });
});


module.exports = router;