<?php
include("conexao.php");

$pesquisa = isset($_GET['pesquisa']) ? $_GET['pesquisa'] : "";
$id = isset($_GET['idCont']) ? $_GET['idCont'] : false;

$sql = " SELECT * FROM contatos";

if ($id) {
    $sql .= " WHERE id = '$id'";
} else {
    $sql .= " WHERE nome like '%$pesquisa%' or email LIKE '%$pesquisa%'";
}
$sql .= " ORDER BY nome, email";

$result = $conexao->query($sql);

$contatos = ["contatos" => []];
$retornouLinhas = $result->num_rows > 0;
if ($retornouLinhas) {
    while ($linha = $result->fetch_array()) {
        $contatos["contatos"][] = $linha;
    }
    
}
echo json_encode($contatos);