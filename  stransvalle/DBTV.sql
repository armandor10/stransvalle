CREATE DATABASE  IF NOT EXISTS `transvalle` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `transvalle`;
-- MySQL dump 10.13  Distrib 5.6.13, for Win32 (x86)
--
-- Host: localhost    Database: transvalle
-- ------------------------------------------------------
-- Server version	5.5.37

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
-- Table structure for table `buses`
--

DROP TABLE IF EXISTS `buses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buses` (
  `Placa` varchar(10) NOT NULL,
  `Vial` varchar(45) DEFAULT NULL,
  `Capacidad` varchar(45) DEFAULT NULL,
  `ClaseBus` int(11) DEFAULT NULL,
  `ClaseServicio` int(11) DEFAULT NULL,
  `FechaMatricula` datetime DEFAULT NULL,
  `Marca` varchar(45) DEFAULT NULL,
  `Modelo` varchar(45) DEFAULT NULL,
  `NumeroChasis` varchar(45) DEFAULT NULL,
  `NumeroMotor` varchar(45) DEFAULT NULL,
  `Observaciones` varchar(45) DEFAULT NULL,
  `Password` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Placa`),
  KEY `pkbusclasebus_idx` (`ClaseBus`),
  KEY `pkbusclaseservicio_idx` (`ClaseServicio`),
  CONSTRAINT `pkbusclasebus` FOREIGN KEY (`ClaseBus`) REFERENCES `clasesbuses` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `pkbusclaseservicio` FOREIGN KEY (`ClaseServicio`) REFERENCES `clasesservicio` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buses`
--

LOCK TABLES `buses` WRITE;
/*!40000 ALTER TABLE `buses` DISABLE KEYS */;
INSERT INTO `buses` VALUES ('kjh','lkjh','lkj',1,1,'2015-01-02 00:00:00','lkjh','lkh','lkjh','lkj','hlk','jhl'),('TLU-123','7869','20',1,1,'1993-01-26 00:00:00','Chevrolet','2012','KJG4K2K5J252H','HJK53K53K2KH',NULL,'12345');
/*!40000 ALTER TABLE `buses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clasesbuses`
--

DROP TABLE IF EXISTS `clasesbuses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clasesbuses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clasesbuses`
--

LOCK TABLES `clasesbuses` WRITE;
/*!40000 ALTER TABLE `clasesbuses` DISABLE KEYS */;
INSERT INTO `clasesbuses` VALUES (1,'Microbus'),(2,'Buseta');
/*!40000 ALTER TABLE `clasesbuses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clasesservicio`
--

DROP TABLE IF EXISTS `clasesservicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clasesservicio` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clasesservicio`
--

LOCK TABLES `clasesservicio` WRITE;
/*!40000 ALTER TABLE `clasesservicio` DISABLE KEYS */;
INSERT INTO `clasesservicio` VALUES (1,'Normal'),(2,'Especial');
/*!40000 ALTER TABLE `clasesservicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rolesusuariosplataforma`
--

DROP TABLE IF EXISTS `rolesusuariosplataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rolesusuariosplataforma` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolesusuariosplataforma`
--

LOCK TABLES `rolesusuariosplataforma` WRITE;
/*!40000 ALTER TABLE `rolesusuariosplataforma` DISABLE KEYS */;
INSERT INTO `rolesusuariosplataforma` VALUES (1,'Gerente'),(2,'Contador'),(3,'Jefe de Rutas'),(4,'Admin');
/*!40000 ALTER TABLE `rolesusuariosplataforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuariosplataforma`
--

DROP TABLE IF EXISTS `usuariosplataforma`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuariosplataforma` (
  `Roll` int(11) DEFAULT NULL,
  `Contraseña` varchar(45) DEFAULT NULL,
  `User` varchar(45) NOT NULL,
  PRIMARY KEY (`User`),
  KEY `pkuserrol_idx` (`Roll`),
  CONSTRAINT `pkuserrol` FOREIGN KEY (`Roll`) REFERENCES `rolesusuariosplataforma` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuariosplataforma`
--

LOCK TABLES `usuariosplataforma` WRITE;
/*!40000 ALTER TABLE `usuariosplataforma` DISABLE KEYS */;
INSERT INTO `usuariosplataforma` VALUES (1,'justime','carlos'),(2,'justime','orley'),(4,'justime','pabon'),(3,'justime','tirado');
/*!40000 ALTER TABLE `usuariosplataforma` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'transvalle'
--

--
-- Dumping routines for database 'transvalle'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-01-28 11:31:22
