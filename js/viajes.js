
/**
 * Importante: Preguntar duda css
 */

class Viajes {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.manejarErrores.bind(this));
        this.soportaAPIFile = window.File && window.FileReader && window.FileList && window.Blob;
        mapboxgl.accessToken = "pk.eyJ1IjoicGFidmYiLCJhIjoiY2xwcGg5eWpkMTU1NTJpcWdzeHY1YWY4NSJ9.2pTX2YTmvRYIVHh0Mx2qpA"
    }

    getPosicion(posicion) {
        this.mensaje = "¡Geolocalización llevada a cabo exitosamente!"
        this.longitud = posicion.coords.longitude; 
        this.latitud = posicion.coords.latitude;  
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
    }

    manejarErrores(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "Error: El usuario no ha autorizado la petición de geolocalización";
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Error: No se ha podido obtener la información de geolocalización";
                break;
            case error.TIMEOUT:
                this.mensaje = "Error: Se ha agotado el tiempo de la petición de geolocalización";
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Error: Se ha producido un error desconocido";
                break;
        }
        alert(this.mensaje)
    }

    getLongitud() {
        return this.longitud;
    }

    getLatitud() {
        return this.latitud;
    }

    getAltitud() {
        return this.altitud;
    }

    getMapaEstatico() {
        let url = "https://maps.googleapis.com/maps/api/staticmap?";
        let apiKey = "&key=AIzaSyD-7oLBwHqNquoUpIjkwg4aVXr24ZTiEM0";
        let centro = "center=" + this.latitud + "," + this.longitud;
        let zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        let marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        let sensor = "&sensor=false";
        let mapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;

        $("section > h3").eq(1).text("Mapa estático");
        $("figure").empty()
        $("figure").append("<img src='" + mapa + "' alt='Mapa estático de Google' />");
    }

    getMapaDinamico() {
        var centro = [-5.8502461, 43.3672702];

        $("section > h3").eq(1).text("Mapa dinámico");

        var mapaGeoposicionado = new mapboxgl.Map({
            container: "mapa",
            center: centro,
            zoom: 14,
            style: "mapbox://styles/mapbox/streets-v12"
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let pos = [position.coords.longitude, position.coords.latitude]

                let popup = new mapboxgl.Popup({closeOnClick: false})
                    .setLngLat(pos)
                    .setHTML("<p>Localización encontrada</p>")
                    .addTo(mapaGeoposicionado)
                    
                mapaGeoposicionado.setCenter(pos);
            }, function() {
                let pos = mapaGeoposicionado.getCenter()
                popup = new mapboxgl.Popup({closeOnClick: false})
                    .setLngLat(pos)
                    .setHTML("<p>Error: Ha fallado la geolocalización</p>")
                    .addTo(mapaGeoposicionado)
                    

                mapaGeoposicionado.setCenter(pos);
            })
        } else {
            let pos = mapaGeoposicionado.getCenter()
                popup = new mapboxgl.Popup({closeOnClick: false})
                    .setLngLat(pos)
                    .setHTML("<p>Error: El navegador no soporta la geolocalización</p>")
                    .addTo(mapaGeoposicionado)
                    
                mapaGeoposicionado.setCenter(pos);
        }
    }

    leerXML() {
        let archivo = $("input").eq(1).prop("files")[0];
        let tipoTexto = /text.*/;
        if(archivo.type.match(tipoTexto) && this.soportaAPIFile) {
            let lector = new FileReader();
            lector.onload = function(evento) {
                let rutas = lector.result;
                $("ruta", rutas).each(function() {
                    let nombre = $(this).attr("nombre");
                    $("section").eq(1).append("<h4>" + nombre + "</h4>");
                    $("section > h4:last").after("<ul></ul>");

                    let tipo = $(this).attr("tipo")
                    $("section > ul:last").append("<li>Tipo: " + tipo + "</li>")

                    let medio = $(this).attr("medio")
                    $("section > ul:last").append("<li>Medio: " + medio + "</li>")

                    let fecha = $("fecha", this).text();
                    $("section > ul:last").append("<li>Fecha: " + fecha + "</li>")

                    let hora = $("hora", this).text();
                    $("section > ul:last").append("<li>Hora: " + hora + "</li>")

                    let duracion = $("tiempo", this).text();
                    duracion = duracion.slice(1);
                    duracion = duracion.trim();
                    if (duracion.includes("T")) {
                        var dias = duracion.split("T")[0]
                        var horas = duracion.split("T")[1]
                    } else {
                        var dias = duracion;
                        var horas = ""
                    }

                    let tiempo = ""

                    if (dias.includes("Y")) {
                        tiempo += dias.split("Y")[0] + " años ";
                        dias = dias.split("Y")[1];
                    }

                    if (dias.includes("M")) {
                        tiempo += dias.split("M")[0] + " meses ";
                        dias = dias.split("M")[1];
                    }

                    if (dias.includes("D")) {
                        tiempo += dias.split("D")[0] + " días ";
                    }

                    if (horas.length != 0) {
                        if (horas.includes("H")) {
                            tiempo += horas.split("H")[0] + " horas ";
                            horas = horas.split("H")[1];
                        }
    
                        if (horas.includes("M")) {
                            tiempo += horas.split("M")[0] + " minutos ";
                            horas = horas.split("M")[1];
                        }
    
                        if (horas.includes("S")) {
                            tiempo += horas.split("S")[0] + " segundos ";
                        }
                    }

                    $("section > ul:last").append("<li>Tiempo: " + tiempo + "</li>")

                    let agencia = $("agencia", this).text();
                    $("section > ul:last").append("<li>Agencia: " + agencia + "</li>")

                    let descripcion = $("descripcion:first", this).text();
                    $("section > ul:last").append("<li>Descripcion: " + descripcion + "</li>")
                    
                    let personas = $("personas", this).text();
                    $("section > ul:last").append("<li>Personas: " + personas + "</li>")

                    let lugar = $("lugar", this).text();
                    $("section > ul:last").append("<li>Lugar: " + lugar + "</li>")

                    let direccion = $("direccion", this).text();
                    $("section > ul:last").append("<li>Direccion: " + direccion + "</li>")

                    let latitud = $("coordenadas:first", this).attr("latitud");
                    let longitud = $("coordenadas:first", this).attr("longitud");
                    let altitud = $("coordenadas:first", this).attr("altitud");
                    $("section > ul:last").append("<li>Coordenadas: " + latitud + ", " + longitud  + ", " + altitud + "</li>")

                    $("section > ul:last").append("<li>Referencias:</li>")
                    $("section > ul > li:last").append("<ul></ul>")
                    $("referencia", this).each(function() {
                        let referencia = "<a href='" + $(this).text() + "'>" + $(this).text() + "</a>";
                        $("section > ul > li:last > ul").append("<li>" + referencia + "</li>")
                    })

                    let recomendacion = $("recomendacion", this).text();
                    $("section > ul:last").append("<li>Recomendación: " + recomendacion + "</li>")

                    $("section > ul:last").append("<li>Hitos:</li>")
                    $("section > ul > li:last").append("<ul></ul>")

                    $("hito", this).each(function() {
                        let nombre = $(this).attr("nombre");
                        $("section > ul > li:last > ul").append("<li>" + nombre + "</li>")
                        $("section > ul > li:last > ul > li:last").append("<ul></ul>")

                        let descripcion = $("descripcion", this).text();
                        $("section > ul > li:last > ul > li:last > ul").append("<li>Descripcion: " + descripcion + "</li>");

                        let latitud = $("coordenadas", this).attr("latitud");
                        let longitud = $("coordenadas", this).attr("longitud");
                        let altitud = $("coordenadas", this).attr("altitud");
                        $("section > ul > li:last > ul > li:last > ul").append("<li>Coordenadas: " + latitud + ", " + longitud  + ", " + altitud + "</li>");

                        let distancia = $("distancia", this).text() + " " + $("distancia", this).attr("unidades");
                        $("section > ul > li:last > ul > li:last > ul").append("<li>Distancia del último punto: " + distancia + "</li>");

                        $("section > ul > li:last > ul > li:last > ul").append("<li>Galería de fotos: </li>");
                        $("section > ul > li:last > ul > li:last > ul > li:last").append("<ul></ul>")

                        $("foto", this).each(function() {
                            let foto = "<img src='multimedia/imagenes/" + $(this).text() + "' alt = '" + $(this).text() + "' />"
                            $("section > ul > li:last > ul > li:last > ul > li:last > ul").append("<li>" + foto + "</li>")
                        })

                        if ($("galeriaVideos", this).length) {
                            $("section > ul > li:last > ul > li:last > ul").append("<li>Galería de videos: </li>");
                            $("section > ul > li:last > ul > li:last > ul > li:last").append("<ul></ul>")

                            $("video", this).each(function() {
                                $("section > ul > li:last > ul > li:last > ul > li:last > ul").append("<li></li>")
                                $("section > ul > li:last > ul > li:last > ul > li:last > ul > li:last").append('<video controls preload="auto"></video>')
                                let src = "multimedia/videos/" + $(this).text();
                                $("section > ul > li:last > ul > li:last > ul > li:last > ul > li:last > video").append("<source src='" + src + "' type='video/mp4'>");
                            })
                        }
                    })
                })
            }

            lector.readAsText(archivo);
        }
    }

    añadirKMLs() {
        $("section > h3").eq(1).text("Mapa dinámico");

        let archivos = $("input:first").prop("files");
        let viajes = this;
        let centro = [-5.8502461, 43.3672702];
        var mapa = new mapboxgl.Map({
            container: "mapa",
            center: centro,
            zoom: 14,
            style: "mapbox://styles/mapbox/navigation-day-v1"
        });

        for (let i = 0; i < archivos.length; i++) {
            let coordinates = []
            if(this.soportaAPIFile && archivos[i].name.split(".")[1] === "kml") {
                let lector = new FileReader();
                lector.onload = function(evento) {
                    let archivo = lector.result;
                    var nombre = $("name", archivo).text();
                    let c = $("coordinates", archivo).text().split("\n");
                    let counter = 0;
                    for (let i = 0; i < c.length; i++) {
                        let coord = c[i].trim();

                        if (coord.length) {
                            let add = true;
                            let lng = c[i].split(",")[0].trim()
                            let lat = c[i].split(",")[1].trim()
                            if (counter > 0) {
                                add = viajes.differentCoords([lng, lat], coordinates[counter - 1])
                            }

                            if (add) {
                            coordinates[counter++] = [lng, lat];
                            }
                        }
                    }
                    mapa.on('load', function() {
                        mapa.addSource(nombre, {
                            'type': 'geojson',
                            'data': {
                                'type': 'Feature',
                                'properties': {
                                    "title": nombre
                                },
                                'geometry': {
                                    'type': 'LineString',
                                    'coordinates': coordinates
                                }
                            }
                        })
                        mapa.addLayer({
                            'id': nombre,
                            'type': 'line',
                            'source': nombre,
                            'layout': {
                                'line-join': 'round',
                                'line-cap': 'round'
                            },
                            'paint': {
                                'line-color': "#ff0000",
                                'line-width': 5
                            }
                        })
                    })

                    let mitad = [(parseFloat(coordinates[1][0]) + parseFloat(coordinates[0][0]))/2, (parseFloat(coordinates[1][1]) + parseFloat(coordinates[0][1]))/2]

                    let popup = new mapboxgl.Popup({closeOnClick: false})
                    .setLngLat(mitad)
                    .setText(nombre)
                    .addTo(mapa)

                    mapa.setCenter(coordinates[0])
                }

                lector.readAsText(archivos[i]);
            }
        }
    }

    differentCoords(coordsA, coordsB) {
        return (coordsA[0] !== coordsB[0]) && (coordsA[1] !== coordsB[1])
    }

    añadirSVG() {
        let archivos = $("input:last").prop("files");

        $("section:last > svg").remove()

        for (let i = 0; i < archivos.length; i++) {
            if(this.soportaAPIFile && archivos[i].name.split(".")[1] === "svg")  {
                let lector = new FileReader();

                lector.onload = function() {
                    let archivo = lector.result;
                    $("section:last").append(archivo)
                }

                lector.readAsText(archivos[i])
            }
        }
    }

    configurarCarrusel() {
        this.slides = document.querySelectorAll("img");
        let nextSlide = document.querySelector("button[data-action='next']");
        this.currSlide = 0;
        this.maxSlide = this.slides.length - 1;

        this.slides.forEach((slide) => {
            $(slide).attr("data-visibility", "hidden");
        });

        var slide = this.slides[this.currSlide];
        $(slide).attr("data-visibility", "visible");

        let viajes = this;

        nextSlide.addEventListener("click", function () {
            var slide = viajes.slides[viajes.currSlide];
            $(slide).attr("data-visibility", "hidden");

            if (viajes.currSlide === viajes.maxSlide) {
                viajes.currSlide = 0;
            } else {
                viajes.currSlide++;
            }

            slide = viajes.slides[viajes.currSlide];
            $(slide).attr("data-visibility", "visible");
          });

        let prevSlide = document.querySelector("button[data-action='prev']");
        prevSlide.addEventListener("click", function () {
            var slide = viajes.slides[viajes.currSlide];
            $(slide).attr("data-visibility", "hidden");

            if (viajes.currSlide === 0) {
                viajes.currSlide = viajes.maxSlide;
            } else {
                viajes.currSlide--;
            }
            slide = viajes.slides[viajes.currSlide];
            $(slide).attr("data-visibility", "visible");
        });
    }
}

var viajes = new Viajes();
viajes.configurarCarrusel();