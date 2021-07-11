const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const skirtSchema =  new mongoose.Schema({
    category: {
        type: String, 
        required: true
    },
    name: {
        type : String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    purchaseDate:{
        type: Date,
        required: true,
        default: Date.now
    }
})

const Skirt = mongoose.model('Skirts', skirtSchema);

const getSkirts = (callback, limit) => {
    Skirt.find(callback).limit(limit)
}

const getSkirtById = (id, callback) => {
    Skirt.findById(id, callback)
}

const addSkirt = (skirt, callback) => {
    Skirt.create(skirt, callback)
} 

const updateSkirt = (id, skirt, options, callback) => {
    const query = { _id : id};
    const update = {
        category: skirt.category,
        name: skirt.name,
        color: skirt.color, 
        price: skirt.price
    }
    Skirt.findOneAndUpdate(query, update, options, callback)
}

const removeSkirt = (id, callback) => {
    const query = { _id: id}
    Skirt.remove(query, callback)
}

module.exports = {
    getSkirts, 
    getSkirtById, 
    addSkirt,
    updateSkirt,
    removeSkirt
}