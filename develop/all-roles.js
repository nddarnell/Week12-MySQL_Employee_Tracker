const mysql = require("mysql")
var connectMe = require("./connection")


var roles = {
    allRoles: function () {
        // need to place database list of all roles here

        connectMe.connectorFunc()

        connection.query("SELECT title FROM list_of_employees WHERE title IS NOT NULL GROUP BY title", function (err, roleResult) {
            if (err) throw (err)
            console.table(roleResult)
            // this works for calling itself over and over
            // roles.allRoles()
            //connection.end wants to be removed and youll want to recall userprompt again in all files
            connection.end()
        })


    }
}

module.exports = roles