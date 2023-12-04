class Reproductor {

    constructor() {
        this.soportaAPIFile = window.File && window.FileReader && window.FileList && window.Blob;
    }

    cargarArchivos() {
        if (this.soportaAPIFile) {
            let archivos = $("input:last").prop("files");
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
        $("section:first").empty();
        $("section:first").attr("has-audio", "true");
        let url = event.dataTransfer.getData("url");
        let nombre = event.dataTransfer.getData("nombre");
        $(event.target).append("<p>Actualmente reproduciendo: " + nombre + "</p")
        $(event.target).append('<audio src="' + url +'"></audio>')
        this.isPlaying = true;

        let audioContext = new AudioContext();
        this.audioElement = $("audio").get(0);
        let track = audioContext.createMediaElementSource(this.audioElement);
        track.connect(audioContext.destination);
        this.audioElement.play();
        $(event.target).append('<button onclick="reproductor.cambiarEstadoReproduccion()">Pausar</button>')

        this.gainNode = audioContext.createGain();
        track.connect(this.gainNode).connect(audioContext.destination);
        $(event.target).append('<input type="range" name="volume" min="0" max="100" value="50" step="1" onchange="reproductor.cambiarVolumen()" />')
        let volumen = $("input", event.target).val() + "%"
        $("input", event.target).before("<p>Volumen actual: " + volumen + "</p>");
    }

    cambiarEstadoReproduccion() {
        if (this.isPlaying) {
            this.audioElement.pause();
            $("section:first > button").text("Reproducir")
        } else {
            this.audioElement.play();
            $("section:first > button").text("Pausar")
        }

        this.isPlaying = !this.isPlaying;
    }

    cambiarVolumen() {
        let volumen = $("section:first > input").val();
        let nuevoVolumen = volumen/50;
        this.gainNode.gain.value = nuevoVolumen;
        $("section:first > p:last").text("Volumen actual: " + volumen + "%");
    }
}

var reproductor = new Reproductor();