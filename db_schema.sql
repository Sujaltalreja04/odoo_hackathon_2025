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
-- Dumping data for table `answer_details`
--

LOCK TABLES `answer_details` WRITE;
/*!40000 ALTER TABLE `answer_details` DISABLE KEYS */;
INSERT INTO `answer_details` VALUES (1,5,3,'You can use CSS grid for better layout.'),(2,12,7,'Try restarting your server after making changes.'),(3,1,2,'Reactâ€™s useEffect hook runs after the render.'),(4,9,5,'Use async/await syntax to handle promises cleanly.'),(5,14,1,'Make sure you imported the component properly.'),(6,6,10,'Try using a different API endpoint.'),(7,3,8,'The issue might be related to CORS policy.'),(8,20,6,'Check the file path again, it\'s probably incorrect.'),(9,17,4,'This can be solved using flexbox easily.'),(10,4,9,'Try clearing your browser cache and reload.'),(11,2,11,'Pass the props properly and destructure them.'),(12,22,13,'Make sure MongoDB server is running locally.'),(13,10,15,'This works well if you\'re using Tailwind CSS.'),(14,7,14,'Try using a ternary operator for conditional rendering.'),(15,18,12,'Try inspecting the network tab in dev tools.'),(16,21,16,'Consider splitting code into smaller components.'),(17,8,17,'You might be missing the required dependency.'),(18,25,18,'You should use useMemo to optimize performance.'),(19,15,19,'Try renaming the variable to avoid conflict.'),(20,23,20,'Check your schema and connection string.'),(21,19,21,'This question has already been answered here.'),(22,30,22,'That sounds like a version mismatch issue.'),(23,27,23,'This can be handled using try/catch block.'),(24,13,24,'Install the required package first.'),(25,26,25,'Refactor your code to remove repetition.'),(26,16,26,'Add default value for the state variable.'),(27,11,27,'You might be missing the return statement.'),(28,28,28,'Wrap your component in a Suspense fallback.'),(29,24,29,'Try restarting your database service.'),(30,29,30,'Make sure youâ€™re using latest Node version.');
/*!40000 ALTER TABLE `answer_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `comment_details`
--

LOCK TABLES `comment_details` WRITE;
/*!40000 ALTER TABLE `comment_details` DISABLE KEYS */;
INSERT INTO `comment_details` VALUES (1,12,'I agree with your point!',5),(2,4,'Can you explain this more?',2),(3,7,'This helped me a lot, thanks!',8),(4,18,'Not sure this is correct.',10),(5,3,'Interesting perspective.',1),(6,15,'Exactly what I was looking for.',4),(7,9,'Try another approach maybe.',7),(8,20,'Great explanation!',3),(9,6,'I think this could be improved.',6),(10,2,'Could you share the code?',9),(11,14,'Awesome answer!',11),(12,1,'This is wrong information.',12),(13,11,'You\'re right!',13),(14,5,'Where can I learn more?',14),(15,8,'Clear and concise.',15),(16,22,'I still have a doubt.',16),(17,10,'Perfect answer!',17),(18,19,'Nice example.',18),(19,25,'I didn\'t understand.',19),(20,13,'Mind-blowing solution!',20),(21,17,'Helpful, but needs formatting.',21),(22,23,'Thanks for sharing!',22),(23,24,'What if the input is null?',23),(24,27,'Do you have a link?',24),(25,26,'This is outdated info.',25),(26,28,'Anyone tried this?',26),(27,30,'What version does this support?',27),(28,21,'Loved this answer!',28),(29,29,'Still not working for me.',29),(30,16,'Thanks a ton!',30);
/*!40000 ALTER TABLE `comment_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `question_details`
--

LOCK TABLES `question_details` WRITE;
/*!40000 ALTER TABLE `question_details` DISABLE KEYS */;
INSERT INTO `question_details` VALUES (1,'Least weight company hotel glass medical body.?',5),(2,'Bag lay answer usually water friend finally.?',15),(3,'Whether cell throughout have important strong idea leave.?',15),(4,'Top stand civil possible buy accept how similar not.?',25),(5,'Cold ago program wife son two hold perhaps.?',6),(6,'Participant response simple medical face opportunity.?',23),(7,'Radio my wall your I artist big feel its dream station religious.?',13),(8,'Short message management old chair put technology clearly senior relationship building.?',24),(9,'Site though though modern describe sound.?',12),(10,'Ground lay ready little state budget other analysis right bit question charge word.?',14),(11,'Various although knowledge any listen sense yet value church although deep bed.?',17),(12,'At watch I music listen gas lawyer create often.?',26),(13,'Individual step stock back yourself especially writer support success.?',4),(14,'Couple your hospital even even fight view.?',18),(15,'Family I president detail popular rise age beautiful one food through almost side.?',4),(16,'Age pay good song century through about.?',3),(17,'Region medical company him land defense.?',24),(18,'Over office under available leader second join talk.?',15),(19,'Book feeling tell often development hour learn remain team beautiful another kid.?',9),(20,'Not lose ready family pull never.?',2),(21,'Cell serve once color wear say here.?',22),(22,'Position machine follow pull thought line strong.?',30),(23,'Scene sister give along add media nature by.?',21),(24,'Those say glass local manage western provide media eight painting model sport blood contain.?',7),(25,'Remain leg reason box happen fly physical billion figure term join per for.?',11),(26,'Gas she people various require bank fire data.?',8),(27,'Check book us toward daughter mind line outside prevent.?',10),(28,'Kid go bar art write choice job day effect well hundred travel.?',27),(29,'Employee agree entire task compare product behavior good college pattern have.?',25),(30,'Draw we letter front enter others any avoid among prevent simply leader.?',7);
/*!40000 ALTER TABLE `question_details` ENABLE KEYS */;
UNLOCK TABLES;

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

-- Dump completed on 2025-07-12 17:30:12
