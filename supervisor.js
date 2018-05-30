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

function salesById() {
  console.log("Selecting all products ...\n");
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Item ID: " + res[i].item_id +
                  " || Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name  );
    }
    inquirer
    .prompt({
      name: "action",
      type: "input",
      message: "Enter the Item ID that you would like to see sales for:",
    
    }).then(function(answer){
      var query = "SELECT order_num, department_name, order_quantity FROM orders WHERE item_id = ?";
      connection.query(query, answer, 
        function(err, res) {
          if (err) {
            console.log(err);
          }
          console.log(res);
          // console.log("Order Number: " + res[0].order_num +
          // " || Department: " + res[0].department_name +
          // " || Order Quantity: " + res[0].order_quantity  );

      }
    )
  });
})

}


// function salesByDept() {
//       // Get all rows in a Department
//       // Multiply sales by price for each item ID
//       // Add the vales together
//       // connection.query("SELECT department_name,  SUM(product_sales * price) AS TOTAL FROM products GROUP BY department_name", function(err, res) {
//         connection.query("SELECT department_name SUM(product_sales * price) AS total_prod_sales, department_name, FROM products GROUP BY department_name ORDER BY total_profit ASC", function(err, res) {
//         if (err) throw err;
//         console.log(res)
        
//       });
// }
