<!DOCTYPE HTML>

<?php
    require("bdBiblioteca.php");
    require("gestorSesion.php");

    $gestorSesion = new GestorSesion();
    $gestorSesion->gestionarSesion();
?>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual - Biblioteca</title>

    <meta name ="author" content ="Pablo Valdés Fernández" />
    <meta name ="description" content ="Un gestor de una biblioteca" />
    <meta name ="keywords" content ="biblioteca, libros, libro, sacar libro, devolver libro, pedir libro" />
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

        <p>Bienvenido al gestor de la biblioteca.</p>
        <?php
            if(session_id() === "") session_start();
            if (isset($_SESSION['biblioteca'])) {
                $biblioteca = $_SESSION['biblioteca'];
            } else {
                $biblioteca = new Biblioteca();
                $_SESSION['biblioteca'] = $biblioteca;
            }

            if (isset($_POST["reiniciarBD"])) {
                $biblioteca = new Biblioteca();
                $_SESSION['biblioteca'] = $biblioteca;
            }
        ?>

        <p>Por favor, seleccione lo que desee hacer:</p>

        <article>
            <h3>Opciones</h3>
            <a href="consultarBiblioteca.php" accesskey="C" tabindex="8">Consultar informacion de la base de datos</a>
            <a href="insertarBiblioteca.php" accesskey="E" tabindex="9">Insertar informacion en la base de datos</a>
            <a href="modificarBiblioteca.php" accesskey="O" tabindex="10">Modificar informacion de la base de datos</a>
            <a href="borrarBiblioteca.php" accesskey="B" tabindex="11">Borrar informacion de la base de datos</a>
            <a href="importarBiblioteca.php" accesskey="P" tabindex="12">Importar datos a la base de datos</a>
            <a href="exportarBiblioteca.php" accesskey="X" tabindex="13">Exportar datos de la base de datos</a>
            <a href="biblioteca.php" accesskey="R" tabindex="14">Reiniciar la base de datos</a>
        </article>

        <section>
            <h3>Reiniciar la base de datos</h3>
            <form action='#' method='post' name='reiniciar'>
                <input type="submit" name="reiniciarBD" value='Reiniciar la base de datos'/>
            </form>
        </section>
    </main>


</body>