const form = document.querySelector('#infos-prod');
const tabela = document.querySelector('#tbody');
let idx = form.idx.value;

let UsuarioId = Number(sessionStorage.getItem('logado'));
const session = localStorage.getItem("session");
logadoOuNAO();
function logadoOuNAO (){
    if(session){
        sessionStorage.setItem("log", session);
        UsuarioId = session;
    }
    if(!UsuarioId){
        window.location.href = "index.html"
        return;
    }
}

console.log(UsuarioId);

const atualizarLocalStorage = (produto) => {localStorage.setItem('produtos', JSON.stringify(produto))}


const recuperarLocalStorage = () => JSON.parse(localStorage.getItem('produtos') || '[]');


const salvarProduto = (e) => {
e.preventDefault();

const nome = form.nome.value;
const preco = Number(form.preco.value);
const prime = form.prime.checked;

    if(idx == 'novo'){
        const produtos = recuperarLocalStorage();
        produtos.push({id: produtos.length + 1, nome, preco, prime});
        atualizarLocalStorage(produtos);
        preencherTabela();
        form.reset();

    }else{
        let produto = {id: idx, nome, preco, prime}
        atualizarProduto(idx, produto);
        preencherTabela();
        form.reset();
        idx = 'novo';

    }

}

const preencherTabela = () =>{
    const produtos = recuperarLocalStorage();
    tabela.innerHTML = '';
    for(const produto of produtos){
        tabela.innerHTML += ` 
        <tr>
        <th scope="row">${produto.id}</th>
        <td>${produto.nome}</td>
        <td>${produto.preco}</td>
        <td>${produto.prime ? "sim" : "não"}</td>
        <td>

            <img type="button" width="40" src="lixeira.png" onclick="removerProduto(${produto.id})"/>

            <img type="button" width="40" src="editar.png" onclick="editarProduto(${produto.id})"/>
        </td>

         </tr>
        `;
    }
}

    const removerProduto =(id) =>{
        const produtos = recuperarLocalStorage();
        const indexProduto = produtos.findIndex(produtos => produtos.id === id);
        if(indexProduto < 0 ) return;
        produtos.splice(indexProduto, 1);
        atualizarLocalStorage(produtos);
        alert('produto removido');
        preencherTabela();
    }
    const editarProduto =(id) =>{
         const produtos = recuperarLocalStorage();
         const indexProduto = produtos.findIndex(produtos=> produtos.id === id);
         form.nome.value = produtos[indexProduto].nome;
         form.preco.value = produtos[indexProduto].preco;
         form.prime.checked = produtos[indexProduto].prime;
         idx = id;

    }

    const atualizarProduto = (id, produto) =>{
        const produtos = recuperarLocalStorage();
        const indexProduto = produtos.findIndex(produto => produto.id === id);
        produtos[indexProduto] = produto;
        atualizarLocalStorage(produtos);
    }

    form.addEventListener('submit', salvarProduto);
    document.addEventListener('DOMContentLoaded', preencherTabela);

    document.querySelector('#sair').addEventListener('click', function(){
        saindo()
    });

    function saindo(){
        sessionStorage.removeItem("logado");
        localStorage.removeItem("session");
        window.location.href = "index.html";
    }
