document.querySelector('#logar').addEventListener('click', (e)=>{
    e.preventDefault();
    entrar();
})

function entrar(){
    let usuario = document.querySelector('#login');
    let senha = document.querySelector('#senha');

    let listaUsuario = [];

     let usuarioValido = {
         login: '',
         senha: ''

     }
     listaUsuario = JSON.parse(localStorage.getItem('usuarios'));
     listaUsuario.forEach(elemento =>{
         if(usuario.value === elemento.login && senha.value === elemento.senha){
         usuarioValido = {
             id: elemento.id,
             login: elemento.login,
             senha: elemento.senha

         }

       }
         
     });


     if(usuario.value === usuarioValido.login && senha.value === usuarioValido.senha){
         alert('deu certo!')
         saveSession(usuarioValido.id);
         window.location.href = 'trabalho.html';

     }else{
         alert('deu errado')

     }
}

function saveSession(data){
    if(saveSession){
        localStorage.setItem("session", data);
    }
    sessionStorage.setItem("logado", JSON.stringify(data));
    
}

