const { query } = require('../../helpers/db')

module.exports = async (req, res) => {
    // if an id was provided
    if (req.params.id) {
        // get that garden
        let garden = await getGarden(req.params.id).catch(error => {
            return res.json({ error: "oops something went wrong" })
        })
        //check the user making the request owns the garden
        if (garden.user_id !== req.user.id) {
            return res.json({ error: "you don't own this garden" })
        }
        // return the garden
        return res.json(garden)
    }
    //  otherwise get all gardens the user making the request owns
    let gardens = await getGardens(req.user.id).catch(error => {
        return res.json({ error: "oops something went wrong" })
    })
    // return the gardens
    return res.json(gardens)
}

getGarden = (garden_id) => {
    return new Promise(async (resolve, reject) => {
        let gardens
        try {
            gardens = await query(`SELECT * FROM gardens WHERE id = ${garden_id}`)
        } catch (error) {
            reject(error)
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
        resolve(gardens[0])
    })
}

getGardens = (user_id) => {
    return new Promise(async (resolve, reject) => {
        let gardens
        try {
            gardens = await query(`SELECT * FROM gardens WHERE user_id = ${user_id}`)
        } catch (error) {
            reject(error)
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
        resolve(gardens)
    })
}