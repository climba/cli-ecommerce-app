USE mystore_db;


--
-- data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (1,'Digital','500');
INSERT INTO `departments` VALUES (2,'Climbing','400');
INSERT INTO `departments` VALUES (3,'Clothing','300')
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;


--
-- data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (134,1,8.95,'Digital','2018-05-29 14:51:55',NULL,4);
INSERT INTO `orders` VALUES (135,8,9.95,'Digital','2018-05-29 14:53:25',NULL,4);
INSERT INTO `orders` VALUES (136,5,9.95,'Climbing','2018-05-29 14:53:50',NULL,100);
INSERT INTO `orders` VALUES (137,8,9.95,'Digital','2018-05-29 15:04:43',NULL,1);
INSERT INTO `orders` VALUES (138,1,8.95,'Digital','2018-05-29 15:10:05',NULL,100);
INSERT INTO `orders` VALUES (139,8,9.95,'Digital','2018-05-29 15:12:59',NULL,10);
INSERT INTO `orders` VALUES (140,1,8.95,'Digital','2018-05-29 15:17:23',NULL,4);
INSERT INTO `orders` VALUES (141,1,8.95,'Digital','2018-05-29 15:20:23',NULL,124);
INSERT INTO `orders` VALUES (142,6,9.95,'Climbing','2018-05-29 15:22:05',NULL,460);
INSERT INTO `orders` VALUES (143,6,9.95,'Climbing','2018-05-29 15:23:19',NULL,5);
INSERT INTO `orders` VALUES (144,1,8.95,'Digital','2018-05-30 13:44:47',NULL,300);
INSERT INTO `orders` VALUES (145,1,8.95,'Digital','2018-05-30 13:47:45',NULL,160);
INSERT INTO `orders` VALUES (146,1,8.95,'Digital','2018-05-30 13:51:07',NULL,150);
INSERT INTO `orders` VALUES (147,1,8.95,'Digital','2018-05-30 13:55:13',NULL,20);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


--
-- data for table `products`
--

LOCK TABLES `products` WRITE;

INSERT INTO `products` VALUES (1,'Iphone 7',630,'Digital',549.00,8.95,234,218.00),(2,'Sansung S8',350,'Digital',724.00,8.95,232,364.00),(3,'Iphone 6',110,'Digital',234.00,8.95,85,172.00),(4,'Samsung S7',266,'Digital',479.00,8.95,149,221.00),(5,'The Gripster 2',14597,'Climbing',54.95,9.95,247,32.00),(6,'The No Hang',37636,'Climbing',44.95,9.95,300,21.00),(7,'Petzl Harness',2487,'Climbing',84.95,9.95,113,41.00),(8,'LG Headset',106,'Digital',94.95,9.95,50,47.00),(9,'Plantronics headset',198,'Digital',195.95,9.95,78,98.00),(10,'RTFM T-Shirt',196,'Clothing',26.95,7.95,72,12.95),(11,'YODA T-Shirt',96,'Clothing',26.95,7.95,55,12.95),(12,'Chicken T-Shirt',196,'Clothing',26.95,7.95,94,12.95),(13,'The Globster',NULL,'Climbing',44.95,9.95,200,22.00),(14,'The Chunkster',NULL,'Climbing',39.95,8.95,120,21.00);

UNLOCK TABLES;

