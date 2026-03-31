document.addEventListener("DOMContentLoaded", function () {

const listaProdutos = document.getElementById("lista-produtos");
const btnAdd = document.getElementById("addProduto");
const form = document.getElementById("formPedido");


// ADICIONAR NOVO PRODUTO
btnAdd.addEventListener("click", function () {

const div = document.createElement("div");

div.classList.add("produto-item");

div.innerHTML = `
<input type="text" class="produto" placeholder="Produto ou Serviço" required>
<input type="number" class="quantidade" placeholder="Quantidade" required>
<button type="button" class="remover">X</button>
`;

listaProdutos.appendChild(div);


// remover produto
div.querySelector(".remover").addEventListener("click", function () {
div.remove();
});

});


// ENVIAR FORMULÁRIO
form.addEventListener("submit", function (e) {

e.preventDefault();

const nome = document.getElementById("nome").value;
const contacto = document.getElementById("contacto").value;

const produtos = document.querySelectorAll(".produto-item");

let mensagem = `Pedido de Cotação - NYN Serviços\n\n`;
mensagem += `Nome: ${nome}\n`;
mensagem += `Contacto: ${contacto}\n\n`;
mensagem += `Produtos:\n`;

let listaEmail = "";

produtos.forEach((item, i) => {

const produto = item.querySelector(".produto").value;
const quantidade = item.querySelector(".quantidade").value;

mensagem += `${i+1}. ${produto} - Quantidade: ${quantidade}\n`;

listaEmail += `${i+1}. ${produto} - Quantidade: ${quantidade}\n`;

});


// ---------------------
// ENVIAR PARA WHATSAPP
// ---------------------

const telefone = "258847043363"; // coloque seu número

const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

window.open(url, "_blank");


// ---------------------
// ENVIAR PARA EMAIL
// ---------------------

const dados = {
nome: nome,
contacto: contacto,
produtos: listaEmail
};

emailjs.send("service_7pn637f","template_2cob7ee",dados)

.then(function () {

console.log("Email enviado com sucesso");

})

.catch(function (error) {

console.log("Erro ao enviar email", error);

});

});

});