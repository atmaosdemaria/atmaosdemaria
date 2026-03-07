/* ========================================
   ATELIÊ MÃOS DE MARIA - JAVASCRIPT
   ======================================== */

// Dados iniciais dos produtos
const produtosIniciais = [
    { id: 1, nome: "Terço Nossa Senhora de Fátima – Tulipa & Pérola", preco: 45.00, categoria: "tercos", imagem: "images/terco-01.jpg" },
    { id: 2, nome: "Terço Compacto N.S. Aparecida – Marrom & Prata", preco: 15.00, categoria: "tercos", imagem: "images/terco-02.jpg" },
    { id: 3, nome: "Terço das N.S. das Graças – Azul & Cristal", preco: 40.00, categoria: "tercos", imagem: "images/terco-03.jpg" },
    { id: 4, nome: "Terço Luxo N.S. Aparecida – Royal & Branco", preco: 45.00, categoria: "tercos", imagem: "images/terco-04.jpg" },
    { id: 5, nome: "Rosário Compacto N. S. Aparecida – Rosa & Branco", preco: 25.00, categoria: "rosarios", imagem: "images/terco-05.jpg" },
    { id: 6, nome: "Terço São Bento – Dourado", preco: 25.00, categoria: "tercos", imagem: "images/terco-21.jpg" },
    { id: 7, nome: "Terço Pulseira exclusivo – Perola & Dourado", preco: 20.00, categoria: "pulseiras", imagem: "images/terco-07.jpg" },
    { id: 8, nome: "Terço Compacto S.Tereza – Perola & Branco", preco: 20.00, categoria: "tercos", imagem: "images/terco-08.jpg" },
    { id: 9, nome: "Terço Compacto N. S. de Fátima – Perola & Branco", preco: 20.00, categoria: "tercos", imagem: "images/terco-09.jpg" },
    { id: 10, nome: "Terço S.Luzia – Verde & Branco", preco: 35.00, categoria: "tercos", imagem: "images/terco-10.jpg" },
    { id: 11, nome: "Terço S.Terezinha – Rosa & Prata", preco: 40.00, categoria: "tercos", imagem: "images/terco-11.jpg" },
    { id: 12, nome: "Rosario Compacto N.S. Aparecida – Rosa & Branco", preco: 25.00, categoria: "rosarios", imagem: "images/terco-12.jpg" },
    { id: 13, nome: "Terço de Carro (exclusivo) – Preto & Branco", preco: 15.00, categoria: "carro", imagem: "images/terco-13.jpg" },
    { id: 14, nome: "Rosario Compacto N.S. de Fátima – Marrom & Dourado", preco: 25.00, categoria: "rosarios", imagem: "images/terco-15.jpg" },
    { id: 15, nome: "Terço de Carro (exclusivo) – Rosa & Branco", preco: 15.00, categoria: "carro", imagem: "images/terco-16.jpg" },
    { id: 16, nome: "Terço Compacto Pulseira São Miguel – Preto & Dourado", preco: 35.00, categoria: "pulseiras", imagem: "images/terco-17.jpg" },
    { id: 17, nome: "Terço Grande N.S. Aparecida – A. Turquesa & Perola", preco: 40.00, categoria: "tercos", imagem: "images/terco-18.jpg" },
    { id: 18, nome: "Terço Pulseira exclusivo – Branco & Prata", preco: 20.00, categoria: "pulseiras", imagem: "images/terco-19.jpg" },
    { id: 19, nome: "Terço Grande N.S. Aparecida – V. Esmeralda & Perola", preco: 40.00, categoria: "tercos", imagem: "images/terco-20.jpg" },
    { id: 20, nome: "Terço N.S. Aparecida – Azul & Turquesa", preco: 35.00, categoria: "tercos", imagem: "images/terco-22.jpg" },
    { id: 21, nome: "Terço Luxo São Bento – Vermelho & Dourado", preco: 40.00, categoria: "tercos", imagem: "images/terco-25.jpg" },
    { id: 22, nome: "Terço Colar São Bento – Rosa & Prata", preco: 20.00, categoria: "tercos", imagem: "images/terco-27.jpg" },
    { id: 23, nome: "Terço Luxo N.S. de Fátima – Translucida & Dourado", preco: 40.00, categoria: "tercos", imagem: "images/terco-23.jpg" }
];

