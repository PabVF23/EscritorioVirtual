/*
    Dudas:
        · Si actualizacion datos en sudoku es correcta
        · Se pasa correctamente el valor de la tecla pulsada
        · Comprobación tecla en introduceElement
        · Acceso valor dataset correcto (getAttribute en vez de .data)
        · Comprobar que no se pincha al final de la fila o la columna
        · No eliminacion evento onclick
        · Uso de removeAttr
        · Limitaciones pruebas usabilidad
 */
class Crucigrama {
    board;
    columnas = 9;
    filas = 11;
    init_time;
    end_time;
    tablero;

    constructor() {
        // this.board = "4,*,.,=,12,#,#,#,5,#,#,*,#,/,#,#,#,*,4,-,.,=,.,#,15,#,.,*,#,=,#,=,#,/,#,=,.,#,3,#,4,*,.,=,20,=,#,#,#,#,#,=,#,#,8,#,9,-,.,=,3,#,.,#,#,-,#,+,#,#,#,*,6,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,6,#,8,*,.,=,16";
        this.board = "12,*,.,=,36,#,#,#,15,#,#,*,#,/,#,#,#,*,.,-,.,=,.,#,55,#,.,*,#,=,#,=,#,/,#,=,.,#,15,#,9,*,.,=,45,=,#,#,#,#,#,=,#,#,72,#,20,-,.,=,11,#,.,#,#,-,#,+,#,#,#,*,56,/,.,=,.,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,12,#,16,*,.,=,32"
        // this.board = "4,.,.,=,36,#,#,#,25,#,#,*,#,.,#,#,#,.,.,-,.,=,.,#,15,#,.,*,#,=,#,=,#,.,#,=,.,#,18,#,6,*,.,=,30,=,#,#,#,#,#,=,#,#,56,#,9,-,.,=,3,#,.,#,#,*,#,+,#,#,#,*,20,.,.,=,18,#,#,#,.,#,#,=,#,=,#,#,#,=,#,#,18,#,24,.,.,=,72"

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

        $("p").each(function(pos, element) {
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
        let diff = this.end_time - this.init_time;

        let seconds = Math.floor((diff/1000) % 60);
        if (seconds < 10) {
            seconds = "0" + seconds;
        }

        let minutes = Math.floor((diff/1000/60) % 60);
        if (minutes < 10) {
            minutes = "0" + minutes;
        }

        let hours = Math.floor((diff/1000/3600));
        if (hours < 10) {
            hours = "0" + hours;
        }

        return hours + ":" + minutes + ":" + seconds;
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
            alert("¡Enhorabuena! Has completado el crucigrama en " + diff);
        }
    }
}

var crucigrama = new Crucigrama();
crucigrama.start();