const mysql = require("mysql")
const inquirer = require("inquirer")
var employeeList = require("./develop/all-employees")
var roles = require("./develop/all-roles")
var addEmployee = require("./develop/add-employee")

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




function userPrompt() {
    return inquirer.prompt([{
        type: "list",
        name: "options",
        message: "What would you like to do?",
        choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update an Employees Role", "Update an Employees Manager", "View All Roles"]
    }])
        .then((result) => {
            switch (result.options) {
                case "View All Employees":
                    console.log("-----All Employees-----")
                    // connection.connect info here? see activity 11 or connection.query for moving and stuff
                    employeeList.allEmployees()

                    
                    break;

                case "View All Employees By Department":
                    console.log("-----All Employees by Department-----")
                    employeeList.allEmployeesByDepartment()
                    break;

                case "View All Employees By Manager":
                    console.log("-----All Employees by Manager-----")
                    employeeList.allEmployeesByManager()
                    break;

                case "Add Employee":
                    console.log("-----Adding Employee Here-----")
                    addEmployee.addEmployeeFunc()
                    break;

                case "Remove Employee":
                    //need inquirer prompt to read list of employees with
                    connection.query("SELECT id, first_name, last_name FROM list_of_employees", (err, listResults)=>{
                        if (err) throw (err)
                        console.table(listResults)
                        var i;
                        var identification = []
                        for (i = 0; i < listResults.length; i++){
                            // console.log(listResults[i])
                            identification.push(`${listResults[i].id}`)
                        }

                        inquirer.prompt([{
                            type: "list",
                            name: "choices",
                            message: "Which employee would you like to remove?",
                            choices: identification
                        }])  
                        .then((removeList)=>{
                            // console.log(removeList.choices)
                            connection.query("DELETE FROM list_of_employees WHERE ?",
                            {
                                id: removeList.choices
                            },
                            (err, deletedItem)=>{
                                if (err) throw (err)
                                connection.end()
                            }
                            )


                        })
                    })
                    // connection.query("select * from 'table name' ") then whatever is selected use delete from table name where ? `user selection`
                    break;

                case "Update an Employees Role":
                    // see activity 9 
                    //update 'table name' set ? where ?

                    break;

                case "Update an Employees Manager":
                    // update 'table name' set ? where ?

                    break;

                case "View All Roles":
                    // this is 100% working how exciting
                    roles.allRoles();
                    break;
            }
        })

}
userPrompt();