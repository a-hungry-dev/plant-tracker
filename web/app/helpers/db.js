var mysql = require('mysql');

let connection

const initialiseDB = (config) => {
    connection = mysql.createConnection(config);
}

const query = (string) => {
    return new Promise((resolve, reject) => {
        connection.query(string, (error, results) => {
            if (error) {
                reject({ error })
            }
            resolve(results)
        })
    })
}

module.exports = {
    initialiseDB,
    query
}