const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const stuffRoutes = require('./routes/stuff');
const app = express();

try {
    var dbCredentials = fs.readFileSync('dbCredentials.txt', 'utf8');
} catch (e) {
    console.log('Error:', e.stack);
}

mongoose.connect('mongodb+srv://' + dbCredentials + '@cluster0-q3g82.mongodb.net/test?retryWrites=true&w=majority').then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
})
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, C-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use('/api/stuff', stuffRoutes);

module.exports = app;