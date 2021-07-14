<?php 
include('conexao.php');
$nome = $_POST["nome"];
$email = $_POST["email"];

if ((empty($nome)) or (empty($email))) {
    die("<script>
alert('Não foi possível salvar o seu contato pois ele está vazio. Volte e insira os dados novamente.');
location='lista_pessoal.php'; </script>");
}

$sql = "INSERT INTO contatos (nome, email)
VALUES ('$nome', '$email')";
if ($conexao -> query($sql)) {
    die("<script>
    alert('O contato foi salvo com sucesso.');
    location='lista_pessoal.php'; </script>");
}
die("<script>
alert('Não foi possível salvar o seu contato.');
location='lista_pessoal.php'; </script>");

?> 