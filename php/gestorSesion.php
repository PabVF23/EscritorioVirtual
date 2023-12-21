<?php
    class GestorSesion {
        
        public function gestionarSesion() {
            if(session_id() === "") session_start();

            // Comprobar si la llamada viene de fuera o de dentro de la aplicación, y borrar si viene de fuera
            if (isset($_SERVER['HTTP_REFERER']) ) {
                if (explode("/", $_SERVER['HTTP_REFERER'])[count(explode("/", $_SERVER['HTTP_REFERER'])) - 2] != "php") {
                    session_destroy();
                }
            }
        }

        public function obtenerBiblioteca() {
            if(session_id() === "") session_start();

            if (isset($_SESSION['biblioteca'])) {
                $biblioteca = $_SESSION['biblioteca'];
            } else {
                $biblioteca = new Biblioteca();
                $_SESSION['biblioteca'] = $biblioteca;
            }

            return $biblioteca;
        }
    }
?>