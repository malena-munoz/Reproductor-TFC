// Géneros musicales, disponibles en Spotify
const genres = [
    "acoustic", "afrobeat", "alt-rock", "alternative", "ambient", "anime", "black-metal", "bluegrass", "blues", "bossanova", "brazil", "breakbeat", "british", "cantopop", "chicago-house", "children", "chill", "classical", "club", "comedy", "country", "dance", "dancehall", "death-metal", "deep-house", "detroit-techno", "disco", "disney", "drum-and-bass", "dub", "dubstep", "edm", "electro", "electronic", "emo", "folk", "forro", "french", "funk", "garage", "german", "gospel", "goth", "grindcore", "groove", "grunge", "guitar", "happy", "hard-rock", "hardcore", "hardstyle", "heavy-metal", "hip-hop", "holidays", "honky-tonk", "house", "idm", "indian", "indie", "indie-pop", "industrial", "iranian", "j-dance", "j-idol", "j-pop", "j-rock", "jazz", "k-pop", "kids", "latin", "latino", "malay", "mandopop", "metal", "metal-misc", "metalcore", "minimal-techno", "movies", "mpb", "new-age", "new-release", "opera", "pagode", "party", "philippines-opm", "piano", "pop", "pop-film", "post-dubstep", "power-pop", "progressive-house", "psych-rock", "punk", "punk-rock", "r-n-b", "rainy-day", "reggae", "reggaeton", "road-trip", "rock", "rock-n-roll", "rockabilly", "romance", "sad", "salsa", "samba", "sertanejo", "show-tunes", "singer-songwriter", "ska", "sleep", "songwriter", "soul", "soundtracks", "spanish", "study", "summer", "swedish", "synth-pop", "tango", "techno", "trance", "trip-hop", "turkish", "work-out", "world-music"
];



