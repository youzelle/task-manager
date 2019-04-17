const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(500).send(error);
    }
    
});

router.get('/tasks', async (req, res) => {

    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (error) {
        res.status.send(500);
    }

})

router.get('/tasks/:id', async (req, res) => {
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

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];

    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!_id.match(/^[0-9a-fA-F]{24}$/) || !isValidOperation) {
        return res.status(400).send({Error: 'Invalid Update!'});
    }

    try {
        const task = await Task.findById(_id);

        updates.forEach(update => task[update] = req.body[update]);
        await task.save();

        if (!task) {
            return res.status(404).send();
        }

        res.send(task);

    } catch (error) {
        res.status(400).send(error);
    }
})

router.delete('/tasks/:id', async (req, res) => {
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

module.exports = router;