// Depoimentos iniciais
const depoimentosIniciais = [
    { id: 1, imagem: "images/depoimento-01.jpg" },
    { id: 2, imagem: "images/depoimento-02.jpg" },
    { id: 3, imagem: "images/depoimento-03.jpg" }
];

// Configurações
const CONFIG = {
    whatsapp: "(19) 99894-9401",
    whatsappLink: "https://wa.me/5519998949401",
    youtubeVideo: "https://youtu.be/sIh9FtpPdqY"
	
	
};

// ========================================
// INICIALIZAÇÃO
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    inicializarLocalStorage();
    inicializarMenu();
    inicializarProdutos();
    inicializarFiltros();
    inicializarModal();
    inicializarDepoimentos();
    inicializarVideo();
    inicializarScroll();
});

// ========================================
// LOCAL STORAGE
// ========================================
function inicializarLocalStorage() {
    if (!localStorage.getItem('produtos')) {
        localStorage.setItem('produtos', JSON.stringify(produtosIniciais));
    }
    if (!localStorage.getItem('depoimentos')) {
        localStorage.setItem('depoimentos', JSON.stringify(depoimentosIniciais));
    }
    if (!localStorage.getItem('config')) {
        localStorage.setItem('config', JSON.stringify(CONFIG));
    }
}

function getProdutos() {
    return JSON.parse(localStorage.getItem('produtos')) || produtosIniciais;
}

function setProdutos(produtos) {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function getDepoimentos() {
    return JSON.parse(localStorage.getItem('depoimentos')) || depoimentosIniciais;
}

function setDepoimentos(depoimentos) {
    localStorage.setItem('depoimentos', JSON.stringify(depoimentos));
}

function getConfig() {
    return JSON.parse(localStorage.getItem('config')) || CONFIG;
}

function setConfig(config) {
    localStorage.setItem('config', JSON.stringify(config));
}

// ========================================
// MENU
// ========================================
function inicializarMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// ========================================
// PRODUTOS
// ========================================
function inicializarProdutos() {
    const grid = document.getElementById('produtos-grid');
    if (!grid) return;

    renderizarProdutos('todos');
}

function renderizarProdutos(filtro) {
    const grid = document.getElementById('produtos-grid');
    if (!grid) return;

    const produtos = getProdutos();
    const produtosFiltrados = filtro === 'todos' 
        ? produtos 
        : produtos.filter(p => p.categoria === filtro);

    grid.innerHTML = produtosFiltrados.map(produto => `
        <div class="produto-card" data-categoria="${produto.categoria}">
            <div class="produto-imagem">
                <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy">
                <div class="produto-overlay">
                    <button class="btn-zoom" onclick="abrirModal(${produto.id})">
                        <i class="fas fa-search-plus"></i> Ver Detalhes
                    </button>
                </div>
            </div>
            <div class="produto-info">
                <span class="produto-categoria">${formatarCategoria(produto.categoria)}</span>
                <h3>${produto.nome}</h3>
                <p class="produto-preco">R$ ${formatarPreco(produto.preco)}</p>
                <button class="btn-whatsapp" onclick="comprarWhatsApp('${produto.nome}', ${produto.preco})">
                    <i class="fab fa-whatsapp"></i> Comprar
                </button>
            </div>
        </div>
    `).join('');
}

function formatarCategoria(categoria) {
    const categorias = {
        'tercos': 'Terços',
        'rosarios': 'Rosários',
        'pulseiras': 'Pulseiras',
        'carro': 'Carro'
    };
    return categorias[categoria] || categoria;
}

function formatarPreco(preco) {
    return preco.toFixed(2).replace('.', ',');
}

// ========================================
// FILTROS
// ========================================
function inicializarFiltros() {
    const botoes = document.querySelectorAll('.filtro-btn');
    
    botoes.forEach(botao => {
        botao.addEventListener('click', function() {
            // Remover classe active de todos
            botoes.forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao clicado
            this.classList.add('active');
            // Filtrar produtos
            const filtro = this.dataset.filtro;
            renderizarProdutos(filtro);
        });
    });
}

// ========================================
// MODAL
// ========================================
function inicializarModal() {
    const modal = document.getElementById('modal');
    const closeBtn = document.querySelector('.modal-close');

    if (closeBtn) {
        closeBtn.addEventListener('click', fecharModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                fecharModal();
            }
        });
    }

    // Fechar com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            fecharModal();
        }
    });
}

