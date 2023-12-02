class Viajes {

    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.manejarErrores.bind(this));
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
        alert(this.mensaje)
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

        console.log(typeof centro.lat);
        console.log(typeof centro.lng);

        var mapaGeoposicionado = new google.maps.Map(document.querySelector("section") , {
            zoom: 8,
            center: centro,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        console.log(mapaGeoposicionado)

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
}

var viajes = new Viajes();