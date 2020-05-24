const mysql = require("mysql")
var connectMe = require("./connection")

var allEmployeeItems = {
    allEmployees: function (){
        // need to place database list of all employees here
        // code fixed with new table
        connectMe.connectorFunc()
        var query = "SELECT first_name, last_name, department_name, title FROM list_of_employees INNER JOIN roles ON list_of_employees.role_id = roles.department_name_id INNER JOIN department ON roles.department_name_id = department.id;"
        connection.query(query, (err, allResult)=>{
            if (err) throw (err)
            console.table(allResult)
        })
        
        // console.log("list of all employees here")
    }
}

module.exports = allEmployeeItems