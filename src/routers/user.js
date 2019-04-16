const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }

});

router.get('/users', async (req, res) => {
    try { 
        const users = await User.find({});
        res.send(users);
    } catch (error) {
        res.status(500).send();
    }
});

//Server error is returned when mongoose cannot cast the supplied Id to the type ObjectId
//to 12 bytes
router.get('/users/:id', async (req,res) => {
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

router.patch('/users/:id', async (req, res) => {
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

router.delete('/users/:id', async (req, res) => {
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



module.exports = router;