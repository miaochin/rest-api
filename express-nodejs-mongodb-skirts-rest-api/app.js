require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { getSkirts, getSkirtById, addSkirt, updateSkirt, removeSkirt } = require('./models/skirtsModel');

const app = express();

app.use(bodyParser.json())

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection;

app.get('/', (req, res) => {
    res.send('Welcome to the Skirts API!')
})

app.get('/api/skirts', (req, res) => {
    getSkirts((err, skirts) => {
        if (err) throw err
        res.json(skirts)
    })
})

app.get('/api/skirts/:id', (req, res) => {
    getSkirtById(req.params.id, (err, skirt) => {
        if (err) throw err
        res.json(skirt)
    })
})

app.post('/api/skirts', (req, res) => {
    const skirt = req.body;
    addSkirt(skirt, (err, skirt) => {
        if (err) throw err
        res.json(skirt)
    })
})

app.put('/api/skirts/:id', (req, res) => {
    const id = req.params.id
    const skirt = req.body
    updateSkirt(id, skirt, { new: true }, (err, skirt) => {
        if (err) throw err
        res.json(skirt)
    })
})

app.delete('/api/skirts/:id', (req, res) => {
    const id = req.params.id
    removeSkirt(id, (err, skirt) => {
        if (err) throw err
        res.json(skirt)
    })
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server running on port ${PORT}`)
})
