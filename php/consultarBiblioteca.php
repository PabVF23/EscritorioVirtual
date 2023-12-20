<!DOCTYPE HTML>

<?php
    require("bdBiblioteca.php");

    $biblioteca = new Biblioteca();
?>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual - Consultar info biblioteca</title>

    <meta name ="author" content ="Pablo Valdés Fernández" />
    <meta name ="description" content ="Consultar info de la BD de la biblioteca" />
    <meta name ="keywords" content ="biblioteca, libros, libro, obtener libro, obtener cliente, obtener empleado, obtener prestamo, obtener devolucion, obtener, consultar" />
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
        <h2>Biblioteca - Consultar</h2>

        <p>Bienvenido al gestor de la biblioteca.</p>
        <p>Aquí puedes consultar los datos de la biblioteca</p>
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
            $biblioteca->consultarBD();
        ?>
    </main>


</body>