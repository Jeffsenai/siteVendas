<?php
// cadastro.php
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <title>Cadastrar Produto</title>
  <style>
    /* Estilo Geral */
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f9fa;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }

    /* Caixa do formulário */
    .container {
      background: #fff;
      width: 400px;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }

    h1 {
      text-align: center;
      color: #333;
      font-size: 22px;
      margin-bottom: 20px;
    }

    label {
      font-weight: bold;
      display: block;
      margin: 10px 0 5px;
      font-size: 14px;
      color: #555;
    }

    input, select {
      width: 100%;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 14px;
      outline: none;
      transition: 0.3s;
    }

    input:focus, select:focus {
      border-color: #007bff;
    }

    /* Botão aprimorado */
    .botao {
      width: 100%;
      padding: 12px;
      background: linear-gradient(45deg, #007bff, #0056b3);
      color: white;
      font-size: 16px;
      font-weight: bold;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: 0.3s;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      margin-top: 15px;
    }

    .botao:hover {
      background: linear-gradient(45deg, #0056b3, #003d82);
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Cadastrar Produto</h1>
    <form action="processa_cadastro.php" method="POST" enctype="multipart/form-data">
      <label>Nome:</label>
      <input type="text" name="nome" required>

      <label>Descrição:</label>
      <input type="text" name="descricao">

      <label>Preço:</label>
      <input type="number" name="preco" step="0.01" required>

      <label>Categoria:</label>
      <select name="categoria" required>
        <option value="veraofeminino">Verão Feminino</option>
        <option value="invernofeminino">Inverno Feminino</option>
        <option value="veraomasculino">Verão Masculino</option>
        <option value="invernomasculino">Inverno Masculino</option>
      </select>

      <label>Imagem:</label>
      <input type="file" name="imagem">

      <button type="submit" class="botao">Salvar Produto</button>
    </form>
  </div>
</body>
</html>
