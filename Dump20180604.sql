-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mystore_db
-- ------------------------------------------------------
-- Server version	8.0.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `departments` (
  `department_id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) DEFAULT NULL,
  `over_head_costs` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Digital','500'),(2,'Climbing','400'),(3,'Clothing','300');
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `order_num` int(11) NOT NULL AUTO_INCREMENT,
  `order_prod_id` int(11) NOT NULL,
  `shipping` decimal(19,2) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `timestamp` datetime DEFAULT CURRENT_TIMESTAMP,
  `orders_by_department` int(11) DEFAULT NULL,
  `order_quantity` int(11) DEFAULT NULL,
  PRIMARY KEY (`order_num`),
  UNIQUE KEY `orders_by_department_UNIQUE` (`orders_by_department`),
  KEY `item_id_idx` (`order_prod_id`),
  CONSTRAINT `item_id` FOREIGN KEY (`order_prod_id`) REFERENCES `products` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (134,1,8.95,'Digital','2018-05-29 14:51:55',NULL,4),(135,8,9.95,'Digital','2018-05-29 14:53:25',NULL,4),(136,5,9.95,'Climbing','2018-05-29 14:53:50',NULL,100),(137,8,9.95,'Digital','2018-05-29 15:04:43',NULL,1),(138,1,8.95,'Digital','2018-05-29 15:10:05',NULL,100),(139,8,9.95,'Digital','2018-05-29 15:12:59',NULL,10),(140,1,8.95,'Digital','2018-05-29 15:17:23',NULL,4),(141,1,8.95,'Digital','2018-05-29 15:20:23',NULL,124),(142,6,9.95,'Climbing','2018-05-29 15:22:05',NULL,460),(143,6,9.95,'Climbing','2018-05-29 15:23:19',NULL,5),(144,1,8.95,'Digital','2018-05-30 13:44:47',NULL,300),(145,1,8.95,'Digital','2018-05-30 13:47:45',NULL,160),(146,1,8.95,'Digital','2018-05-30 13:51:07',NULL,150),(147,1,8.95,'Digital','2018-05-30 13:55:13',NULL,20),(148,1,8.95,'Digital','2018-05-30 18:41:10',NULL,100),(149,8,9.95,'Digital','2018-05-30 18:42:07',NULL,5),(150,6,9.95,'Climbing','2018-05-30 18:46:10',NULL,20);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `product_name` varchar(100) DEFAULT NULL,
  `product_sales` int(11) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `price` decimal(19,2) DEFAULT NULL,
  `shipping` decimal(19,2) DEFAULT NULL,
  `stock_quantity` int(11) DEFAULT NULL,
  `wholesale_cost` decimal(19,2) DEFAULT NULL,
  PRIMARY KEY (`item_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Iphone 7',730,'Digital',549.00,8.95,300,218.00),(2,'Sansung S8',350,'Digital',724.00,8.95,232,364.00),(3,'Iphone 6',110,'Digital',234.00,8.95,85,172.00),(4,'Samsung S7',266,'Digital',479.00,8.95,149,221.00),(5,'The Gripster 2',14597,'Climbing',54.95,9.95,247,32.00),(6,'The No Hang',37656,'Climbing',44.95,9.95,280,21.00),(7,'Petzl Harness',2487,'Climbing',84.95,9.95,113,41.00),(8,'LG Headset',111,'Digital',94.95,9.95,45,47.00),(9,'Plantronics headset',198,'Digital',195.95,9.95,78,98.00),(10,'RTFM T-Shirt',196,'Clothing',26.95,7.95,72,12.95),(11,'YODA T-Shirt',96,'Clothing',26.95,7.95,55,12.95),(12,'Chicken T-Shirt',196,'Clothing',26.95,7.95,94,12.95),(13,'The Globster',NULL,'Climbing',44.95,9.95,200,22.00),(14,'The Chunkster',NULL,'Climbing',39.95,8.95,120,21.00),(15,'Mouse',NULL,'Digital',75.00,8.95,120,38.00);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-06-04  0:29:02
