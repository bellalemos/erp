# Correções e melhorias do ERP

## Resumo

NUNCA ativar autenticação do Lovable Cloud, mas do supabase apenas, tornar botões funcionais, refatorar experiências de edição, sincronizar dados em tempo real e permitir editar/excluir categorias.

## 1. Financeiro — Novo Agendamento funcional

- Botão "Novo Agendamento" (topo e card lateral) abre drawer lateral direito com formulário:
  - Descrição, Valor, Data de vencimento, Tipo (a receber / a pagar), Status, Cliente (opcional, busca em `customers`).
- Grava em `financial_schedules` e recarrega lista automaticamente.
- Clicar em um item de "Próximos Vencimentos" ou linha de "Atividade Recente" reabre o mesmo drawer no modo edição (pré-preenchido). Botão "Excluir" no drawer de edição.
- Substituir dados mockados de vencimentos e atividade por leitura real de `financial_schedules`.

## 2. Produtos — Edição no mesmo drawer

- Manter listagem grid/lista como está.
- Clicar em um card ou linha abre o **mesmo drawer lateral** de "Novo Produto", pré-preenchido, com título "Editar Produto" e botão adicional "Excluir".
- Após salvar, o fetch (`load()`) é chamado para refletir imediatamente.

## 3. Categorias — Editar e excluir

- Ao lado do botão "+ Nova" no drawer de produto, adicionar ícone discreto de lápis (`Pencil`) que abre um mini-gerenciador inline: lista das categorias com input editável e ícone de lixeira em cada uma.
- Renomear = `update` em `product_categories`; excluir = `delete` (bloqueia se houver produtos vinculados, com toast de aviso).

## 4. Vendas — Data atual + sincronização

- Adicionar data atual no topo da página "Gestão de Vendas" (ex.: "Terça, 07 de julho de 2026", `date-fns` locale pt-BR — já disponível).
- Substituir array `pedidos` mockado por leitura da tabela `sales` (nova, ver seção 6). Após concluir venda no modal, refazer fetch.
- Gráfico "Desempenho Semanal": calcular somatório por dia da semana atual a partir de `sales.created_at` no lugar do array estático. KPIs (Vendas Totais, Pedidos Pendentes, Ticket Médio) também calculados dos dados reais.
- KPIs do Dashboard passam a ler dos mesmos dados para ficarem sincronizados.

## 5. Tabela `sales` (nova)

- Colunas: customer_id, customer_name (snapshot), items (jsonb: [{product_id, name, sku, price, qty}]), subtotal, tax, total, status ('pago'|'pendente'|'cancelado'|'rascunho'), user_id, created_at.
- RLS: `authenticated` pode ler/inserir/atualizar tudo (multi-tenant simples inicialmente).
- Modal Nova Venda passa a inserir em `sales` (hoje só grava cliente).

## Detalhes técnicos

- Fluxo: migração cria `sales` + `profiles` + trigger `handle_new_user` + GRANTs corretos + ajusta policies das tabelas existentes para `TO authenticated USING (true)`.
- `supabase--configure_auth` para habilitar auto-confirm de email (desenvolvimento) e desabilitar signups anônimos.
- `supabase--configure_social_auth` para Google.
- Reuso de componentes: drawer lateral do Produtos vira componente compartilhado com modo `create` | `edit`.
- Toasts via `sonner` (já instalado).
- `date-fns` já está no projeto (usado pelo shadcn) — usar `format(new Date(), "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR })`.