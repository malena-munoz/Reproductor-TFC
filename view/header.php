<header>
    <section class="centered">
        <span class="material-symbols-rounded" id="home" onclick="goHome();">home</span>
    </section>
    <section class="centered" id="centered-container">
        <span class="material-symbols-rounded" id="search">search</span>
        <form onsubmit="searchSpotify(event)" role="search">
            <input placeholder="Buscar canción / artista / playlist..." autocomplete="off" type="text" name="text" id="search-input">
        </form>
    </section>

    <?php
    if (isset($_SESSION['loggedin']) && $_SESSION['loggedin']) {
        include 'components/header-user-icon.php';
    } else {
        include 'components/header-buttons.php';
    }
    ?>
</header>