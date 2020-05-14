const { query } = require('../helpers/db')

module.exports = async ({ body }, res) => {
    let result
    try {
        result = await query(`INSERT INTO users (name, email, password) VALUES ('${body.name}', '${body.email}', '${body.password}')`)
    } catch (error) {
        res.json({ error: "something went wrong" })
    }
    res.json({ status: "okay" })
}