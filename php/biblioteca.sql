CREATE DATABASE IF NOT EXISTS biblioteca COLLATE utf8_spanish_ci;

CREATE TABLE `libros` (
  `autor` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `genero` varchar(100) NOT NULL,
  `año` int(11) NOT NULL,
  PRIMARY KEY (`autor`,`titulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

CREATE TABLE `clientes` (
  `dni` varchar(9) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  PRIMARY KEY (`dni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

CREATE TABLE `empleados` (
  `idEmpleado` varchar(9) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  PRIMARY KEY (`idEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

CREATE TABLE `prestamos` (
  `dniCliente` varchar(9) NOT NULL,
  `idEmpleado` varchar(9) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `devuelto` tinyint(1) NOT NULL,
  PRIMARY KEY (`dniCliente`,`idEmpleado`,`autor`,`titulo`,`fecha`),
  KEY `fk_prestamos_idEmpleado` (`idEmpleado`),
  KEY `fk_prestamos_autor_titulo` (`autor`,`titulo`),
  CONSTRAINT `fk_prestamos_autor_titulo` FOREIGN KEY (`autor`, `titulo`) REFERENCES `libros` (`autor`, `titulo`),
  CONSTRAINT `fk_prestamos_dniCliente` FOREIGN KEY (`dniCliente`) REFERENCES `clientes` (`dni`),
  CONSTRAINT `fk_prestamos_idEmpleado` FOREIGN KEY (`idEmpleado`) REFERENCES `empleados` (`idEmpleado`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

CREATE TABLE `devoluciones` (
  `dniCliente` varchar(9) NOT NULL,
  `idEmpleado` varchar(9) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `fecha` date NOT NULL,
  `sancion` int(11) NOT NULL,
  PRIMARY KEY (`dniCliente`,`idEmpleado`,`autor`,`titulo`,`fecha`),
  CONSTRAINT `fk_devoluciones_autor_titulo` FOREIGN KEY (`dniCliente`, `idEmpleado`, `autor`, `titulo`) REFERENCES `prestamos` (`dniCliente`, `idEmpleado`, `autor`, `titulo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci

DELETE FROM devoluciones

DELETE FROM prestamos

DELETE FROM libros

DELETE FROM clientes

DELETE FROM empleados