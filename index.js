window.onload = function () {
    carregar();
    var butPesq = document.getElementById('botao_pesquisa');
    butPesq.onclick = function () {
        return pesquisar();
    }
    var butSalvar = document.getElementById('salvar_contato');
    butSalvar.onclick = function () {
        return salvar();
    }
}

function validMail() {
    var inpMail = document.getElementById('email').value;

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


function salvar() {
    var inpNome = document.getElementById('nome').value;
    var inpMail = document.getElementById('email').value;
    emailvali = validMail(inpMail.value);
    if (inpNome.length == 0 && inpMail.length == 0) {
        alert('Os campos estão vazios. Tente novamente.');
        nome.style.border = 'red 2px solid';
        nome.style.outline = 'none';
        nome.focus()
        email.style.border = 'red 2px solid';
        email.style.outline = 'none';
        return false;
    }
    if (inpNome.length == 0 || inpNome == " ") {
        alert('Não foi possível salvar o seu contato pois o campo do nome está vazio. Tente novamente.');
        nome.style.border = 'red 2px solid';
        nome.style.outline = 'none';
        nome.focus();
        return false;
    }
    if (inpMail.length == 0 || inpMail == " ") {
        alert('Não foi possível salvar o seu contato pois o campo do email está vazio. Tente novamente.');
        email.style.border = 'red 2px solid';
        email.style.outline = 'none';
        email.focus();
        return false;
    }
    if (!emailvali) {
        alert('O email digitado é inválido.');
        email.style.border = 'red 2px solid';
        email.style.outline = 'none';
        email.focus();
        return false;
    }

    let xhr = new XMLHttpRequest();
    let url = "salvar.php";

    xhr.open('POST', url);

    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(this.responseText);
        }
    }

    var dados = JSON.stringify({ "nome": nome.value, "email": email.value });

    xhr.send(dados);

    xhr.onload = function () {
        resp = xhr.response;
        alert(resp);
        carregar();
        nome.value = '';
        email.value = '';
    }
    nome.style.border = '2px solid black';
    email.style.border = '2px solid black';
    return false;
}

function pesquisar() {

    var pesq = document.getElementById('pesquisa_');

    let xhr = new XMLHttpRequest();
    let url = "contatos.php?pesquisa=" + pesq.value;

    xhr.open('GET', url);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = "json";

    xhr.send();

    xhr.onload = function () {
        var pesqFilt = xhr.response;
        trazer_lista(pesqFilt);
        return false;
    }
    return false;

}

function carregar() {
    let request = new XMLHttpRequest();
    let url = "contatos.php";

    request.open('GET', url);

    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var info = request.response;
        trazer_lista(info);
    }
}

function trazer_lista(jsonResponse) {
    if (jsonResponse['contatos'] == 0) {
        alert('Nenhum contato foi encontrado.');
        return false;
    }
    var tabela = document.getElementById('tabela');
    tabela.innerHTML = "";
    for (var i = 0; i < jsonResponse['contatos'].length; i++) {
        var tr = document.createElement('tr');
        tabela.appendChild(tr);
        for (j = 0; j <= 2; j++) {
            let content;
            if (j != 2) {
                if (j == 0) {
                    content = jsonResponse['contatos'][i].nome;
                } else {
                    content = jsonResponse['contatos'][i].email;
                }
                tr.appendChild(montTd(content, 'any'));
            } else {
                var butEditar = document.createElement('button');
                var butExc = document.createElement('button');
                var td = document.createElement('td');
                td.classList.add('tdb');
                butEditar.classList.add('editar');
                butExc.classList.add('excluir');
                butEditar.textContent = 'Editar';
                butExc.textContent = 'Excluir';
                butEditar.setAttribute('type', 'button');
                butExc.setAttribute('type', 'button');
                butEditar.setAttribute("onclick", `editar("${jsonResponse['contatos'][i].id}")`);
                butExc.setAttribute("onclick", `excluir("${jsonResponse['contatos'][i].nome}", "${jsonResponse['contatos'][i].email}",${jsonResponse['contatos'][i].id})`);
                tr.appendChild(td);
                td.appendChild(butEditar);
                td.appendChild(butExc);
            }

        }

        //Montador das td dentro dos tr
        function montTd(dados, classe) {
            var td = document.createElement('td');
            td.textContent = dados;
            td.classList.add(classe);
            return td;
        }
    }
}

function excluir(nome, email, id) {
    let confirma = window.confirm(`Você tem certeza que deseja excluir este contato? \nNome: ${nome} \nEmail: ${email}`);
    if (!confirma) {
        alert('Operação cancelada pelo usuário.')
    } else {
        exCont(id);
    }
}

function exCont(id) {
    let xhr = new XMLHttpRequest();
    let url = 'excluir.php';
    inform = { 'idcont': id }
    var idCont = JSON.stringify(inform)


    xhr.open('DELETE', url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(idCont);

    xhr.onload = function () {
        resp = xhr.response;
        alert(resp);
        carregar()
    }
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
        return false;
    }
}