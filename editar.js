function validMail() {
    var inpMail = document.getElementById('novo_email').value;

    var posArroba = inpMail.lastIndexOf('@');
    var tamEmail = inpMail.length;
    var emailusu = inpMail.substring(0, posArroba);
    var tamUsu = emailusu.length >= 1;
    var domin = inpMail.substring(posArroba, tamEmail);
    var nomeDomin = domin.substring(0, domin.indexOf('.'));
    var tamDomin = nomeDomin.length >= 3;
    var pontoDomin = domin.indexOf('.') >= 1;
    var pontoFinal = domin.lastIndexOf('.') < domin.length -1;
    var semEsp = inpMail.indexOf(' ') == -1;
    var possuiArroba = posArroba != -1 && emailusu.indexOf('@') == -1;

    var emailvalido = (tamUsu && tamDomin && pontoDomin && pontoFinal && semEsp && possuiArroba);

    if (emailvalido) {
        return true;
    }
    return false;
}

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
    }
    return false;
}

function salvarModf(idContato) {
    emailvalid = validMail()
    if (!emailvalid) {
        alert('Email inválido.');
        return false;
    }
    var novo_nome = document.getElementById('novo_nome').value;
    var novo_email = document.getElementById('novo_email').value;
    if (novo_nome.length == 0 || novo_nome == " ") {
        alert('Não foi possível salvar o seu contato pois o campo do nome está vazio. Tente novamente.')
        return false;
    }

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