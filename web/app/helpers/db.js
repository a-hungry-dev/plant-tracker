var mysql = require('mysql');

let connection

const initialiseDB = (config) => {
    connection = mysql.createConnection(config);
}

const query = (string) => {
    return new Promise((res, rej) => {
        connection.query(string, (error, results) => {
            if (error) {
                res({ error })
            }
            res({ rows: results })
        })
    })
}

module.exports = {
    initialiseDB,
    query
}