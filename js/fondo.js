class Fondo {
    constructor(pais, capital, coordenadas) {
        this.pais = pais;
        this.capital = capital;
        this.coordenadas = coordenadas;
    }

    cargarDatos() {
        var flickrAPI = "https://api.flickr.com/services/rest/?method=flickr.photos.search";
        var apiKey = "a607c523b66a35f121c8751feb7418bb";

        $.getJSON(flickrAPI,
            {
                api_key: apiKey,
                tags: this.pais + ", " + this.capital,
                lat: this.coordenadas[0],
                lon: this.coordenadas[1],
                format: "json",
                nojsoncallback: true
            })
        .done(function(data) {
            var urls = []
            $.each(data.photos.photo, function(i, item) {
                let serverId = item.server;
                let photoId = item.id;
                let secret = item.secret;
                let format = "png"
                let url = "https://live.staticflickr.com/" + serverId + "/" + photoId + "_" + secret + "_b." + format;
                urls.push(url);
            })

            var url = urls[Math.floor(Math.random()*urls.length)];
            console.log(url);
            $("body").css("background-image", 'url("' + url + '")').css("background-size", "cover");
        })
        .fail(function(error) {
            console.log(error);
        })
    }
}

let coordenadas = ["-21.13117063262022", "-175.2005886457105", "5"];
var fondo = new Fondo("Tonga", "Nuku'alofa", coordenadas);
fondo.cargarDatos();