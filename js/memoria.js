class Memoria {
    /*
    Ejecutar páginas web con XAMPP y Apache para JavaScript
    Validar HTML con inspector web para ver código fuente y copiar a archivo (añadir DOCTYPE manualmente)
    Hacer volteo memoria con data-state, no classList
    Representar casillas vacías sudoku con 0

    fcu: nc - (nc mod 3)
    ccu: nc - (nc mod 3)
    */
    elements = [
        {"element": "HTML5", "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"},
        {"element": "CSS3", "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"},
        {"element": "JS", "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"},
        {"element": "PHP", "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"},
        {"element": "SVG", "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"},
        {"element": "W3C", "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"},
        {"element": "HTML5", "source": "https://upload.wikimedia.org/wikipedia/commons/3/38/HTML5_Badge.svg"},
        {"element": "CSS3", "source": "https://upload.wikimedia.org/wikipedia/commons/6/62/CSS3_logo.svg"},
        {"element": "JS", "source": "https://upload.wikimedia.org/wikipedia/commons/b/ba/Javascript_badge.svg"},
        {"element": "PHP", "source": "https://upload.wikimedia.org/wikipedia/commons/2/27/PHP-logo.svg"},
        {"element": "SVG", "source": "https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"},
        {"element": "W3C", "source": "https://upload.wikimedia.org/wikipedia/commons/5/5e/W3C_icon.svg"}
    ]

    constructor() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;

        
        this.shuffleElements();
        this.createElements();
        this.addEventListeners();
    }

    shuffleElements() {
        for (var i = this.elements.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = this.elements[i];
            this.elements[i] = this.elements[j];
            this.elements[j] = temp;
        }
    }

    unflipCards() {
        this.lockBoard = true;
        this.firstCard.removeAttribute("data-state");
        this.secondCard.removeAttribute("data-state");

        setTimeout(() => {
            this.resetBoard();
        }, 5)
    }

    resetBoard() {
        this.hasFlippedCard = false;
        this.lockBoard = false;
        this.firstCard = null;
        this.secondCard = null;
    }

    checkForMatch() {
        this.firstCard.getAttribute("data-element") === this.secondCard.getAttribute("data-element") ? this.disableCards() : this.unflipCards();
    }

    disableCards() {
        this.firstCard.setAttribute("data-state", "revealed")
        this.secondCard.setAttribute("data-state", "revealed")

        this.resetBoard();
    }

    createElements() {
        this.elements.forEach((element) => {
            var aux = "<article data-element=\"" + element.element + "\">\n";
            aux +="\t<h3>Tarjeta de memoria</h3>\n";
            aux += "\t<img src=\"" + element.source + "\" alt = \"" + element.element + "\"/>\n";
            aux += "</article>"

            document.write(aux)
        });
    }

    addEventListeners() {
        var cards = document.querySelectorAll("article");
        cards.forEach((card) => {
            var flipCard = this.flipCard.bind(card, this)
            card.onclick = function(event) {
                flipCard();
            };
        });
    }

    flipCard(game) {
        if (this.getAttribute("data-state") === "revealed" || game.lockBoard || this === game.firstCard) {
            return;
        }
        
        this.setAttribute("data-state", "flip");

        setTimeout(() => {
            if (game.hasFlippedCard) {
                game.secondCard = this;
                game.checkForMatch();
            } else {
                game.hasFlippedCard = true;
                game.firstCard = this;
            }
        }, 500)
        
    }
}

var memoria = new Memoria();