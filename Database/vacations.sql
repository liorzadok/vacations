-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: my_vacations
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followers`
--

DROP TABLE IF EXISTS `followers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_code` int NOT NULL,
  `vacation_code` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_code` (`user_code`),
  KEY `vacation_code` (`vacation_code`),
  CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`user_code`) REFERENCES `users` (`user_code`),
  CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacation_code`) REFERENCES `vacations` (`vacation_code`)
) ENGINE=InnoDB AUTO_INCREMENT=301 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followers`
--

LOCK TABLES `followers` WRITE;
/*!40000 ALTER TABLE `followers` DISABLE KEYS */;
INSERT INTO `followers` VALUES (139,4,2),(150,4,8),(151,4,3),(155,4,1),(169,18,4),(170,18,5),(171,4,5),(180,4,16),(181,4,3),(278,2,20),(279,2,23),(289,4,22),(291,2,24),(293,31,24),(294,4,24),(295,19,24),(298,2,19),(299,2,21),(300,92,24);
/*!40000 ALTER TABLE `followers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_code` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `isAdmin` tinyint NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_code`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'lior','zadok','liorzadok7@gmail.com','12345',1),(2,'rotem','stav','rstav@gmail.com','54321',0),(3,'sarai','dafna','sarai@gmail.com','55555',0),(4,'arava','swissa','aravaswiis@gmail.com','77777',0),(5,'ido','socha','idos@gmail.com','88888',0),(6,'noam','reiss','noam@gmail.com','99999',0),(7,'hila','dolev','hila@gmail.com','22222',0),(8,'emil','tayeb','emilio@gmail.com','44444',0),(9,'or','barak','mushu@gmail.com','666666',0),(10,'shula','shula','shula@gmail.com','79513',0),(11,'zion','zadok','zion@gmail.com','14067',0),(12,'ahuva','zadok','zadoka@gmail.com','74125',0),(13,'buli','ishasheleg','buli@gmail.com','85203',0),(14,'roi','gur','roi@gmail.com','96325',0),(15,'haim','zadok','haim@gmail.com','00000',0),(16,'aviv','alush','alush@gmail.com','69696',0),(17,'aviva','aviva','aviva@gmail.com','12312',0),(18,'maya','hadvora','bzbz@gmail.com','23456',0),(19,'gali','levi','galgul@gmail.com','951951',0),(20,'bil','bil','bil@gmail.com','11111',1),(21,'roni','roni','roni@gmail.com','454545',0),(29,'fjlsjflds','jkljlk','hgjlgjl@gmail.com','fkdsfkdpdokfpsk',0),(30,'tal','tal','tal@gmail.com','jiodsf',0),(31,'mai','mai','mai@gmail.com','fsdlfjdfkjl',0),(90,'melodi','fsokfld','fksdl@kld','dsfsds',0),(91,'squril','sdfo','ksdlfdl@kwlfdj','fdjsklfs',0),(92,'ekrj','ishasheleg2f','fsdkf3@wjekdfl','jfsdkf',0);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `vacation_code` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) NOT NULL,
  `description` varchar(255) NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `price` int NOT NULL,
  `img` varchar(255) NOT NULL,
  PRIMARY KEY (`vacation_code`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (1,'Paris','Enjot the Eiffel Tower','2024-07-27','2024-08-04',1500,'paris.jpg'),(2,'London','Travel through Camden Market','2023-08-22','2023-08-26',1300,'london.jpg'),(3,'Dubai','Visit Dubai Gardens','2023-09-23','2023-09-29',650,'dubai.jpg'),(4,'Thailand','Visit Thailand','2023-10-09','2023-11-22',1200,'thailand.jpg'),(5,'Tel Aviv','Enjoy TLV','2024-04-23','2024-04-29',1450,'telaviv.jpg'),(6,'New York','The Big Apple is waiting for you!','2024-05-23','2024-06-02',700,'newyork.jpg'),(7,'Madrid','Hablas Espanol?Then this trip is for you','2023-07-29','2023-08-06',1650,'madrid.jpg'),(8,'Seoul','come visit Seoul','2023-08-20','2023-08-29',1500,'seoul.jpg'),(15,'Amsterdam','Bike , Green and Fun','2024-03-30','2024-03-30',1400,'amsterdam.jpg'),(16,'Venice','Venice','2023-09-03','2023-09-13',1400,'venice.jpg'),(17,'Istanbul','TV Tour: where \"The bride from Istanbul\" was filmed!','2023-07-15','2023-07-24',1200,'istanbul.jpg'),(18,'Jerusalem','visit the hollyland','2023-10-13','2023-10-24',1700,'jerusalem.jpg'),(19,'LA','Visit Venice Beach','2023-07-05','2023-07-31',2500,'la.jpg'),(20,'Abu Dabi','Visit Abu Dabi and go on a Shopping sprea','2023-07-08','2023-07-14',1250,'abudabi.jpg'),(21,'Munich','Come visit the beautiful Munich','2023-06-20','2023-07-07',1300,'munich.jpg'),(22,'Amman','Vist Amman and Petra on a 4 Day Tour!','2023-06-13','2023-08-23',800,'amman.jpg'),(23,'Cebu','A jem in the east','2023-07-09','2023-07-15',500,'cebu.jpg'),(24,'Eilat','The most beautiful pace on earth','2023-07-14','2023-07-28',1500,'eilat.jpg'),(79,'Kathmandu','ENjoy the forest','2023-07-26','2023-08-23',5000,'nepal.jpg'),(95,'Rio Dejnero','Hike in the most beautiful trails','2023-07-18','2023-07-26',4190,'rio.jpg');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-18 10:33:35
