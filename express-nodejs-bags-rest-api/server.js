const express = require('express');
const bodyParser = require('body-parser');
const bagRoutes = require('./routes/bagRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api/bags', bagRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Bags API!')
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server running on port ${PORT}`)
})