const express = require('express');
const path = require('path');
const cookieParser = require("cookie-parser")

// helpers
const { initialiseDB } = require('./helpers/db');
const { isAuthed } = require('./helpers/auth');

// routes
const getPlants = require('./routes/plants/get');
const getGardens = require('./routes/gardens/get');
const register = require('./routes/register');
const login = require('./routes/login');
const createGarden = require('./routes/gardens/post');
const updateGarden = require('./routes/gardens/put');

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
app.get('/api/plants', getPlants);
app.post('/api/register', register);
app.post('/api/login', login);

// define our private routes
app.post('/api/gardens', isAuthed, createGarden);
app.get('/api/gardens', isAuthed, getGardens);
app.get('/api/gardens/:id', isAuthed, getGardens);
app.put('/api/gardens/:id', isAuthed, updateGarden);

app.listen(port, () => {
    console.log(`web is running on container port ${port}`);
});