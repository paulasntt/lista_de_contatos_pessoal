<?php
include('conexao.php');
$id = $_GET['id'];
$nome = $_POST['novo_nome'];
$email = $_POST['novo_email'];
if ((empty($nome)) or (empty($email))) {
    die("<script>
    alert('O contato não pode ser salvo pois está vazio. Altere-o novamente.');
    location='lista_pessoal.html'; </script>");

}
$sql = "UPDATE contatos set nome = '$nome', email = '$email' where id= '$id';";

if ($conexao->query($sql)) {
    die("<script>
    alert('O contato foi alterado com sucesso.');
    location='lista_pessoal.html'; </script>");
}
die($conexao->error);
?>
