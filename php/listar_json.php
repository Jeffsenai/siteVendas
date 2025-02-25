<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");




header('Content-Type: application/json; charset=utf-8');
require_once 'conexao.php';

// Recupera a categoria via GET, se não vier nada, usa 'veraofeminino'
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'veraofeminino';

try {
    $sql = "SELECT * FROM $categoria ORDER BY id DESC";
    $stmt = $pdo->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Retorna o array de produtos em JSON
    echo json_encode($produtos);
} catch (PDOException $e) {
    echo json_encode(['erro' => $e->getMessage()]);
    http_response_code(500); // Se nn executar certo, mostra erro
    exit;
}
?>
