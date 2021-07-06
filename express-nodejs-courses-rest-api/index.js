const express = require('express');
const bodyParser = require('body-parser');
const courseRoutes = require('./routes/courseRoutes');

const app = express();

app.use(bodyParser.json());
app.use('/api/courses', courseRoutes);

app.get('/', (req, res) => {
    res.status(200).send('Welcome to the Courses API!');
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server running on port ${PORT}`);
    }
})