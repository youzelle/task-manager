const mongodb = require('mongodb');

//give access to function so can perorm CRUD  operations
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

const {MongoClient, ObjectID} = require('mongodb');

//define connection url to database
const connectionURL = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

// //generate own id's
// const id = new ObjectID();
// console.log(id.id.length);
// console.log(id.toHexString().length);

//connect specific server
MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {
    if (error) {
       return  console.log("Unable to connect to database");
    }
    //database reference to manipulate created database
    const db = client.db(databaseName);

    //asynchronous
    // db.collection("users").findOne({_id: new ObjectID("5ca0c42b6cd29626b0763138")}, (error, user) => {
    //     if (error) {
    //         return console.log("unable to fetch");
    //     }

    //     console.log(user)
    // });

    db.collection("tasks").findOne({}, {sort: {_id: -1}, limit: 1}, (error, result) => {
        if (error) {
            return console.log("Could not retrieve result");
        }
        console.log(result);

    });

    db.collection("tasks").find({completed: false}).toArray((error, result) => {
        console.log(result);
    });
});
