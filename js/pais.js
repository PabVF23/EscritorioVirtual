"use strict";
class Pais {
    constructor(nombre, capital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion;
    }

    setTipoGobierno(tipoGobierno) {
        this.tipoGobierno = tipoGobierno;
    }

    setCoordenadasCapital(longitud, latitud, altitud) {
        this.coordenadasCapital = [];
        this.coordenadasCapital[0] = longitud;
        this.coordenadasCapital[1] = latitud;
        this.coordenadasCapital[2] = altitud;
    }
    
    setReligion(religion) {
        this.religion = religion;
    }

    getNombre() {
        return this.nombre;
    }

    getCapital() {
        return this.capital;
    }

    getPoblacion() {
        return this.poblacion;
    }

    getTipoGobierno() {
        return this.tipoGobierno;
    }

    getCoordenadas() {
        let aux = "";

        aux += "Longitud: " + this.coordenadasCapital;
        aux += ", latitud: " + this.coordenadasCapital[1];
        aux += ", altitud: " + this.coordenadasCapital[1];

        return aux;
    }

    getReligion() {
        return this.religion;
    }

    getInformacionSecundaria() {
        let aux = "<ul>"
        aux += "<li>Población: " + this.getPoblacion() + " habitantes</li>\n";
        aux += "<li>Forma de gobierno: " + this.getTipoGobierno() + "</li>\n";
        aux += "<li>Religión mayoritaria: " + this.getReligion() + "</li>\n";
        aux +="</ul>\n";

        return aux;
    }

    escribirCoordenadas() {
        let aux = "<h4>Coordenadas de " + this.getCapital() +"</h4>\n";
        aux += "<ul>\n"
        aux += "<li>Longitud: " + this.coordenadasCapital[0] + "</li>\n";
        aux += "<li>Latitud: " + this.coordenadasCapital[1] + "</li>\n";
        aux += "<li>Altitud: " + this.coordenadasCapital[2] + "</li>\n";
        aux += "</ul>\n";

        document.write(aux);
    }

    cargarDatos() {
        var apiKey = "25b5ebb8889486ef95d199f2b80d1277";

        var lat = "-21.134167"
        var lon = "-175.200278"
        var openWeatherMapAPI = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&lang=es&units=metric";
        var pais = this;

        $.ajax({
            dataType: "json",
            url: openWeatherMapAPI,
            method: "GET",
            success: function(d) {
                var datos = []
                let date = "";
                let counter = 0;

                for (let i = 0; i < d.list.length; i++) {
                    if (date !== d.list[i].dt_txt.split(' ')[0]) {
                        date = d.list[i].dt_txt.split(' ')[0];
                        datos[counter] = d.list[i]
                        counter++;
                    }

                    if (counter === 5) {
                        break;
                    }
                }

                $("ul:last").after("<table></table>");
                $("table").append("<caption>Información meteorológica sobre " + pais.getCapital() + "</caption>");
                $("caption").after("<thead></thead>");
                $("thead").append("<tr></tr>")
                $("tr").append('<th scope="col" id="fecha">Fecha</th>');
                for (let i = 0; i < datos.length; i++) {
                    let date = datos[i].dt_txt.split(' ')[0];
                    let th = '<th scope="col" headers="fecha" id="' + date + '">' + date + "</th>"

                    $("tr").append(th);
                }

                $("thead").after("<tbody></tbody>");
                $("tbody").append("<tr></tr>")

                $("tr:last").append('<th scope="row" id="max">Temperatura máxima (°C)</th>')
                for (let i = 0; i < datos.length; i++) {
                    let date = datos[i].dt_txt.split(' ')[0];
                    let max = datos[i].main.temp_max;
                    let td = '<td headers="' + date + ' max">' + max + "</td>"

                    $("tr:last").append(td);
                }

                $("tr:last").after("<tr></tr>")
                $("tr:last").append('<th scope="row" id="min">Temperatura mínima (°C)</th>')
                for (let i = 0; i < datos.length; i++) {
                    let date = datos[i].dt_txt.split(' ')[0];
                    let min = datos[i].main.temp_min;
                    let td = '<td headers="' + date + ' min">' + min + "</td>"

                    $("tr:last").append(td);
                }

                $("tr:last").after("<tr></tr>")
                $("tr:last").append('<th scope="row" id="hum">Porcentaje de humedad</th>')
                for (let i = 0; i < datos.length; i++) {
                    let date = datos[i].dt_txt.split(' ')[0];
                    let hum = datos[i].main.humidity;
                    let td = '<td headers="' + date + ' hum">' + hum + "%</th>"

                    $("tr:last").append(td);
                }

                $("tr:last").after("<tr></tr>")
                $("tr:last").append('<th scope="row" id="tiempo">Tiempo</th>')
                for (let i = 0; i < datos.length; i++) {
                    let date = datos[i].dt_txt.split(' ')[0];
                    let tiempo = "https://openweathermap.org/img/w/" + datos[i].weather[0].icon + ".png";
                    let td = '<td headers="' + date + ' tiempo"></td>'

                    $("tr:last").append(td);

                    $("td[headers='" + date + " tiempo']").append('<img src="' + tiempo + '" alt="' + datos[i].weather.icon + '"/>')
                }

                $("tr:last").after("<tr></tr>")
                $("tr:last").append('<th scope="row" id="lluvia">Cantidad de lluvia (mm)</th>')
                for (let i = 0; i < datos.length; i++) {
                    let date = datos[i].dt_txt.split(' ')[0];
                    let lluvia = 0;
                    if(typeof datos[i].rain !== 'undefined') {
                        lluvia = datos[i].rain['3h']
                    }
                    let td = '<td headers="' + date + ' lluvia">' + lluvia + " mm</td>"

                    $("tr:last").append(td);
                }
            }
        })
    }
}

var pais = new Pais("Tonga", "Nuku'alofa", 106017)
pais.setTipoGobierno("Monarquía")
pais.setReligion("Cristianismo")
pais.setCoordenadasCapital("21° 08' 03\" S", "175° 12' 01\" W", "5 m");