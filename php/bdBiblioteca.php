<?php

    class Biblioteca {
        public function __construct() {
            $this->server = "localhost";
            $this->user = "DBUSER2023";
            $this->pass = "DBPSWD2023";
            $this->dbname = "biblioteca";
        }

        public function crearBD() {
            $db = new mysqli($this->server, $this->user, $this->pass);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            $query = "CREATE DATABASE IF NOT EXISTS " . $this->dbname . " COLLATE utf8_spanish_ci";

            if ($db->query($query) === TRUE) {
                $this->crearTablas();
            } else {
                echo "<p>Error en la creación de la base de datos</p>";
                exit();
            }

            $db->close();
        }

        public function crearTablas() {
            $db = new mysqli($this->server, $this->user, $this->pass);
            $db->select_db($this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            $crearTablaLibros = "CREATE TABLE IF NOT EXISTS libros (autor varchar(255) NOT NULL,
                titulo varchar(255) NOT NULL,
                genero varchar(100) NOT NULL,
                año int(11) NOT NULL,
                PRIMARY KEY (autor,titulo)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci";
              
            if ($db->query($crearTablaLibros) === FALSE) {
                echo "<p>Error en la creación de la tabla libros</p>";
                exit();
            }

            $crearTablaClientes = "CREATE TABLE IF NOT EXISTS clientes (dni varchar(9) NOT NULL,
                nombre varchar(255) NOT NULL,
                apellidos varchar(255) NOT NULL,
                PRIMARY KEY (dni)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci";
              
            if ($db->query($crearTablaClientes) === FALSE) {
                echo "<p>Error en la creación de la tabla clientes</p>";
                exit();
            }

            $crearTablaEmpleados = "CREATE TABLE IF NOT EXISTS empleados (idEmpleado varchar(9) NOT NULL,
                nombre varchar(255) NOT NULL,
                apellidos varchar(255) NOT NULL,
                PRIMARY KEY (idEmpleado)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci";
              
            if ($db->query($crearTablaEmpleados) === FALSE) {
                echo "<p>Error en la creación de la tabla empleados</p>";
                exit();
            }

            $crearTablaPrestamos = "CREATE TABLE IF NOT EXISTS prestamos (dniCliente varchar(9) NOT NULL,
                idEmpleado varchar(9) NOT NULL,
                autor varchar(255) NOT NULL,
                titulo varchar(255) NOT NULL,
                fecha date NOT NULL,
                devuelto boolean NOT NULL,
                PRIMARY KEY (dniCliente, idEmpleado, autor, titulo, fecha),
                CONSTRAINT fk_prestamos_dniCliente FOREIGN KEY (dniCliente) REFERENCES clientes(dni),
                CONSTRAINT fk_prestamos_idEmpleado FOREIGN KEY (idEmpleado) REFERENCES empleados(idEmpleado),
                CONSTRAINT fk_prestamos_autor_titulo FOREIGN KEY (autor, titulo) REFERENCES libros(autor, titulo)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci";

            if ($db->query($crearTablaPrestamos) === FALSE) {
                echo "<p>Error en la creación de la tabla prestamos</p>";
                exit();
            }

            $crearTablaDevoluciones = "CREATE TABLE IF NOT EXISTS devoluciones (dniCliente varchar(9) NOT NULL,
                idEmpleado varchar(9) NOT NULL,
                autor varchar(255) NOT NULL,
                titulo varchar(255) NOT NULL,
                fecha date NOT NULL,
                sancion int NOT NULL,
                PRIMARY KEY (dniCliente, idEmpleado, autor, titulo, fecha),
                CONSTRAINT fk_devoluciones_dniCliente FOREIGN KEY (dniCliente) REFERENCES clientes(dni),
                CONSTRAINT fk_devoluciones_idEmpleado FOREIGN KEY (idEmpleado) REFERENCES empleados(idEmpleado),
                CONSTRAINT fk_devoluciones_autor_titulo FOREIGN KEY (autor, titulo) REFERENCES libros(autor, titulo)
              ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci";

            if ($db->query($crearTablaDevoluciones) === FALSE) {
                echo "<p>Error en la creación de la tabla devoluciones</p>";
                exit();
            }              
        }

        public function vaciarTablas() {
            $db = new mysqli($this->server, $this->user, $this->pass);
            $db->select_db($this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            $vaciarPrestamos = "DELETE FROM PRESTAMOS";
            
            if ($db->query($vaciarPrestamos) === FALSE) {
                echo "<p>Error al vaciar el contenido de la tabla prestamos</p>";
                exit();
            }

            $vaciarDevoluciones = "DELETE FROM DEVOLUCIONES";
            
            if ($db->query($vaciarDevoluciones) === FALSE) {
                echo "<p>Error al vaciar el contenido de la tabla devoluciones</p>";
                exit();
            }
            
            $vaciarLibros = "DELETE FROM LIBROS";
            
            if ($db->query($vaciarLibros) === FALSE) {
                echo "<p>Error al vaciar el contenido de la tabla libros</p>";
                exit();
            }

            $vaciarClientes = "DELETE FROM CLIENTES";
            
            if ($db->query($vaciarClientes) === FALSE) {
                echo "<p>Error al vaciar el contenido de la tabla clientes</p>";
                exit();
            }

            $vaciarEmpleados = "DELETE FROM EMPLEADOS";
            
            if ($db->query($vaciarEmpleados) === FALSE) {
                echo "<p>Error al vaciar el contenido de la tabla empleados</p>";
                exit();
            }
        }

        public function consultarBD() {
            $this->consultarLibros();
            $this->consultarClientes();
            $this->consultarEmpleados();
            $this->consultarPrestamos();
            $this->consultarDevoluciones();
        }

        public function consultarLibros() {
            $db = new mysqli($this->server, $this->user, $this->pass);
            $db->select_db($this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            $query = "SELECT * FROM LIBROS";

            $resultado = $db->query($query);

            $fila = $resultado->fetch_assoc();

            echo "<section>";
            echo "<h3>Libros</h3>";

            if ($fila != NULL) {
                echo "<table>\n";
                echo "\t<caption>Libros disponibles en la biblioteca</caption>\t";
                echo "\t<thead>\n";
                echo "\t\t<tr>\n";
                echo "\t\t\t<th scope='col' id='autor'>Autor</th>\n";
                echo "\t\t\t<th scope='col' id='titulo'>Título</th>\n";
                echo "\t\t\t<th scope='col' id='genero'>Género</th>\n";
                echo "\t\t\t<th scope='col' id='año'>Año</th>\n";
                echo "\t\t</tr>\n";
                echo "\t</thead>\n";
                echo "\t<tbody>\n";
                while ($fila) {
                    $autor = $fila['autor'];
                    $titulo = $fila['titulo'];
                    $genero = $fila['genero'];
                    $año = $fila['año'];

                    echo "\t\t<tr>\n";
                    echo "\t\t\t<td headers = 'autor'>" . $autor . "</td>\n";
                    echo "\t\t\t<td headers = 'titulo'>" . $titulo . "</td>\n";
                    echo "\t\t\t<td headers = 'genero'>" . $genero . "</td>\n";
                    echo "\t\t\t<td headers = 'año'>" . $año . "</td>\n";
                    echo "\t\t</tr>\n";

                    $fila = $resultado->fetch_assoc();
                }
                echo "\t</tbody>\n";
                echo "</table>\n";
            } else {
                echo "<p>No se han encontrado libros en la base de datos";
            }

            echo "</section>\n";
        }

        public function consultarClientes() {
            $db = new mysqli($this->server, $this->user, $this->pass);
            $db->select_db($this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            $query = "SELECT * FROM CLIENTES";

            $resultado = $db->query($query);

            $fila = $resultado->fetch_assoc();

            echo "<section>";
            echo "<h3>Clientes</h3>";

            if ($fila != NULL) {
                echo "<table>\n";
                echo "\t<caption>Clientes registrados en la biblioteca</caption>\t";
                echo "\t<thead>\n";
                echo "\t\t<tr>\n";
                echo "\t\t\t<th scope='col' id='dni'>DNI</th>\n";
                echo "\t\t\t<th scope='col' id='nombreCliente'>Nombre</th>\n";
                echo "\t\t\t<th scope='col' id='apellidosCliente'>Apellidos</th>\n";
                echo "\t\t</tr>\n";
                echo "\t</thead>\n";
                echo "\t<tbody>\n";
                while ($fila) {
                    $dni = $fila['dni'];
                    $nombre = $fila['nombre'];
                    $apellidos = $fila['apellidos'];

                    echo "\t\t<tr>\n";
                    echo "\t\t\t<td headers = 'dni'>" . $dni . "</td>\n";
                    echo "\t\t\t<td headers = 'nombreCliente'>" . $nombre . "</td>\n";
                    echo "\t\t\t<td headers = 'apellidosCliente'>" . $apellidos . "</td>\n";
                    echo "\t\t</tr>\n";

                    $fila = $resultado->fetch_assoc();
                }
                echo "\t</tbody>\n";
                echo "</table>\n";
            } else {
                echo "<p>No se han encontrado clientes en la base de datos";
            }

            echo "</section>\n";
        }

        public function consultarEmpleados() {
            $db = new mysqli($this->server, $this->user, $this->pass);
            $db->select_db($this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            $query = "SELECT * FROM EMPLEADOS";

            $resultado = $db->query($query);

            $fila = $resultado->fetch_assoc();

            echo "<section>";
            echo "<h3>Empleados</h3>";

            if ($fila != NULL) {
                echo "<table>\n";
                echo "\t<caption>Empleados de la biblioteca</caption>\t";
                echo "\t<thead>\n";
                echo "\t\t<tr>\n";
                echo "\t\t\t<th scope='col' id='idEmpleado'>ID del empleado</th>\n";
                echo "\t\t\t<th scope='col' id='nombreEmpleado'>Nombre</th>\n";
                echo "\t\t\t<th scope='col' id='apellidosEmpleado'>Apellidos</th>\n";
                echo "\t\t</tr>\n";
                echo "\t</thead>\n";
                echo "\t<tbody>\n";
                while ($fila) {
                    $idEmpleado = $fila['idEmpleado'];
                    $nombre = $fila['nombre'];
                    $apellidos = $fila['apellidos'];

                    echo "\t\t<tr>\n";
                    echo "\t\t\t<td headers = 'idEmpleado'>" . $idEmpleado . "</td>\n";
                    echo "\t\t\t<td headers = 'nombreEmpleado'>" . $nombre . "</td>\n";
                    echo "\t\t\t<td headers = 'apellidosEmpleado'>" . $apellidos . "</td>\n";
                    echo "\t\t</tr>\n";

                    $fila = $resultado->fetch_assoc();
                }
                echo "\t</tbody>\n";
                echo "</table>\n";
            } else {
                echo "<p>No se han encontrado empleados en la base de datos";
            }

            echo "</section>\n";
        }

        public function consultarPrestamos() {
            $db = new mysqli($this->server, $this->user, $this->pass);
            $db->select_db($this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            $query = "SELECT * FROM PRESTAMOS";

            $resultado = $db->query($query);

            $fila = $resultado->fetch_assoc();

            echo "<section>";
            echo "<h3>Prestamos</h3>";

            if ($fila != NULL) {
                echo "<table>\n";
                echo "\t<caption>Prestamos realizados</caption>\t";
                echo "\t<thead>\n";
                echo "\t\t<tr>\n";
                echo "\t\t\t<th scope='col' id='dniClientePrestamo'>DNI del cliente</th>\n";
                echo "\t\t\t<th scope='col' id='idEmpleadoPrestamo'>ID del empleado</th>\n";
                echo "\t\t\t<th scope='col' id='autorPrestamo'>Autor</th>\n";
                echo "\t\t\t<th scope='col' id='tituloPrestamo'>Título</th>\n";
                echo "\t\t\t<th scope='col' id='fechaPrestamo'>Fecha</th>\n";
                echo "\t\t\t<th scope='col' id='devuelto'>Devuelto</th>\n";
                echo "\t\t</tr>\n";
                echo "\t</thead>\n";
                echo "\t<tbody>\n";
                while ($fila) {
                    $dniCliente = $fila['dniCliente'];
                    $idEmpleado = $fila['idEmpleado'];
                    $autor = $fila['autor'];
                    $titulo = $fila['titulo'];
                    $fecha = $fila['fecha'];
                    $devuelto = $fila['devuelto'];

                    echo "\t\t<tr>\n";
                    echo "\t\t\t<td headers = 'dniClientePrestamo'>" . $dniCliente . "</td>\n";
                    echo "\t\t\t<td headers = 'idEmpleadoPrestamo'>" . $idEmpleado . "</td>\n";
                    echo "\t\t\t<td headers = 'autorPrestamo'>" . $autor . "</td>\n";
                    echo "\t\t\t<td headers = 'tituloPrestamo'>" . $titulo . "</td>\n";
                    echo "\t\t\t<td headers = 'fechaPrestamo'>" . $fecha . "</td>\n";
                    
                    if ($devuelto == TRUE) {
                        echo "\t\t\t<td headers = 'devuelto'>Sí</td>\n";
                    } else {
                        echo "\t\t\t<td headers = 'devuelto'>No</td>\n";
                    }

                    echo "\t\t</tr>\n";

                    $fila = $resultado->fetch_assoc();
                }
                echo "\t</tbody>\n";
                echo "</table>\n";
            } else {
                echo "<p>No se han encontrado prestamos en la base de datos";
            }

            echo "</section>\n";
        }

        public function consultarDevoluciones() {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            $query = "SELECT * FROM DEVOLUCIONES";

            $resultado = $db->query($query);

            $fila = $resultado->fetch_assoc();

            echo "<section>";
            echo "<h3>Devoluciones</h3>";

            if ($fila != NULL) {
                echo "<table>\n";
                echo "\t<caption>Devoluciones de libros</caption>\t";
                echo "\t<thead>\n";
                echo "\t\t<tr>\n";
                echo "\t\t\t<th scope='col' id='dniClienteDevolucion'>DNI del cliente</th>\n";
                echo "\t\t\t<th scope='col' id='idEmpleadoDevolucion'>ID del empleado</th>\n";
                echo "\t\t\t<th scope='col' id='autorDevolucion'>Autor</th>\n";
                echo "\t\t\t<th scope='col' id='tituloDevolucion'>Título</th>\n";
                echo "\t\t\t<th scope='col' id='fechaDevolucion'>Fecha</th>\n";
                echo "\t\t\t<th scope='col' id='sancion'>Sanción</th>\n";
                echo "\t\t</tr>\n";
                echo "\t</thead>\n";
                echo "\t<tbody>\n";
                while ($fila) {
                    $dniCliente = $fila['dniCliente'];
                    $idEmpleado = $fila['idEmpleado'];
                    $autor = $fila['autor'];
                    $titulo = $fila['titulo'];
                    $fecha = $fila['fecha'];
                    $sancion = $fila['sancion'];

                    echo "\t\t<tr>\n";
                    echo "\t\t\t<td headers = 'dniClienteDevolucion'>" . $dniCliente . "</td>\n";
                    echo "\t\t\t<td headers = 'idEmpleadoDevolucion'>" . $idEmpleado . "</td>\n";
                    echo "\t\t\t<td headers = 'autorDevolucion'>" . $autor . "</td>\n";
                    echo "\t\t\t<td headers = 'tituloDevolucion'>" . $titulo . "</td>\n";
                    echo "\t\t\t<td headers = 'fechaDevolucion'>" . $fecha . "</td>\n";
                    echo "\t\t\t<td headers = 'sancion'>" . $sancion . "</td>\n";

                    echo "\t\t</tr>\n";

                    $fila = $resultado->fetch_assoc();
                }
                echo "\t</tbody>\n";
                echo "</table>\n";
            } else {
                echo "<p>No se han encontrado devoluciones en la base de datos";
            }

            echo "</section>\n";
        }

        public function insertarLibro($autor, $titulo, $genero, $año) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($autor) && !empty($titulo) && !empty($genero)) {
                try{
                    $stmt = $db->prepare("INSERT INTO LIBROS VALUES (?, ?, ?, ?)");
                    $stmt->bind_param('sssi', $autor, $titulo, $genero, $año);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos insertados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la inserción, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }
            
            $this->consultarLibros();
            echo $message;

            $db->close();
        }

        public function insertarCliente($dni, $nombre, $apellidos) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dni) && !empty($nombre) && !empty($apellidos)) {
                try {
                    $stmt = $db->prepare("INSERT INTO CLIENTES VALUES (?, ?, ?)");
                    $stmt->bind_param('sss', $dni, $nombre, $apellidos);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos insertados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la inserción, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarClientes();
            echo $message;

            $db->close();
        }

        public function insertarEmpleado($idEmpleado, $nombre, $apellidos) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($idEmpleado) && !empty($nombre) && !empty($apellidos)) {
                try {
                    $stmt = $db->prepare("INSERT INTO EMPLEADOS VALUES (?, ?, ?)");
                    $stmt->bind_param('sss', $idEmpleado, $nombre, $apellidos);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos insertados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la inserción, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarEmpleados();
            echo $message;

            $db->close();
        }

        public function insertarPrestamo($dniCliente, $idEmpleado, $autor, $titulo, $fecha) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dniCliente) && !empty($idEmpleado) && !empty($autor) && !empty($titulo) && !empty($fecha)) {
                try {
                    $devuelto = FALSE;
                    $stmt = $db->prepare("INSERT INTO PRESTAMOS VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->bind_param('sssssi', $dniCliente, $idEmpleado, $autor, $titulo, $fecha, $devuelto);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos insertados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la inserción, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarPrestamos();
            echo $message;

            $db->close();
        }

        public function insertarDevolucion($dniCliente, $idEmpleado, $autor, $titulo, $fecha, $sancion) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dniCliente) && !empty($idEmpleado) && !empty($autor) && !empty($titulo) && !empty($fecha) && $sancion >= 0) {
                try {
                    $stmt = $db->prepare("INSERT INTO DEVOLUCIONES VALUES (?, ?, ?, ?, ?, ?)");
                    $stmt->bind_param('sssssi', $dniCliente, $idEmpleado, $autor, $titulo, $fecha, $sancion);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos insertados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la inserción, comprueba los valores introducidos</p>';
                }
            } else {
                if ($sancion < 0) {
                    $message = '<p>Advertencia: El valor de la sanción no puede ser menor que 0</p>';
                } else {
                    $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
                }
            }

            $this->consultarDevoluciones();
            echo $message;

            $db->close();
        }

        public function actualizarLibro($autor, $titulo, $genero, $año) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($autor) && !empty($titulo) && !empty($genero)) {
                try{
                    $stmt = $db->prepare("UPDATE LIBROS SET GENERO=?, AÑO=? WHERE AUTOR=? AND TITULO=?");
                    $stmt->bind_param('siss', $genero, $año, $autor, $titulo);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }
            
            $this->consultarLibros();
            echo $message;

            $db->close();
        }

        public function actualizarCliente($dni, $nombre, $apellidos) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dni) && !empty($nombre) && !empty($apellidos)) {
                try {
                    $stmt = $db->prepare("UPDATE CLIENTES SET NOMBRE=?, APELLIDOS=? WHERE DNI=?");
                    $stmt->bind_param('sss', $nombre, $apellidos, $dni);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarClientes();
            echo $message;

            $db->close();
        }

        public function actualizarEmpleado($idEmpleado, $nombre, $apellidos) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($idEmpleado) && !empty($nombre) && !empty($apellidos)) {
                try {
                    $stmt = $db->prepare("UPDATE EMPLEADOS SET NOMBRE=?, APELLIDOS=? WHERE IDEMPLEADO=?");
                    $stmt->bind_param('sss', $nombre, $apellidos, $idEmpleado);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarEmpleados();
            echo $message;

            $db->close();
        }

        public function actualizarPrestamo($dniCliente, $idEmpleado, $autor, $titulo, $fecha, $devuelto) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dniCliente) && !empty($idEmpleado) && !empty($autor) && !empty($titulo) && !empty($fecha)) {
                try {
                    $stmt = $db->prepare("UPDATE PRESTAMOS SET FECHA=?, DEVUELTO=? WHERE DNICLIENTE=? AND IDEMPLEADO=? AND AUTOR=? AND TITULO=?");
                    $stmt->bind_param('sissss', $fecha, $devuelto, $dniCliente, $idEmpleado, $autor, $titulo);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarPrestamos();
            echo $message;

            $db->close();
        }

        public function actualizarDevolucion($dniCliente, $idEmpleado, $autor, $titulo, $fecha, $sancion) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dniCliente) && !empty($idEmpleado) && !empty($autor) && !empty($titulo) && !empty($fecha) && $sancion >= 0) {
                try {
                    $stmt = $db->prepare("UPDATE DEVOLUCIONES SET FECHA=?, SANCION=? WHERE DNICLIENTE=? AND IDEMPLEADO=? AND AUTOR=? AND TITULO=?");
                    $stmt->bind_param('sissss', $fecha, $sancion, $dniCliente, $idEmpleado, $autor, $titulo);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos</p>';
                }
            } else {
                if ($sancion < 0) {
                    $message = '<p>Advertencia: El valor de la sanción no puede ser menor que 0</p>';
                } else {
                    $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
                }
            }

            $this->consultarDevoluciones();
            echo $message;

            $db->close();
        }

        public function borrarLibro($autor, $titulo) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($autor) && !empty($titulo)) {
                try{
                    $stmt = $db->prepare("DELETE FROM LIBROS WHERE AUTOR=? AND TITULO=?");
                    $stmt->bind_param('ss', $autor, $titulo);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos, es posible que haya conflicto con claves externas</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }
            
            $this->consultarLibros();
            echo $message;

            $db->close();
        }

        public function borrarCliente($dni) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dni)) {
                try {
                    $stmt = $db->prepare("DELETE FROM CLIENTES WHERE DNI=?");
                    $stmt->bind_param('s', $dni);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos, es posible que haya conflicto con claves externas</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarClientes();
            echo $message;

            $db->close();
        }

        public function borrarEmpleado($idEmpleado) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($idEmpleado)) {
                try {
                    $stmt = $db->prepare("DELETE FROM EMPLEADOS WHERE IDEMPLEADO=?");
                    $stmt->bind_param('s', $idEmpleado);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos, es posible que haya conflicto con claves externas</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarEmpleados();
            echo $message;

            $db->close();
        }

        public function borrarPrestamo($dniCliente, $idEmpleado, $autor, $titulo,) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dniCliente) && !empty($idEmpleado) && !empty($autor) && !empty($titulo)) {
                try {
                    $stmt = $db->prepare("DELETE FROM PRESTAMOS WHERE DNICLIENTE=? AND IDEMPLEADO=? AND AUTOR=? AND TITULO=?");
                    $stmt->bind_param('ssss', $dniCliente, $idEmpleado, $autor, $titulo);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos</p>';
                }
            } else {
                $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
            }

            $this->consultarPrestamos();
            echo $message;

            $db->close();
        }

        public function borrarDevolucion($dniCliente, $idEmpleado, $autor, $titulo) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            if(!empty($dniCliente) && !empty($idEmpleado) && !empty($autor) && !empty($titulo)) {
                try {
                    $stmt = $db->prepare("DELETE FROM DEVOLUCIONES WHERE DNICLIENTE=? AND IDEMPLEADO=? AND AUTOR=? AND TITULO=?");
                    $stmt->bind_param('ssss', $dniCliente, $idEmpleado, $autor, $titulo);
                    $stmt->execute();
                    $stmt->close();
                    $message = '<p>Datos actualizados correctamente</p>';
                } catch (Exception $e) {
                    $message = '<p>Error al realizar la modificación, comprueba los valores introducidos</p>';
                }
            } else {
                if ($sancion < 0) {
                    $message = '<p>Advertencia: El valor de la sanción no puede ser menor que 0</p>';
                } else {
                    $message = '<p>Advertencia: No pueden quedar campos en blanco</p>';
                }
            }

            $this->consultarDevoluciones();
            echo $message;

            $db->close();
        }

        public function importarBiblioteca($nombreArchivo, $extension) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }


            if ($extension == "csv") {
                $message = 'Datos importados correctamente';
                $stmt = NULL;

                if (($archivo = fopen($nombreArchivo, 'r')) !== FALSE) {
                    while (($linea = fgetcsv($archivo, 1000, ',')) !== FALSE) {
                        if (!empty(trim($linea[0]))) {
                            if (substr($linea[0], 0, 1) == '/') {
                                $tabla = str_replace('/', '', $linea[0]);
                            } else {
                                $this->hayEntrada($tabla, $linea);
                                try {
                                    if (!$this->hayEntrada($tabla, $linea)) {
                                        switch ($tabla) {
                                            case 'Libros':
                                                $año = intval($linea[3]);
                                                $stmt = $db->prepare("INSERT INTO LIBROS VALUES (?,?,?,?)");
                                                $stmt->bind_param('sssi', $linea[0], $linea[1], $linea[2], $año);
                                                break;
                                            
                                            case 'Clientes':
                                                $stmt = $db->prepare("INSERT INTO CLIENTES VALUES (?,?,?)");
                                                $stmt->bind_param('sss', $linea[0], $linea[1], $linea[2]);
                                                break;
        
                                            case 'Empleados':
                                                $stmt = $db->prepare("INSERT INTO EMPLEADOS VALUES (?,?,?)");
                                                $stmt->bind_param('sss', $linea[0], $linea[1], $linea[2]);
                                                break;
        
                                            case 'Prestamos':
                                                $devuelto = boolval($linea[5]);
                                                $stmt = $db->prepare("INSERT INTO PRESTAMOS VALUES (?,?,?,?,?,?)");
                                                $stmt->bind_param('sssssi', $linea[0], $linea[1], $linea[2], $linea[3], $linea[4], $devuelto);
                                                break;
                                            
                                            case 'Devoluciones':
                                                $sancion = intval($linea[5]);
                                                $stmt = $db->prepare("INSERT INTO DEVOLUCIONES VALUES (?,?,?,?,?,?)");
                                                $stmt->bind_param('sssssi', $linea[0], $linea[1], $linea[2], $linea[3], $linea[4], $sancion);
                                                break;
                                        }
        
                                        $stmt->execute();
                                    }
                                } catch (Exception $e) {
                                    $message = 'Error al insertar los datos, por favor compruebe que el csv está formateado correctamente o intente reiniciar la base ';
                                }
                            }
                        }
                    }
                } else {
                    $message = 'Error al encontrar y abrir el archivo';
                }
        
                echo $message;
                $this->consultarBD();
    
                if($stmt != NULL) {
                    $stmt->close();
                }

                fclose($archivo);

                $db->close();
            } else {
                echo "Error: el archivo a importar debe ser un archivo .csv";
            }
        }

        public function hayEntrada($tabla, $linea) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }

            switch ($tabla) {
                case 'Libros':
                    $stmt = $db->prepare("SELECT * FROM LIBROS WHERE AUTOR=? AND TITULO=?");
                    $stmt->bind_param('ss', $linea[0], $linea[1]);
                    break;
                
                case 'Clientes':
                    $stmt = $db->prepare("SELECT * FROM CLIENTES WHERE DNI=?");
                    $stmt->bind_param('s', $linea[0]);
                    break;

                case 'Empleados':
                    $stmt = $db->prepare("SELECT * FROM EMPLEADOS WHERE IDEMPLEADO=?");
                    $stmt->bind_param('s', $linea[0]);
                    break;

                case 'Prestamos':
                    $devuelto = boolval($linea[5]);
                    $stmt = $db->prepare("SELECT * FROM PRESTAMOS WHERE DNICLIENTE=? AND IDEMPLEADO=? AND AUTOR=? AND TITULO=?");
                    $stmt->bind_param('ssss', $linea[0], $linea[1], $linea[2], $linea[3]);
                    break;
                
                case 'Devoluciones':
                    $sancion = intval($linea[5]);
                    $stmt = $db->prepare("SELECT * FROM DEVOLUCIONES WHERE DNICLIENTE=? AND IDEMPLEADO=? AND AUTOR=? AND TITULO=?");
                    $stmt->bind_param('ssss', $linea[0], $linea[1], $linea[2], $linea[3]);
                    break;
            }
            
            $stmt->execute();
            $resultado = $stmt->get_result();
            $pass = $resultado->num_rows > 0;
            $stmt->close();
            $db->close();

            return $pass;
        }

        public function exportarBiblioteca() {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            if($db->connect_error) {
                exit ("<h3>ERROR de conexión:".$db->connect_error."</h3>");  
            }


            $path = "biblioteca.csv";

            header('Content-Type: text/csv; charset:utf-8');
            header('Content-Disposition: attachment; filename="' . $path . '";');
            
            $stmt = NULL;

            ob_end_clean();

            if (($archivo = fopen('php://output', 'w')) !== FALSE) {
                $str = "/Libros\n";
                fwrite($archivo, $str);
                $query1 = "SELECT * FROM LIBROS";

                $resultado = $db->query($query1);

                $fila = $resultado->fetch_assoc();

                while ($fila) {
                    fputcsv($archivo, $fila);
                    $fila = $resultado->fetch_assoc();
                }

                $str = "\n/Clientes\n";
                fwrite($archivo, $str);
                $query1 = "SELECT * FROM CLIENTES";

                $resultado = $db->query($query1);

                $fila = $resultado->fetch_assoc();

                while ($fila) {
                    fputcsv($archivo, $fila);
                    $fila = $resultado->fetch_assoc();
                }

                $str = "\n/Empleados\n";
                fwrite($archivo, $str);
                $query1 = "SELECT * FROM EMPLEADOS";

                $resultado = $db->query($query1);

                $fila = $resultado->fetch_assoc();

                while ($fila) {
                    fputcsv($archivo, $fila);
                    $fila = $resultado->fetch_assoc();
                }

                $str = "\n/Prestamos\n";
                fwrite($archivo, $str);
                $query1 = "SELECT * FROM PRESTAMOS";

                $resultado = $db->query($query1);

                $fila = $resultado->fetch_assoc();

                while ($fila) {
                    fputcsv($archivo, $fila);
                    $fila = $resultado->fetch_assoc();
                }

                $str = "\n/Devoluciones\n";
                fwrite($archivo, $str);
                $query1 = "SELECT * FROM DEVOLUCIONES";

                $resultado = $db->query($query1);

                $fila = $resultado->fetch_assoc();

                while ($fila) {
                    fputcsv($archivo, $fila);
                    $fila = $resultado->fetch_assoc();
                }
            }

            fclose($archivo);

            if($stmt != NULL) {
                $stmt->close();
            }

            exit;
        }
    }

?>