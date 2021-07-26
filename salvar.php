<?php

header("Content-Type: application/json");
$dados = json_decode(file_get_contents("php://input"));

include('conexao.php');
$nome = $dados->nome;
$email = $dados->email;

if ((empty($nome)) or (empty($email))) {
    die('Não foi possível salvar o seu contato pois ele está vazio. Volte e insira os dados novamente.');
}

$sql = "INSERT INTO contatos (nome, email)
VALUES ('$nome', '$email')";
if ($conexao -> query($sql)) {
    die('O contato foi salvo com sucesso.');
}
die('Não foi possível salvar o seu contato. Verifique se o email já está cadastrado e tente novamente.');

?> 