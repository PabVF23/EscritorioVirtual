<!DOCTYPE HTML>

<?php
    require("bdBiblioteca.php");

    $biblioteca = new Biblioteca();
?>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual - Importar info a la biblioteca</title>

    <meta name ="author" content ="Pablo Valdés Fernández" />
    <meta name ="description" content ="Importar info a la BD de la biblioteca" />
    <meta name ="keywords" content ="biblioteca, libros, libro, importar libro, importar cliente, importar empleado, importar prestamo, importar devolucion, importar" />
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

        <p>Bienvenido al gestor de la biblioteca.</p>
        <p>Aquí puedes importar datos mediante un archivo CSV.</p>
        <p>El archivo debe estar en el mismo directorio que los archivos de la página y deberá llamarse "biblioteca.csv".</p>

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

        <section>
            <h3>Cargar el archivo .csv</h3>
            <form action='#' method='post' name='devolucion'>
                <input type="submit" name="cargarArchivo" value='Cargar archivo'/>
            </form>
        </section>

        <?php
            if (isset($_POST['cargarArchivo'])) {
                $biblioteca->importarBiblioteca();
            }
        ?>
    </main>


</body>