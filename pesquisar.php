<?php
include('conexao.php');
$pesquisa = isset($_GET['pesquisa']) ? $_GET['pesquisa'] : '';
$sql = "SELECT * from contatos where nome like '%$pesquisa%' or email like '%$pesquisa%' order by nome, email asc;";
$resultado = ($conexao->query($sql)) or die($conexao->error);

?>