const http = require('http');
const userController = require('./controllers/userController');

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        userController.getUsers(req, res)    
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        userController.getSingleUser(req, res, id)
    } else if (req.url === '/api/users' && req.method === 'POST') {
        userController.createUser(req, res)     
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        userController.updateUser(req, res, id)
    } else if (req.url.match(/\/api\/users\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        userController.deleteUser(req, res, id)
    } else {
        res.statusCode = 404;
        res.setHeader = ('Content-Type', 'application/json');
        res.end(JSON.stringify({msg: 'Route Not Found' }))
    }   
})

server.listen(PORT, (error) => {
    if (error) {
        console.log('Oops! Something went wrong.', error)
    } else {
        console.log(`Server running on port ${PORT}`)
    }
} )