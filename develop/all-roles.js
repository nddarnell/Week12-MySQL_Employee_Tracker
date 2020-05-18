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

var roles = {
    allRoles: function (){
        // need to place database list of all roles here
        console.log("list of all roles here")
        //connection.connection items here see activity 11 connection.query
        //

    }
}

module.exports = roles