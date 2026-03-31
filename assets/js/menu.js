// menu.js

// Função para inicializar o menu após carregar o header
function initMenu() {
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav ul");

    if (!menuToggle || !nav) return; // garante que existe

    // Toggle do menu
    menuToggle.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuToggle.classList.toggle("open"); // opcional, para animação do botão
    });

    // Fecha o menu ao clicar em um link (opcional)
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("active");
            menuToggle.classList.remove("open");
        });
    });
}

// Carrega o header via fetch e depois inicializa o menu
fetch('../components/header.html')
    .then(res => res.text())
    .then(data => {
        document.getElementById('header').innerHTML = data;
        initMenu(); // inicializa aqui
    });

// Carrega o footer normalmente
fetch('../components/footer.html')
    .then(res => res.text())
    .then(data => document.getElementById('footer').innerHTML = data);