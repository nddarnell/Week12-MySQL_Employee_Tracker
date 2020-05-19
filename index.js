const mysql = require("mysql")
const inquirer = require("inquirer")
var employeeList = require("./develop/all-employees")
var roles = require("./develop/all-roles")

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
                    // Need more inquirer questions then insert replies into query
                    inquirer.prompt([{
                        type: "input",
                        name: "firstname",
                        message: "What is the employees first name?",
                    },{
                        type: "input",
                        name: "lastname",
                        message: "What is the employees last name?"
                    },
                    {
                        type: "input",
                        name: "title",
                        message: "What role will this employee fill?"
                    },
                    {
                        type: "input",
                        name: "department",
                        message: "What department will this employee fall under?"
                    },
                    {
                        type: "input",
                        name: "salary",
                        message: "What is this employees salary?"
                    },
                    {
                        type: "list",
                        name: "manager",
                        message: "Who is this employees manager?",
                        choices: ["Alex Bourne", "Eric Saperstine", "Noel Miller"]
                    }
                    ])
                    .then((results)=>{
                        
                        connection.query("INSERT INTO list_of_employees SET ?",
                        {
                            first_name: `${results.firstname}`,
                            last_name: `${results.lastname}`,
                            title: `${results.title}`,
                            department: `${results.department}`,
                            salary: `${results.salary}`,
                            manager: `${results.manager}`
                        },(err, addResult)=>{
                            if (err) throw (err)

                        })
                        connection.query("SELECT * FROM list_of_employees", (err, select)=>{
                            if (err) throw (err)
                            console.table(select)
                        })
                        connection.end()
                        
                    })
                    //should add employee with connection.query("INSERT INTO 'table name' SET ?", {}
                    break;

                case "Remove Employee":
                    //need inquirer prompt to read list of employees with
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