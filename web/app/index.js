const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser")

// helpers
const { initialiseDB } = require('./helpers/db');
const { isAuthed } = require('./helpers/auth');

// routes
const getPlants = require('./routes/getPlants');
const register = require('./routes/register');
const getGardens = require('./routes/getGardens');

// global variables
const port = 3000;
const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'changeme',
    database: 'plant-tracker'
};

initialiseDB(dbConfig);
const app = express();

// express middleware
app.use(express.json());
app.use(cookieParser())

// serve public directory for css, js and assets
app.use(express.static('public'));

//define our views
app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));

// define our public routes
app.get('/api/getPlants', getPlants);
app.post('/api/register', register);

// define our private routes
app.get('/api/gardens', isAuthed, getGardens)

app.listen(port, () => {
    console.log(`web is running on container port ${port}`);
});