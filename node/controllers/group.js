var db = require("../database/mongodb");
var userController = require("./user");
var collectionName = "group";


module.exports =
{
    matchUser: function(user, game)
    {
        return new Promise(function(fulfill, reject) {
            console.log(user);
            userController.addUser(user).then(function(userId){
                console.log(userId);
                db.filter( { remainingPlayers : { $gt: 0 }, name : game}, collectionName ).then(function(result) {
                    console.log(result.length);
                    if (result.length === 0) {
                        createGroup(game).then(function(res) {
                            console.log(res.insertedId);
                            fulfill(userId);
                        });
                    }
                    else {

                    }
                });
            }, function(err) {
                reject(err);
            });
        })

    }


};

var getTeamSize = function(game)
{
    if(game === "football 6-a-side")
    {
        return 12;
    }
    else return 12;
};

var createGroup = function(game) {
    var group = {
        name : game,
        remainingPlayers : getTeamSize(game),
        players: []
    };
    return db.add(group, collectionName);
}

var addToGroup = function(userId, groupId) {

}