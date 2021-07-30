<?php

header("Content-Type: application/json");
$dados = json_decode(file_get_contents("php://input"));

include('conexao.php');
$id = $dados->idcont;

$sql = "DELETE from contatos where id= '$id'";
if ($conexao->query($sql)) {
    echo ('O contato foi excluído com sucesso.');
} else {
    echo ('Não foi possível excluir o seu contato.');
}

?>