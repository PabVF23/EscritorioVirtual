/*
    Ejecutar páginas web con XAMPP y Apache para JavaScript
    Validar HTML con inspector web para ver código fuente y copiar a archivo (añadir DOCTYPE manualmente)

    Dudas:
    · Unidades absolutas CSS (y height: auto)
    · Problemas validacion tag script y ubicacion de esta
    · Comprobar que se ha hecho todo correctamente
    · Preguntar por llamada a constructor de Memoria
*/

class Sudoku {
    cadena =  "";
    filas = 9;
    columnas = 9;
    tablero;

    constructor() {
        this.cadena = "3.4.69.5....27...49.2..4....2..85.198.9...2.551.39..6....8..5.32...46....4.75.9.6";
        this.tablero = [];
    }

    start() {
        for (let i = 0; i < this.filas; i++) {
            this.tablero[i] = [];
            for (let j = 0; j < this.columnas; j++) {
                var pos = i*this.columnas + j;
                if (this.cadena.charAt(pos) === ".") {
                    this.tablero[i][j] = "0"
                } else {
                    this.tablero[i][j] = this.cadena.charAt(pos);
                }
            }
        }
    }

    createStructure() {
        var main = document.querySelector("main");

        for (let i = 0; i < this.filas; i++) {
            for (let j = 0; j < this.columnas; j++) {
                var p = document.createElement("p");
                main.appendChild(p);
            }
        }
    }

    paintSudoku() {
        this.createStructure();

        var parrafos = document.querySelectorAll("main > p");

        var pos = 0;
        parrafos.forEach((p) => {
            var i = Math.floor(pos / this.filas);
            var j = pos % this.filas;

            if (this.tablero[i][j] === "0") {
                p.onclick = function(event) {
                    p.setAttribute("data-state", "clicked");
                }
            } else {
                p.innerHTML = this.tablero[i][j];
                p.setAttribute("data-state", "blocked")
            }

            pos++;
        });
    }

    introduceNumber(key) {
        var pos = 0; 
        var parrafos = document.querySelectorAll("main > p");
        for (let i = 0; i < parrafos.length; i++) {
            if (parrafos[i].getAttribute("data-state") === "clicked") {
                pos = i;
                break;
            }
        }

        var fila = Math.floor(pos / this.filas);
        var columna = pos % this.filas;

        var validarFila = true;

        for (let j = 0; j < this.columnas; j++) {
            if (this.tablero[fila][j] === key) {
                validarFila = false;
                break;
            }
        }

        var columnaTablero = this.tablero.map(function(value) {return value[columna]})
        
        var validarColumna = true;

        for (let i = 0; i < this.columnas; i++) {
            if (columnaTablero[i] === key) {
                validarColumna = false;
                break;
            }
        }

        var validarSubcuadricula = true;

        var subFila = Math.floor(fila/3) * 3;
        var subColumna = Math.floor(columna/3) * 3;

        for (let i = subFila; i <= subFila + 2; i++) {
            for (let j = subColumna; j <= subColumna + 2; j++) {
                if (this.tablero[i][j] === key) {
                    validarSubcuadricula = false;
                    break;
                }
            }
        }

        if (validarFila && validarColumna && validarSubcuadricula) {
            parrafos[pos].onclick = null;
            parrafos[pos].setAttribute("data-state", "correct");
            parrafos[pos].innerHTML = key;
            this.cadena = this.cadena.substring(0, pos) + key + this.cadena.substring(pos + 1);
        }

        if (!this.cadena.includes(".")) {
            alert("¡Enhorabuena! Has rellenado el sudoku correctamente")
        }
    }    
}

var sudoku = new Sudoku();
sudoku.start();