function abrirModal(id) {
    const modal = document.getElementById('modal');
    const produtos = getProdutos();
    const produto = produtos.find(p => p.id === id);

    if (!produto || !modal) return;

    const modalImg = document.getElementById('modal-img');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalPreco = document.getElementById('modal-preco');

    modalImg.src = produto.imagem;
    modalImg.alt = produto.nome;
    modalTitulo.textContent = produto.nome;
    modalPreco.textContent = `R$ ${formatarPreco(produto.preco)}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function fecharModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ========================================
// WHATSAPP
// ========================================
function comprarWhatsApp(nome, preco) {
    const config = getConfig();
    const mensagem = `Olá! Gostaria de comprar o seguinte produto:\n\n*${nome}*\nPreço: R$ ${formatarPreco(preco)}\n\nPor favor, me informe como proceder com o pagamento e envio.`;
    
    const url = `https://wa.me/5519998949401?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
}

// ========================================
// DEPOIMENTOS
// ========================================
function inicializarDepoimentos() {
    const grid = document.getElementById('depoimentos-grid');
    if (!grid) return;

    const depoimentos = getDepoimentos();
    
    grid.innerHTML = depoimentos.map(depoimento => `
        <div class="depoimento-card">
            <img src="${depoimento.imagem}" alt="Depoimento de cliente" loading="lazy">
        </div>
    `).join('');
}

// ========================================
// VÍDEO
// ========================================
function inicializarVideo() {
    const videoContainer = document.getElementById('video-container');
    if (!videoContainer) return;

    const config = getConfig();
    const videoUrl = config.youtubeVideo || CONFIG.youtubeVideo;
    
    videoContainer.innerHTML = `<iframe src="${videoUrl}" title="Vídeo do Ateliê" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
}

// Extrair ID do YouTube de vários formatos de URL
function extractYouTubeId(input) {
  if (!input) return '';
  
  // Remove espaços em branco
  input = input.trim();
  
  // Se já for um ID válido (11 chars), retorna
  if (/^[a-zA-Z0-9_-]{11}$/.test(input)) return input;
  
  // Padrões de URL do YouTube (ordem importante)
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,                    // youtu.be/ID
    /youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,        // youtube.com/watch?v=ID
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,          // youtube.com/embed/ID
    /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,              // youtube.com/v/ID
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,         // youtube.com/shorts/ID
    /[?&]v=([a-zA-Z0-9_-]{11})/,                         // v=ID em qualquer URL
    /^([a-zA-Z0-9_-]{11})$/                              // ID puro
  ];
  
  for (let pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) return match[1];
  }
  
  // Se não encontrou padrão, tenta extrair últimos 11 caracteres se parecer uma URL
  if (input.includes('youtu')) {
    const parts = input.split('/').pop().split('?')[0];
    if (/^[a-zA-Z0-9_-]{11}$/.test(parts)) return parts;
  }
  
  return input;
}

// Carregar configurações (vídeo, etc)
async function carregarConfig() {
  const loadingEl = document.getElementById('video-loading');
  const errorEl = document.getElementById('video-error');
  const containerEl = document.getElementById('video-container');
  const placeholderEl = document.getElementById('video-placeholder');
  const iframe = document.getElementById('youtube-video');
  
  // Mostrar loading
  if (loadingEl) loadingEl.style.display = 'flex';
  if (errorEl) errorEl.style.display = 'none';
  if (containerEl) containerEl.style.display = 'none';
  if (placeholderEl) placeholderEl.style.display = 'none';

  try {
    const doc = await db.collection('config').doc('site').get();
    
    if (!doc.exists) {
      if (loadingEl) loadingEl.style.display = 'none';
      if (placeholderEl) placeholderEl.style.display = 'flex';
      return;
    }
    
    const data = doc.data();
    let videoId = data.youtubeVideoId;
    
    // Limpar e validar ID
    if (!videoId) {
      if (loadingEl) loadingEl.style.display = 'none';
      if (placeholderEl) placeholderEl.style.display = 'flex';
      return;
    }
    
    // Remove parâmetros extras se houver
    videoId = videoId.split('?')[0].split('&')[0].trim();
    
    // Validar ID do vídeo (seu ID: sIh9FtpPdqY = 11 caracteres)
    if (!isValidYouTubeId(videoId)) {
      console.warn('ID do YouTube inválido:', videoId);
      if (loadingEl) loadingEl.style.display = 'none';
      if (placeholderEl) placeholderEl.style.display = 'flex';
      return;
    }
    
    // URL do embed com parâmetros otimizados
    const embedUrl = `https://www.youtube.com/embed/${videoId}?` + new URLSearchParams({
      rel: '0',
      modestbranding: '1',
      enablejsapi: '1',
      origin: window.location.origin,
      widget_referrer: window.location.href
    }).toString();
    
    console.log('Carregando vídeo:', embedUrl); // Debug
    
    // Configurar iframe
    if (iframe) {
      iframe.src = embedUrl;
      
      // Listener de load
      iframe.onload = function() {
        console.log('Vídeo carregado com sucesso');
        if (loadingEl) loadingEl.style.display = 'none';
        if (containerEl) containerEl.style.display = 'block';
      };
      
      // Listener de erro
      iframe.onerror = function() {
        console.error('Erro ao carregar iframe');
        if (loadingEl) loadingEl.style.display = 'none';
        if (errorEl) errorEl.style.display = 'flex';
      };
    }
    
    // Timeout de segurança
    setTimeout(() => {
      if (loadingEl && loadingEl.style.display !== 'none') {
        loadingEl.style.display = 'none';
        if (containerEl) containerEl.style.display = 'block';
      }
    }, 3000);
    
  } catch (error) {
    console.error('Erro ao carregar config:', error);
    if (loadingEl) loadingEl.style.display = 'none';
    if (errorEl) errorEl.style.display = 'flex';
  }
}

