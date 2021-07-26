function salvar() {
    var nome = document.getElementById('nome')
    var email = document.getElementById('email')

    let xhr = new XMLHttpRequest()
    let url = "salvar.php"

    xhr.open('POST', url, false)

    xhr.setRequestHeader('Content-Type', 'application/json')

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            alert(this.response)
        }
    }

    var dados = JSON.stringify({"nome": nome.value, "email": email.value })

    xhr.send(dados)
}

function pesquisar() {

}

function carregar() {
    let request = new XMLHttpRequest()
    let url = "pesquisar.php"
    
    request.open('GET', url)

    request.respondeType = 'json'
    request.send()

    request.onload = function () {
        var info = request.response;
        trazer_lista (info)
    }

}

function trazer_lista(jsonLista) {
    var inform = jsonLista['']
 for (var i = 0; i < inform.length; i++) {
     var tr = document.createElement('tr')
     var td1 = document.createElement('td')
     var td2 = document.createElement('td')
     var td3 = document.createElement('td')
     definir class]
     definir class]
     definir class]

     trazer td1
     trazer td2
     trazer td3


 }

}
function exc() {

}

function editar() {

}