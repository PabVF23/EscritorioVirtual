class Pais {
    constructor(nombre, capital, poblacion) {
        this.nombre = nombre;
        this.capital = capital;
        this.poblacion = poblacion
    }

    setTipoGobierno(tipoGobierno) {
        this.tipoGobierno = tipoGobierno;
    }

    setCoordenadasCapital(longitud, latitud, altitud) {
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

        aux += "Longitud: " + this.coordenadasCapital[0];
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
        let aux = "<h3>Coordenadas de " + this.getCapital() +"<h3>\n";
        aux += "<ul>\n"
        aux += "<li>Longitud: " + this.coordenadasCapital[0] + "</li>\n";
        aux += "<li>Latitud: " + this.coordenadasCapital[1] + "</li>\n";
        aux += "<li>Altitud: " + this.coordenadasCapital[2] + "</li>\n";
        aux += "</ul>\n";

        document.write(aux);
    }
}

var pais = new Pais("Tonga", "Nuku'alofa", 106017)