const { query } = require('../helpers/db')

module.exports = async ({ body }, res) => {



    // check user is logged in (kinda??)
    if (!body.user_id) return res.json({ error: "You are not logged in" })

    // check if garden exists for that user with the same name
    let garden_exists
    try {
        garden_exists = await query(`SELECT * FROM gardens WHERE name = '${body.name}' AND user_id = ${body.user_id};`);
    } catch (error) {
        res.json({ error: "something went wrong" })
    }

    // garden name already exists
    if (garden_exists.length > 0) return res.json({ error: "Garden already exists" });

    // insert new garden
    let garden
    try {
        garden = await query(`INSERT INTO gardens (name, user_id) VALUES ('${body.name}', ${body.user_id});`);
    } catch (error) {
        res.json({ error: "something went wrong" })
    }

    // return new garden id
    res.json({ garden_id: garden.insertId })
}