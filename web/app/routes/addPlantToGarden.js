const { query } = require ('../helpers/db');

module.exports = ({ body, params}, res) => {
    const plants = body.plant_id;
    try {
        plants.forEach(async plant => await query(`INSERT INTO garden_plants (garden_id, plant_id) VALUES (${params.id}, ${plant});`));
    } catch (error) {
        res.json({ error: "Something went wrong"});
    }
    res.json ({ plants });
}