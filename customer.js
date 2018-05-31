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
  initialOptions();

});

function initialOptions() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Explore store categories",
        "Find products by Category",
        "Find products by name",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Explore store categories":
        listCategories();
        break;

      case "Find products by Category":
        searchByType();
        break;

      case "Find products by name":
        productsNameSearch();
        break;

      }
    });
}


function productsNameSearch() {
  inquirer
  .prompt({
    name: "action",
    type: "input",
    message: "What would you like to search for?",
    
  })  .then(function(answer) {
    var query = "SELECT product_name, price FROM products WHERE product_name LIKE ?";
    connection.query(query, ["%" + answer.action + "%"] , function(err, res) {
      if(err) {
        console.log(err);
      }
        // console.log(res)
        for(var i = 0; i < res.length; i++) {
          console.log("Products with simlar names are: " + res[i].product_name + " || Price: $" + res[i].price  );
        }

      purchaseOptions();
    });
  })
}


function listCategories() {
  console.log("Selecting all product Categories ...\n");
  connection.query("SELECT DISTINCT department_name FROM products;", function(err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log("Department: " + res[i].department_name );
    }
    chooseCatagory();
  });
}

function chooseCatagory() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What Catagory would you like to purchase from?",
      choices: [
        "Purchase Digital Products",
        "Purchase Clothing Products",
        "Purchase Climbing Products",
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "Purchase Digital Products":
        dispDigitalProds();
        break;

      case "Purchase Clothing Products":
        dispClothingProds();
        break;

      case "Purchase Climbing Products":
        dispClimbingProds();
        break;  

      }
    });
}


function searchByType() {
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
  .prompt([
    {
    name: "product_name",
    type: "input",
    message: "What Product would you like to purchase?"
    },
    {
    name: "order_quantity",
    type: "input",
    message: "How many would you like to purchase?"

    }
])
  .then(function(answer) {
    var query = "SELECT product_name, department_name, price, item_id, shipping, stock_quantity FROM products WHERE ?";
    connection.query(query, { product_name: answer.product_name }, function(err, res) {
      console.log(res[0].stock_quantity);
    if(answer.order_quantity < res[0].stock_quantity) {
      console.log("You just purchased: " + answer.order_quantity + " " + res[0].product_name + "'s from the " + 
                  res[0].department_name + " Department! The price TOTAL is $" + res[0].price * answer.order_quantity + ", the product ID is: " + 
                  res[0].item_id + ", and the shipping cost is: $" + res[0].shipping  );

                  connection.query(
                    "UPDATE products SET `stock_quantity` = `stock_quantity` -" + [answer.order_quantity] + ", `product_sales` = `product_sales` +" + [answer.order_quantity] + " WHERE `product_name` =?", [answer.product_name],
                    function (err, res) {
                      if (err) {
                        console.log(err);
                      }
                      // console.log(res);
                    }
                  ); 
                  addNewOrder(res[0].item_id, answer.order_quantity, res[0].shipping, res[0].department_name)
            
    } else {
      console.log("There is not enough stock right now, please order " + res[0].stock_quantity + " " + res[0].product_name + "'s or less")
      purchaseOptions();
    };

    });
  })
}

function addNewOrder(order_prod_id, order_quantity, shipping, department_name) {
  console.log("Inserting a new Order.... \n");
  var query2 = connection.query(
    "INSERT INTO orders SET ?",
    {
      order_prod_id,
      order_quantity,
      shipping,
      department_name,
    },
    function (err, res) {
      if (err) {
        console.log(err);
      }
      // console.log(res);
    }
  );
  // console.log(query2.sql);
  console.log("Thanks for shopping with us!");
  connection.end();
}