$(document).ready(function() {
    var clientId = 'c1f77d0fade2485f987f6454a201cab5';
    var clientSecret = '1c3bc66535484d90a934968f469d445a';

    // Función para obtener el token de acceso
    function getAccessToken(callback) {
        $.ajax({
            url: 'https://accounts.spotify.com/api/token',
            type: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
            },
            data: 'grant_type=client_credentials',
            success: function(response) {
                var accessToken = response.access_token;
                callback(accessToken);
            },
            error: function(err) {
                console.error('Error al obtener el token de acceso:', err);
            }
        });
    }

    // Función para imprimir los álbumes más recientes
    function printAlbums(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/browse/new-releases?limit=30',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Álbumes más populares:', data);
                var albums = data.albums.items;

                albums.forEach(function(album) {
                    var albumName = album.name.length > 50 ? album.name.substring(0, 50) + '...' : album.name;
                    var html = '<a href="#" class="card-a" id="' + album.id + '"><div class="card">';
                    if (album.images.length > 0) {
                        html += '<img src="' + album.images[0].url + '" alt="' + album.name + '">';
                    }
                    html += '<h3 alt='+albumName+'>' + albumName + '</h4>';
                    html += '<h4>';
                    album.artists.forEach(function(artist, index) {
                        html += artist.name;
                        if (index < album.artists.length - 1) {
                            html += ', ';
                        }
                    });
                    html += '</h4>';
                    html += '</div></a>';
                    $('#main-albums').append(html);
                });

                // Una vez que se imprimen los álbumes, buscamos información adicional sobre los artistas implicados
                searchArtists(accessToken, albums);
            },
            error: function(err) {
                console.error('Error al obtener los álbumes:', err);
            }
        });
    }

    // Función para imprimir las playlists más populares de Spotify
    function printPlaylists(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/browse/featured-playlists?limit=30',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Playlists más populares:', data);
                var playlists = data.playlists.items;

                playlists.forEach(function(playlist) {
                    var html = '<a href="#" class="card-a" id="' + playlist.id +'"><div class="card">';
                    if (playlist.images.length > 0) {
                        html += '<img src="' + playlist.images[0].url + '">';
                    }
                    html += '<h3>' + playlist.name + '</h3>';
                    html += '<h4>' + playlist.description + '</h4>';
                    html += '</div></a>';
                    $('#main-playlists').append(html);
                });
            },
            error: function(err) {
                console.error('Error al obtener las playlists:', err);
            }
        });
    }

    // Función para imprimir las canciones de la playlist "Top 50"
    function printTop50(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF/tracks',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Canciones del Top 50:', data);
                var tracks = data.items;
                var $top50Songs = $('#top-50-songs');
                var sectionCount = 0;
                var $currentSection;

                tracks.forEach(function(track, index) {
                    // Crear una nueva sección cada 25 tracks
                    if (index % 25 === 0) {
                        sectionCount++;
                        $currentSection = $('<section id="section-' + sectionCount + '"></section>');
                        $top50Songs.append($currentSection);
                    }
                    var html = '<a href="#" class="card-a track-a" data-name="' + track.track.name + '" data-artists="' + track.track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.track.preview_url + '"><div class="card">';
                    if (track.track.album.images.length > 0) {
                        html += '<img src="' + track.track.album.images[0].url + '" alt="' + track.track.name + '">';
                    }
                    var trackName = track.track.name.length > 30 ? track.track.name.substring(0, 30) + '...' : track.track.name;
                    html += '<h3>' + trackName + '</h3>';
                    html += '<h4>';
                    var artistName = (track.track.artists.map(artist => artist.name).join(', ').length > 30 ? 
                        track.track.artists.map(artist => artist.name).join(', ').substring(0, 30) + '...' : 
                        track.track.artists.map(artist => artist.name).join(', '));
                    html += artistName + '</h4>';
                    html += '</div></a>';
                    $currentSection.append(html);
                });

                // Agregar el evento clic a cada elemento de canción
                $('.track-a').on('click', function(e) {
                    e.preventDefault();
                    var songName = $(this).data('name');
                    var artists = $(this).data('artists');
                    var previewUrl = $(this).data('preview');
                    var imageUrl = $(this).find('img').attr('src'); // Get the image URL of the clicked song
                    // Actualizar la información de la canción en el reproductor
                    $('#playing-song-info h3').text(songName);
                    $('#playing-song-info h4').text(artists);
                    playing_song_audio.src = previewUrl;
                    $('#img-current-song img').attr('src', imageUrl); // Update the image of the playing song
                    playNewSong(); // Reproducir la canción automáticamente
                });
            },
            error: function(err) {
                console.error('Error al obtener las canciones del Top 50:', err);
            }
        }); 
    }

    // Función para imprimir las canciones de la playlist "Viral 50"
    function printViral50(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbLiRSasKsNU9/tracks',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                // console.log('Canciones del Viral 50:', data);
                var tracks = data.items;
                var $viral50Songs = $('#viral-50-songs');
                var sectionCount = 0;
                var $currentSection;

                tracks.forEach(function(track, index) {
                    // Crear una nueva sección cada 25 tracks
                    if (index % 25 === 0) {
                        sectionCount++;
                        $currentSection = $('<section id="section-' + sectionCount + '"></section>');
                        $viral50Songs.append($currentSection);
                    }
                    var html = '<a href="#" class="card-a track-a" data-name="' + track.track.name + '" data-artists="' + track.track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.track.preview_url + '"><div class="card">';
                    if (track.track.album.images.length > 0) {
                        html += '<img src="' + track.track.album.images[0].url + '" alt="' + track.track.name + '">';
                    }
                    var trackName = track.track.name.length > 30 ? track.track.name.substring(0, 30) + '...' : track.track.name;
                    html += '<h3>' + trackName + '</h3>';
                    html += '<h4>';
                    var artistName = track.track.artists.map(artist => artist.name).join(', ');
                    artistName = artistName.length > 30 ? artistName.substring(0, 30) + '...' : artistName;
                    html += artistName + '</h4>';
                    html += '</div></a>';
                    $currentSection.append(html);
                });

                // Agregar el evento clic a cada elemento de canción
                $('.track-a').on('click', function(e) {
                    e.preventDefault();
                    var songName = $(this).data('name');
                    var artists = $(this).data('artists');
                    var previewUrl = $(this).data('preview');
                    var imageUrl = $(this).find('img').attr('src'); // Get the image URL of the clicked song
                    // Actualizar la información de la canción en el reproductor
                    $('#playing-song-info h3').text(songName);
                    $('#playing-song-info h4').text(artists);
                    playing_song_audio.src = previewUrl;
                    $('#img-current-song img').attr('src', imageUrl); // Update the image of the playing song
                    playNewSong(); // Reproducir la canción automáticamente
                });
            },
            error: function(err) {
                console.error('Error al obtener las canciones del Viral 50:', err);
            }
        }); 
    }

    // Función para buscar información adicional sobre los artistas implicados en los álbumes
    function searchArtists(accessToken, albums) {
        albums.forEach(function(album) {
            album.artists.forEach(function(artist) {
                $.ajax({
                    url: 'https://api.spotify.com/v1/artists/' + artist.id,
                    type: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    success: function(data) {
                        // console.log('Información del artista:', data);
                        var html = '<a href="#" artist-id="' + artist.id + '"><div class="artist" style="background-image:linear-gradient(0deg, #00000088 30%, #ffffff44 100%), url(' + data.images[0].url + ')">';
                        html += '<h3>' + data.name + '</h3>';
                        html += '</div></a>';
                        $('#main-artists').append(html);
                    },
                    error: function(err) {
                        console.error('Error al obtener información del artista:', err);
                    }
                });
            });
        });
    }

    // Devuele una canción aleatoria de la API
    function printRandomSong(accessToken) {
        const randomOffset = Math.floor(Math.random() * 1000);
        $.ajax({
            url: 'https://api.spotify.com/v1/search?q=year:2023&type=track&limit=1&offset=' + randomOffset,
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                if (data.tracks.items.length > 0) {
                    var track = data.tracks.items[0];
                    
                    var html = '<a href="#" class="big-card-a track-a" data-name="' + track.name + '" data-artists="' + track.artists.map(artist => artist.name).join(', ') + '" data-preview="' + track.preview_url + '" song-id="' + track.id + '">';
                    html += '<div class="big-card">';
                    html += '<img src="' + (track.album.images[0] ? track.album.images[0].url : '') + '">';
                    html += '<section><h3>...una canción?</h3>';
                    html += '<h3>' + (track.name.length > 40 ? track.name.substring(0, 40) + '...' : track.name)+ '</h3>';
                    html += '<h4>';
                    html += (track.artists.map(artist => artist.name).join(', ').length > 30 ? 
                        track.artists.map(artist => artist.name).join(', ').substring(0, 30) + '...' : 
                        track.artists.map(artist => artist.name).join(', '));
                    html += '</h4></section></div></a>';
                    
                    $('#random-container').append(html);
    
                    // Agregar el evento clic a cada elemento de canción
                    $('.track-a').on('click', function(e) {
                        e.preventDefault();
                        var songName = $(this).data('name');
                        var artists = $(this).data('artists');
                        var previewUrl = $(this).data('preview');
                        var imageUrl = $(this).find('img').attr('src'); // Obtener la URL de la imagen de la canción clicada
                        
                        // Actualizar la información de la canción en el reproductor
                        $('#playing-song-info h3').text(songName);
                        $('#playing-song-info h4').text(artists);
                        playing_song_audio.src = previewUrl;
                        $('#img-current-song img').attr('src', imageUrl); // Actualizar la imagen de la canción en reproducción
                        playNewSong(); // Reproducir la canción automáticamente
                    });
                } else {
                    console.error('No se encontró ninguna canción.');
                }
            },
            error: function(err) {
                console.error('Error al obtener la canción aleatoria:', err);
            }
        });
    }

    // Devuele un género aleatorio
    function printRandomArtist(accessToken) {
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];
        $.ajax({
            url: 'https://api.spotify.com/v1/search?q=genre:' + randomGenre + '&type=artist&limit=50',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                const artists = data.artists.items;
                const randomArtist = artists[Math.floor(Math.random() * artists.length)];

                var html = '<a href="#" class="big-card-a" artist-id="' + randomArtist.id + '">';
                html += '<div class="big-card">';
                html += '<img src="' + randomArtist.images[0].url + '">';
                html += '<section><h3>...un artista?</h3><h3>' + randomArtist.name + '</h3>';
                html += '<h4>'+ randomArtist.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' seguidores</h4></section></div></a>';
            
                $('#random-container').append(html);
            },
            error: function(err) {
                console.error('Error al obtener el artista aleatorio 1:', err);
            }
        });
    }

    // Devuele un género aleatorio
    function printRandomPlaylist(accessToken) {
        $.ajax({
            url: 'https://api.spotify.com/v1/search?q=playlist&type=playlist&limit=50',
            type: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken
            },
            success: function(data) {
                var playlists = data.playlists.items;
                // Indice aleatorio 
                var randomIndex = Math.floor(Math.random() * playlists.length);
                // Playlist aleatoria
                var randomPlaylist = playlists[randomIndex]; 

                var html = '<a href="#" class="big-card-a" id="' + randomPlaylist.id + '" >';
                html += '<div class="big-card">';
                html += '<img src="' + randomPlaylist.images[0].url + '">';
                html += '<section><h3>...una playlist?</h3><h3>' + (randomPlaylist.name.length > 40 ? randomPlaylist.name.substring(0, 40) + '...' : randomPlaylist.name) + '</h3>';
                html += '<h4>'+ (randomPlaylist.owner.display_name.length > 30 ? randomPlaylist.owner.display_name.substring(0, 30) + '...' : randomPlaylist.owner.display_name) + '</h4></section></div></a>';

                $('#random-container').append(html);
            },
            error: function(err) {
                console.error('Error al obtener la playlist aleatoria 2:', err);
            }
        });
    }

    // Obtener el token de acceso y llamar a las funciones para imprimir los datos
    getAccessToken(function(accessToken) {
        printAlbums(accessToken);
        printPlaylists(accessToken);
        printTop50(accessToken);
        printViral50(accessToken);
        printRandomSong(accessToken);
        printRandomArtist(accessToken);
        printRandomPlaylist(accessToken);
    });
});



