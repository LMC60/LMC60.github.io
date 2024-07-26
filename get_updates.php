<?php
session_start();

$gameBoardId = $_SESSION['game_board_id'] ?? '';

if (isset($_SESSION['game_board_state']) && $gameBoardId) {
    $gameBoardState = $_SESSION['game_board_state'];
    echo json_encode([
        'game_board_id' => $gameBoardId,
        'state' => $gameBoardState
    ]);
} else {
    echo json_encode([]);
}
?>
