const mongodb = require('mongodb');

//give access to function so can perorm CRUD  operations
const MongoClient = mongodb.MongoClient;

//define connection url to database
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

//connect specific server
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
       return  console.log("Unable to connect to database");
    }
    //database reference to manipulate created database
    const db = client.db(databaseName);

    //asynchronous
    //insertOne(doc, options, callback) {Promise}
    // db.collection("users").insertOne({
    //     name: 'Danni',
    //     age: 25
    // }, (error, result) => {
    //     if (error) {
    //         return console.log("Unable to insert user");
    //     }

    //     console.log(result.ops);
    // })

    // db.collection("users").insertMany([
    //     {
    //         name: "Jen",
    //         age: 28
    //     },
    //     {
    //         name: "Dan",
    //         age: 30
    //     }
    // ], (error, result) => {
    //     if (error) {
    //         return console.log("Unable to inser documents!");
    //     }

    //     console.log(result.ops);
    // })

    
});
