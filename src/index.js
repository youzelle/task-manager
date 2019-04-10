const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

//mongose requests always return 200 even if request
//was successful even if nothing is returned

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
    const user = new User(req.body);

    user.save().then(() => {
        res.status(201).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

app.get('/users', (req, res) => {
    User.find({}).then((users) => {
        res.send(users);
    }).catch((error) => {
        res.status(500);
    });
});

//Server error is returned when mongoose cannot cast the supplied Id to the type ObjectId
//to 12 bytes
app.get('/users/:id', (req,res) => {
    const _id = req.params.id;

    User.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).send();
        }

        res.send(user);

    }).catch((error) => {
        res.status(500).send();
    })
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.listen(port, () => {
    console.log("Server is up on port: " + port);
});