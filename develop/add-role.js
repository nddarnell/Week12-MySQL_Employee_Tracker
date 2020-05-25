const mysql = require("mysql")
const inquirer = require("inquirer")
var connectMe = require("./connection")

var addRoles = {
    addNewRole: function () {
        // need to add departments here
        connectMe.connectorFunc()
        connection.query("SELECT id, department_name FROM department", (err, listResults)=>{
            if (err) throw (err)

            var i;
            var departmentId=[]

            for (i = 0; i < listResults.length; i++){
                var department ={
                    name: `${listResults[i].department_name}`,
                    value: { 
                        
                        id: `${listResults[i].id}`
                    }
                };
                departmentId.push(department)
            }
            inquirer.prompt([{
                type: "input",
                name: "titleAdd",
                message: "What is the title of the new Role?"
            },
            {
                type: "input",
                name: "salaryAdd",
                message: "What is this new Role's starting pay?"
            },
            {
                type: "list",
                name: "departmentAdd",
                message: "What Department does this new Role want to be added to?",
                choices: departmentId
            }
            ])
    
            .then((result)=>{
                connection.query("INSERT INTO roles SET ?",
                {
                    title: `${result.titleAdd}`,
                    salary: `${result.salaryAdd}`,
                    department_name_id: `${result.departmentAdd.id}`
                }, (err, response)=>{
                    if (err) throw (err)
                    connection.end()
                })
            })
        })
    }
}

module.exports = addRoles