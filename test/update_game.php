<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true);

if ($data) {
    $gameBoardId = $_SESSION['game_board_id'] ?? '';

    if ($data['game_board_id'] === $gameBoardId) {
        $_SESSION['game_board_state'][$data['character']] = $data['flipped'];
    }
}
?>
