const express = require('express'); 
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user');

const app = express();

// Reading the database connection credentials from a file saved locally instead of hardcoding it
try {
    var dbCredentials = fs.readFileSync('dbCredentials.txt', 'utf8');
} catch (e) {
    console.log('Error:', e.stack);
}

// Establishes database connection
mongoose.connect('mongodb+srv://' + dbCredentials + '@cluster0-q3g82.mongodb.net/test?retryWrites=true&w=majority').then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
})
    .catch((error) => {
        console.log('Unable to connect to MongoDB Atlas!');
        console.error(error);
    });

// Adding headers to avoid Cross Origin Resource Sharing errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, C-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Parsing json objects transmitted to be read
app.use(bodyParser.json());

// Hooking the routes
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/stuff', stuffRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;