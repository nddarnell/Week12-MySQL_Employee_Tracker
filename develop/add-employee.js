const mysql = require("mysql")
const inquirer = require("inquirer")
var connectMe = require("./connection")

var addEmployees = {
    addEmployeeFunc: function (){
        //need for loops for managerId list and roleid list
        connectMe.connectorFunc()

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
            name: "roleId",
            message: "What role will this employee fill?"
        },
        {
            //add if statement asking if theyre going to be a manager 
            type: "list",
            name: "managerId",
            message: "Who is this employees manager? Use '0' if new employee is a Manager" ,
            choices: ["Alex Bourne", "Eric Saperstine", "Noel Miller"]
        }
        ])
        .then((results)=>{
            
            connection.query("INSERT INTO list_of_employees SET ?",
            {
                first_name: `${results.firstname}`,
                last_name: `${results.lastname}`,
                role_id: `${results.roleId}`,
                manager_id: `${results.managerId}`,
            },(err, addResult)=>{
                if (err) throw (err)

            })
            connection.query("SELECT * FROM list_of_employees", (err, select)=>{
                if (err) throw (err)
                console.table(select)
            })
            
            
        })



    }
}
module.exports = addEmployees