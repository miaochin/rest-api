const express = require('express');
const Jeans = require('../models/jeansModel')

const router = express.Router();

const getJeansItem = async (req, res, next) => {
    let jeansItem
    try {
        jeansItem = await Jeans.findById(req.params.id)
        if (!jeansItem) {
            return res.status(404).json({ message: 'Jeans Not Found.'})
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.jeans = jeansItem
    next()
}

// Get All Jeans

router.get('/', async (req, res) => {
    try {
        const jeans = await Jeans.find()
        res.status(200).json(jeans)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Get A Pair Of Jeans

router.get('/:id', getJeansItem, (req, res) => {
    res.status(200).json(res.jeans)
})

// Create A Pair Of Jeans

router.post('/', async (req, res) => {
    const jeansItem = new Jeans({
        category: req.body.category,
        name : req.body.name,
        price: req.body.price
    })
    try {
        const newJeans = await jeansItem.save();
        res.status(201).json(newJeans);
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Update A Pair Of Jeans

router.patch('/:id', getJeansItem, async (req, res) => {
    if (req.body.category) {
        res.jeans.category = req.body.category
    }
    if (req.body.name) {
        res.jeans.name = req.body.name
    }
    if (req.body.price) {
        res.jeans.price = req.body.price
    }
    try {
        const updatedJeans = await res.jeans.save()
        res.status(200).json(updatedJeans)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Delete A Pair Of Jeans

router.delete('/:id', getJeansItem, async (req, res) => {
    try {
        await res.jeans.remove()
        res.status(200).json({ message: 'Jeans Deleted' })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

module.exports = router