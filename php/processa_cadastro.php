<?php
require_once 'conexao.php';

if (isset($_POST['nome'], $_POST['preco'], $_POST['categoria'])) 
    $nome      = $_POST['nome'];
    $descricao = $_POST['descricao'] ?? '';
    $preco     = $_POST['preco'];
    $categoria = $_POST['categoria']; // capta a categoria selecionada no cadastro
    
    // utiliza a imagem que foi enviada no input
    $imagemCaminho = null;
    if (!empty($_FILES['imagem']['name'])) {
        $arquivoTmp   = $_FILES['imagem']['tmp_name'];
        $nomeOriginal = $_FILES['imagem']['name'];
$imagemCaminho = null;
if (!empty($_FILES['imagem']['name'])) {
    $arquivoTmp   = $_FILES['imagem']['tmp_name'];
    $nomeOriginal = $_FILES['imagem']['name'];
    
    // Cria um nome para a ft
    $nomeArquivo = uniqid() . "_" . $nomeOriginal;
    
    // versão local
    $caminhoUpload = "../uploads/" . $nomeArquivo;
    
    // mudar essa url quando tornar público
    $urlUpload = "http://localhost/pijamas/uploads/" . $nomeArquivo;
    
    if (move_uploaded_file($arquivoTmp, $caminhoUpload)) {
        $imagemCaminho = $urlUpload;
    }
}


    try {
        // Insere no banco de dados
        $sql = "INSERT INTO $categoria (nome, descricao, preco, imagem)
                VALUES (:nome, :descricao, :preco, :imagem)";
        $stmt = $pdo->prepare($sql);
        $stmt->bindValue(':nome', $nome);
        $stmt->bindValue(':descricao', $descricao);
        $stmt->bindValue(':preco', $preco);
        $stmt->bindValue(':imagem', $imagemCaminho);

        $stmt->execute();

        echo "Produto cadastrado com sucesso! <a href='listar.php?categoria=$categoria'>Ver produtos</a>";
    } catch (PDOException $e) {
        echo "Erro ao inserir: " . $e->getMessage();
    }
} else {
    echo "Dados incompletos!";
}
?>
