const { query } = require('../helpers/db')

module.exports = getPlants = async (req, res) => {
    const { error, rows } = await query("SELECT * FROM plants")
    if (error) {
        res.json({ error: "something went wrong" })
        return
    }
    res.json(rows)
}