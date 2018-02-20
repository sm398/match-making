/**
 * This module is used for managing users
 */

let db = require("../database/mongodb");
let collectionName = "user";

module.exports =
{
    /**
     * Adds a user to the database
     * @param {Object} user - the user to be added
     * @returns {Promise<string>} - id of the user
     */
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
};