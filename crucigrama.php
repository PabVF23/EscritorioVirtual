<!DOCTYPE HTML>
<html lang="es">

<?php
    class Record {
        public function __construct() {
            $this->server = "localhost";
            $this->user = "DBUSER2023";
            $this->pass = "DBPSWD2023";
            $this->dbname = "records";
        }

        public function insertarDatos($nombre, $apellidos, $nivel, $tiempo) {
            $db = new mysqli($this->server, $this->user, $this->pass, $this->dbname);

            $stmt = $db->prepare("INSERT INTO REGISTRO VALUES (?, ?, ?, ?)");
            $stmt->bind_param('sssi', $nombre, $apellidos, $nivel, $tiempo);
            $stmt->execute();

            $stmt->close();
            $db->close();
        }
        
    }

    if (count($_POST) > 0) {
        $nombre = $_POST['nombre'];
        $apellidos = $_POST['apellidos'];
        $nivel = $_POST['nivel'];
        $tiempo = $_POST['tiempo'];
        $record = new Record();
        $record->insertarDatos($nombre, $apellidos, $nivel, $tiempo);
    }
?>

<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual - Crucigrama matemático</title>

    <meta name ="author" content ="Pablo Valdés Fernández" />
    <meta name ="description" content ="Un crucigrama matemático" />
    <meta name ="keywords" content ="crucigrama, matematico, crucigrama matematico, matematicas, mates, juego, jugar" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/crucigrama.css" />
    <link rel="icon" type="image/x-icon" href="multimedia/imagenes/favicon.ico"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src="js/crucigrama.js"></script>
</head>

<body>
    <!-- Datos con el contenidos que aparece en el navegador -->
    <header>
        <h1>Escritorio Virtual</h1>

        <nav>
            <a href="index.html" accesskey="I" tabindex="1">Inicio</a>
            <a href="sobremi.html" accesskey="S" tabindex="2">Sobre mi</a>
            <a href="noticias.html" accesskey="N" tabindex="3">Noticias</a>
            <a href="agenda.html" accesskey="A" tabindex="4">Agenda</a>
            <a href="meteorologia.html" accesskey="M" tabindex="5">Meteorología</a>
            <a href="viajes.html" accesskey="V" tabindex="6">Viajes</a>
            <a href="juegos.html" accesskey="J" tabindex="7">Juegos</a>
        </nav>
    </header>

    <h2>Crucigrama matemático</h2>

    <a href="memoria.html" accesskey="M" tabindex="8">Memoria</a>
    <a href="sudoku.html" accesskey="K" tabindex="9">Sudoku</a>
    <a href="crucigrama.php" accesskey="C" tabindex="10">Crucigrama matemático</a>
    <a href="api.html" accesskey="R" tabindex="11">Reproductor de música</a>

    <p>Este juego es un crucigrama matemático. Se mostrará un crucigrama con una serie de operaciones matemáticas parcialmente vacías que el jugador deberá completar correctamente.</p>
    <p>En dispositivos móviles, se mostrará una botonera que el usuario podrá emplear para insertar los valores necesarios para resolver el crucigrama. </p>

    <main></main>
    
    <section data-type="botonera">
        <h2>Botonera</h2>
        <button onclick="crucigrama.introduceElement(1)">1</button>
        <button onclick="crucigrama.introduceElement(2)">2</button>
        <button onclick="crucigrama.introduceElement(3)">3</button>
        <button onclick="crucigrama.introduceElement(4)">4</button>
        <button onclick="crucigrama.introduceElement(5)">5</button>
        <button onclick="crucigrama.introduceElement(6)">6</button>
        <button onclick="crucigrama.introduceElement(7)">7</button>
        <button onclick="crucigrama.introduceElement(8)">8</button>
        <button onclick="crucigrama.introduceElement(9)">9</button>
        <button onclick="crucigrama.introduceElement('*')">*</button>
        <button onclick="crucigrama.introduceElement('+')">+</button>
        <button onclick="crucigrama.introduceElement('-')">-</button>
        <button onclick="crucigrama.introduceElement('/')">/</button>
    </section>

    <script>
        crucigrama.paintMathword();
        addEventListener("keydown", (event) => {
            if (/^[1-9]$|^[+*\/-]$/i.test(event.key)) {
                if ($("main > p[data-state = clicked]").length > 0) {
                    crucigrama.introduceElement(event.key);
                } else {
                alert("¡Debes seleccionar una celda antes de introducir un número!")
                }  
            }
        });
    </script>
</body>
</html>