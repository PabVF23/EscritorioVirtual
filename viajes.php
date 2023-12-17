<!DOCTYPE HTML>

<?php
    class Carrusel {
        public function __construct($pais, $capital) {
            $this->pais = $pais;
            $this->capital = $capital;
        }

        public function cargarDatos() {

            $params = array(
                'api_key' => 'a607c523b66a35f121c8751feb7418bb',
                'method' => 'flickr.photos.search',
                'tags' => $this->pais . "," . $this->capital,
                'lat' => '-21.13117063262022',
                'lon' => '-175.2005886457105',
                'per_page' => "10",
                'format' => 'json',
                'nojsoncallback' => '1'
            );

            $encoded_params = array();

            foreach ($params as $k => $v){
                $encoded_params[] = urlencode($k).'='.urlencode($v);
            }

            $url = "https://api.flickr.com/services/rest/?".implode('&', $encoded_params);

            $respuesta = file_get_contents($url);
            $fotos = json_decode($respuesta);

            if($fotos == null) {
                echo "<h3>Error en el archivo JSON recibido</h3>";
            }   

            $this->fotos = $fotos->photos->photo;
        }

        public function imprimirFotos() {
            echo "<article>";
            echo "<h3>Carrusel de imágenes</h3>";
            $i = 0;
            foreach($this->fotos as &$foto) {
                $i++;
                $serverId = $foto->server;
                $photoId = $foto->id;
                $secret = $foto->secret;
                $format = "png";
                
                $url = "https://live.staticflickr.com/" . $serverId . "/" . $photoId . "_" . $secret . "_b." . $format;

                $element = "<img src='" . $url . "' alt='Imagen " . $i . " Carrusel' />";
                echo $element;
            }

            echo('<button data-action="next"> > </button>');
            echo('<button data-action="prev"> < </button>');

            echo "</article>";
        }
    }

    class Moneda {
        public function __construct($local, $extranjera) {
            $this->local = $local;
            $this->extranjera = $extranjera;
        }

        public function obtenerCambio() {
            $apiKey = "4f560b96b1498125fea155c9";
            $url = "https://v6.exchangerate-api.com/v6/" . $apiKey . "/pair/" . $this->local . "/" . $this->extranjera;

            $respuesta = file_get_contents($url);
            $resultado = json_decode($respuesta);

            if ($resultado == NULL) {
                echo "<h3>Error en el archivo JSON recibido</h3>";
            } else {
                $tasa = $resultado->conversion_rate;

                echo "<p>Tasa de cambio obtenida: 1 " . $this->local . " = " . $tasa . " " . $this->extranjera . "</p>";
            }
        }
    }
?>

<html lang="es">
<head>
    <!-- Datos que describen el documento -->
    <meta charset="UTF-8" />
    <title>Escritorio Virtual - Viajes</title>

    <meta name ="author" content ="Pablo Valdés Fernández" />
    <meta name ="description" content ="Un mapa en el que se puede ver información de rutas y de localizaciones geográficas" />
    <meta name ="keywords" content ="mapa, mapbox, ruta, rutas, marcador, marcadores, geografica, geográficas, geolocalizacion, localizaciones, localizacion" />
    <meta name ="viewport" content ="width=device-width, initial-scale=1.0" />
    
    <link rel="stylesheet" type="text/css" href="estilo/estilo.css" />
    <link rel="stylesheet" type="text/css" href="estilo/layout.css" />
    <link rel="stylesheet" type="text/css" href="estilo/viajes.css" />
    <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.css' rel='stylesheet' />
    <link rel="icon" type="image/x-icon" href="multimedia/imagenes/favicon.ico"/>
    <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>
    <script src='https://api.tiles.mapbox.com/mapbox-gl-js/v2.9.2/mapbox-gl.js'></script>
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
            <a href="viajes.php" accesskey="V" tabindex="6">Viajes</a>
            <a href="juegos.html" accesskey="J" tabindex="7">Juegos</a>
        </nav>
    </header>
    <main>
        <h2>Viajes</h2>

        <?php
            $carrusel = new Carrusel("Tonga", "Nuku'alofa");
            $carrusel->cargarDatos();
            $carrusel->imprimirFotos();
        ?>

        <section>
            <h3>Tipo de cambio</h3>

            <?php
                $moneda = new Moneda("EUR", "TOP");
                $moneda->obtenerCambio();
            ?>
        </section>

        <section>
            <h3>Cargar mapa</h3>
            <figure id="mapa"></figure>
        </section>

        <button onclick="viajes.getMapaEstatico()">Cargar mapa estático</button>
        <button onclick="viajes.getMapaDinamico()">Cargar mapa dinámico</button>
        <h3>Subir archivos KML</h3>
        <input type="file" onChange="viajes.añadirKMLs()" multiple/>
        <section>
            <h3>Subir archivo XML</h3>
            <input type="file" onchange="viajes.leerXML()"/>
        </section>
        <section>
            <h3>Subir archivos SVG</h3>
            <input type="file" onchange="viajes.añadirSVG()" multiple/>
        </section>
    </main>
    <script src="js/viajes.js"></script>
</body>
</html>