// Validar formato do ID do YouTube
function isValidYouTubeId(id) {
  if (!id || typeof id !== 'string') return false;
  // IDs do YouTube têm exatamente 11 caracteres alfanuméricos, hífen e underscore
  const regex = /^[a-zA-Z0-9_-]{11}$/;
  const isValid = regex.test(id.trim());
  console.log('Validando ID:', id, '->', isValid ? 'Válido' : 'Inválido');
  return isValid;
}

// ========================================
// SCROLL
// ========================================
function inicializarScroll() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Smooth scroll para links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// ADMIN PANEL FUNCTIONS
// ========================================

// Login
function fazerLogin() {
    const email = document.getElementById('login-email').value;
    const senha = document.getElementById('login-senha').value;

    if (email === 'admin@maosdemaria.com' && senha === 'senha123') {
        sessionStorage.setItem('adminLogged', 'true');
        mostrarDashboard();
    } else {
        alert('Email ou senha incorretos!');
    }
}

function mostrarDashboard() {
    const loginSection = document.getElementById('login-section');
    const dashboard = document.getElementById('dashboard');

    if (loginSection) loginSection.style.display = 'none';
    if (dashboard) dashboard.style.display = 'block';

    inicializarAdminProdutos();
    inicializarAdminVideo();
    inicializarAdminDepoimentos();
}

function fazerLogout() {
    sessionStorage.removeItem('adminLogged');
    location.reload();
}

// Verificar login ao carregar
function verificarLogin() {
    if (sessionStorage.getItem('adminLogged') === 'true') {
        mostrarDashboard();
    }
}

// Admin - Produtos
function inicializarAdminProdutos() {
    const tabela = document.getElementById('tabela-produtos');
    if (!tabela) return;

    renderizarTabelaProdutos();
}

