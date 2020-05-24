const mysql = require("mysql")
const inquirer = require("inquirer")
var connectMe = require("./connection")

var addDepartment = {
    addNewDepartment: function () {
        // need to add departments here
        connectMe.connectorFunc()
        

        inquirer.prompt([{
            type: "input",
            name: "departmentAdd",
            message: "What is the name of the new Department?"
        }])
        .then((result)=>{
            connection.query("INSERT INTO department SET ?",
            {
                department_name: `${result.departmentAdd}`
            }, (err, response)=>{
                if (err) throw (err)
            })
        })
    }
}

module.exports = addDepartment