const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = new express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = user.generateAuthToken()
        res.status(201).send({user, token});
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();
        res.send({user, token});
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        })
        await req.user.save();

        res.send();
    } catch (error) {
        res.status(500).send();
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth ,async (req, res) => {
    res.send(req.user);
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

        //findByIdAndUpdate bypasses middleware, authentication
        const user = await User.findById(_id);

        updates.forEach(update => user[update] = req.body[update]);
        await user.save();

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


