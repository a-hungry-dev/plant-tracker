const { query } = require('../helpers/db')

module.exports = async (req, res) => {
    let result
    try {
        result = await query(`SELECT * FROM plants`)
    } catch (error) {
        res.json({ error: "something went wrong" })
    }
    res.json(result)
}