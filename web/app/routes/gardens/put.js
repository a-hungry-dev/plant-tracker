const { query } = require('../../helpers/db');

module.exports = async ({ body, user }, res) => {
    let update
    try {
        // https://www.w3schools.com/sql/sql_update.asp
        update = await query(`UPDATE gardens SET name = "${body.name}" WHERE id=${body.id} AND user_id=${user.id}`);
    } catch (err) {
        res.json({ error: "Something went wrong" });
    }

    if (update.affectedRows === 0) {
        res.json({ error: "you don't own this garden" });
    }

    // body.plants = [{id: 0}]

    // remove from garden_plans where garden_id = params.id

    try {
        await query(`DELETE FROM garden_plants WHERE garden_id = ${body.id}`)
    } catch (error) {
        res.json({ error: "Something went wrong" });
    }


    try {
        body.plants.forEach(async plant => {
            await query(`INSERT INTO garden_plants (garden_id, plant_id) VALUES (${body.id}, ${plant.id});`)
        });
    } catch (error) {
        res.json({ error: "Something went wrong" });
    }

    res.json(body);
}

// old code = ({body, params}) => {
    // body = {
    //     id: 1,
    //     name: "dsfdsf",
            // user_id: 1
    //     plants: [
    //         {
    //             id: 1,
    //             ..
    //         },
    // {
    //     id: 2
    // }
    //         ..
    //     ]
    // }

    // query update garden -> 

    // for(plant in body.planbts){

    // }


    // remove from garden_plans where garden_id = params.id

    // const plants = body.plant_id;
    // try {
    //     plants.forEach(async plant => await query(`INSERT INTO garden_plants (garden_id, plant_id) VALUES (${params.id}, ${plant});`));
    // } catch (error) {
    //     res.json({ error: "Something went wrong" });
    // }
    // res.json({ plants });

    // return garden
// }