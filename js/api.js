class Reproductor {
    cargarArchivos() {
        let archivos = $("input").prop("files");
        for (let i = 0; i < archivos.length; i++) {
            if (archivos[i].name.split(".")[archivos[i].name.split(".").length - 1] === "mp3") {
                $("section:last").append('<p draggable="true" ondragstart="reproductor.moverArchivo(event)">'+ archivos[i].name + '</p>');

                $("p:last").attr("data-url", URL.createObjectURL(archivos[i]));
            }
        }

        if (archivos.length) {
            $("section:last").attr("loaded", "true")
            $("section:last h4").remove();
        }
    }

    moverArchivo(event) {
        event.dataTransfer.setData("url", event.target.getAttribute("data-url"))
        event.dataTransfer.setData("nombre", $(event.target).text())
    }

    detectarArchivo(event) {
        event.preventDefault();
    }

    procesarArchivo(event) {
        event.preventDefault();
        let url = event.dataTransfer.getData("url");
        let nombre = event.dataTransfer.getData("nombre");
        $(event.target).append("<p>Actualmente reproduciendo: " + nombre + "</p")
        $("p", event.target).attr("data-url", url)
    }
}

var reproductor = new Reproductor();