<?php

include("conexao.php");
header('Content-Type: application/json');
$sql = " SELECT * FROM contatos where nome like '%%' or email LIKE '%%' ORDER BY nome, email";

$result = $conexao->query($sql);

$contatos = ['contatos' => []];
if ($result->num_rows > 0) {
    while ($linha = $result->fetch_array()) {
        $contatos['contatos'][] = $linha;
    }

    echo json_encode($contatos);
}