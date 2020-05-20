const { query } = require('../helpers/db');
const { createSession } = require('../helpers/auth');

module.exports = async ({ body }, res) => {
    let result;
    try {
        result = await query(`SELECT * FROM users WHERE email = '${body.email}' LIMIT 1`);
    } catch (error) {
        return res.json({ error });
    };

    if (result.length === 0) return res.status(401).json({ error: "User not found" });
    if (result[0].password != body.password) return res.status(401).json({ error: "Password incorrect" });

    // email and password matched
    let token = createSession(result[0]);
    res.cookie("token", token).json({ status: "success" });
};