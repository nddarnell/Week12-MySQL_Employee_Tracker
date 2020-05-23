const mysql = require("mysql")
var connectMe = require("./connection")

var roles = {
    allRoles: function () {
        // need to place database list of all roles here

        connectMe.connectorFunc()

        connection.query("SELECT id, title, salary, department_name_id FROM roles;", (err, roleResult) =>{
            if (err) throw (err)
            console.table(roleResult)
            // this works for calling itself over and over
            // roles.allRoles() use main.userPrompt(); 
            
        })


    }
}

module.exports = roles