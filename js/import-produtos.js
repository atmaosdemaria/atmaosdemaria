// Arquivo removido - use import.html para importar produtos

async function importarProdutos() {
  try {
    // Carregar produtos do JSON
    const response = await fetch('data/produtos.json');
    if (!response.ok) throw new Error('Erro ao carregar produtos.json');
    const produtos = await response.json();

    console.log(`Encontrados ${produtos.length} produtos no JSON`);

    // Inserir no Supabase (sem IDs para evitar conflitos)
    const produtosParaInserir = produtos.map(p => ({
      nome: p.nome,
      categoria: p.categoria,
      preco: p.preco,
      imagem: p.imagem,
      ordem: p.ordem || 1
    }));

    const { data, error } = await supabaseClient
      .from('produtos')
      .insert(produtosParaInserir);

    if (error) throw error;

    console.log('✅ Produtos importados com sucesso!');
    console.log(`Inseridos: ${data?.length || 0} produtos`);

    // Recarregar a página para ver os produtos
    setTimeout(() => location.reload(), 2000);

  } catch (e) {
    console.error('❌ Erro ao importar produtos:', e);
  }
}

// Executar a importação
importarProdutos();