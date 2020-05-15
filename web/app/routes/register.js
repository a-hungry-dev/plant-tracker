const { query } = require('../helpers/db')

module.exports = async ({ body }, res) => {
    let result
    try {
        result = await query(`INSERT INTO users (name, email, password) VALUES ('${body.name}', '${body.email}', '${body.password}')`)
    } catch ({ error }) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.json({ error: "user already exists" })
        }
        return res.json({ error: "something went wrong" })
    }
    res.json({ status: "success" })
}