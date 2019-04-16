const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

//mongose requests always return 200 even if request
//was successful even if nothing is returned

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }

});

app.get('/users', async (req, res) => {
    try { 
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
});

//Server error is returned when mongoose cannot cast the supplied Id to the type ObjectId
//to 12 bytes
app.get('/users/:id', async (req,res) => {
    const _id = req.params.id;
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send();
    }

    try {
       const user = await User.findById(_id);
       if (!user) {
        return res.status(404).send();
       }

       res.send(user);
    } catch (error) {
        res.status(500).send();
    }
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body);

    task.save().then(() => {
        res.status(201).send(task);
    }).catch((error) => {
        res.status(500).send(error);
    });
});

app.get('/tasks', (req, res) => {
    Task.find({}).then((tasks) => {
        res.send(tasks);
    }).catch((error) => {
        res.status.send(500);
    })
})

app.get('/tasks/:id', (req, res) => {
    const _id = req.params.id;
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send();
    }

    Task.findById(_id).then((task) => {
        if (!task) {
            return res.status(404).send();
        }

        res.send(task);

    }).catch((error) => {
        res.status(500).send();
    })
})

app.listen(port, () => {
    console.log("Server is up on port: " + port);
});