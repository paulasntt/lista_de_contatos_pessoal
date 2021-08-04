function editar(id) {
    var idCont = id

    let xhr = new XMLHttpRequest();
    let url = "contatos.php?idCont=" + idCont;

    xhr.open('GET', url);

    xhr.responseType = 'json';

    xhr.send();

    xhr.onload = function () {
        let resp = xhr.response;
        if (resp['contatos'].length == 0) {
            alert('O contato não foi encontrado. Tente novamente.');
            carregar()
            return false;
        }
        location = ('editar.php?id=' + id);
        return false;
    }
}

function salvarModf(idContato) {
    var novo_nome = document.getElementById('novo_nome').value;
    var novo_email = document.getElementById('novo_email').value;

    let xhr = new XMLHttpRequest();
    let url = "salvar_edicao.php";

    xhr.open('PUT', url);

    xhr.setRequestHeader('Content-Type', 'application/json');

    var dados = JSON.stringify({ "nome": novo_nome, "email": novo_email, "id": idContato });

    xhr.send(dados);

    xhr.onload = function () {
        resp = xhr.response;
        alert(resp);
        window.location = 'lista_pessoal.html';
    }
}