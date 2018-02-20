/**
 * This module handles end point for games. (Look at API documentation to see parameters and output of each endpoint)
 */

let express = require('express');
let router = express.Router();
let gc = require("../controllers/game");


router.post('/assign', function(req, res, next)
{
    gc.assignUserToGame(req.body, req.headers["game"]).then(function(userId)
    {
        res.json({"userId" : userId});
    });
});


module.exports = router;
