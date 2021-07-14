<?php 
include('conexao.php');
$pesquisa = isset($_GET['pesquisa'])? $_GET['pesquisa']: '';
$sql = "SELECT * from contatos where nome like '%$pesquisa%' or email like '%$pesquisa%' order by nome, email asc;";
$resultado = $conexao -> query($sql) or die ($conexao -> error);

?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <title>Lista de Contatos</title>
    <meta charset="UTF-8">
    <meta name="author" content="Paula">
    <meta name="keywords" content="Lista, Contatos, Lista de Contatos">
    <meta name="description" content="Lista de contatos prática com nome e email.">
    <link rel="stylesheet" href="lista_pessoal.css">
</head>

<body>
    <div id="site">
        <header>
            <h1>Lista de Contatos</h1><br>
            <div id="pesquisar">
                <form action="lista_pessoal.php" method="GET">
                    <label for="pesquisa"></label>
                    <input type="text" name="pesquisa" id="pesquisa" placeholder="Digite o nome ou email">
                    <button type="submit" id="botao_pesquisa">Pesquisar</button>
                </form>
            </div>
        </header>
        <div id="quadro_adicionar">
            <form action="salvar.php" method="POST" class="adicionar">
            <h3>Adicionar um contato</h3>
            <label for="nome"><b>Nome</b></label><br>
            <input type="text" name="nome" id="nome" placeholder="Digite o nome"><br>
            <label for="email"><b>Email</b></label><br>
            <input type="email" name="email" id="email" placeholder="Digite o email"><br>
            <button type="submit" id="salvar_contato">Salvar Contato</button><br>
            </form>
        </div>
        <div id="quadro_contatos">
            <table>
                <thead>
                    <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Email</th>
                        <th scope="col">Opções</th>
                    </tr>
                </thead>
                <tbody>
                <?php while ($dados = $resultado -> fetch_array()){ ?>
                    <tr>
                    <td><?php echo $dados['nome']; ?></td>
                    <td><?php echo $dados['email']; ?></td>
                    <td>
                        <div id="funcoes">
                        <a href="editar.php?id=<?php echo $dados['id']; ?>"> <button class="botao_editar">Editar</button></a>
                        <a href="excluir.php?id=<?php echo $dados['id']; ?>"> <button class="botao_excluir">Excluir</button></a></td>
                        </div>
                    </tr>
                    <?php }?>
                </tbody>
            </table>
        </div>
        <footer>
            <p>Teste - Site de Lista de Contatos realizado por Paula.</p>
        </footer>
    </div>
    
</body>


</html>