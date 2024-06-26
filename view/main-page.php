<?php
session_start();

if (isset($_SESSION['idUsuario']) && isset($_SESSION['nombreUsuario'])) {
    $_SESSION['loggedin'] = true; // Si la sesión está activa, se establece como verdadero
} else {
    $_SESSION['loggedin'] = false; // Si la sesión no está activa, se establece como falso
}
?>
<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href="assets/img/laika-logo.ico">
        <title>LAIKA Song Player</title>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,1,0"/>
        <link rel="stylesheet" href="assets/css/common-style.css"/>
        <link rel="stylesheet" href="assets/css/nav-style.css"/>
        <link rel="stylesheet" href="assets/css/player-style.css"/>
        <link rel="stylesheet" href="assets/css/header-style.css"/>
        <link rel="stylesheet" href="assets/css/home-style.css"/>
        <link rel="stylesheet" href="assets/css/register-style.css"/>
        <link rel="stylesheet" href="assets/css/playlist-album-style.css"/>
        <link rel="stylesheet" href="assets/css/user-style.css"/>
        <link rel="stylesheet" href="assets/css/settings-style.css"/>
        <link rel="stylesheet" href="assets/css/shop-style.css"/>
        <link rel="stylesheet" href="assets/css/artist-style.css"/>
        <link rel="stylesheet" href="assets/css/present-style.css"/>
        <link rel="stylesheet" href="assets/css/footer-style.css"/>
        <link rel="stylesheet" href="assets/css/responsive.css"/>
    </head>
    <body>
        <div id="modal" class="modal">
            <div class="modal-content">
                <div id="register-form" style="display: none;">
                    <?php include 'register.php'; ?>
                </div>
                <div id="login-form" style="display: none;">
                    <?php include 'login.php'; ?>
                </div>
                <div id="forgotPassword-form" style="display: none;">
                    <?php include 'forgot.php'; ?>
                </div>
            </div>
        </div>
        <?php include 'policy-about.php';?>
        <!-- Canción en reproducción -->
        <audio id="playing-song-audio" ontimeupdate="refreshProgressBar(), changeMaxValueSongProgress()">
            <source type="audio/mp3">
        </audio>
        <?php include 'nav.php';?>
        <div id="main-divider">
            <!-- Barra de búsqueda -->
            <?php include 'header.php';?>
            <!-- Ajustes (se mantienen ocultos) -->
            <?php include 'landing/settings.php';?>
            <!-- <php include 'landing/shop.php';?> -->
            <!-- Datos empresa -->
            <?php include 'landing/user.php';?>
            <?php include 'landing/home.php';?>
            <!-- <php include 'landing/artist.php';?> -->
            <!-- Sección de relleno -->
            <section class="filler"></section>
        </div>
        <!-- Reproductor -->
        <?php include 'player.php';?>
        <?php include 'presentation.php';?>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="https://widget.deezer.com/widget/dynamic/deezer-widget-loader.js" defer></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="./assets/js/playing-song-script.js"></script>
    <script src="./assets/js/common-script.js"></script>
    <script src="./assets/js/search-script.js"></script>
    <script src="./assets/js/main-albums.js"></script>
    <script src="./assets/js/playlist-album-script.js"></script>
    <script src="./assets/js/register-script.js"></script>
    <script src="./assets/js/login-script.js"></script>
    <script src="./assets/js/forgot-script.js"></script>
    <script src="./assets/js/user-script.js"></script>
    <script src="./assets/js/nav-script.js"></script>
</html> 