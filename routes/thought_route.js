const router = require('express').Router();

const { Router } = require('express');
const { Thought, User } = require('../models/');

// Create a thought
router.post('/thoughts', async (req, res) => {
    try {
        const thought = await Thought.create(req.body);

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);

    }
});


//Get all thoughts
router.get('/thoughts', async (req, res) => {
    try {
        const thoughts = await Thought.find();

        res.json (thoughts);

    } catch (err) {
        res.status(500).json(err);
    }
});

// Get one thought by ID
router.get('/thoughts/:thought_id', async (req, res) => {
    try {
        const thought = await Thought.findById(req.params.thought_id);

        if (!thought) return res.status(404).json({
            message: 'thought with ID not found'
        });

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Add route to reaction
router.post('/thoughts/:thought_id/reactions', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thought_id, {
            $push:{
                reactions: req.body
            }
        });

        if (!thought) return res.status(404).json({
            message: 'thought with ID not found'
        });

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Delete route to reaction
router.delete('/thoughts/:thought_id/reactions', async (req, res) => {
    try {
        const thought = await Thought.findByIdAndUpdate(req.params.thought_id, {
            $pull: {
                reactions: req.body
            }
        });

        if (!thought) return res.status(404).json({
            message: 'thought with ID not found'
        });

        res.json(thought);
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router