<?php
session_start();

$hostname = '158.179.215.247';
$port = '3306';
$username = 'myuser';
$password = 'myuser';
$database = 'ReproductorTFC';

$idUsuario = $_SESSION['idUsuario'];

$conn = new mysqli($hostname, $username, $password, $database, $port);
if ($conn->connect_error) {
    die(json_encode(['error' => 'Conexión fallida: ' . $conn->connect_error]));
}

$idUsuario = $conn->real_escape_string($idUsuario);

$sql = "SELECT id_playlist, nombre_playlist, foto_playlist, editable, link_playlist FROM usuario_playlists WHERE id_usuario = '$idUsuario'";
$result = $conn->query($sql);

$playlists = [];
if ($result && $result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $row['foto_playlist'] = $row['foto_playlist'] ? 'data:image/png;base64,' . base64_encode($row['foto_playlist']) : null;
        $playlists[] = $row;
    }
}

$conn->close();

echo json_encode($playlists);
?>
