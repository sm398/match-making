/**
 * This module is used for performing queries to the database
 */

let mongoClient = require('mongodb').MongoClient;
let url = process.env.MONGODB_URL;
let dbName = process.env.DB_NAME;
let dbo = null;

//connects to the mongodb server
mongoClient.connect(url, function(err, client)
{
    if(err) throw err;
    dbo = client.db(dbName);
});

module.exports =
    {
        /**
         * Adds a json object to the database
         * @param {Object} data - json object that will be added to the database
         * @param {string} collectionName - name of the collection
         * @returns {Promise}
         */
        add: function(data, collectionName)
        {
            return dbo.collection(collectionName).insertOne(data);
        },
        
        /**
         * Filters the database with the given query and returns the result
         * @param {Object} query - the filter (look at mongodb documentation)
         * @param collectionName - name of the collection
         * @returns {Promise}
         */
        filter: function(query, collectionName)
        {
            return dbo.collection(collectionName).find(query).toArray();
        },
        
        /**
         * updates one document
         * @param {Object} query - query to find the document (look at mongodb documentation)
         * @param {Object} update - the update query (look at mongodb documentation)
         * @param collectionName - name of the collection
         * @returns {Promise}
         */
        update: function(query, update, collectionName)
        {
            return dbo.collection(collectionName).updateOne(query, update);
        },
        
        findOne: function(query, collectionName)
        {
            return dbo.collection(collectionName).findOne(query);
        }
    };