<?php
include('conexao.php');
$id = $_GET['id'];
$sql = "SELECT * from contatos where id='$id'";
$resultado = $conexao->query($sql) or die($conexao->error);
$dados = $resultado->fetch_array();
?>

<DOCTYPE html>
    <html lang="pt-br">

    <head>
        <title>Editar Contato</title>
        <meta charset="UTF-8">
        <meta name="author" content="Paula">
        <meta name="keywords" content="Lista, Contatos, Lista de Contatos">
        <meta name="description" content="Lista de contatos prática com nome e email.">
        <link rel="stylesheet" href="edit.css">
    </head>

    <body>
        <div id="caixa">
            <div class="edit">
                <form action="salvar_edicao.php?id=<?php echo $id ?>" method="POST">
                    <h1>Editar Contato</h1>
                    <label for="novo_nome" id="label_nome"><b>Nome</b></label><br>
                    <input type="text" name="novo_nome" id="novo_nome" value="<?php echo $dados['nome']; ?>"><br>
                    <label for="novo_email" id="label_email"><b>Email</b></label><br>
                    <input type="email" name="novo_email" id="novo_email" value="<?php echo $dados['email']; ?>"><br>
                    <button id="salvar">Salvar</button>
                </form>
                <a href="lista_pessoal.php"><button id="botao_voltar">Voltar</button></a>
            </div>

        </div>

    </body>

    </html>