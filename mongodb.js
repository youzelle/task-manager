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

    // db.collection("users").updateOne({
    //     _id: new ObjectID("5ca0a93369d13225ce9ba473")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((result) => {
    //     console.log(result);
    // }).catch((error) => {
    //     console.log(error);
    // });

    db.collection("tasks").updateMany({
        completed: false
    },{
        $set: {
            completed: true
        }
    }).then((result) => {
        console.log(result.modifiedCount);
    }).catch((error) => {
        console.log(error);
    })


    db.collection("tasks").find().toArray().then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    })

});
