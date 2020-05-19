const mysql = require("mysql")

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "SummerFalls13",
    database: "employeeListManager_db"
  });



var allEmployeeItems = {
    allEmployees: function (){
        // need to place database list of all employees here
        connection.query("SELECT first_name, last_name FROM list_of_employees;", (err, allResult)=>{
            if (err) throw (err)
            console.table(allResult)
            connection.end()
        })
        // console.log("list of all employees here")
    },
    allEmployeesByDepartment: function(){
        // need to place database list of all employees by department here
        connection.query("SELECT first_name, last_name, department FROM list_of_employees ORDER BY department;", (err, allResultByDepartment)=>{
            if (err) throw (err)
            console.table(allResultByDepartment)
            connection.end()
        })
        // console.log("all employees by department here")
    },
    allEmployeesByManager: function(){
        // need to place database list of all employees by manager here
        connection.query("SELECT first_name, last_name, manager FROM list_of_employees ORDER BY manager;", (err, allResultsByManager)=>{
            if (err) throw (err)
            console.table(allResultsByManager)
            connection.end()
        })
        // console.log("list of all employees by manager here")
    }
}

module.exports = allEmployeeItems