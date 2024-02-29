const router = require('express').Router();

const { Router } = require('express');
const { Thought, User } = require('../models/');

// Create a user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);

        res.json(user);
    } catch (err) {
        res.status(500).json(err);

    }
});

//Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find();

        res.json(users);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one user by ID
router.get('/users/:user_id', async (req, res) => {
    try {
        const user = await User.findById(req.params.user_id);

        if (!user) return res.status(404).json({
            message: 'user with ID not found'
        });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a single user
router.put('/users/:user_id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.user_id, {
            username: req.body.username,
            email: req.body.email
        });

        if (!user) return res.status(404).json({
            message: 'user with ID not found'
        });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a user
router.delete('/users/:user_id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.user_id)

        if (!user) return res.status(404).json({
            message: 'user with ID not found'
        });

        res.json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


// Add new friend
router.post('/users/:user_id/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.user_id, {
           $addToSet: {
            friends: req.params.friendId
           }
        });

        if (!user) return res.status(404).json({
            message: 'user with ID not found'
        });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a friend
router.delete('/users/:user_id/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.user_id, {
         $pull: {
            friends: req.params.friendId
         }
        });

        if (!user) return res.status(404).json({
            message: 'user with ID not found'
        });

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router