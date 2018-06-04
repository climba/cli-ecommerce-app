DROP DATABASE IF EXISTS mystore_db;

CREATE database mystore_db;

USE mystore_db;


--
-- Table structure for table departments
--

DROP TABLE IF EXISTS departments;

CREATE TABLE departments (
  department_id int(11) NOT NULL AUTO_INCREMENT,
  department_name varchar(100) DEFAULT NULL,
  over_head_costs varchar(100) DEFAULT NULL,
  PRIMARY KEY (department_id)
);

--
-- Table structure for table orders
--

DROP TABLE IF EXISTS orders;

CREATE TABLE orders (
  order_num int(11) NOT NULL AUTO_INCREMENT,
  order_prod_id int(11) NOT NULL,
  shipping decimal(19,2) DEFAULT NULL,
  department_name varchar(100) DEFAULT NULL,
  timestamp datetime DEFAULT CURRENT_TIMESTAMP,
  orders_by_department int(11) DEFAULT NULL,
  order_quantity int(11) DEFAULT NULL,
  PRIMARY KEY (order_num),
  UNIQUE KEY orders_by_department_UNIQUE (orders_by_department),
  KEY item_id_idx (order_prod_id),
  CONSTRAINT item_id FOREIGN KEY (order_prod_id) REFERENCES products (item_id) ON DELETE CASCADE ON UPDATE CASCADE
);


--
-- Table structure for table products
--

DROP TABLE IF EXISTS products;

CREATE TABLE products ( 
  item_id int(11) NOT NULL AUTO_INCREMENT,
  product_name varchar(100) DEFAULT NULL,
  product_sales int(11) DEFAULT NULL,
  department_name varchar(100) DEFAULT NULL,
  price decimal(19,2) DEFAULT NULL,
  shipping decimal(19,2) DEFAULT NULL,
  stock_quantity int(11) DEFAULT NULL,
  wholesale_cost decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (item_id)
);

