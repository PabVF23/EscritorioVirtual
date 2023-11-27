class Noticias {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            this.soportaAPIFile = true;
        } else {
            $("h2").after("<p>Este navegador no soporta el API File</p>")
            this.soportaAPIFile = false;
        }
    }

    readInputFile(file) {
        let archivo = $("input").prop("files")[0];
        var tipoTexto = /text.*/;
        if(archivo.type.match(tipoTexto) && this.soportaAPIFile) {
            let lector = new FileReader();
            lector.onload = function(evento) {
                let lines = lector.result.split(/[\r\n]+/g)

                lines.forEach(element => {
                    let line = element.split("_");

                    let titular = line[0];
                    let entradilla = line[1];
                    let texto = line[2];
                    let autor = line[3];

                    $("main").append("<article></article>");

                    $("article:last").append("<h3>" + titular + "</h3>");
                    $("article:last").append("<h4>" + entradilla + "</h3>");
                    $("article:last").append("<p>" + texto + "</p>");
                    $("article:last").append("<p>" + autor + "</p>")
                });
            }

            lector.readAsText(archivo);
        }
    }
}