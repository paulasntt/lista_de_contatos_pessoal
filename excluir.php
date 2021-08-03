<?php

header("Content-Type: application/json");
$dados = json_decode(file_get_contents("php://input"));

include('conexao.php');
$id = $dados->idcont;

$sql = "DELETE from contatos where id= '$id'";
if ($conexao->query($sql) and $conexao->affected_rows > 0) {
    http_response_code(200);
    echo ('O contato foi excluído com sucesso.');
    return false;
} else {
    http_response_code(400);
    echo ('Esse contato pode ter sido excluído em outra página.');
    return false;
}

?>