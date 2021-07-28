<?php
include('conexao.php');
$id = $_GET["id"];

$sql = "DELETE from contatos where id= '$id'";
if ($conexao->query($sql)) {
    die("<script>
        alert('O contato foi excluído com sucesso.');
        location='lista_pessoal.html'; </script>");
        
}
die("<script>
alert('Não foi possível excluir o seu contato.');
location='lista_pessoal.html'; </script>");
?>