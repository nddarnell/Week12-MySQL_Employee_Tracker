const mysql = require("mysql")
var connectMe = require("./connection")

var allDepartmentItems = {
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

module.exports = allDepartmentItems