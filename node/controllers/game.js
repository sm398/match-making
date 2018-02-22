/**
 * This module is used for managing games
 */

let db = require("../database/mongodb");
let uc = require("./user");
let collectionName = "game";

module.exports =
{
    /**
     * Adds person to the queue so that it can be added to a game
     * @param {Object} user - The user that will be queued
     * @param {String} gameName - The game that the player wants to play
     * @returns {Promise<>}
     */
    assignUserToGame: function(user, gameName)
    {
        return new Promise(function(fulfill, reject)
        {
            uc.addUser(user).then(function(userId)
            {
                getIncompleteGame(gameName).then(function(games)
                {
                    if (games.length === 0)
                    {
                        createGame(gameName, userId).then(function(res)
                        {
                            fulfill(userId);
                        });
                    }
                    else
                    {
                        linkGameToUser(games[0], userId).then(function(res)
                        {
                            uc.linkUserToGame(userId, games[0]._id).then(function(res){
                                fulfill(userId);
                            });
                        })
                    }
                });
            },
            function(err)
            {
                reject(err);
            });
        })
    },


    /**
     * Return the full game - or not
     * @param {Object} userId - The user asking for his game
     * @returns {Promise<boolean>} Promise that return true or false
     */
    getGame : function(userId) {
        return new Promise(function(fulfill, reject)
        {
            db.filter({remainingPlayers: 0} , collectionName).then(function(res, req){
                let found = false;
                for (let i = 0; i < res.length; i++) {
                    let game = res[i];
                    for (let j = 0; j < game.players.length; j++) {
                        let playerId = game.players[j];
                        if (playerId == userId) {
                            fulfill(game);
                            found = true;
                        }
                    }

                }
                if (!found) {
                    console.log("Not found or game incomplete");
                    reject("Game not ready");
                }
            })
        })
    },

    /**
     * Removes a user from a game
     * @param {Object} user - The user that will be removed
     * @param {String} game - The game that the player wants to retire from
     * @returns {Promise<boolean>} Promise that return true or false
     */
    removeUserFromGame : function(user, game) {
      return new Promise(function(fulfill, reject)
      {
        //ToDo
      })
    },


    /**
     * Replaces the injections. Can be used for mock testing
     * @param {Object} database
     * @param {Object} userController
     */
    inject: function(database, userController)
    {
        db = database;
        uc = userController;
    }


};

/**
 * Gets all the games that are not full
 * @param {string} game - name of hte game
 * @returns {Promise<Array>} - Promise that represents array of games
 */
let getIncompleteGame = function(game)
{
    return db.filter( { remainingPlayers : { $gt: 0 }, name : game}, collectionName );
};

/**
 * Creates a game in the database and adds a user to it
 * @param {string} game - name of the game
 * @param {string} userId - the ID of the user the lobby is created for in the first place
 * @returns {Promise<Object>} - returns the mongodb result of adding the game to the database
 */
let createGame = function(game, userId)
{
    let newGame =
        {
            name : game,
            remainingPlayers : (getGameSize(game) - 1),
            players: [userId]
        };
    console.log(newGame.players);
    return db.add(newGame, collectionName);
};

/**
 * Adds a user to an existing game
 * @param {Object} game - name of the game
 * @param {string} userId - the ID of the user the lobby is created for in the first place
 * @returns {Promise<Object>} - returns the mongodb result of adding the game to the database
 */
let linkGameToUser = function(game, userId)
{

    return db.update({ _id: game._id }, {$push: {players: userId}, $inc: { remainingPlayers: -1 }}, collectionName);
};

/**
 * Returns the total number of players in the given game
 * @param {string} game - name of the game
 * @returns {number} number of players that ideally play the game
 */
let getGameSize = function(game)
{
    if(game === "football 6-a-side")
    {
        return 12;
    }
    else return 12;
};