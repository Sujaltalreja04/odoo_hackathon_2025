-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: stacklt
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `comment_details`
--

DROP TABLE IF EXISTS `comment_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment_details` (
  `COMMENT_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int DEFAULT NULL,
  `COMMENT` longtext,
  `ANSWER_ID` int DEFAULT NULL,
  PRIMARY KEY (`COMMENT_ID`),
  KEY `USER_ID` (`USER_ID`),
  KEY `ANSWER_ID` (`ANSWER_ID`),
  CONSTRAINT `comment_details_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user_profile_details` (`ID`),
  CONSTRAINT `comment_details_ibfk_2` FOREIGN KEY (`ANSWER_ID`) REFERENCES `answer_details` (`ANSWER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment_details`
--

LOCK TABLES `comment_details` WRITE;
/*!40000 ALTER TABLE `comment_details` DISABLE KEYS */;
INSERT INTO `comment_details` VALUES (1,12,'I agree with your point!',5),(2,4,'Can you explain this more?',2),(3,7,'This helped me a lot, thanks!',8),(4,18,'Not sure this is correct.',10),(5,3,'Interesting perspective.',1),(6,15,'Exactly what I was looking for.',4),(7,9,'Try another approach maybe.',7),(8,20,'Great explanation!',3),(9,6,'I think this could be improved.',6),(10,2,'Could you share the code?',9),(11,14,'Awesome answer!',11),(12,1,'This is wrong information.',12),(13,11,'You\'re right!',13),(14,5,'Where can I learn more?',14),(15,8,'Clear and concise.',15),(16,22,'I still have a doubt.',16),(17,10,'Perfect answer!',17),(18,19,'Nice example.',18),(19,25,'I didn\'t understand.',19),(20,13,'Mind-blowing solution!',20),(21,17,'Helpful, but needs formatting.',21),(22,23,'Thanks for sharing!',22),(23,24,'What if the input is null?',23),(24,27,'Do you have a link?',24),(25,26,'This is outdated info.',25),(26,28,'Anyone tried this?',26),(27,30,'What version does this support?',27),(28,21,'Loved this answer!',28),(29,29,'Still not working for me.',29),(30,16,'Thanks a ton!',30);
/*!40000 ALTER TABLE `comment_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-12 17:33:17
