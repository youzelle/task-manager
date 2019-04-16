const express = require('express');
require('./db/mongoose');
const User = require('./models/user');
const Task = require('./models/task');

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

app.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!_id.match(/^[0-9a-fA-F]{24}$/) || !isValidOperation) {
        return res.status(400).send({Error: 'Invalid Update!'});
    }

    try {
        const user = await User.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true} );

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);

    } catch (error) {
        res.status(400).send(error);
    }
})

app.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({Error: 'Invalid Update!'});
    }

    try {
        const user = await User.findByIdAndDelete(_id); 

        if (!user) {
            return res.status(404).send();
        }

        res.send(user);
    } catch (error) {
        res.status(500).send();
    }
})

app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
    
});

app.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status.send(500);
    }

})

app.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send();
    }

    try {
        const task = await Task.findById(_id);
        if (!task) {
            return res.status(404).send();
        }
        res.send(task);
    } catch (error) {
        res.status(500).send();
    }

})

app.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!_id.match(/^[0-9a-fA-F]{24}$/) || !isValidOperation) {
        return res.status(400).send({Error: 'Invalid Update!'});
    }

    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {new: true, runValidators: true} );

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch (error) {
        res.status(400).send(error);
    }
})

app.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    if (!_id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.status(400).send({Error: 'Invalid Update!'});
    }

    try {
        const task = await Task.findByIdAndDelete(_id); 

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);
    } catch (error) {
        res.status(500).send();
    }
})

app.listen(port, () => {
    console.log("Server is up on port: " + port);
});