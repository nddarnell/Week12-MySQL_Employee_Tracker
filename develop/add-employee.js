const mysql = require("mysql")
const inquirer = require("inquirer")

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

var addEmployees = {
    addEmployeeFunc: function (){
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



    }
}
module.exports = addEmployees