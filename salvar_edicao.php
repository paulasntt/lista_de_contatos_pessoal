<?php

header("Content-Type: application/json");
$dados = json_decode(file_get_contents("php://input"));

include('conexao.php');
$id = $dados->id;
$nome = $dados->nome;
$email = $dados->email;
if ((empty($nome)) or (empty($email))) {
    echo ('O contato não pode ser salvo pois está vazio. Altere-o novamente.');
}
$sql = "UPDATE contatos set nome = '$nome', email = '$email' where id= '$id';";

if ($conexao->query($sql)) {
    echo('O contato foi alterado com sucesso.');
}
die($conexao->error);
?>