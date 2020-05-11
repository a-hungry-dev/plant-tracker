var mysql = require('mysql');

let connection

const initialise = (config) => {
    connection = mysql.createConnection(config);
}

const query = (string) => {
    return new Promise((res, rej) => {
        connection.query(string, (error, results) => {
            if (error) {
                console.log(error)
                res({ error })
            }
            res({ rows: results })
        })
    })
}

module.exports = {
    initialise,
    query
}