function renderizarTabelaProdutos() {
    const tbody = document.querySelector('#tabela-produtos tbody');
    if (!tbody) return;

    const produtos = getProdutos();

    tbody.innerHTML = produtos.map(produto => `
        <tr>
            <td><img src="${produto.imagem}" alt="${produto.nome}" width="60"></td>
            <td>${produto.nome}</td>
            <td>${formatarCategoria(produto.categoria)}</td>
            <td>R$ ${formatarPreco(produto.preco)}</td>
            <td>
                <button class="btn-edit" onclick="editarProduto(${produto.id})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn-delete" onclick="excluirProduto(${produto.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

let produtoEditando = null;

function abrirModalProduto() {
    const modal = document.getElementById('modal-produto');
    if (modal) {
        modal.classList.add('active');
        document.getElementById('form-produto').reset();
        produtoEditando = null;
        document.getElementById('modal-produto-titulo').textContent = 'Novo Produto';
    }
}

function fecharModalProduto() {
    const modal = document.getElementById('modal-produto');
    if (modal) {
        modal.classList.remove('active');
    }
}

function salvarProduto() {
    const nome = document.getElementById('prod-nome').value;
    const categoria = document.getElementById('prod-categoria').value;
    const preco = parseFloat(document.getElementById('prod-preco').value);
    const imagem = document.getElementById('prod-imagem').value || 'images/terco-01.jpg';

    if (!nome || !categoria || !preco) {
        alert('Preencha todos os campos!');
        return;
    }

    let produtos = getProdutos();

    if (produtoEditando) {
        // Editar
        const index = produtos.findIndex(p => p.id === produtoEditando);
        if (index !== -1) {
            produtos[index] = { id: produtoEditando, nome, categoria, preco, imagem };
        }
    } else {
        // Novo
        const novoId = Math.max(...produtos.map(p => p.id), 0) + 1;
        produtos.push({ id: novoId, nome, categoria, preco, imagem });
    }

    setProdutos(produtos);
    renderizarTabelaProdutos();
    fecharModalProduto();
}

function editarProduto(id) {
    const produtos = getProdutos();
    const produto = produtos.find(p => p.id === id);

    if (!produto) return;

    produtoEditando = id;
    document.getElementById('prod-nome').value = produto.nome;
    document.getElementById('prod-categoria').value = produto.categoria;
    document.getElementById('prod-preco').value = produto.preco;
    document.getElementById('prod-imagem').value = produto.imagem;
    document.getElementById('modal-produto-titulo').textContent = 'Editar Produto';

    const modal = document.getElementById('modal-produto');
    if (modal) modal.classList.add('active');
}

function excluirProduto(id) {
    if (!confirm('Tem certeza que deseja excluir este produto?')) return;

    let produtos = getProdutos();
    produtos = produtos.filter(p => p.id !== id);
    setProdutos(produtos);
    renderizarTabelaProdutos();
}

// Admin - Vídeo
function inicializarAdminVideo() {
    const input = document.getElementById('video-url');
    if (!input) return;

    const config = getConfig();
    input.value = config.youtubeVideo || '';
}

function salvarVideo() {
    const url = document.getElementById('video-url').value;
    
    if (!url) {
        alert('Informe a URL do vídeo!');
        return;
    }

    const config = getConfig();
    config.youtubeVideo = url;
    setConfig(config);

    alert('Vídeo atualizado com sucesso!');
}

// Admin - Depoimentos
function inicializarAdminDepoimentos() {
    const grid = document.getElementById('admin-depoimentos-grid');
    if (!grid) return;

    renderizarDepoimentosAdmin();
}

function renderizarDepoimentosAdmin() {
    const grid = document.getElementById('admin-depoimentos-grid');
    if (!grid) return;

    const depoimentos = getDepoimentos();

    grid.innerHTML = depoimentos.map(depoimento => `
        <div class="depoimento-admin-card">
            <img src="${depoimento.imagem}" alt="Depoimento">
            <button class="btn-delete" onclick="excluirDepoimento(${depoimento.id})">
                <i class="fas fa-trash"></i> Excluir
            </button>
        </div>
    `).join('');
}

function adicionarDepoimento() {
    const input = document.getElementById('novo-depoimento');
    const url = input.value;

    if (!url) {
        alert('Informe a URL da imagem do depoimento!');
        return;
    }

    let depoimentos = getDepoimentos();
    const novoId = Math.max(...depoimentos.map(d => d.id), 0) + 1;
    
    depoimentos.push({ id: novoId, imagem: url });
    setDepoimentos(depoimentos);
    
    input.value = '';
    renderizarDepoimentosAdmin();
}

function excluirDepoimento(id) {
    if (!confirm('Tem certeza que deseja excluir este depoimento?')) return;

    let depoimentos = getDepoimentos();
    depoimentos = depoimentos.filter(d => d.id !== id);
    setDepoimentos(depoimentos);
    renderizarDepoimentosAdmin();
}

// Navegação do Admin
function mostrarSecaoAdmin(secao) {
    // Esconder todas as seções
    document.querySelectorAll('.admin-section').forEach(s => s.classList.remove('active'));
    
    // Mostrar seção selecionada
    document.getElementById(secao).classList.add('active');
    
    // Atualizar botões
    document.querySelectorAll('.admin-nav button').forEach(b => b.classList.remove('active'));
    event.target.classList.add('active');
}

// Inicializar admin se estiver na página admin
if (document.body.classList.contains('admin-body')) {
    document.addEventListener('DOMContentLoaded', verificarLogin);
}
