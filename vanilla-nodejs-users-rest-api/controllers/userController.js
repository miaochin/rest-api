const User = require('../models/userModel');
const utils = require('../utils');

// Get All Users, route: GET /api/users

const getUsers = async (req, res) => {
    try {
        const users = await User.searchAll();
        res.statusCode = 200;
        res.setHeader = ('Content-Type', 'application/json');
        res.write(JSON.stringify(users));
        res.end();
    } catch (error) {
        console.log(error);
    } 
}

// Get Single User, route: GET /api/users/:id

const getSingleUser = async (req, res, id) => {
    try {
        const user = await User.searchById(id);
        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({msg: 'User Not Found'}));
        } else {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(user));
        }
    } catch (error) {
        console.log(error);
    }
}

// Create a User, route: POST /api/users

const createUser = async (req, res) => {
    try {
        const body = await utils.getPostData(req);
        const {name, age, gender, job} = JSON.parse(body);
        const user = {
            name, 
            age, 
            gender, 
            job
        }
        const newUser = await User.create(user)
        res.writeHead(200, {'Content-Type':'application/json'})
        res.end(JSON.stringify(newUser));
    } catch (error) {
        console.log(error);
    }
}

// Update a User, route: PUT /api/users/:id

const updateUser = async (req, res, id) => {
    try {
        const user = await User.searchById(id);
        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({msg: 'User Not Found'}))
        } else { 
            const body = await utils.getPostData(req);
            const {name, age, gender, job} = JSON.parse(body);
            const userNewData = {
                name: name || user.name,
                age: age || user.age,
                gender: gender || user.gender,
                job: job || user.job
            }
            const updatedUser = await User.update(id, userNewData);
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(updatedUser));   
        }
    } catch (error) {
        console.log(error);
    }
}

// Delete a User, route: DELETE /api/users/:id

const deleteUser = async (req, res, id) => {
    try {
        const user = await User.searchById(id);
        if (!user) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({msg: 'User Not Found'}))
        } else {
            await User.remove(id);
            res.writeHead(200, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({msg :`User ${id} has been removed.`}))
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
}