const { query } = require('../helpers/db')

module.exports = getPlants = async (req, res) => {
    let result
    try {
        result = await query(`SELECT * FROM gardens WHERE user_id = ${req.user.id}`)
    } catch (error) {
        res.json({ error: "something went wrong" })
    }
    res.json(result)
}