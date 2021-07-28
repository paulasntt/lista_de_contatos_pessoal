<?php
$conexao = new mysqli('localhost:3306', 'root', '', 'cadastro');
if ($conexao->connect_error){
    die("<script>
    alert('Conexão falhou');
    location='lista_pessoal.html'; </script>");
}
?>