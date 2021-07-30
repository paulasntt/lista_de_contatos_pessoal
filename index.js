window.onload = function () {
    carregar();
    var butPesq = document.getElementById('botao_pesquisa');
    butPesq.setAttribute('onclick', 'return pesquisar()');

    var butSalvar = document.getElementById('salvar_contato');
    butSalvar.setAttribute('onclick', 'return salvar()');


}
function salvar() {

    var nome = document.getElementById('nome');
    var email = document.getElementById('email');

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

    xhr.onload = function (){
        resp = xhr.response;
        alert(resp);
        carregar();
        nome.value = '';
        email.value = '';
        return false;
    }
    return false;
}

function pesquisar() {

    var pesq = document.getElementById('pesquisa_');

    let xhr = new XMLHttpRequest();
    let url = "pesquisar.php?pesquisar="+pesq.value;

    xhr.open('GET', url);

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.responseType = "json";

    xhr.send();

    xhr.onload = function () {
        var pesqFilt = xhr.response;
        trazer_lista(pesqFilt);
        pesq.value = '';
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

function excluir (nome, email, id) {
    let confirma = window.confirm('Você tem certeza que deseja excluir este contato?');
    if (!confirma) {
        alert('Operação cancelada pelo usuário.')
    } else {
        exCont(id);
    }

    function exCont(id) {
        let xhr = new XMLHttpRequest();
        let url = 'excluir.php';
        inform = {'idcont': id}
        var idCont = JSON.stringify(inform)


        xhr.open('DELETE', url);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(idCont);

        xhr.onload = function (){
            resp = xhr.response;
            alert(resp);
            carregar()
        }

    }   
}

function editar(id) {
    location = ('editar.php?id='+ id);
}

function salvarModf (idContato){
    var novo_nome = document.getElementById('novo_nome').value;
    var novo_email = document.getElementById('novo_email').value;

    let xhr = new XMLHttpRequest();
    let url = "salvar_edicao.php";

    xhr.open('PUT', url);

    xhr.setRequestHeader('Content-Type', 'application/json');
    
    var dados = JSON.stringify({ "nome": novo_nome, "email": novo_email, "id": idContato });

    xhr.send(dados);

    xhr.onload = function (){
        resp = xhr.response;
        alert(resp);
        window.location = 'lista_pessoal.html';
    }
}