const express = require('express');
const Joi = require('joi');

const app = express();

let shoes = [
    {
        id: 1, 
        category: 'Heels', 
        color: 'Red',
        country_of_origin: 'France'
    }, 
    {
        id: 2, 
        category: 'Flats',
        color: 'Brown',
        country_of_origin: 'United State'
    }, 
    {
        id: 3, 
        category: 'Boots',
        color: 'Black',
        country_of_origin: 'Italy'
    }, 
    {
        id: 4, 
        category: 'Mules',
        color: 'Gray',
        country_of_origin: 'Italy'
    }, 
    {
        id: 5, 
        category: 'Loafers',
        color: 'Orange',
        country_of_origin: 'Hong Kong'
    }
]

let idCount = 5;

app.use(express.json());

app.get('/', (req, res) => {
    res.status(200).send('HELLO FROM HOMEPAGE!')
})

// Get All Shoes

app.get('/api/shoes', (req, res) => {
    res.status(200).send(shoes);
})

// Get A Pair Of Shoes

app.get('/api/shoes/:id', (req, res) => {
    const shoesItem = shoes.find(s => s.id === parseInt(req.params.id))
    
    if (!shoesItem) {
        res.status(404).send('Item Not Found.');
    } else {   
        res.status(200).send(shoesItem);
    }
})

// Create A Pair Of Shoes

app.post('/api/shoes', (req, res) => {
    const schema = Joi.object({
        category: Joi.string().required(),
        color: Joi.string().required(),
        country_of_origin: Joi.string().required()
    });
    
    const validation = schema.validate(req.body);
    
    if (keysNotDefined(req, res)) return;

    if (validation.error) {
        return res.send(validation.error.details[0].message);
    } else {
        const shoesItem = {
            id: idCount + 1,
            category: req.body.category,
            color: req.body.color,
            country_of_origin: req.body.country_of_origin 
        };
        idCount += 1;
        shoes.push(shoesItem);
        res.status(200).send(shoesItem);
    }
})

// Update A Pair Of Shoes

app.put('/api/shoes/:id', (req, res) => {
    const index = shoes.findIndex(s => s.id === parseInt(req.params.id));
    
    if (keysNotDefined(req, res)) return;

    if (index === -1) {
        return res.status(404).send('Item Not Found.')
    } else {
        shoesItem = shoes[index]
        const shoesNewData = {
            id: shoesItem.id,
            category: req.body.category || shoesItem.category,
            color: req.body.color || shoesItem.color,
            country_of_origin: req.body.country_of_origin || shoesItem.country_of_origin
        }
        shoes[index] = shoesNewData;
        res.status(200).send(shoes[index])
    }
})

// Delete A Pair Of Shoes

app.delete('/api/shoes/:id', (req, res) => {
    const index = shoes.findIndex(s => s.id === parseInt(req.params.id));

    if (index === -1) {
        return  res.status(404).send('Item Not Found.')
    } else {
        id = shoes[index].id
        shoes.splice(index, 1);
        res.status(200).send(`Item ${id} has been deleted.`)
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server running on port ${PORT}`);
    }
})

const keysNotDefined = (req, res) => {
    const keys = ["category", "color", "country_of_origin"];
    
    for (let i in req.body) {
        if (!(keys.includes(i))) {
            return res.status(400).send(`"${i}" is not defined.`)
        }
    }
}