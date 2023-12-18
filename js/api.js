class Reproductor {

    constructor() {
        this.soportaAPIFile = window.File && window.FileReader && window.FileList && window.Blob;
    }

    cargarArchivos() {
        if (this.soportaAPIFile) {
            let archivos = Array.prototype.slice.call($("input:last").prop("files"));
            archivos.forEach((archivo) => {
                if (archivo.name.split(".")[archivo.name.split(".").length - 1] === "mp3") {
                    $("section:last").append('<p draggable="true" ondragstart="reproductor.moverArchivo(event)">'+ archivo.name + '</p>');

                    $("section:last > p:last").attr("data-url", URL.createObjectURL(archivo));
                }
            })

            $("section:last > p").each(function(pos, element) {
                element.onclick = function(event) {
                    if (element.getAttribute("data-tapped") === "true") {
                        $("section:last > p[data-state = selected]").removeAttr("data-state");
                        element.setAttribute("data-state", "selected");
                        reproductor.cargarArchivo();
                    } else {
                        element.setAttribute("data-tapped", "true");
                    }
                }


            })

            if (archivos.length) {
                $("section:last").attr("data-loaded", "true")
                $("section:last h4").remove();
                $("section:last").prepend("<h4>Archivos cargados</h4>")
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
        $(event.target).empty();
        $(event.target).append("<h3>Arrastra el archivo que quieras reproducir aquí</h3>");
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
        $(event.target).append('<input type="range" name="volume" min="-1" max="1" value="0" step="0.02" onchange="reproductor.cambiarVolumen()" />')
        this.gainNode.gain.value = 0;
        $("input", event.target).before("<p>Volumen actual: 50%</p>");
        $("input", event.target).before('<label for="volume">Cambiar volumen: </label>')
    }

    cargarArchivo() {
        $("section:first").empty();
        $("section:first").append("<h3>Arrastra el archivo que quieras reproducir aquí</h3>");

        let url = $("section:last > p[data-state = selected]").attr("data-url");
        let nombre = $("section:last > p[data-state = selected]").text();
        $("section:first").append("<p>Actualmente reproduciendo: " + nombre + "</p")
        $("section:first").append('<audio src="' + url +'"></audio>')
        this.isPlaying = true;

        let audioContext = new AudioContext();
        this.audioElement = $("audio").get(0);
        let track = audioContext.createMediaElementSource(this.audioElement);
        track.connect(audioContext.destination);
        this.audioElement.play();
        $("section:first").append('<button onclick="reproductor.cambiarEstadoReproduccion()">Pausar</button>')

        this.gainNode = audioContext.createGain();
        track.connect(this.gainNode).connect(audioContext.destination);
        $("section:first").append('<label for="volume>Cambiar volumen </label>')
        $("section:first").append('<input type="range" name="volume" min="-1" max="1" value="0" step="0.02" onchange="reproductor.cambiarVolumen()" />')
        this.gainNode.gain.value = 0;
        $("input", "section:first").before("<p>Volumen actual: 50%</p>");
        $("input", "section:first").before('<label for="volume">Cambiar volumen: </label>')
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
        this.gainNode.gain.value = volumen;
        let volumeText = Math.round(((Number(volumen) + 1) * 100)/2);
        $("section:first > p:last").text("Volumen actual: " + volumeText + "%");
    }
}

var reproductor = new Reproductor();