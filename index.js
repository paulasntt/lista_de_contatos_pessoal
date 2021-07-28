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
}

function pesquisar() {

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



    // Gerador da tabela
    function trazer_lista(jsonResponse) {
        var tabela = document.getElementById('tabela');
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
                    tr.appendChild(td);
                    td.appendChild(butExc);
                    td.appendChild(butEditar);
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
}



