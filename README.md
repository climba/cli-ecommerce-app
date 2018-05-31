# Command Line interface Ecommerce application

#### This application connects to a database and tracks sales, inventory and department profit and losses.


1. To run this app, you'll need to install the following Node packages.

   * [CLI Table](https://www.npmjs.com/package/cli-table)
   
   * [inquirer](https://www.npmjs.com/package/inquirer)
   
   * [mysql](https://www.npmjs.com/package/mysql)

2. You will need to set up the database. Use the file named "mystore_bd-SETUP.sql" located in this repo.

3. Once you have your database set up, you can edit the configs at the tope of each file for your specific environment. 

    _Edit lines 6 to 16 in "app_customer.js" and "app_customer.js"_

```javascript
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "mystore_db"
```