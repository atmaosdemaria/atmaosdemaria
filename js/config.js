/* Configuração do site e Supabase
   Substitua os valores abaixo pelo seu projeto Supabase:
   - url: endpoint do Supabase
   - anonKey: chave pública anon
   - table: nome da tabela de produtos
   - storageBucket: nome do bucket para imagens
*/
const SITE_CONFIG = {
  whatsapp: '5519998949401'
};

const SUPABASE_CONFIG = {
  url: 'https://zysarfhtsxogczayfsuy.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5c2FyZmh0c3hvZ2N6YXlmc3V5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNDYwNTYsImV4cCI6MjA5MjYyMjA1Nn0.eWTZTV4Y9wNBnur_rQ-_-VPu8Fh7gAhcR8WBeeebK0w',
  table: 'produtos',
  storageBucket: 'produtos'
};

const supabaseClient = window.supabase?.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
