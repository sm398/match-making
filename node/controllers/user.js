let db = require("../database/mongodb");
let collectionName = "user";

module.exports =
{
    addUser: function(user)
    {
        return new Promise(function(fulfill, reject)
        {
            db.add(user, collectionName).then(function(result)
            {
                fulfill(result.insertedId);
            }, function(err)
            {
                reject(err);
            });
        });
    }
}