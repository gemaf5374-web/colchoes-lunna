// ===== PRODUTOS =====
const produtos = [
    {
        nome: "Colchão Molas Ensacadas Premium",
        marca: "Lunna Sleep",
        precoOld: 2499.00,
        precoNow: 1499.00,
        parcelas: "12x de R$ 124,92",
        badge: "-40%",
        icone: "fa-bed",
        rating: 5,
        reviews: 234
    },
    {
        nome: "Colchão Ortopédico D45",
        marca: "Lunna Orto",
        precoOld: 1899.00,
        precoNow: 1099.00,
        parcelas: "12x de R$ 91,58",
        badge: "-42%",
        icone: "fa-heartbeat",
        rating: 4.5,
        reviews: 189
    },
    {
        nome: "Conjunto Box Baú + Colchão",
        marca: "Lunna Confort",
        precoOld: 3299.00,
        precoNow: 1899.00,
        parcelas: "12x de R$ 158,25",
        badge: "-45%",
        icone: "fa-layer-group",
        rating: 5,
        reviews: 312
    },
    {
        nome: "Colchão Espuma D33 Casal",
        marca: "Lunna Basic",
        precoOld: 999.00,
        precoNow: 599.00,
        parcelas: "10x de R$ 59,90",
        badge: "-40%",
        icone: "fa-spa",
        rating: 4.5,
        reviews: 156
    },
    {
        nome: "Travesseiro Nasal Viscoelástico",
        marca: "Lunna Comfort",
        precoOld: 199.00,
        precoNow: 119.00,
        parcelas: "6x de R$ 19,83",
        badge: "-40%",
        icone: "fa-star",
        rating: 5,
        reviews: 421
    },
    {
        nome: "Protetor de Colchão Impermeável",
        marca: "Lunna Protect",
        precoOld: 249.00,
        precoNow: 149.00,
        parcelas: "6x de R$ 24,83",
        badge: "-40%",
        icone: "fa-wind",
        rating: 4.5,
        reviews: 98
    },
    {
        nome: "Colchão Infantil Pikachu",
        marca: "Lunna Kids",
        precoOld: 799.00,
        precoNow: 499.00,
        parcelas: "10x de R$ 49,90",
        badge: "-38%",
        icone: "fa-child",
        rating: 5,
        reviews: 267
    },
    {
        nome: "Cabeceira Estofada Queen",
        marca: "Lunna Decor",
        precoOld: 899.00,
        precoNow: 549.00,
        parcelas: "10x de R$ 54,90",
        badge: "-39%",
        icone: "fa-gem",
        rating: 4.5,
        reviews: 145
    }
];

function gerarEstrelas(rating, reviews) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i - 0.5 === rating) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    return `<div class="produto-stars">${stars}<span>(${reviews})</span></div>`;
}

function formatarPreco(valor) {
    return valor.toFixed(2).replace('.', ',');
}

