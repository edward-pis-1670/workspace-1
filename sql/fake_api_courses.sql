-- MySQL dump 10.13  Distrib 8.0.18, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fake_api
-- ------------------------------------------------------
-- Server version	8.0.18

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
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `courses` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `coverphoto` varchar(255) DEFAULT '/images/course-image.png',
  `previewvideo` varchar(255) DEFAULT NULL,
  `cost` int(11) DEFAULT '0',
  `revenue` int(11) DEFAULT '0',
  `star` int(11) DEFAULT NULL,
  `review` tinyint(1) DEFAULT '0',
  `public` tinyint(1) DEFAULT '0',
  `numberofstudent` int(11) DEFAULT '0',
  `numberofreviews` int(11) DEFAULT '0',
  `targetstudent` json NOT NULL,
  `needtoknow` json NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `levelId` int(11) DEFAULT NULL,
  `subGenreId` int(11) DEFAULT NULL,
  `userId` int(11) DEFAULT NULL,
  `genreId` int(11) DEFAULT NULL,
  `willableto` json NOT NULL,
  PRIMARY KEY (`_id`),
  KEY `levelId` (`levelId`),
  KEY `subGenreId` (`subGenreId`),
  KEY `userId` (`userId`),
  KEY `genreId` (`genreId`),
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`levelId`) REFERENCES `levels` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`subGenreId`) REFERENCES `subgenres` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courses_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `courses_ibfk_4` FOREIGN KEY (`genreId`) REFERENCES `genres` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `courses`
--

LOCK TABLES `courses` WRITE;
/*!40000 ALTER TABLE `courses` DISABLE KEYS */;
INSERT INTO `courses` VALUES (7,'Talking with foreiner','Create Node apps that support user accounts and authentication1','https://img-a.udemycdn.com/course/240x135/756914_8bd3_2.jpg','Create real-time web sd applications',229,0,5,0,1,0,0,'[]','[]','2021-05-17 11:38:58','2021-05-17 11:38:58',1,1,NULL,1,'[]'),(8,'NodeJs','Create Node apps that support user accounts and authentication1','https://img-a.udemycdn.com/course/240x135/756914_8bd3_2.jpg','Create real-time web sd applications',229,0,5,0,1,0,0,'[]','[]','2021-05-17 11:39:13','2021-05-17 11:39:13',1,2,NULL,1,'[]'),(9,'Angular','Create Node apps that support user accounts and authentication1','https://img-a.udemycdn.com/course/240x135/756914_8bd3_2.jpg','Create real-time web sd applications',229,0,5,0,1,0,0,'[]','[]','2021-05-17 11:39:35','2021-05-17 11:39:35',1,1,2,1,'[]'),(10,'Fifa','Create Node apps that support user accounts and authentication1','https://img-a.udemycdn.com/course/240x135/756914_8bd3_2.jpg','Create real-time web sd applications',229,0,5,0,1,0,0,'[]','[]','2021-05-17 11:51:28','2021-05-17 11:51:28',1,3,NULL,1,'[]');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-22 16:49:57
