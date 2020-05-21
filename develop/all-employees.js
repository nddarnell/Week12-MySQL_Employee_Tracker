const mysql = require("mysql")
var connectMe = require("./connection")

var allEmployeeItems = {
    allEmployees: function (){
        // need to place database list of all employees here
        connectMe.connectorFunc()
        connection.query("SELECT first_name, last_name, title, department, salary, manager FROM list_of_employees;", (err, allResult)=>{
            if (err) throw (err)
            console.table(allResult)
            connection.end()
        })
        // console.log("list of all employees here")
    },
    allEmployeesByDepartment: function(){
        // need to place database list of all employees by department here
        connectMe.connectorFunc()
        connection.query("SELECT first_name, last_name, department FROM list_of_employees ORDER BY department;", (err, allResultByDepartment)=>{
            if (err) throw (err)
            console.table(allResultByDepartment)
            connection.end()
        })
        // console.log("all employees by department here")
    },
    allEmployeesByManager: function(){
        // need to place database list of all employees by manager here
        connectMe.connectorFunc()
        connection.query("SELECT first_name, last_name, manager FROM list_of_employees ORDER BY manager;", (err, allResultsByManager)=>{
            if (err) throw (err)
            console.table(allResultsByManager)
            connection.end()
        })
        // console.log("list of all employees by manager here")
    }
}

module.exports = allEmployeeItems