function renderizarProdutos() {
    const grid = document.getElementById('produtosGrid');
    if (!grid) return;

    grid.innerHTML = produtos.map(p => `
        <div class="produto-card">
            <div class="produto-img">
                <i class="fas ${p.icone}"></i>
                <span class="produto-badge">${p.badge}</span>
                <button class="produto-fav" title="Adicionar aos favoritos">
                    <i class="far fa-heart"></i>
                </button>
            </div>
            <div class="produto-info">
                <h3>${p.nome}</h3>
                <p class="marca">${p.marca}</p>
                ${gerarEstrelas(p.rating, p.reviews)}
                <div class="produto-preco">
                    <span class="old">R$ ${formatarPreco(p.precoOld)}</span>
                    <div class="now">R$ ${formatarPreco(p.precoNow)}</div>
                    <p class="parc">ou ${p.parcelas}</p>
                    <button class="btn-comprar" data-nome="${p.nome}">
                        <i class="fas fa-shopping-cart"></i> Comprar
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    // Evento de favoritos
    document.querySelectorAll('.produto-fav').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const icon = this.querySelector('i');
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                this.style.background = '#ff6b35';
                this.style.color = '#fff';
                mostrarToast('Adicionado aos favoritos! ❤️');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                this.style.background = '#fff';
                this.style.color = '#ff6b35';
                mostrarToast('Removido dos favoritos');
            }
        });
    });

    // Evento de comprar
    document.querySelectorAll('.btn-comprar').forEach(btn => {
        btn.addEventListener('click', function() {
            const nome = this.getAttribute('data-nome');
            const badge = document.querySelector('.cart .badge');
            let atual = parseInt(badge.textContent);
            badge.textContent = atual + 1;
            mostrarToast(`"${nome}" adicionado ao carrinho! 🛒`);
        });
    });
}

// ===== TOAST =====
function mostrarToast(msg) {
    const existing = document.querySelector('.toast-lunna');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-lunna';
    toast.textContent = msg;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%) translateY(20px);
        background: linear-gradient(135deg, #6a11cb, #2575fc);
        color: #fff;
        padding: 14px 28px;
        border-radius: 30px;
        font-weight: bold;
        font-size: 14px;
        box-shadow: 0 10px 30px rgba(106,17,203,.4);
        z-index: 9999;
        opacity: 0;
        transition: .3s;
        white-space: nowrap;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    }, 50);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ===== COUNTDOWN =====
function iniciarCountdown() {
    const fim = new Date();
    fim.setDate(fim.getDate() + 3);
    fim.setHours(23, 59, 59);

    function atualizar() {
        const agora = new Date();
        let diff = fim - agora;

        if (diff <= 0) {
            document.getElementById('dias').textContent = '00';
            document.getElementById('horas').textContent = '00';
            document.getElementById('min').textContent = '00';
            document.getElementById('seg').textContent = '00';
            return;
        }

        const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const min = Math.floor((diff / (1000 * 60)) % 60);
        const seg = Math.floor((diff / 1000) % 60);

        const d = document.getElementById('dias');
        const h = document.getElementById('horas');
        const m = document.getElementById('min');
        const s = document.getElementById('seg');

        if (d) d.textContent = String(dias).padStart(2, '0');
        if (h) h.textContent = String(horas).padStart(2, '0');
        if (m) m.textContent = String(min).padStart(2, '0');
        if (s) s.textContent = String(seg).padStart(2, '0');
    }

    atualizar();
    setInterval(atualizar, 1000);
}

// ===== NEWSLETTER =====
function initNewsletter() {
    const form = document.getElementById('newsForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const input = this.querySelector('input');
        const email = input.value.trim();

        if (email && email.includes('@')) {
            mostrarToast('Cadastro realizado! Confira seu e-mail 📧');
            input.value = '';
        } else {
            mostrarToast('Por favor, digite um e-mail válido!');
        }
    });
}

// ===== BACK TO TOP =====
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            btn.classList.add('show');
        } else {
            btn.classList.remove('show');
        }
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ===== BUSCA =====
function initBusca() {
    const input = document.querySelector('.search-bar input');
    const btn = document.querySelector('.search-bar button');
    if (!input || !btn) return;

    function buscar() {
        const termo = input.value.trim();
        if (termo) {
            mostrarToast(`Buscando por: "${termo}" 🔍`);
        }
    }

    btn.addEventListener('click', buscar);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') buscar();
    });
}

// ===== WHATSAPP =====
function initWhatsApp() {
    const btn = document.querySelector('.whatsapp-float');
    if (!btn) return;

    btn.addEventListener('click', (e) => {
        e.preventDefault();
        mostrarToast('Abrindo WhatsApp... 📱');
        setTimeout(() => {
            window.open('https://wa.me/5511976901222?text=Olá! Gostaria de saber mais sobre os colchões Lunna.', '_blank');
        }, 500);
    });
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    renderizarProdutos();
    iniciarCountdown();
    initNewsletter();
    initBackToTop();
    initSmoothScroll();
    initBusca();
    initWhatsApp();

    console.log('%c🌙 Colchões Lunna', 'font-size: 24px; font-weight: bold; color: #6a11cb;');
    console.log('%cSono dos Sonhos', 'font-size: 14px; color: #2575fc;');
    console.log('%cCNPJ: 42.418.313/0001-04', 'color: #666;');
});
