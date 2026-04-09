

# Redesign Visual: "Curated Ledger" Design System

## Resumo
Aplicar o design system "Curated Ledger" em toda a aplicação -- paleta azul, tipografia Manrope/Inter, border-radius arredondados, sombras suaves, sem bordas rígidas entre seções. Inclui reestruturação do sidebar, novas páginas (Vendas, Configurações, Produtos) e atualização visual de todas as páginas existentes conforme as imagens de referência.

## Mudanças

### 1. Theme & CSS (`src/index.css`, `tailwind.config.ts`)
- Substituir toda a paleta monocromática pelas variáveis Curated Ledger (surface #f6fafe, primary #1a56db, secondary #005ac6, tertiary #0e9f6e, error #e02424, etc.)
- Importar Manrope do Google Fonts junto com Inter
- border-radius padrão: 12px cards, 8px buttons, 9999px chips (remover 0px)
- Remover ghost-border utilities; adicionar classes de sombra e chip de status
- Definir sidebar como surface-low (#eef4fa), cards como surface-lowest (#fff)

### 2. Layout (`src/components/AppLayout.tsx`)
- Sidebar: fundo claro (#eef4fa), ícones e texto em cinza (#4b6070), item ativo com fundo branco + texto azul (#1a56db) + border-radius 10px
- Remover bordas entre sidebar e conteudo -- usar contraste de fundo
- Renomear items: Dashboard, Vendas, Produtos, Estoque, Configurações (conforme imagens)
- Top bar: busca com placeholder contextual, avatar do usuário no canto direito, sino de notificações
- CTA no sidebar: botão "Novo Lançamento" com gradient azul
- Adicionar Suporte e Logout no rodapé do sidebar

### 3. Dashboard (`src/pages/Dashboard.tsx`)
- Titulo: "Dashboard Executivo" com Manrope 700
- 4 KPI cards: Faturamento Diário, Semanal, Mensal, Anual (YTD) -- cada um com ícone, badge de % no canto superior direito (verde positivo, vermelho negativo), valor em Manrope 700, meta abaixo
- Seção "Tendências de Receita": gráfico de barras (simulado com divs) com toggle Mensal/Semanal
- Painel lateral "Transações": lista de transações recentes com ícone, nome, categoria, valor (+/-) com cores verde/vermelho
- Banner "Insight do Dia" na parte inferior com fundo escuro e texto sobre margem de lucro

### 4. Nova página: Vendas (`src/pages/Vendas.tsx`)
- "Gestão de Vendas" com KPIs: Vendas Totais, Pedidos Pendentes, Ticket Médio
- Tabela de pedidos: Order ID, Data, Cliente (com avatar iniciais), Valor Total, Status (chips coloridos: PAGO, PENDENTE, CANCELADO)
- Filtros: busca, status, período
- Gráfico "Desempenho de Vendas Semanal"
- Nota de curadoria lateral
- Próximos pagamentos
- Modal "Anotar Nova Venda": campos Cliente, Data, Produtos/Itens, Condição de Pagamento, Valor Total

### 5. Nova página: Produtos (`src/pages/Produtos.tsx`)
- "Catálogo de Produtos" com breadcrumb
- Filtros por categoria: Todos, Eletrônicos, Vestuário, Móveis, Acessórios
- Toggle de visualização: grid/lista
- Cards de produto: imagem placeholder, badge de status (EM ESTOQUE verde, ESTOQUE BAIXO vermelho, ESGOTADO cinza), SKU, unidades, nome, preço
- Card "Novo Produto" com ícone +
- Paginação: "Mostrando 6 de 124 produtos"
- Botões: Exportar, + Novo Produto

### 6. Estoque (`src/pages/Inventory.tsx`)
- Renomear para "Controle de Estoque"
- KPI cards no topo: Itens Críticos (vermelho), Movimentações Hoje
- Tabela "Níveis de Estoque": Produto/SKU, Categoria (chip), Estoque Mín., Estoque Atual, Status (CRÍTICO/OK/ALERTA chips)
- Painel lateral "Ajuste de Estoque": select produto, toggle Entrada/Saída, quantidade, motivo, botão "Confirmar Ajuste"
- Card com imagem do centro de distribuição + barra de ocupação
- Histórico Recente: entradas/saídas com operador
- Card "Relatório Mensal" com link para baixar PDF

### 7. Financeiro (`src/pages/Finance.tsx`)
- "Fluxo de Caixa" com subtítulo
- 4 KPI cards: Saldo Atual (+2.4%), Contas a Receber (badge "ESTE MÊS"), Contas a Pagar (badge "CRÍTICO"), Projeção Final (card destaque azul)
- "Estimativa Mensal": gráfico de barras Realizado vs Previsto por semana
- Alerta informativo sobre recebíveis pendentes
- Painel "Próximos Vencimentos": lista com status PENDENTE/AGENDADO, botão "Novo Agendamento"
- Tabela "Atividade Recente": Data, Descrição, Categoria (chip), Valor, Status

### 8. Configurações (`src/pages/Settings.tsx`)
- "Perfil do Usuário": avatar, nome, cargo, email, time, botão Editar
- "Notificações": toggles para Relatórios de Vendas, Alertas de Estoque, Novas Integrações
- "E-commerce & Canais": Shopify (conectado), Mercado Livre (configurar)
- "Segurança": Alterar Senha, Autenticação 2FA
- "Localização & Idioma": select Português (Brasil)
- Rodapé: última alteração, botões Descartar/Salvar

### 9. Routing (`src/App.tsx`)
- Adicionar rotas: /vendas, /produtos, /settings
- Remover rotas /crm e /pos (substituídas)

### 10. Remover páginas antigas
- Remover `src/pages/CRM.tsx` e `src/pages/POS.tsx` (funcionalidades integradas em Vendas e Produtos)

## Detalhes Técnicos
- Todas as mudanças são visuais e de estrutura de páginas -- sem backend
- Gráficos simulados com divs estilizados (sem biblioteca de charts)
- Chips de status: border-radius 9999px, cores com 10-15% opacidade de fundo
- Sombra de cards: `0 12px 32px -4px rgba(42,52,58,0.08)`
- Sem bordas 1px solid entre seções -- hierarquia por cor de fundo
- Botão primário sempre com gradient: `linear-gradient(135deg, #005ac6, #004faf)`
- Inputs: sem borda lateral, border-bottom 2px, border-radius 10px 10px 0 0