// -----------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", function() {
    const scrollContainers = document.querySelectorAll(".scroll-container");
    const landingContainer = document.querySelector("#home-real");

    scrollContainers.forEach(scrollContainer => {
        const scrollLeft = scrollContainer.querySelector(".scroll-left");
        const scrollRight = scrollContainer.querySelector(".scroll-right");
        const mainContentDiv = scrollContainer.querySelector("div");

        scrollLeft.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: -(landingContainer.clientWidth/2), // Ajusta la cantidad de desplazamiento según tus necesidades
                behavior: "smooth"
            });
        });

        scrollRight.addEventListener("click", function() {
            mainContentDiv.scrollBy({
                left: (landingContainer.clientWidth/2), // Ajusta la cantidad de desplazamiento según tus necesidades
                behavior: "smooth"
            });
        });
    });
});

function temporal(){
    const home = document.getElementById('home-real');
    home.style.display = 'none';

    const album = document.getElementById('album-display');
    album.style.display = 'block';

}



// -----------------------------------------------------------------------------------------------------------------------------------------

function obtenerSaludo() {
    var hora = new Date().getHours();
    var saludo;

    if (hora >= 7 && hora < 14) {
        saludo = "¡Buenos días!";
    } else if (hora >= 14 && hora < 20) {
        saludo = "¡Buenas tardes!";
    } else {
        saludo = "¡Buenas noches!";
    }

    return saludo;
}

// Obtener el elemento donde mostrar el saludo
var mensajeSaludo = document.getElementById("greetings"); // Ajusta el ID según tu HTML
// Mostrar el saludo
mensajeSaludo.textContent = obtenerSaludo();
