window.onload = function(){

let cart = JSON.parse(localStorage.getItem("cart")) || [];

const addButtons = document.querySelectorAll(".add-to-cart");
const cartCount = document.getElementById("cart-count");
const cartPanel = document.getElementById("cart-panel");
const cartTableBody = document.querySelector("#cart-items tbody");
const totalGeral = document.getElementById("total-geral");
const openCart = document.getElementById("open-cart");
const closeCart = document.getElementById("close-cart");
const sendWhats = document.getElementById("send-whatsapp");

// abrir e fechar carrinho lateral
if(openCart) openCart.onclick = e=>{e.preventDefault(); cartPanel.classList.add("open");};
if(closeCart) closeCart.onclick = ()=>cartPanel.classList.remove("open");

// adicionar produto
addButtons.forEach(button => {
    button.addEventListener("click", function(){
        const name = this.dataset.name;
        const price = parseFloat(this.dataset.price);

        const index = cart.findIndex(p => p.name===name);
        if(index>-1){
            cart[index].quantity +=1;
        }else{
            cart.push({name:name, price:price, quantity:1});
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCart();
    });
});

// atualizar carrinho
function updateCart(){
    if(!cartTableBody) return;

    cartTableBody.innerHTML = "";
    let total =0;

    cart.forEach((item,index)=>{
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const tr = document.createElement("tr");

        tr.innerHTML = `
        <td>${item.name}</td>
        <td>${item.price} MT</td>
        <td>
            <button onclick="changeQty(${index},-1)">-</button>
            ${item.quantity}
            <button onclick="changeQty(${index},1)">+</button>
        </td>
        <td>${subtotal} MT</td>
        <td><button onclick="removeItem(${index})">X</button></td>
        `;
        cartTableBody.appendChild(tr);
    });

    if(totalGeral) totalGeral.textContent = total;
    if(cartCount) cartCount.textContent = cart.length;

    // mostrar painel apenas se houver produtos
    if(cart.length>0){
        cartPanel.style.display="block";
    }else{
        cartPanel.style.display="none";
    }
}

// remover produto
window.removeItem = function(index){
    cart.splice(index,1);
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCart();
}

// alterar quantidade
window.changeQty = function(index,change){
    cart[index].quantity += change;
    if(cart[index].quantity <= 0){
        cart.splice(index,1);
    }
    localStorage.setItem("cart",JSON.stringify(cart));
    updateCart();
}

// enviar pedido pelo WhatsApp
if(sendWhats){
    sendWhats.onclick = ()=>{
        if(cart.length===0){alert("Adicione produtos antes de enviar!"); return;}
        let message = "Pedido NYN Serviços:%0A";
        cart.forEach((p,i)=>{
            message += `${i+1}. ${p.name} - ${p.quantity}x (${p.price} MT)%0A`;
        });
        const total = cart.reduce((acc,p)=>acc+p.price*p.quantity,0);
        message += `Total: ${total} MT`;
        const phone = "25847043363"; // seu número aqui
        window.open(`https://wa.me/${phone}?text=${message}`,'_blank');
    }
}

updateCart();
}