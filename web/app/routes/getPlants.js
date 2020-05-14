const { query } = require('../helpers/db')

module.exports = getPlants = async (req, res) => {
    let result
    try {
        result = await query(`INSERT INTO gardens (name) VALUES ("test")`)
    } catch (error) {
        console.log(error)
        res.json({ error: "something went wrong" })
    }
    res.json(result)
}