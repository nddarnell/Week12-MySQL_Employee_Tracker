const mysql = require("mysql")
var connectMe = require("./connection")


var roles = {
    allRoles: function () {
        // need to place database list of all roles here

        connectMe.connectorFunc()

        connection.query("SELECT title FROM list_of_employees WHERE title IS NOT NULL GROUP BY title", function (err, roleResult) {
            if (err) throw (err)
            console.table(roleResult)
            connection.end()
        })


    }
}

module.exports = roles