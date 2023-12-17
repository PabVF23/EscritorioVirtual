<!DOCTYPE HTML>

<?php
    require("bdBiblioteca.php");

    $biblioteca = new Biblioteca();
?>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual - Actualizar info de biblioteca</title>

    <meta name ="author" content ="Pablo Valdés Fernández" />
    <meta name ="description" content ="Actualizar info a la BD de la biblioteca" />
    <meta name ="keywords" content ="biblioteca, libros, libro, actualizar libro, actualizar cliente, actualizar empleado, actualizar prestamo, actualizar devolucion, actualizar" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/biblioteca.css" />
    <link rel="icon" type="image/x-icon" href="multimedia/imagenes/favicon.ico"/>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1>Escritorio Virtual</h1>

        <nav>
            <a href="../index.html" accesskey="I" tabindex="1">Inicio</a>
            <a href="../sobremi.html" accesskey="S" tabindex="2">Sobre mi</a>
            <a href="../noticias.html" accesskey="N" tabindex="3">Noticias</a>
            <a href="../agenda.html" accesskey="A" tabindex="4">Agenda</a>
            <a href="../meteorologia.html" accesskey="M" tabindex="5">Meteorología</a>
            <a href="../viajes.php" accesskey="V" tabindex="6">Viajes</a>
            <a href="../juegos.html" accesskey="J" tabindex="7">Juegos</a>
        </nav>
    </header>

    <main>
        <h2>Biblioteca</h2>
        <article>
            <h3>Otros juegos</h3>
            <a href="../memoria.html" accesskey="M" tabindex="8">Memoria</a>
            <a href="../sudoku.html" accesskey="K" tabindex="9">Sudoku</a>
            <a href="../crucigrama.php" accesskey="C" tabindex="10">Crucigrama matemático</a>
            <a href="../api.html" accesskey="R" tabindex="11">Reproductor de música</a>
            <a href="biblioteca.php" accesskey="B" tabindex="12">Gestor de biblioteca</a>
        </article>

        <p>Bienvenido al simulador de gestión de una biblioteca.</p>
        <p>Aquí puedes actualizar los datos de la biblioteca</p>
        <p>Se han obtenido los datos correctamente.</p>

        <article>
            <h3>Opciones</h3>
            <a href="consultarBiblioteca.php" accesskey="O" tabindex="13">Consultar informacion de la base de datos</a>
            <a href="insertarBiblioteca.php" accesskey="T" tabindex="14">Insertar informacion en la base de datos</a>
            <a href="modificarBiblioteca.php" accesskey="D" tabindex="15">Modificar informacion de la base de datos</a>
            <a href="borrarBiblioteca.php" accesskey="E" tabindex="16">Borrar informacion de la base de datos</a>
            <a href="importarBiblioteca.php" accesskey="P" tabindex="17">Importar datos a la base de datos</a>
            <a href="exportarBiblioteca.php" accesskey="X" tabindex="18">Exportar datos de la base de datos</a>
            <a href="biblioteca.php" accesskey="D" tabindex="19">Reiniciar la base de datos</a>
        </article>

        <?php
            if (isset($_POST['confirmarLibro'])) {
                $autor = $_POST['autor'];
                $titulo = $_POST['titulo'];
                $genero = $_POST['genero'];
                $año = $_POST['año'];
        
                $biblioteca->actualizarLibro($autor, $titulo, $genero, $año);
            } else {
                $biblioteca->consultarLibros();
            }
        ?>
        
        <h4>Actualizar libro</h4>
        <form action='#' method='post' name='libro'>
            <label for='autor'>Autor: </label>
            <input type='text' name='autor'/>
            <label for='titulo'>Título: </label>
            <input type='text' name='titulo' />
            <label for='genero'>Género: </label>
            <input type='text' name='genero' />
            <label for='año'>Año: </label>
            <input type='number' name='año' />
            <input type='submit' name='confirmarLibro' value="Confirmar" />
        </form>

        <?php
            if (isset($_POST['confirmarCliente'])) {
                $dni = $_POST['dni'];
                $nombre = $_POST['nombre'];
                $apellidos = $_POST['apellidos'];
        
                $biblioteca->actualizarCliente($dni, $nombre, $apellidos);
            } else {
                $biblioteca->consultarClientes();
            }
        ?>
        
        <form action='#' method='post' name='cliente'>
            <label for='dni'>DNI: </label>
            <input type='text' name='dni' />
            <label for='nombre'>Nombre: </label>
            <input type='text' name='nombre' />
            <label for='apellidos'>Apellidos: </label>
            <input type='text' name='apellidos' />
            <input type='submit' name='confirmarCliente' value="Confirmar" />
        </form>

        <?php
            if (isset($_POST['confirmarEmpleado'])) {
                $idEmpleado = $_POST['idEmpleado'];
                $nombre = $_POST['nombre'];
                $apellidos = $_POST['apellidos'];
        
                $biblioteca->actualizarEmpleado($idEmpleado, $nombre, $apellidos);
            } else {
                $biblioteca->consultarEmpleados();
            }
        ?>
        
        <form action='#' method='post' name='empleado'>
            <label for='idEmpleado'>ID del empleado: </label>
            <input type='text' name='idEmpleado' />
            <label for='nombre'>Nombre: </label>
            <input type='text' name='nombre' />
            <label for='apellidos'>Apellidos: </label>
            <input type='text' name='apellidos' />
            <input type='submit' name='confirmarEmpleado' value="Confirmar" />
        </form>

        <?php
            if (isset($_POST['confirmarPrestamo'])) {
                $dniCliente = $_POST['dniCliente'];
                $idEmpleado = $_POST['idEmpleado'];
                $autor = $_POST['autor'];
                $titulo = $_POST['titulo'];
                $fecha = $_POST['fecha'];
                $devuelto = isset($_POST['devuelto']);
        
                $biblioteca->actualizarPrestamo($dniCliente, $idEmpleado, $autor, $titulo, $fecha, $devuelto);
            } else {
                $biblioteca->consultarPrestamos();
            }
        ?>
        
        <form action='#' method='post' name='prestamo'>
            <label for='dniCliente'>DNI: </label>
            <input type='text' name='dniCliente' />
            <label for='idEmpleado'>ID del empleado: </label>
            <input type='text' name='idEmpleado' />
            <label for='autor'>Autor: </label>
            <input type='text' name='autor' />
            <label for='titulo'>Título: </label>
            <input type='text' name='titulo' />
            <label for='fecha'>Fecha:</label>
            <input type='date' name='fecha' />
            <label for='devuelto'>Devuelto:</label>
            <input type='checkbox' name='devuelto' />
            <input type='submit' name='confirmarPrestamo' value="Confirmar" />
        </form>

        <?php
            if (isset($_POST['confirmarDevolucion'])) {
                $dniCliente = $_POST['dniCliente'];
                $idEmpleado = $_POST['idEmpleado'];
                $autor = $_POST['autor'];
                $titulo = $_POST['titulo'];
                $fecha = $_POST['fecha'];
                $sancion = $_POST['sancion'];
        
                $biblioteca->actualizarDevolucion($dniCliente, $idEmpleado, $autor, $titulo, $fecha, $sancion);
            } else {
                $biblioteca->consultarDevoluciones();
            }
        ?>
        
        <form action='#' method='post' name='devolucion'>
            <label for='dniCliente'>DNI: </label>
            <input type='text' name='dniCliente' />
            <label for='idEmpleado'>ID del empleado: </label>
            <input type='text' name='idEmpleado' />
            <label for='autor'>Autor: </label>
            <input type='text' name='autor' />
            <label for='titulo'>Título: </label>
            <input type='text' name='titulo' />
            <label for='fecha'>Fecha:</label>
            <input type='date' name='fecha' />
            <label for='sancion'>Sancion (€):</label>
            <input type='number' name='sancion' />
            <input type='submit' name='confirmarDevolucion' value="Confirmar" />
        </form>
    </main>


</body>