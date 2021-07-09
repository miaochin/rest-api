const { v4:uuidv4 } = require('uuid');
const Joi = require('joi');

let bags = [
    {
        id: "ab84f0dd-188b-4d60-a5e8-10fdcf50a8ad",
        category: "Bucket Bags",
        name: "Large Handle Bucket Bag",
        price: 56.08
    },
    {
        id: "1d921120-04c2-4574-ae0d-bf25a327627a",
        category: "Clutches",
        name: "Quilted Chain Strap Clutch",
        price: 20.68
    }
];

const getBags = (req, res) => {
    res.status(200).send(bags);
}

const getSingleBag = (req, res) => {
    const bag = bags.find(b => b.id === req.params.id);
    if (!bag) return res.status(404).send(`Bag with Id ${req.params.id} Not Found.`)
    res.status(200).send(bag);
}

const createBag = (req, res) => {
    const schema = Joi.object({
        category: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required()
    })
    const validation = schema.validate(req.body);
    if (validation.error) return res.status(400).send(validation.error.details[0].message);
    const {category, name, price} = req.body
    const bag =  {id: uuidv4(), category, name, price};
    bags.push(bag)
    res.status(201).send(bag)
}

const updateBag = (req, res) => {
    const bag = bags.find(b => b.id === req.params.id)
    if (!bag) return res.status(404).send(`Bag with Id ${req.params.id} Not Found.`)
    const schema = Joi.object({
        category: Joi.string(),
        name: Joi.string(),
        price: Joi.number()
    })
    const validation = schema.validate(req.body);
    if (validation.error) return res.status(400).send(validation.error.details[0].message);
    const {category, name, price} = req.body;
    if (category) bag.category = category;
    if (name) bag.name = name;
    if (price) bag.price = price;
    res.status(200).send(bag);
}

const deleteBag = (req, res) => {
    const bagIndex = bags.findIndex(b => b.id === req.params.id)
    if (bagIndex == -1) return res.status(404).send(`Bag with Id ${req.params.id} Not Found.`)
    bags.splice(bagIndex, 1);
    res.status(200).send(`Bag with id ${req.params.id} has been deleted.`)
}

module.exports = {
    getBags, 
    getSingleBag, 
    createBag, 
    updateBag, 
    deleteBag
}