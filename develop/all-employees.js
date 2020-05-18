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
        //should I have my connection item here?
        console.log("list of all employees here")
        // items here see activity 11 connection.query
    },
    allEmployeesByDepartment: function(){
        // need to place database list of all employees by department here
        console.log("all employees by department here")
    },
    allEmployeesByManager: function(){
        // need to place database list of all employees by manager here
        console.log("list of all employees by manager here")
    }
}

module.exports = allEmployeeItems