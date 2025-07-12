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
-- Table structure for table `question_details`
--

DROP TABLE IF EXISTS `question_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `question_details` (
  `QEUSTION_ID` int NOT NULL AUTO_INCREMENT,
  `QUESTION` longtext,
  `USER_ID` int DEFAULT NULL,
  PRIMARY KEY (`QEUSTION_ID`),
  KEY `USER_ID` (`USER_ID`),
  CONSTRAINT `question_details_ibfk_1` FOREIGN KEY (`USER_ID`) REFERENCES `user_profile_details` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `question_details`
--

LOCK TABLES `question_details` WRITE;
/*!40000 ALTER TABLE `question_details` DISABLE KEYS */;
INSERT INTO `question_details` VALUES (1,'Least weight company hotel glass medical body.?',5),(2,'Bag lay answer usually water friend finally.?',15),(3,'Whether cell throughout have important strong idea leave.?',15),(4,'Top stand civil possible buy accept how similar not.?',25),(5,'Cold ago program wife son two hold perhaps.?',6),(6,'Participant response simple medical face opportunity.?',23),(7,'Radio my wall your I artist big feel its dream station religious.?',13),(8,'Short message management old chair put technology clearly senior relationship building.?',24),(9,'Site though though modern describe sound.?',12),(10,'Ground lay ready little state budget other analysis right bit question charge word.?',14),(11,'Various although knowledge any listen sense yet value church although deep bed.?',17),(12,'At watch I music listen gas lawyer create often.?',26),(13,'Individual step stock back yourself especially writer support success.?',4),(14,'Couple your hospital even even fight view.?',18),(15,'Family I president detail popular rise age beautiful one food through almost side.?',4),(16,'Age pay good song century through about.?',3),(17,'Region medical company him land defense.?',24),(18,'Over office under available leader second join talk.?',15),(19,'Book feeling tell often development hour learn remain team beautiful another kid.?',9),(20,'Not lose ready family pull never.?',2),(21,'Cell serve once color wear say here.?',22),(22,'Position machine follow pull thought line strong.?',30),(23,'Scene sister give along add media nature by.?',21),(24,'Those say glass local manage western provide media eight painting model sport blood contain.?',7),(25,'Remain leg reason box happen fly physical billion figure term join per for.?',11),(26,'Gas she people various require bank fire data.?',8),(27,'Check book us toward daughter mind line outside prevent.?',10),(28,'Kid go bar art write choice job day effect well hundred travel.?',27),(29,'Employee agree entire task compare product behavior good college pattern have.?',25),(30,'Draw we letter front enter others any avoid among prevent simply leader.?',7);
/*!40000 ALTER TABLE `question_details` ENABLE KEYS */;
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
