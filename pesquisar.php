<?php
include('conexao.php');

header('Content-Type: application/json');

$dados =  $_GET['pesquisar'];

$sql = "SELECT * from contatos where nome like '%$dados%' or email like '%$dados%' order by nome, email asc;";
$resultado = ($conexao->query($sql)) or die($conexao->error);

$contatos = ['contatos'=> []];
if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_array()) {
        $contatos['contatos'][] = $linha;
    }
}
echo json_encode($contatos);
?>