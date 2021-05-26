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
INSERT INTO `courses` VALUES (7,'Talking with foreiner','Create Node apps that support user accounts and authentication1','https://img-a.udemycdn.com/course/240x135/756914_8bd3_2.jpg','Create real-time web sd applications',229,0,5,0,1,0,0,'[]','[]','2021-05-17 11:38:58','2021-05-17 11:38:58',1,1,83,1,'[]'),(8,'NodeJs','Create Node apps that support user accounts and authentication1','https://img-a.udemycdn.com/course/240x135/756914_8bd3_2.jpg','Create real-time web sd applications',229,0,5,0,1,0,0,'[]','[]','2021-05-17 11:39:13','2021-05-17 11:39:13',1,2,77,1,'[]'),(9,'Angular','Create Node apps that support user accounts and authentication1','https://img-a.udemycdn.com/course/240x135/756914_8bd3_2.jpg','Create real-time web sd applications',229,0,5,0,1,0,0,'[]','[]','2021-05-17 11:39:35','2021-05-17 11:39:35',1,1,77,1,'[]'),(10,'Fifa','Create Node apps that support user accounts and authentication1','https://img-a.udemycdn.com/course/240x135/756914_8bd3_2.jpg','Create real-time web sd applications',229,0,5,0,1,0,0,'[]','[]','2021-05-17 11:51:28','2021-05-17 11:51:28',1,3,83,1,'[]');
/*!40000 ALTER TABLE `courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genres`
--

DROP TABLE IF EXISTS `genres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genres` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genres`
--

LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (2,'Business'),(1,'Development'),(3,'Finance & Accounting');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lectures`
--

DROP TABLE IF EXISTS `lectures`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lectures` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `video` varchar(255) NOT NULL,
  `preview` tinyint(1) NOT NULL DEFAULT '1',
  `courseId` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `lectures_ibfk_1` FOREIGN KEY (`courseId`) REFERENCES `courses` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectures`
--

LOCK TABLES `lectures` WRITE;
/*!40000 ALTER TABLE `lectures` DISABLE KEYS */;
INSERT INTO `lectures` VALUES (1,'Course Intro','uploads/courses-video/6097f03e32a7912688444c18',1,7),(2,'Project Intro','uploads/courses-video/6097f03e32a7912688444c19',1,7),(3,'Installing Nodejs','uploads/courses-video/6097f03e32a7912688444c1a',1,7);
/*!40000 ALTER TABLE `lectures` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `levels`
--

DROP TABLE IF EXISTS `levels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `levels` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `levels`
--

LOCK TABLES `levels` WRITE;
/*!40000 ALTER TABLE `levels` DISABLE KEYS */;
INSERT INTO `levels` VALUES (1,'Beginner'),(2,'Expert');
/*!40000 ALTER TABLE `levels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `star` int(11) DEFAULT '5',
  `content` varchar(255) NOT NULL DEFAULT '',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  KEY `userId` (`userId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,3,'Best explanation of if / else I found on the web. Awesome so far!','2021-05-17 09:59:37','2021-05-17 09:59:37',77,7),(2,3,'Great course! Very thorough and detailed explanations','2021-05-17 10:59:37','2021-05-17 10:59:37',77,7);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subgenres`
--

DROP TABLE IF EXISTS `subgenres`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subgenres` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `genreId` int(11) DEFAULT NULL,
  PRIMARY KEY (`_id`),
  UNIQUE KEY `name` (`name`),
  KEY `genreId` (`genreId`),
  CONSTRAINT `subgenres_ibfk_1` FOREIGN KEY (`genreId`) REFERENCES `genres` (`_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subgenres`
--

LOCK TABLES `subgenres` WRITE;
/*!40000 ALTER TABLE `subgenres` DISABLE KEYS */;
INSERT INTO `subgenres` VALUES (1,'Web Development',1),(2,'Data Science',1),(3,'Mobile Development',1),(4,'Entrepreneurship',2),(5,'Communications',2);
/*!40000 ALTER TABLE `subgenres` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_courses`
--

DROP TABLE IF EXISTS `user_courses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_courses` (
  `userId` int(11) NOT NULL,
  `courseId` int(11) NOT NULL,
  PRIMARY KEY (`userId`,`courseId`),
  KEY `courseId` (`courseId`),
  CONSTRAINT `user_courses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_courses_ibfk_2` FOREIGN KEY (`courseId`) REFERENCES `courses` (`_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_courses`
--

LOCK TABLES `user_courses` WRITE;
/*!40000 ALTER TABLE `user_courses` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_courses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `biography` varchar(255) DEFAULT NULL,
  `facebookid` varchar(255) DEFAULT NULL,
  `googleid` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `twitter` varchar(255) DEFAULT NULL,
  `youtube` varchar(255) DEFAULT NULL,
  `linkedin` varchar(255) DEFAULT NULL,
  `creditbalance` int(11) DEFAULT '0',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `verified` tinyint(1) DEFAULT '0',
  `verifyToken` varchar(255) NOT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (77,'c1','$2b$08$XNKmvAVyqjEnNl.Q9ym0h.8ebexG7Pu8askIUa23r3B/BWlSk2kOi','kowoxit901@isecv.com','https://img-a.udemycdn.com/course/240x135/888716_4225_3.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2021-05-24 10:33:13','2021-05-24 10:33:13',0,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOm51bGwsImVtYWlsIjoia293b3hpdDkwMUBpc2Vjdi5jb20iLCJpYXQiOjE2MjE4NTIzOTN9.uL0j_t59I5thxZSe6bzIbn8yyK0oiWVsHujCHYj8XmQ'),(83,'cz11','$2b$08$HQ.O.iaPXRhJGpOjWXkfY.E057a057p4vNVzn1SaPrPwptJ9KA7ii','pocaric607@rphinfo.com','https://img-a.udemycdn.com/course/240x135/888716_4225_3.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2021-05-24 13:03:18','2021-05-24 13:03:53',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOm51bGwsImVtYWlsIjoicG9jYXJpYzYwN0BycGhpbmZvLmNvbSIsImlhdCI6MTYyMTg2MTM5OH0.5VjZdNr30YWFQlv6XT9HNr0CcwTyOyEx9pemh9yIa_c'),(86,'C12','$2b$08$.VpU2Qo/NWRzhyGD8DDdRuiFqBkpxpzwQSFIsKk19cqZ/Ek84veHG','xafaxim837@sc2hub.com','https://img-a.udemycdn.com/course/240x135/888716_4225_3.jpg',NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2021-05-26 00:51:14','2021-05-26 00:51:24',1,'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOm51bGwsImVtYWlsIjoieGFmYXhpbTgzN0BzYzJodWIuY29tIiwiaWF0IjoxNjIxOTkwMjc0fQ.-KmRHk77H9XfalZbDaA10Hzz5NNr-6jWMWr-CKRp1qM');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-05-26 18:19:11
