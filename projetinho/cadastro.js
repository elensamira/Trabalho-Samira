//criar fora do evento um vetor - variavel composta - ela recebe mais de um valor
//let db = [];


document.querySelector('#cadastro').addEventListener('click', (w)=>{
    w.preventDefault();
    let email = document.querySelector('#login').value;
    let senha = document.querySelector('#senha').value;

    if(login === '' || senha === ''){
        alert("preencher os campos")
    }else if(login != '' || senha != ''){
        location.href = 'index.html';
        salvar(email, senha);
    }
    

});

function salvar(e, s){
    //verificar se tem dados no lovalstorege,se nao cria um vetor vazio

    let db = JSON.parse(localStorage.getItem('usuarios') || '[]');
    //cria um objeto

    let usuario = {
        id: db.length + 1,
        login: e,
        senha: s

    }

    //jogo o objeto usuario dentro do vetor
    db.push(usuario);

    //salvo no localstorage agora um vetor que pode receber varios objetos
    localStorage.setItem('usuarios', JSON.stringify(db));
    location.href = 'index.html';
}