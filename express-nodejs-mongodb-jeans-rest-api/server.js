require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const jeansRouter = require('./routes/jeansRoutes');

const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', (err) => console.error(err))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json());
app.use('/api/jeans', jeansRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, (err) => {
    if (err) console.log(err)
    else console.log(`Server running on port ${PORT}`);
})