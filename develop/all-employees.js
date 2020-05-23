const mysql = require("mysql")
var connectMe = require("./connection")

var allEmployeeItems = {
    allEmployees: function (){
        // need to place database list of all employees here
        // code fixed with new table
        connectMe.connectorFunc()
        connection.query("SELECT id, first_name, last_name, role_id, manager_id FROM list_of_employees;", (err, allResult)=>{
            if (err) throw (err)
            console.table(allResult)
        })
        
        // console.log("list of all employees here")
    },
    allDepartment: function(){
        // need to place database list of all employees by department here
        // code fixed with new table

        connectMe.connectorFunc()
        connection.query("SELECT id, department_name FROM department;", (err, allResultByDepartment)=>{
            if (err) throw (err)
            console.table(allResultByDepartment)
        })
        // console.log("all employees by department here")
    }
}

module.exports = allEmployeeItems