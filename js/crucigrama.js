class Crucigrama {
    board;
    columnas = 9;
    filas = 11;
    init_time;
    end_time;
    tablero;

    constructor() {
        this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
        this.nivel = "Facil";
        // this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32"
        // this.nivel = "Intermedio";
        // this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72"
        // this.nivel = "Dificil";

        this.tablero = [];
        for (let i = 0; i < this.filas; i++) {
            this.tablero[i] = [];
        }
    }

    start() {
        var boardArray = this.board.split(",");
        for (let i = 0; i < this.filas; i++) {  
            for (let j = 0; j < this.columnas; j++) {
                var pos = i*this.columnas + j;
                if (boardArray[pos] === ".") {
                    this.tablero[i][j] = 0;
                } else if (boardArray[pos] === "#") {
                    this.tablero[i][j] = -1;
                } else {
                    this.tablero[i][j] = boardArray[pos];
                }
            }
        }
    }

    paintMathword() {

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                $("main").append("<p></p>");
            }
        }

        var columnas = this.columnas;
        var tablero = this.tablero

        $("main > p").each(function(pos, element) {
            var i = Math.floor(pos / columnas);
            var j = pos % columnas;
            if (tablero[i][j] == "0") {
                element.onclick = function(event) {
                    element.setAttribute("data-state", "clicked");
                }
            } else if (tablero[i][j] == "-1") {
                element.setAttribute("data-state", "empty");
            } else {
                element.innerHTML = tablero[i][j];
                element.setAttribute("data-state", "blocked")
            }
        })

        this.init_time = new Date();
    }

    check_win_condition() {
        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                if (this.tablero[i][j] == "0") return false;
            }
        }

        return true;
    }

    calculate_time_difference() {
        let diff = Math.floor((this.end_time - this.init_time)/1000);
        return diff;
    }

    introduceElement(key) {
        let expression_row = true;
        let expression_col = true;

        let pos = 0;
        $("main > p").each(function(index, element) {
            if (element.getAttribute("data-state") === "clicked") {
                pos = index;
                return;
            }
        })
        let fila = Math.floor(pos / this.columnas);
        let columna = pos % this.columnas;
        this.tablero[fila][columna] = key;

        // Comprobación de expresion horizontal
        let columna_igual = -1;

        if (columna < this.columnas - 1) {
            if (this.tablero[fila][columna + 1] != -1) {
                for (let j = columna + 1; j < this.columnas; j++) {
                    if (this.tablero[fila][j] === "=") {
                        columna_igual = j;
                        break;
                    }
                }
            }
        }

        if (columna_igual !== -1) {
            var first_number = this.tablero[fila][columna_igual - 3];
            var second_number = this.tablero[fila][columna_igual - 1];
            var expression = this.tablero[fila][columna_igual - 2];
            var result = this.tablero[fila][columna_igual + 1];
        }

        if (first_number != 0 && second_number != 0 && expression != 0 && result != 0) {
            let expr = [first_number, expression, second_number];
            expression_row = eval(expr.join(" ")) == result;
        }

        // Comprobación de expresion vertical
        let fila_igual = -1;

        if (fila < this.filas - 1) {
            if (this.tablero[fila + 1][columna] != -1) {
                for (let i = fila + 1; i < this.filas; i++) {
                    if (this.tablero[i][columna] === "=") {
                        fila_igual = i;
                        break;
                    }
                }
            }
        }

        if (fila_igual !== -1) {
            var first_number = this.tablero[fila_igual - 3][columna];
            var second_number = this.tablero[fila_igual - 1][columna];
            var expression = this.tablero[fila_igual - 2][columna];
            var result = this.tablero[fila_igual + 1][columna];
        }

        if (first_number != 0 && second_number != 0 && expression != 0 && result != 0) {
            let expr = [first_number, expression, second_number];
            expression_col = eval(expr.join(" ")) == result;
        }

        if (expression_row && expression_col) {
            $("main > p[data-state = 'clicked']").text(key);
            $("main > p[data-state = 'clicked']").attr("data-state", "correct");
        } else {
            this.tablero[fila][columna] = 0;
            $("main > p[data-state = 'clicked']").removeAttr('data-state');
            alert("El valor introducido para la casilla seleccionada no es correcto")
        }

        if (this.check_win_condition()) {
            this.end_time = new Date();
            let diff = this.calculate_time_difference();
            alert("¡Enhorabuena! Has completado el crucigrama en " + diff + " segundos");
            this.createRecordForm();
        }
    }

    createRecordForm() {
        $("main").after("<section></section>")

        $("section:first").append("<h3>¡Has ganado! Introduce tus datos si quieres guardar tu resultado</h3>")

        $("section:first").append("<form action='#' method='post' name='record'></form>")

        $("form").append("<label for='nombre'>Nombre: </label>")
        $("form").append("<input type='text' name='nombre' id='nombre' />")
        $("form").append("<label for='apellidos'>Apellidos: </label'>")
        $("form").append("<input type='text' name='apellidos' id='apellidos'/>")
        $("form").append("<label for='nivel'>Nivel: </label>")
        $("form").append("<input type='text' name='nivel' id='nivel' value='" + this.nivel + "' readonly />")
        $("form").append("<label for='tiempo'>Tiempo en segundos: </label>")
        $("form").append("<input type='text' name='tiempo' id='tiempo' value='" + this.calculate_time_difference() + "' readonly />")
        $("form").append("<input type='submit' value='Confirmar' />")
    }
}

var crucigrama = new Crucigrama();
crucigrama.start();