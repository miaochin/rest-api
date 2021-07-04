let users = require('../data/users.json');
const utils = require('../utils');
const uuid = require('uuid');

const searchAll = () => {
    return new Promise((resolve, reject) => {
        resolve(users)
    })
}

const searchById = (id) => {
    return new Promise((resolve, reject) => {
        const user = users.find((u) => u.id === id);
        resolve(user);
    })
}

const create = (user) => {
    return new Promise((resolve, reject) => {
        const newUser = {id: uuid.v4(), ...user};
        users.push(newUser);
        utils.writeDataToFile('./data/users.json', users)
        resolve(newUser)
    })
}

const update = (id, user) => {
    return new Promise((resolve, reject) => {
        const userIndex = users.findIndex((u) => u.id === id);
        users[userIndex] = {id, ...user};
        utils.writeDataToFile('./data/users.json', users)
        resolve(users[userIndex]);
    })
}

const remove = (id) => {
    return new Promise((resolve, reject) => {
        users = users.filter((u) => u.id !== id)
        utils.writeDataToFile('./data/users.json', users)
        resolve();
    })
}

module.exports = {
    searchAll, 
    searchById,
    create, 
    update, 
    remove
}