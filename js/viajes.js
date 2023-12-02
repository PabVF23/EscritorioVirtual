class Viajes {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.manejarErrores.bind(this));
        this.soportaAPIFile = window.File && window.FileReader && window.FileList && window.Blob;
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

    getMapaEstaticoGoogle() {
        let url = "https://maps.googleapis.com/maps/api/staticmap?";
        let apiKey = "&key=AIzaSyD-7oLBwHqNquoUpIjkwg4aVXr24ZTiEM0";
        let centro = "center=" + this.latitud + "," + this.longitud;
        let zoom ="&zoom=15";
        var tamaño= "&size=800x600";
        let marcador = "&markers=color:red%7Clabel:S%7C" + this.latitud + "," + this.longitud;
        let sensor = "&sensor=false";
        let mapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;

        $("main").append("<img src='" + mapa + "' alt='Mapa estático de Google' />");
    }

    getMapaDinamicoGoogle() {
        var centro = {lat: 43.3672702, lng: -5.8502461};

        var mapaGeoposicionado = new google.maps.Map(document.getElementById("mapa") , {
            zoom: 8,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };

                infoWindow.setPosition(pos);
                infoWindow.setContent("Localización encontrada");
                infoWindow.open(mapaGeoposicionado);
                mapaGeoposicionado.setCenter(pos);
            }, function() {
                infoWindow.setPosition(mapaGeoposicionado.getCenter());
                infoWindow.setContent("Error: Ha fallado la geolocalización");
                infoWindow.open(mapaGeoposicionado);
            })
        } else {
            infoWindow.setPosition(mapaGeoposicionado.getCenter());
            infoWindow.setContent("Error: El navegador no soporta la geolocalización");
            infoWindow.open(mapaGeoposicionado);
        }
    }

    leerXML(file) {
        let archivo = $("input").prop("files")[0];
        var tipoTexto = /text.*/;
        let viajes = this;
        if(archivo.type.match(tipoTexto) && this.soportaAPIFile) {
            let lector = new FileReader();
            lector.onload = function(evento) {
                let rutas = lector.result;
                $("ruta", rutas).each(function() {
                    let nombre = $(this).attr("nombre");
                    $("section:last").append("<h4>" + nombre + "</h4>");
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
                            console.log(foto)
                            $("section > ul > li:last > ul > li:last > ul > li:last > ul").append("<li>" + foto + "</li>")
                        })

                        if ($("galeriaVideos", this).length) {
                            $("section > ul > li:last > ul > li:last > ul").append("<li>Galería de videos: </li>");
                            $("section > ul > li:last > ul > li:last > ul > li:last").append("<ul></ul>")

                            $("video", this).each(function() {
                                $("section > ul > li:last > ul > li:last > ul > li:last > ul").append("<li></li>")
                                $("section > ul > li:last > ul > li:last > ul > li:last > ul > li:last").append('<video controls preload="auto"></video>')
                                let src = "multimedia/videos/" + $(this).text();
                                let type = viajes.getMimeType($(this).text().split(".")[1]);
                                $("section > ul > li:last > ul > li:last > ul > li:last > ul > li:last > video").append("<source src='" + src + "' type='" + type + "'>");
                            })
                        }
                        // TODO: Añadir fotos y videos necesarios para xml
                    })
                })
            }

            lector.readAsText(archivo);
        }
    }

    getMimeType(extension) {
        switch (extension) {
            case "flv":
                return "video/x-flv"
            case "m3u8":
                return "application/x-mpegURL"
            case "ts":
                return "video/mp2t"
            case "3gp":
                return "video/3gpp"
            case "3gp":
                return "video/3gpp"
            case "mov":
                return "video/quicktime"
            case "avi":
                return "video/x-msvideo"
            case "wmv":
                return "video/x-ms-wmv"
            case "mpeg":
                return "video/mpeg"
            case "ogv":
                return "video/ogg"
            case "webm":
                return "video/webm";
            default:
                return "video/mp4";
        }
    }
}

var viajes = new Viajes();