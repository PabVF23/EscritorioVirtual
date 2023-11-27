
/*
    Dudas:
        · Preguntar si asignacion de onclick es correcta
        · Preguntar por async
*/
class Agenda {
    last_api_call = null;
    last_api_result = null;

    cargarDatos() {
        let currDate = new Date();
        let diff = (currDate - this.last_api_call) / 1000 / 60;
        let agenda = this;

        if (diff >= 10) {
            this.last_api_call = currDate

            var ergastAPI = "http://ergast.com/api/f1/2023"
            $.ajax({
                dataType: "xml",
                url: ergastAPI,
                method: "GET",
                success: function(datos) {
                    agenda.last_api_result = datos;
                    agenda.procesarDatos();
                }
            })
        }
    }

    procesarDatos() {
        var datos = this.last_api_result

        $("table").remove();

        $("button").after("<table></table");

        $("table").append("<caption>Carreras de Fórmula 1 de la temporada 2023</caption>");
        $("caption").after("<thead></thead>");
        $("thead").append("<tr></tr>")
        $("tr").append('<th scope="col" id="carrera">Nombre de la carrera</th>');
        $("tr").append('<th scope="col" id="circuito">Nombre del circuito en el que se realiza</th>');
        $("tr").append('<th scope="col" id="coords">Coordenadas del circuito</th>');
        $("tr").append('<th scope="col" id="fecha">Fecha y hora</th>');
        $("thead").after("<tbody></tbody>")

        $("Race", datos).each(function() {
            $("tbody").append("<tr></tr>");

            let carrera = $("RaceName", this).text();
            let circuito = $("CircuitName", this).text();

            let coords = [];
            coords[0] = $("Location", this).attr("lat");
            coords[1] = $("Location", this).attr("long");
            let dia = $("Date:first", this).text();
            let hora = new Date(dia + " " + $("Time", this).first().text()).toLocaleTimeString("es-ES");
            let fecha = dia + " " + hora;

            $("tr:last").append('<td headers="carrera">' + carrera + "</td>")
            $("tr:last").append('<td headers="circuito">' + circuito + "</td>")
            $("tr:last").append('<td headers="coords">' + coords[0] + ", " + coords[1] + "</td>")
            $("tr:last").append('<td headers="fecha">' + fecha + "</td>")
        })
    }

}

var agenda = new Agenda();