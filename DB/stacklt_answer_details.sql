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
-- Table structure for table `answer_details`
--

DROP TABLE IF EXISTS `answer_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `answer_details` (
  `ANSWER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_ID` int DEFAULT NULL,
  `QEUSTION_ID` int DEFAULT NULL,
  `ANSWER` longtext,
  PRIMARY KEY (`ANSWER_ID`),
  KEY `USER_ID` (`USER_ID`),
  KEY `QEUSTION_ID` (`QEUSTION_ID`),
  CONSTRAINT `answer_details_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user_profile_details` (`ID`),
  CONSTRAINT `answer_details_ibfk_2` FOREIGN KEY (`QEUSTION_ID`) REFERENCES `question_details` (`QEUSTION_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `answer_details`
--

LOCK TABLES `answer_details` WRITE;
/*!40000 ALTER TABLE `answer_details` DISABLE KEYS */;
INSERT INTO `answer_details` VALUES (1,5,3,'You can use CSS grid for better layout.'),(2,12,7,'Try restarting your server after making changes.'),(3,1,2,'Reactâ€™s useEffect hook runs after the render.'),(4,9,5,'Use async/await syntax to handle promises cleanly.'),(5,14,1,'Make sure you imported the component properly.'),(6,6,10,'Try using a different API endpoint.'),(7,3,8,'The issue might be related to CORS policy.'),(8,20,6,'Check the file path again, it\'s probably incorrect.'),(9,17,4,'This can be solved using flexbox easily.'),(10,4,9,'Try clearing your browser cache and reload.'),(11,2,11,'Pass the props properly and destructure them.'),(12,22,13,'Make sure MongoDB server is running locally.'),(13,10,15,'This works well if you\'re using Tailwind CSS.'),(14,7,14,'Try using a ternary operator for conditional rendering.'),(15,18,12,'Try inspecting the network tab in dev tools.'),(16,21,16,'Consider splitting code into smaller components.'),(17,8,17,'You might be missing the required dependency.'),(18,25,18,'You should use useMemo to optimize performance.'),(19,15,19,'Try renaming the variable to avoid conflict.'),(20,23,20,'Check your schema and connection string.'),(21,19,21,'This question has already been answered here.'),(22,30,22,'That sounds like a version mismatch issue.'),(23,27,23,'This can be handled using try/catch block.'),(24,13,24,'Install the required package first.'),(25,26,25,'Refactor your code to remove repetition.'),(26,16,26,'Add default value for the state variable.'),(27,11,27,'You might be missing the return statement.'),(28,28,28,'Wrap your component in a Suspense fallback.'),(29,24,29,'Try restarting your database service.'),(30,29,30,'Make sure youâ€™re using latest Node version.');
/*!40000 ALTER TABLE `answer_details` ENABLE KEYS */;
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
