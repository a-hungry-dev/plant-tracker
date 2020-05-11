const express = require('express')
const app = express()
const { initialise } = require('./helpers/db')
const port = 3000

initialise({
    host: 'db',
    user: 'root',
    password: 'changeme',
    database: 'plant-tracker'
})

// import our routes
const getPlants = require('./routes/getPlants')

// define our routes
app.get('/api/getPlants', getPlants)

app.listen(port, () => {
    console.log(`web is running on container port ${port}`)
})