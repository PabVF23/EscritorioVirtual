<!DOCTYPE HTML>

<?php
    require("bdBiblioteca.php");

    $biblioteca = new Biblioteca();
?>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual - Borrar info de biblioteca</title>

    <meta name ="author" content ="Pablo Valdés Fernández" />
    <meta name ="description" content ="Borrar info de la BD de la biblioteca" />
    <meta name ="keywords" content ="biblioteca, libros, libro, borrar libro, borrar cliente, borrar empleado, borrar prestamo, borrar devolucion, borrar" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <link rel="stylesheet" type="text/css" href="../estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="../estilo/biblioteca.css" />
    <link rel="icon" type="image/x-icon" href="../multimedia/imagenes/favicon.ico"/>
    <!--Al cargar las páginas en Opera, se insertan etiquetas de estilo en el elemento head, con lo que el navegador muestra una advertencia-->
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
            <a href="../memoria.html">Memoria</a>
            <a href="../sudoku.html">Sudoku</a>
            <a href="../crucigrama.php">Crucigrama matemático</a>
            <a href="../api.html">Reproductor de música</a>
            <a href="biblioteca.php">Gestor de biblioteca</a>
        </article>

        <p>Bienvenido al gestor de la biblioteca.</p>
        <p>Aquí puedes borrar datos de la biblioteca</p>
        <p>Se han obtenido los datos correctamente.</p>

        <article>
            <h3>Opciones</h3>
            <a href="consultarBiblioteca.php">Consultar informacion de la base de datos</a>
            <a href="insertarBiblioteca.php">Insertar informacion en la base de datos</a>
            <a href="modificarBiblioteca.php">Modificar informacion de la base de datos</a>
            <a href="borrarBiblioteca.php">Borrar informacion de la base de datos</a>
            <a href="importarBiblioteca.php">Importar datos a la base de datos</a>
            <a href="exportarBiblioteca.php">Exportar datos de la base de datos</a>
            <a href="biblioteca.php">Reiniciar la base de datos</a>
        </article>

        <?php
            if (isset($_POST['confirmarLibro'])) {
                $autor = $_POST['autor'];
                $titulo = $_POST['titulo'];
        
                $biblioteca->borrarLibro($autor, $titulo);
            } else {
                $biblioteca->consultarLibros();
            }
        ?>
        
        <h4>Borrar libro</h4>
        <form action='#' method='post' name='libro'>
            <label for='autorCampo'>Autor: </label>
            <input type='text' name='autor' id='autorCampo'/>
            <label for='tituloCampo'>Título: </label>
            <input type='text' name='titulo' id='tituloCampo'/>
            <input type='submit' name='confirmarLibro' value="Confirmar" />
        </form>

        <?php
            if (isset($_POST['confirmarCliente'])) {
                $dni = $_POST['dni'];
        
                $biblioteca->borrarCliente($dni);
            } else {
                $biblioteca->consultarClientes();
            }
        ?>
        
        <h4>Borrar cliente</h4>
        <form action='#' method='post' name='cliente'>
            <label for='dniCampo'>DNI: </label>
            <input type='text' name='dni' id='dniCampo'/>
            <input type='submit' name='confirmarCliente' value="Confirmar" />
        </form>

        <?php
            if (isset($_POST['confirmarEmpleado'])) {
                $idEmpleado = $_POST['idEmpleado'];
        
                $biblioteca->borrarEmpleado($idEmpleado);
            } else {
                $biblioteca->consultarEmpleados();
            }
        ?>
        
        <h4>Borrar empleado</h4>
        <form action='#' method='post' name='empleado'>
            <label for='idEmpleadoCampo'>ID del empleado: </label>
            <input type='text' name='idEmpleado' id='idEmpleadoCampo'/>
            <input type='submit' name='confirmarEmpleado' value="Confirmar" />
        </form>

        <?php
            if (isset($_POST['confirmarPrestamo'])) {
                $dniCliente = $_POST['dniCliente'];
                $idEmpleado = $_POST['idEmpleado'];
                $autor = $_POST['autor'];
                $titulo = $_POST['titulo'];
        
                $biblioteca->borrarPrestamo($dniCliente, $idEmpleado, $autor, $titulo);
            } else {
                $biblioteca->consultarPrestamos();
            }
        ?>
        
        <h4>Borrar prestamo</h4>
        <form action='#' method='post' name='prestamo'>
            <label for='dniClientePrestamoCampo'>DNI: </label>
            <input type='text' name='dniCliente' id='dniClientePrestamoCampo'/>
            <label for='idEmpleadoPrestamoCampo'>ID del empleado: </label>
            <input type='text' name='idEmpleado' id='idEmpleadoPrestamoCampo'/>
            <label for='autorPrestamoCampo'>Autor: </label>
            <input type='text' name='autor' id='autorPrestamoCampo'/>
            <label for='tituloPrestamoCampo'>Título: </label>
            <input type='text' name='titulo' id='tituloPrestamoCampo'/>
            <input type='submit' name='confirmarPrestamo' value="Confirmar" />
        </form>

        <?php
            if (isset($_POST['confirmarDevolucion'])) {
                $dniCliente = $_POST['dniCliente'];
                $idEmpleado = $_POST['idEmpleado'];
                $autor = $_POST['autor'];
                $titulo = $_POST['titulo'];
        
                $biblioteca->borrarDevolucion($dniCliente, $idEmpleado, $autor, $titulo);
            } else {
                $biblioteca->consultarDevoluciones();
            }
        ?>
        
        <h4>Borrar devolucion</h4>
        <form action='#' method='post' name='devolucion'>
        <label for='dniClienteDevolucionCampo'>DNI: </label>
            <input type='text' name='dniClienteDevolucion' id='dniClienteDevolucionCampo'/>
            <label for='idEmpleadoDevolucionCampo'>ID del empleado: </label>
            <input type='text' name='idEmpleado' id='idEmpleadoDevolucionCampo'/>
            <label for='autorDevolucionCampo'>Autor: </label>
            <input type='text' name='autor' id='autorDevolucionCampo'/>
            <label for='tituloDevolucionCampo'>Título: </label>
            <input type='text' name='titulo' id='tituloDevolucionCampo'/>
            <input type='submit' name='confirmarDevolucion' value="Confirmar" />
        </form>
    </main>


</body>