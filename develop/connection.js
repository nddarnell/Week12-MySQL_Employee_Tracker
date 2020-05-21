const mysql = require("mysql")

var connectionExport = {
    connectorFunc: function (){
        connection = mysql.createConnection({
            host: "localhost",
        
            // Your port; if not 3306
            port: 3306,
        
            // Your username
            user: "root",
        
            // Your password
            password: "SummerFalls13",
            database: "employeeListManager_db"
        });
    }
}

module.exports = connectionExport