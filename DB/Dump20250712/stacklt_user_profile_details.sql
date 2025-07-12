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
-- Table structure for table `user_profile_details`
--

DROP TABLE IF EXISTS `user_profile_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_profile_details` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FULL_NAME` varchar(255) DEFAULT NULL,
  `AGE` int DEFAULT NULL,
  `PHONE` bigint DEFAULT NULL,
  `EMAIL` varchar(255) DEFAULT NULL,
  `USERNAME` varchar(255) DEFAULT NULL,
  `PASSWORD` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_profile_details`
--

LOCK TABLES `user_profile_details` WRITE;
/*!40000 ALTER TABLE `user_profile_details` DISABLE KEYS */;
INSERT INTO `user_profile_details` VALUES (1,'Allison Hill',38,7478163327,'jillrhodes@miller.com','williamjohnson','L$qi+8N3ih'),(2,'Andrew Stevens',18,8181241943,'smiller@montgomery.com','stanleykendra','8Z@337DmX0'),(3,'Timothy Watts',25,7958682846,'megan03@trujillo.com','clarksherri','Or5G_uRh+V'),(4,'Peter Callahan Jr.',22,7440213415,'ycarlson@carlson-mcdonald.com','frazierdanny','D9+Yufxi(4'),(5,'Phillip Ryan',39,9342331444,'tracy15@allen-allen.org','millertodd',')NS7@8Yeg2'),(6,'Jocelyn Wright',20,9536146025,'andrew83@robinson.com','whiteheadmichele','@3)vU8Hi2*'),(7,'Victoria Garcia',31,7136505587,'lauren13@gmail.com','amandataylor','q^#4*aOh&h'),(8,'Dr. Steven Martin',18,7402418010,'ybaker@mitchell-horton.net','smoore','SS%0Ppxx^$'),(9,'Steve Sanchez',24,7999270936,'barnesbrandy@stewart.com','josephanderson','u_!4OkRP)D'),(10,'Roy Warner',34,9585650756,'sarah12@wilson-rodriguez.net','josephjacobs','Y75sG&Jv+j'),(11,'Kristina Rodriguez',18,9410529190,'davenportbrandi@jordan.com','rachel05','$T3yhVd0l1'),(12,'Jennifer Santiago',24,9791232393,'erik16@garrison.com','ybailey','2$3xAZHyRv'),(13,'Deborah Rodriguez',40,9340505846,'jessica56@hotmail.com','cruzbarbara','!0RfWnE^%C'),(14,'Jason Powell',31,7946785248,'jamesortega@yahoo.com','christinaturner','30WBJbPk(j'),(15,'Robert Potter',32,9530876844,'lindsayhernandez@gmail.com','traceycarr','Uf7N_csu@j'),(16,'David Charles',26,7027911967,'lauriecontreras@hotmail.com','stephanie79','K+p8No8rN5'),(17,'Francisco Fernandez',42,7685731524,'jessebenson@lewis.info','abrown','piGWEhpa&9'),(18,'Jeffrey Johnson',40,8815115025,'dramsey@gmail.com','meadowsbrittany','J_170LCu8w'),(19,'Joshua Cooke',28,8193448329,'debraharrington@hotmail.com','websterstefanie','5$0wT6FWxe'),(20,'Eric Byrd',22,7924765563,'mdavid@gmail.com','curtisbarton','kT_Ra9ZdJO'),(21,'Nicholas Sheppard',42,8445662585,'umarshall@hotmail.com','marcus31','7XGHy13l%r'),(22,'Nathan Freeman',21,7398340369,'fbrewer@mcguire-davis.com','tholt','SD9LELAp_B'),(23,'Kevin Wolf',30,7415393687,'wallkenneth@yahoo.com','kevinerickson','#4)qBqUbK1'),(24,'Jennifer Jones',29,8477278577,'edwardhart@miller-wright.net','yobrien','G)3YqU%x*i'),(25,'Juan Moore',37,8136108454,'enorris@yahoo.com','halljasmine','+7CVv2(4+7'),(26,'Samantha Morse',43,7186618211,'harrisonkevin@yahoo.com','vincent77','@WB4bpVni9'),(27,'Jessica Ramirez',41,8973214822,'ecosta@yahoo.com','qcook','29vmSLKn@H'),(28,'Joseph Dean',35,7536124280,'nwolf@yahoo.com','sarakim','y+7+DS&atM'),(29,'Denise Davenport',30,7338444264,'stephenthomas@gmail.com','michellehill','7!fnU5Zq&C'),(30,'Veronica Allen',35,8259191105,'melissajenkins@yahoo.com','zthornton','&y6#PVVzKQ'),(31,'Hitanshu patel ',23,9932455612,'hitanshupl120@gmail.com','Hitanshu patel ','thehitanshu'),(32,'mittal',20,1234567890,'hitanshu@gmail.com','mittal','12345'),(33,'krutik',20,1234567890,'hitanshupatel@gmail.com','krutik','12345'),(34,'hitanshu patel',23,1234567890,'hitanshupatel@gmail.com','hitanshu patel','12345');
/*!40000 ALTER TABLE `user_profile_details` ENABLE KEYS */;
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
