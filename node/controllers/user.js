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
    },


    /**
     * Linking user to a game
     * @param {string} userId the user's ID
     * @param {string} gameId the game's ID
     * @returns {*|Promise} returns boolean promise
     */
    linkUserToGame: function(userId, gameId) {
        console.log(userId);
        console.log(gameId);
        return db.update( {_id: userId}, {"$set": { "gameId": gameId}}, collectionName );
    }
};