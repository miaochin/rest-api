const mongoose = require('mongoose');

const jeansSchema = new mongoose.Schema({
    category: {
        type: String, 
        required: true
    },
    name: {
        type: String, 
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    purchaseDate: {
        type: Date,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model('Jeans', jeansSchema)