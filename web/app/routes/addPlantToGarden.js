const { query } = require ('../helpers/db');

module.exports = async ({ body }, res) => {
    let plant
    try {
        plant = await query(`INSERT INTO garden_plants (garden_id, plant_id) VALUES (${body.garden_id}, ${body.plant_id});`);
    } catch (error) {
        res.json ({ error: "Something went wrong"})
    }
    res.send({ plant })
}