-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Dec 04, 2018 at 04:08 AM
-- Server version: 5.7.13-log
-- PHP Version: 7.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_nwclassregistration`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_admin`
--

CREATE TABLE `tbl_admin` (
  `admin_Id` varchar(20) NOT NULL,
  `first_Name` varchar(20) DEFAULT NULL,
  `last_Name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `image` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_admin`
--

INSERT INTO `tbl_admin` (`admin_Id`, `first_Name`, `last_Name`, `password`, `image`) VALUES
('f2000', 'Sai', 'Teja', 'abc123', ''),
('f2001', 'Shiva', 'Kumar', 'abc123', ''),
('f2002', 'Chaitanya', 'Manas', 'abc123', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_course`
--

CREATE TABLE `tbl_course` (
  `course_ID` varchar(20) NOT NULL,
  `course_Name` varchar(20) NOT NULL,
  `Location` varchar(20) DEFAULT NULL,
  `Timings` time DEFAULT NULL,
  `start_Date` date DEFAULT NULL,
  `end_Date` date DEFAULT NULL,
  `seat_Limit` int(20) DEFAULT NULL,
  `seats_Filled` int(20) DEFAULT NULL,
  `admin_Id` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_course`
--

INSERT INTO `tbl_course` (`course_ID`, `course_Name`, `Location`, `Timings`, `start_Date`, `end_Date`, `seat_Limit`, `seats_Filled`, `admin_Id`) VALUES
('44123', 'Java', 'CH1200', '09:30:00', '2019-01-10', '2019-04-28', 20, 20, 'f2000'),
('44567', 'ADB', 'CH1350', '11:30:00', '2019-01-10', '2019-04-28', 20, 20, 'f2001'),
('44568', 'WebApps', 'CH3350', '14:00:00', '2019-01-10', '2019-04-28', 20, 20, 'f2002');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_student`
--

CREATE TABLE `tbl_student` (
  `student_Id` varchar(20) NOT NULL,
  `first_Name` varchar(20) DEFAULT NULL,
  `last_Name` varchar(20) DEFAULT NULL,
  `password` varchar(20) DEFAULT NULL,
  `image` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_student`
--

INSERT INTO `tbl_student` (`student_Id`, `first_Name`, `last_Name`, `password`, `image`) VALUES
('S1000', 'Aditya', 'Kumar', 'abc123', ''),
('S1001', 'Sai', 'Kumar', 'abc123', ''),
('S1002', 'Phani', 'Kumar', 'abc123', '');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_sturegistration`
--

CREATE TABLE `tbl_sturegistration` (
  `student_Id` varchar(20) NOT NULL,
  `course_Id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_sturegistration`
--

INSERT INTO `tbl_sturegistration` (`student_Id`, `course_Id`) VALUES
('s1000', '44123'),
('s1001', '44567'),
('s1002', '44568');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_admin`
--
ALTER TABLE `tbl_admin`
  ADD PRIMARY KEY (`admin_Id`);

--
-- Indexes for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD PRIMARY KEY (`course_ID`),
  ADD KEY `admin_Id` (`admin_Id`);

--
-- Indexes for table `tbl_student`
--
ALTER TABLE `tbl_student`
  ADD PRIMARY KEY (`student_Id`);

--
-- Indexes for table `tbl_sturegistration`
--
ALTER TABLE `tbl_sturegistration`
  ADD PRIMARY KEY (`student_Id`,`course_Id`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tbl_course`
--
ALTER TABLE `tbl_course`
  ADD CONSTRAINT `tbl_course_ibfk_1` FOREIGN KEY (`admin_Id`) REFERENCES `tbl_admin` (`admin_Id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
