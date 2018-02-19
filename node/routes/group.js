var express = require('express');
var router = express.Router();
var groupController = require("../controllers/group");

router.post('/', function(req, res, next) {
    groupController.matchUser(req.body, req.headers["game"]).then(function(userId) {
        console.log("then");
        res.json({"userId" : userId});
    });
});


module.exports = router;
