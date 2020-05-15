const { query } = require('../helpers/db')

module.exports = async (req, res) => {

    let gardens
    try {
        gardens = await query(`SELECT * FROM gardens WHERE user_id = ${req.user.id}`)
    } catch (error) {
        res.json({ error: "something went wrong" })
    }

    for (let garden in gardens) {

        let plants
        try {
            plants = await query(`
                SELECT plants.name, plants.description
                FROM garden_plants
                JOIN plants ON garden_plants.plant_id = plants.id
                WHERE garden_plants.garden_id = ${gardens[garden].id}`)
        } catch (error) {
            res.json({ error: "something went wrong" })
        }
        gardens[garden].plants = plants
    }

    res.json(gardens)
}
