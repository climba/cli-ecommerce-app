var mysql = require("mysql");
var inquirer = require("inquirer");

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
  initialOptions();

});


function initialOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Explore Digital Products",
        "Explore Clothing Products",
        "Explore Climbing Products",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Explore Digital Products":
        dispDigitalProds();
        break;

      case "Explore Clothing Products":
        dispClothingProds();
        break;

      case "Explore Climbing Products":
        dispClimbingProds();
        break;  

      }
    });
}

function dispDigitalProds() {
  console.log("Selecting all products in Digital ...\n");
  connection.query("SELECT * FROM products WHERE department_name='Digital'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}

function dispClothingProds() {
  console.log("Selecting all products in Clothing...\n");
  connection.query("SELECT * FROM products WHERE department_name='Clothing'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}

function dispClimbingProds() {
  console.log("Selecting all products in Climbing...\n");
  connection.query("SELECT * FROM products WHERE department_name='Climbing'", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Product: " + res[i].product_name +
                  " || Department: " + res[i].department_name +
                  " || Price: $" + res[i].price  );
    }
    purchaseOptions();
  });
}


function purchaseOptions() {
  inquirer
  .prompt({
    name: "product_name",
    type: "input",
    message: "What Product would you like to purchase?"
  })
  .then(function(answer) {
    var query = "SELECT product_name, price FROM products WHERE ?";
    connection.query(query, { product_name: answer.product_name }, function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log("You just purchased the " + res[i].product_name + " for $" + res[i].price  );
      }
      connection.query(
        "UPDATE products SET `stock_quantity` = `stock_quantity` - 1 ",
        "UPDATE products SET `product_sales` = `product_sales` + 1 ",
        function (err, res) {
          if (err) {
            console.log(err);
          }
        }
      );
      
      // console.log("You just purchased the " + answer.product_name + " for $" + answer.price  );

      console.log("Thanks for shopping with us!");
      connection.end();
    });
  });
}
