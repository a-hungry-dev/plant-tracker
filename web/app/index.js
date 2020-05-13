const express = require('express');
const path = require('path');
const { initialiseDB } = require('./helpers/db');

const app = express();
const port = 3000;
const dbConfig = {
    host: 'db',
    user: 'root',
    password: 'changeme',
    database: 'plant-tracker'
};

initialiseDB(dbConfig);

// serve public directory for css, js and assets
app.use(express.static('public'));

//define our views
app.get("/", (req, res) => res.sendFile(path.join(__dirname, '/views/index.html')));

// import our routes
const getPlants = require('./routes/getPlants');

// define our routes
app.get('/api/getPlants', getPlants);

app.listen(port, () => {
    console.log(`web is running on container port ${port}`);
});