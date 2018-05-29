var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "mystore_db"
});

connection.connect(function(err) {
  if (err) throw err;
  adminOptions();

});



function adminOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View Product Sales by Department",
        "View Product Sales by product ID",
        "Add new Product",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Product Sales by Department":
        salesByDept();
        break;

      case "View Product Sales by product ID":
        salesById();
        break;

      case "Add new Product":
        addProducts();
        break;

      }
    });
}


function salesByDept() {
      // Get all rows in a Department
      // Multiply sales by price for each item ID
      // Add the vales together
      // connection.query("SELECT department_name,  SUM(product_sales * price) AS TOTAL FROM products GROUP BY department_name", function(err, res) {
        connection.query("SELECT department_name SUM(product_sales) AS total_sales, department_name SUM(price) AS total_price, (SUM(total_sales) * total_price) AS total_profit FROM products GROUP BY department_name ORDER BY total_profit ASC", function(err, res) {
        if (err) throw err;
        console.log(res)
        
      });
}
// var query = "SELECT department_name SUM(product_sales) AS total_sales, department_name SUM(price) AS total_price, (SUM(total_sales) * price) AS total_profit FROM products GROUP BY department_name ORDER BY total_sales ASC";