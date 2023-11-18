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
        aux += "\t<li>Población: " + this.getPoblacion() + " habitantes</li>\n";
        aux += "\t<li>Forma de gobierno: " + this.getTipoGobierno() + "</li>\n";
        aux += "\t<li>Religión mayoritaria: " + this.getReligion() + "</li>\n";
        aux +="</ul>\n";

        return aux;
    }

    escribirCoordenadas() {
        let aux = "<h4>Coordenadas de " + this.getCapital() +"</h4>\n";
        aux += "<ul>\n"
        aux += "\t<li>Longitud: " + this.coordenadasCapital[0] + "</li>\n";
        aux += "\t<li>Latitud: " + this.coordenadasCapital[1] + "</li>\n";
        aux += "\t<li>Altitud: " + this.coordenadasCapital[2] + "</li>\n";
        aux += "</ul>\n";

        document.write(aux);
    }
}

var pais = new Pais("Tonga", "Nuku'alofa", 106017)
pais.setTipoGobierno("Monarquía")
pais.setReligion("Cristianismo")
pais.setCoordenadasCapital("21° 08' 03\" S", "175° 12' 01\" W", "5 m");