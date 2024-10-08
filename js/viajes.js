"use strict";
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
            zoom: 17,
            style: "mapbox://styles/mapbox/streets-v12"
        });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                let pos = [position.coords.longitude, position.coords.latitude]

                let popup = new mapboxgl.Marker()
                    .setLngLat(pos)
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
                    $("section").eq(2).append("<h4>" + nombre + "</h4>");

                    let tipo = $(this).attr("tipo")
                    $("section").eq(2).append("<p>Tipo: " + tipo + "</p>")

                    let medio = $(this).attr("medio")
                    $("section").eq(2).append("<p>Medio: " + medio + "</p>")

                    let fecha = $("fecha", this).text();
                    $("section").eq(2).append("<p>Fecha: " + fecha + "</p>")

                    let hora = $("hora", this).text();
                    $("section").eq(2).append("<p>Hora: " + hora + "</p>")

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

                    $("section").eq(2).append("<p>Tiempo: " + tiempo + "</p>")

                    let agencia = $("agencia", this).text();
                    $("section").eq(2).append("<p>Agencia: " + agencia + "</p>")

                    let descripcion = $("descripcion:first", this).text();
                    $("section").eq(2).append("<p>Descripcion: " + descripcion + "</p>")
                    
                    let personas = $("personas", this).text();
                    $("section").eq(2).append("<p>Personas: " + personas + "</p>")

                    let lugar = $("lugar", this).text();
                    $("section").eq(2).append("<p>Lugar: " + lugar + "</p>")

                    let direccion = $("direccion", this).text();
                    $("section").eq(2).append("<p>Direccion: " + direccion + "</p>")

                    let latitud = $("coordenadas:first", this).attr("latitud");
                    let longitud = $("coordenadas:first", this).attr("longitud");
                    let altitud = $("coordenadas:first", this).attr("altitud");
                    $("section").eq(2).append("<p>Coordenadas: " + latitud + ", " + longitud  + ", " + altitud + "</p>")

                    $("section").eq(2).append("<p>Referencias:</p>")
                    $("section:nth-of-type(3) > p:last").after("<ul></ul>")
                    let contador = 1;
                    $("referencia", this).each(function() {
                        let referencia = "<a href='" + $(this).text() + "'>Referencia " + contador + "</a>";
                        $("section > ul:last").append("<li>" + referencia + "</li>")
                        contador++;
                    })

                    let recomendacion = $("recomendacion", this).text();
                    $("section").eq(2).append("<p>Recomendación: " + recomendacion + "</p>")


                    $("hito", this).each(function() {
                        let nombre = $(this).attr("nombre");
                        $("section").eq(2).append("<h5>Hito: " + nombre + "</h5>")

                        let descripcion = $("descripcion", this).text();
                        $("section").eq(2).append("<p>Descripcion: " + descripcion + "</p>");

                        let latitud = $("coordenadas", this).attr("latitud");
                        let longitud = $("coordenadas", this).attr("longitud");
                        let altitud = $("coordenadas", this).attr("altitud");
                        $("section").eq(2).append("<p>Coordenadas: " + latitud + ", " + longitud  + ", " + altitud + "</p>");

                        let distancia = $("distancia", this).text() + " " + $("distancia", this).attr("unidades");
                        $("section").eq(2).append("<p>Distancia del último punto: " + distancia + "</p>");

                        $("section").eq(2).append("<h6>Galería de fotos: </h6>");

                        $("foto", this).each(function() {
                            let foto = "<img src='xml/" + $(this).text() + "' alt = '" + $(this).text() + "' />"
                            $("section").eq(2).append(foto)
                        })

                        if ($("galeriaVideos", this).length) {
                            $("section").eq(2).append("<h6>Galería de videos: </h6>");

                            $("video", this).each(function() {
                                $("section").eq(2).append('<video controls preload="auto"></video>')
                                let src = "xml/" + $(this).text();
                                $("section > video:last").append("<source src='" + src + "' type='video/mp4'/>");
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

        let viajes = this;

        nextSlide.addEventListener("click", function () {

            if (viajes.currSlide === viajes.maxSlide) {
                viajes.currSlide = 0;
            } else {
                viajes.currSlide++;
            }

            viajes.slides.forEach((slide, indx) => {
                var trans = 100 * (indx - viajes.currSlide);
              $(slide).css('transform', 'translateX(' + trans + '%)')
            });
          });

        let prevSlide = document.querySelector("button[data-action='prev']");
        prevSlide.addEventListener("click", function () {

            if (viajes.currSlide === 0) {
                viajes.currSlide = viajes.maxSlide;
            } else {
                viajes.currSlide--;
            }
            
            viajes.slides.forEach((slide, indx) => {
                var trans = 100 * (indx - viajes.currSlide);
              $(slide).css('transform', 'translateX(' + trans + '%)')
            });
        });
    }
}

var viajes = new Viajes();
viajes.configurarCarrusel();