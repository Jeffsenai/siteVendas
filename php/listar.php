<?php
// listar.php
require_once 'conexao.php';

// Recupera a categoria via GET; se não for informada, usa uma padrão (ex: veraofeminino)
$categoria = isset($_GET['categoria']) ? $_GET['categoria'] : 'veraofeminino';

try {
    $sql = "SELECT * FROM $categoria ORDER BY id DESC";
    $stmt = $pdo->query($sql);
    $produtos = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    echo "Erro ao buscar produtos: " . $e->getMessage();
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Lista de Produtos - <?php echo ucfirst($categoria); ?></title>
  <link rel="stylesheet" href="../siteVendas/style.css">
</head>
<body>
  <h1>Produtos: <?php echo ucfirst($categoria); ?></h1>
  <nav>
    <a href="?categoria=veraofeminino">Verão Feminino</a> |
    <a href="?categoria=invernofeminino">Inverno Feminino</a> |
    <a href="?categoria=veraomasculino">Verão Masculino</a> |
    <a href="?categoria=invernomasculino">Inverno Masculino</a>
  </nav>
  <hr>
  <div class="products-container">
    <?php if ($produtos): ?>
      <?php foreach ($produtos as $p): ?>
        <div class="product-card">
          <img src="<?php echo $p['imagem']; ?>" alt="<?php echo $p['nome']; ?>" width="150">
          <h3><?php echo $p['nome']; ?></h3>
          <p><?php echo $p['descricao']; ?></p>
          <span>R$ <?php echo number_format($p['preco'], 2, ',', '.'); ?></span>
        </div>
      <?php endforeach; ?>
    <?php else: ?>
      <p>Nenhum produto encontrado.</p>
    <?php endif; ?>
  </div>
</body>
</html>
