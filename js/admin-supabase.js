/* ========================================
   ATELIÊ MÃOS DE MARIA - admin-supabase.js
   Painel Admin com Supabase: auth, CRUD e upload de imagens
   ======================================== */

const ADMIN = {
  bucket: SUPABASE_CONFIG.storageBucket || 'produtos',
  table: SUPABASE_CONFIG.table || 'produtos',
  get client() { return supabaseClient; },
  get ready() { return !!(this.client && SUPABASE_CONFIG?.url && SUPABASE_CONFIG?.anonKey); }
};

let produtos = [];
let imagemArquivo = null;

function injetarPainelAdmin() {
  const btnAdmin = document.createElement('div');
  btnAdmin.id = 'btn-admin-float';
  btnAdmin.innerHTML = '⚙️';
  btnAdmin.title = 'Painel Admin';
  btnAdmin.style.cssText = `
    position:fixed;bottom:100px;right:20px;
    width:46px;height:46px;background:#3D2B1F;color:white;
    border-radius:50%;display:flex;align-items:center;justify-content:center;
    font-size:20px;cursor:pointer;z-index:9000;box-shadow:0 4px 12px rgba(0,0,0,0.3);
    transition:transform 0.2s;
  `;
  btnAdmin.onmouseover = () => btnAdmin.style.transform = 'scale(1.1)';
  btnAdmin.onmouseleave = () => btnAdmin.style.transform = 'scale(1)';
  btnAdmin.onclick = () => document.getElementById('admin-overlay').style.display = 'flex';
  document.body.appendChild(btnAdmin);

  const overlay = document.createElement('div');
  overlay.id = 'admin-overlay';
  overlay.style.cssText = `
    display:none;position:fixed;inset:0;background:rgba(0,0,0,0.6);
    z-index:9999;align-items:center;justify-content:center;padding:16px;
  `;

  overlay.innerHTML = `
    <div id="admin-login" style="background:white;border-radius:16px;padding:32px;width:100%;max-width:420px;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
      <div style="text-align:center;margin-bottom:24px">
        <div style="font-size:36px">🔐</div>
        <h2 style="font-family:'Georgia',serif;color:#3D2B1F;margin:8px 0 4px">Área Admin</h2>
        <p style="font-size:13px;color:#999">Entre com seu e-mail e senha do Supabase</p>
      </div>
      <div style="margin-bottom:14px">
        <label style="font-size:12px;font-weight:600;color:#5A5048;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px">E-mail</label>
        <input type="email" id="admin-email-input" placeholder="admin@seudominio.com"
          style="width:100%;padding:11px 14px;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;outline:none">
      </div>
      <div style="margin-bottom:14px">
        <label style="font-size:12px;font-weight:600;color:#5A5048;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px">Senha</label>
        <input type="password" id="admin-password-input" placeholder="Digite a senha"
          style="width:100%;padding:11px 14px;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;outline:none"
          onkeydown="if(event.key==='Enter')fazerLogin()">
      </div>
      <div id="admin-login-error" style="display:none;color:#E05C5C;font-size:13px;margin-bottom:10px;text-align:center"></div>
      <div style="font-size:11px;color:#9A8F85;margin-top:6px;margin-bottom:16px">Caso não tenha acesso, crie o usuário no dashboard do Supabase ou peça ajuda ao suporte.</div>
      <button onclick="fazerLogin()" style="width:100%;padding:13px;background:linear-gradient(135deg,#C9A84C,#E8C97A);border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;color:#3D2B1F">
        Entrar
      </button>
      <button onclick="fecharAdmin()" style="width:100%;padding:10px;background:none;border:none;color:#999;font-size:13px;cursor:pointer;margin-top:8px">
        Cancelar
      </button>
    </div>

    <div id="admin-painel" style="display:none;background:white;border-radius:16px;width:100%;max-width:960px;max-height:90vh;overflow:hidden;flex-direction:column;box-shadow:0 20px 60px rgba(0,0,0,0.3)">
      <div style="background:#3D2B1F;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
        <div style="display:flex;align-items:center;gap:10px">
          <span style="font-size:20px">📦</span>
          <div>
            <div style="color:white;font-weight:700;font-size:15px">Painel Admin</div>
            <div style="color:#C9A84C;font-size:11px">Ateliê Mãos de Maria</div>
          </div>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <span id="admin-sync-status" style="font-size:12px;color:#C9A84C"></span>
          <button onclick="logoutAdmin()" style="background:rgba(255,255,255,0.1);border:none;color:white;padding:8px 14px;border-radius:10px;cursor:pointer;font-size:13px">Sair</button>
          <button onclick="fecharAdmin()" style="background:rgba(255,255,255,0.1);border:none;color:white;width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px">✕</button>
        </div>
      </div>
      <div style="display:flex;gap:0;background:#F8F5F0;border-bottom:1px solid #EDE8E0;flex-shrink:0;overflow-x:auto">
        <button class="admin-tab-btn active" onclick="adminTab('produtos',this)" style="padding:14px 20px;border:none;background:white;font-size:13px;font-weight:600;cursor:pointer;color:#3D2B1F;border-bottom:3px solid #C9A84C;white-space:nowrap">📦 Produtos</button>
        <button class="admin-tab-btn" onclick="adminTab('novo',this)" style="padding:14px 20px;border:none;background:transparent;font-size:13px;font-weight:500;cursor:pointer;color:#9A8F85;border-bottom:3px solid transparent;white-space:nowrap">➕ Novo Produto</button>
        <button class="admin-tab-btn" onclick="adminTab('config',this)" style="padding:14px 20px;border:none;background:transparent;font-size:13px;font-weight:500;cursor:pointer;color:#9A8F85;border-bottom:3px solid transparent;white-space:nowrap">⚙️ Config</button>
      </div>
      <div style="overflow-y:auto;flex:1;padding:24px">
        <div id="admin-tab-produtos">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;flex-wrap:wrap;gap:10px">
            <div style="font-size:14px;color:#9A8F85"><span id="admin-total-produtos">0</span> produtos cadastrados</div>
            <div style="display:flex;gap:8px">
              <button onclick="carregarProdutosAdmin()" style="padding:8px 16px;background:#F8F5F0;border:1.5px solid #EDE8E0;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer">🔄 Atualizar</button>
              <button onclick="adminTab('novo',document.querySelectorAll('.admin-tab-btn')[1])" style="padding:8px 16px;background:linear-gradient(135deg,#C9A84C,#E8C97A);border:none;border-radius:8px;font-size:12px;font-weight:700;cursor:pointer;color:#3D2B1F">➕ Novo</button>
            </div>
          </div>
          <div id="admin-lista-produtos"></div>
        </div>
        <div id="admin-tab-novo" style="display:none">
          <h3 style="font-family:'Georgia',serif;color:#3D2B1F;margin-bottom:20px" id="admin-form-title">➕ Novo Produto</h3>
          <input type="hidden" id="prod-edit-id">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
            <div style="grid-column:1/-1">
              <label style="font-size:12px;font-weight:600;color:#5A5048;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px">Nome do Produto *</label>
              <input type="text" id="prod-nome" placeholder="Ex: Terço de Madeira Nossa Senhora"
                style="width:100%;padding:11px 14px;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;outline:none">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:#5A5048;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px">Categoria *</label>
              <select id="prod-categoria" style="width:100%;padding:11px 14px;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;outline:none;background:white">
                <option value="tercos">Terços</option>
                <option value="rosarios">Rosários</option>
                <option value="pulseiras">Pulseiras</option>
                <option value="carro">Carro</option>
                <option value="imagens">Imagens</option>
              </select>
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:#5A5048;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px">Preço (R$) *</label>
              <input type="number" id="prod-preco" placeholder="0.00" step="0.01" min="0"
                style="width:100%;padding:11px 14px;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;outline:none">
            </div>
            <div>
              <label style="font-size:12px;font-weight:600;color:#5A5048;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px">Ordem de exibição</label>
              <input type="number" id="prod-ordem" placeholder="1, 2, 3..." min="1"
                style="width:100%;padding:11px 14px;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;outline:none">
            </div>
            <div style="grid-column:1/-1">
              <label style="font-size:12px;font-weight:600;color:#5A5048;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px">Link da Imagem</label>
              <input type="url" id="prod-imagem" placeholder="https://..."
                oninput="previewImgAdmin(this.value)"
                style="width:100%;padding:11px 14px;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;outline:none">
              <div style="font-size:11px;color:#9A8F85;margin-top:6px">Cole um link direto ou envie um arquivo abaixo. O upload será feito no Supabase Storage.</div>
            </div>
            <div style="grid-column:1/-1">
              <label style="font-size:12px;font-weight:600;color:#5A5048;text-transform:uppercase;letter-spacing:0.8px;display:block;margin-bottom:6px">Enviar arquivo</label>
              <input type="file" id="prod-imagem-file" accept="image/*" onchange="handleImageFile(event)"
                style="width:100%;padding:8px 10px;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;outline:none;background:white">
            </div>
            <div style="grid-column:1/-1;display:none" id="admin-img-preview-box">
              <div style="font-size:12px;font-weight:600;color:#5A5048;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.8px">Preview</div>
              <img id="admin-img-preview" src="" alt="preview"
                style="max-width:160px;max-height:160px;border-radius:10px;object-fit:cover;border:2px solid #EDE8E0;display:none">
            </div>
          </div>
          <div style="display:flex;gap:10px;margin-top:20px">
            <button onclick="salvarProduto()" style="flex:1;padding:13px;background:linear-gradient(135deg,#C9A84C,#E8C97A);border:none;border-radius:10px;font-weight:700;font-size:14px;cursor:pointer;color:#3D2B1F">
              💾 Salvar Produto
            </button>
            <button onclick="limparFormProduto()" style="padding:13px 20px;background:#F8F5F0;border:1.5px solid #EDE8E0;border-radius:10px;font-size:14px;cursor:pointer;color:#5A5048">
              ✕ Limpar
            </button>
          </div>
          <div id="admin-form-msg" style="margin-top:12px;font-size:13px;text-align:center"></div>
        </div>
        <div id="admin-tab-config" style="display:none">
          <h3 style="font-family:'Georgia',serif;color:#3D2B1F;margin-bottom:20px">⚙️ Configurações</h3>
          <div style="background:linear-gradient(135deg,#F5EDD4,#FAF7F2);border-radius:12px;padding:20px;margin-bottom:16px;border:1.5px solid #C9A84C">
            <div style="font-weight:700;color:#3D2B1F;margin-bottom:8px;font-size:15px">Info de Supabase</div>
            <div style="font-size:13px;color:#6B4C38;line-height:1.6">
              O painel usa Supabase Auth para proteger o acesso e Supabase Storage para imagens. Configure <strong>js/config.js</strong> com a URL, a chave pública anon e o nome da tabela.
            </div>
          </div>
          <div style="background:#F8F5F0;border-radius:12px;padding:20px;border:1.5px solid #EDE8E0">
            <div style="font-weight:600;color:#3D2B1F;margin-bottom:8px">Dicas</div>
            <ul style="font-size:13px;color:#6B4C38;line-height:1.6;padding-left:18px;margin:0">
              <li>Crie a tabela <strong>produtos</strong> no Supabase.</li>
              <li>Use uma bucket pública para imagens.</li>
              <li>Depois de salvar, o catálogo da loja atualiza automaticamente.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  overlay.addEventListener('click', e => { if (e.target === overlay) fecharAdmin(); });
}

async function initAdmin() {
  injetarPainelAdmin();
  if (!ADMIN.ready) {
    setSyncStatus('❌ Supabase não configurado');
    return;
  }

  const { data: { user } } = await ADMIN.client.auth.getUser();
  updateAuthUI(user ?? null);
  ADMIN.client.auth.onAuthStateChange((event, session) => updateAuthUI(session?.user ?? null));
}

function updateAuthUI(user) {
  const loginEl = document.getElementById('admin-login');
  const painelEl = document.getElementById('admin-painel');
  if (!loginEl || !painelEl) return;

  if (user) {
    loginEl.style.display = 'none';
    painelEl.style.display = 'flex';
    carregarProdutosAdmin();
  } else {
    painelEl.style.display = 'none';
    loginEl.style.display = 'block';
  }
}

async function fazerLogin() {
  const email = document.getElementById('admin-email-input').value.trim();
  const senha = document.getElementById('admin-password-input').value;
  const erro = document.getElementById('admin-login-error');
  erro.style.display = 'none';

  if (!email || !senha) {
    erro.style.display = 'block';
    erro.textContent = 'E-mail e senha são obrigatórios.';
    return;
  }

  setSyncStatus('⏳ Autenticando...');
  const { data, error } = await ADMIN.client.auth.signInWithPassword({ email, password: senha });
  if (error) {
    erro.style.display = 'block';
    erro.textContent = error.message || 'Erro ao entrar. Verifique as credenciais.';
    setSyncStatus('❌ Falha ao autenticar');
    return;
  }

  if (data?.user) {
    erro.style.display = 'none';
    updateAuthUI(data.user);
    setSyncStatus('✅ Conectado como ' + data.user.email);
  }
}

async function logoutAdmin() {
  await ADMIN.client.auth.signOut();
  updateAuthUI(null);
  fecharAdmin();
}

function fecharAdmin() {
  const overlay = document.getElementById('admin-overlay');
  const login = document.getElementById('admin-login');
  const painel = document.getElementById('admin-painel');
  if (overlay) overlay.style.display = 'none';
  if (login) login.style.display = 'block';
  if (painel) painel.style.display = 'none';
  const senhaField = document.getElementById('admin-password-input');
  if (senhaField) senhaField.value = '';
}

function adminTab(nome, btn) {
  ['produtos', 'novo', 'config'].forEach(t => {
    const el = document.getElementById('admin-tab-' + t);
    if (el) el.style.display = 'none';
  });
  document.querySelectorAll('.admin-tab-btn').forEach(b => {
    b.style.background = 'transparent';
    b.style.color = '#9A8F85';
    b.style.borderBottomColor = 'transparent';
  });
  const tab = document.getElementById('admin-tab-' + nome);
  if (tab) tab.style.display = 'block';
  if (btn) {
    btn.style.background = 'white';
    btn.style.color = '#3D2B1F';
    btn.style.borderBottomColor = '#C9A84C';
  }
  if (nome === 'produtos') carregarProdutosAdmin();
}

async function carregarProdutosAdmin() {
  setSyncStatus('⏳ Carregando produtos...');
  try {
    const { data, error } = await ADMIN.client
      .from(ADMIN.table)
      .select('*')
      .order('ordem', { ascending: true });

    if (error) throw error;
    produtos = Array.isArray(data) ? data : [];
    document.getElementById('admin-total-produtos').textContent = produtos.length;
    renderListaProdutos();
    setSyncStatus('✅ Produtos carregados');
  } catch (e) {
    setSyncStatus('❌ Falha ao carregar');
    document.getElementById('admin-lista-produtos').innerHTML = `<div style="text-align:center;padding:40px;color:#9A8F85">Erro ao carregar produtos: ${e.message}</div>`;
  }
}

function renderListaProdutos() {
  const lista = document.getElementById('admin-lista-produtos');
  if (!lista) return;
  if (!produtos.length) {
    lista.innerHTML = '<div style="text-align:center;padding:40px;color:#9A8F85">Nenhum produto cadastrado ainda.</div>';
    return;
  }
  lista.innerHTML = produtos.map(p => `
    <div style="display:flex;align-items:center;gap:14px;padding:14px;border:1.5px solid #EDE8E0;border-radius:12px;margin-bottom:10px;background:white">
      <img src="${p.imagem || 'images/semfoto.jpg'}" alt="${p.nome}"
        onerror="this.src='images/semfoto.jpg'"
        style="width:60px;height:60px;object-fit:cover;border-radius:8px;flex-shrink:0;border:1px solid #EDE8E0">
      <div style="flex:1;min-width:0">
        <div style="font-weight:700;color:#3D2B1F;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${p.nome}</div>
        <div style="font-size:12px;color:#9A8F85;margin-top:2px">${p.categoria} · R$ ${parseFloat(p.preco).toFixed(2).replace('.',',')}</div>
      </div>
      <div style="display:flex;gap:8px;flex-shrink:0">
        <button onclick="editarProduto(${p.id})"
          style="padding:7px 14px;background:#EEF3FA;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;color:#4A6FA5">
          ✏️ Editar
        </button>
        <button onclick="excluirProduto(${p.id})"
          style="padding:7px 14px;background:#FEF0F0;border:none;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer;color:#E05C5C">
          🗑️
        </button>
      </div>
    </div>`).join('');
}

async function salvarProduto() {
  const nome = document.getElementById('prod-nome').value.trim();
  const categoria = document.getElementById('prod-categoria').value;
  const preco = parseFloat(document.getElementById('prod-preco').value.replace(',', '.'));
  const imagemUrl = document.getElementById('prod-imagem').value.trim();
  const ordem = parseInt(document.getElementById('prod-ordem').value, 10) || produtos.length + 1;
  const editId = document.getElementById('prod-edit-id').value;

  if (!nome || Number.isNaN(preco)) {
    mostrarMsgForm('⚠️ Nome e preço são obrigatórios!', '#E05C5C');
    return;
  }

  let imagem = imagemUrl || '';
  if (imagemArquivo) {
    setSyncStatus('⏳ Enviando imagem...');
    try {
      imagem = await uploadProductImage(imagemArquivo);
    } catch (err) {
      mostrarMsgForm('❌ Erro ao enviar imagem: ' + err.message, '#E05C5C');
      setSyncStatus('❌ Erro ao enviar imagem');
      return;
    }
  }

  const payload = {
    nome,
    categoria,
    preco,
    imagem,
    ordem
  };

  setSyncStatus(editId ? '⏳ Atualizando produto...' : '⏳ Salvando novo produto...');

  try {
    if (editId) {
      const { error } = await ADMIN.client
        .from(ADMIN.table)
        .update(payload)
        .eq('id', parseInt(editId, 10));
      if (error) throw error;
      mostrarMsgForm('✅ Produto atualizado!', '#4CAF82');
    } else {
      const { error } = await ADMIN.client
        .from(ADMIN.table)
        .insert(payload);
      if (error) throw error;
      mostrarMsgForm('✅ Produto adicionado!', '#4CAF82');
    }

    limparFormProduto();
    carregarProdutosAdmin();
    if (typeof carregarProdutos === 'function') carregarProdutos();
  } catch (e) {
    mostrarMsgForm('❌ Erro ao salvar produto: ' + e.message, '#E05C5C');
    setSyncStatus('❌ Falha ao salvar');
  }
}

function editarProduto(id) {
  const p = produtos.find(x => x.id === id);
  if (!p) return;
  document.getElementById('prod-edit-id').value = p.id;
  document.getElementById('prod-nome').value = p.nome;
  document.getElementById('prod-categoria').value = p.categoria;
  document.getElementById('prod-preco').value = parseFloat(p.preco).toFixed(2).replace('.', ',');
  document.getElementById('prod-imagem').value = p.imagem || '';
  document.getElementById('prod-ordem').value = p.ordem || '';
  document.getElementById('admin-form-title').textContent = '✏️ Editar Produto';
  imagemArquivo = null;
  document.getElementById('prod-imagem-file').value = '';
  previewImgAdmin(p.imagem || '');
  adminTab('novo', document.querySelectorAll('.admin-tab-btn')[1]);
}

function limparFormProduto() {
  document.getElementById('prod-edit-id').value = '';
  document.getElementById('prod-nome').value = '';
  document.getElementById('prod-preco').value = '';
  document.getElementById('prod-categoria').value = 'tercos';
  document.getElementById('prod-imagem').value = '';
  document.getElementById('prod-ordem').value = '';
  document.getElementById('prod-imagem-file').value = '';
  document.getElementById('admin-form-title').textContent = '➕ Novo Produto';
  imagemArquivo = null;
  document.getElementById('admin-img-preview').style.display = 'none';
  document.getElementById('admin-img-preview-box').style.display = 'none';
  document.getElementById('admin-form-msg').textContent = '';
}

function mostrarMsgForm(msg, cor) {
  const el = document.getElementById('admin-form-msg');
  if (!el) return;
  el.textContent = msg;
  el.style.color = cor;
}

async function excluirProduto(id) {
  const p = produtos.find(x => x.id === id);
  if (!p || !confirm(`Excluir "${p.nome}"?`)) return;
  setSyncStatus('⏳ Excluindo...');
  try {
    const { error } = await ADMIN.client
      .from(ADMIN.table)
      .delete()
      .eq('id', id);
    if (error) throw error;
    produtos = produtos.filter(x => x.id !== id);
    renderListaProdutos();
    document.getElementById('admin-total-produtos').textContent = produtos.length;
    if (typeof carregarProdutos === 'function') carregarProdutos();
    setSyncStatus('✅ Produto excluído');
  } catch (e) {
    setSyncStatus('❌ Erro ao excluir');
    alert('Erro ao excluir produto: ' + e.message);
  }
}

async function uploadProductImage(file) {
  const filename = `${Date.now()}-${sanitizeFilename(file.name)}`;
  const path = `${filename}`;
  const { data, error } = await ADMIN.client.storage.from(ADMIN.bucket).upload(path, file, {
    cacheControl: '3600',
    upsert: true
  });
  if (error) throw error;
  const { data: publicData } = ADMIN.client.storage.from(ADMIN.bucket).getPublicUrl(data.path);
  return publicData?.publicUrl || '';
}

function sanitizeFilename(name) {
  return name.toLowerCase().replace(/[^a-z0-9.-]/g, '-').replace(/-+/g, '-');
}

function handleImageFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  imagemArquivo = file;
  document.getElementById('prod-imagem').value = '';
  previewImgAdmin(URL.createObjectURL(file));
  mostrarMsgForm('✅ Arquivo selecionado. Salve o produto para subir a imagem.', '#4CAF82');
}

function previewImgAdmin(url) {
  const img = document.getElementById('admin-img-preview');
  const box = document.getElementById('admin-img-preview-box');
  if (!img || !box) return;
  if (url) {
    img.src = url;
    img.style.display = 'block';
    box.style.display = 'block';
    img.onerror = () => { img.style.display = 'none'; };
  } else {
    img.style.display = 'none';
    box.style.display = 'none';
  }
}

function setSyncStatus(msg) {
  const el = document.getElementById('admin-sync-status');
  if (el) el.textContent = msg;
}

window.addEventListener('DOMContentLoaded', () => {
  initAdmin();
});
