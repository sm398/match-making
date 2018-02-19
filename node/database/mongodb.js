const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URL;
const dbName = process.env.DB_NAME;
let dbo;

// Connect using MongoClient
MongoClient.connect(url, function(err, client)
{

    if (err) throw err;

    dbo = client.db(dbName);
    /*

    var deleteQuery = { name: /^/ };
    dbo.collection("users").deleteMany(deleteQuery, function(err, obj) {
        if (err) throw err;
        console.log(obj.result.n + " document(s) deleted");
        client.close();
    });

    var testUser = { ID: "1010", name: "Saad", profilePicture:"test" };
    dbo.collection("users").insertOne(testUser, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
    });

    var manyEntries = [
        { ID: "1", name: "test1", profilePicture:"test" },
        { ID: "2", name: "test2", profilePicture:"test" },
        { ID: "3", name: "test3", profilePicture:"test" },
        { ID: "4", name: "test4", profilePicture:"test" },
        { ID: "5", name: "test5", profilePicture:"test" },
        { ID: "6", name: "test6", profilePicture:"test" },
        { ID: "7", name: "test7", profilePicture:"test" }
    ];
    dbo.collection("users").insertMany(manyEntries, function(err, res) {
        if (err) throw err;
        console.log(res);
        client.close();
    });

    var query = { profilePicture: "test" };
    var sorting = { name: 1 };
    dbo.collection("users").find(query).sort(sorting).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
    });

    var query = { profilePicture: "test" };
    var newValues = { $set: {profilePicture: "modified"} };
    dbo.collection("users").updateMany(query, newValues , function(err, res) {
        if (err) throw err;
        console.log(res.result.nModified + " document updated");
        client.close();
    });

    dbo.collection("users").find().limit(3).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
    });
    */

});

module.exports =
{
    add: function(data, collectionName)
    {
        return dbo.collection(collectionName).insertOne(data);
    },

    filter: function(query, collectionName) {
        return dbo.collection(collectionName).find(query).toArray();
    },

    update: function(query, update, collectionName) {
        return dbo.collection(collectionName).update(query, update);
    }

};