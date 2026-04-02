

# Tradução do Sistema para Português

## Resumo
Traduzir todos os textos em inglês do ERP para português brasileiro, mantendo o design e a estrutura existentes.

## Arquivos a alterar

### 1. `src/components/AppLayout.tsx`
- Menu lateral: "Dashboard" → "Painel", "Inventory" → "Estoque", "CRM" → "Clientes", "POS" → "Caixa", "Finance" → "Financeiro"
- "Retail ERP v1.0" → "ERP Varejo v1.0"
- "Settings" → "Configurações", "Support" → "Suporte"
- "OPEN CASHIER" → "ABRIR CAIXA"
- "Search data..." → "Buscar dados..."
- Tabs: "Inbound" → "Entrada", "Outbound" → "Saída", "Reports" → "Relatórios"
- "Inventory Control" → "Controle de Estoque", "Ledger CRM" → "Gestão de Clientes"
- "New Transaction" → "Nova Transação"

### 2. `src/pages/Dashboard.tsx`
- "Executive Dashboard" → "Painel Executivo"
- "Store Overview & Performance Metrics" → "Visão Geral da Loja & Métricas de Desempenho"
- KPIs: "Total Sales (MTD)" → "Vendas Totais (Mês)", "New Clients" → "Novos Clientes", "Cashier Status" → "Status do Caixa", "Active" → "Ativo", "Open" → "Aberto"
- Tabela: "Ranking: Mais Vendidos" (já em PT), colunas: "Product Name" → "Nome do Produto", "Quantity" → "Quantidade", "Revenue" → "Receita"
- "Recent Activity" → "Atividade Recente" + traduzir itens
- "Quick Actions" → "Ações Rápidas", "Add Client" → "Adicionar Cliente"
- "View Full Ledger" → "Ver Histórico Completo"
- "Architecture of Data" → "Arquitetura de Dados"

### 3. `src/pages/Inventory.tsx`
- "Inventory Ledger" → "Livro de Estoque"
- "Real-time stock synchronization..." → "Sincronização de estoque em tempo real..."
- "Omnichannel Sync" → "Sincronização Omnichannel"
- "Active" → "Ativo", "Updating" → "Atualizando"
- "Label Generation" → "Geração de Etiquetas", "Generate Selected Labels" → "Gerar Etiquetas Selecionadas"
- "Critical Alerts" → "Alertas Críticos", "Low Stock SKUs Detected" → "SKUs com Estoque Baixo"
- Colunas da tabela: "SKU Identifier" → "Código SKU", "Product Name" → "Nome do Produto", "Stock Level" → "Nível de Estoque", "Unit Price" → "Preço Unit.", "Actions" → "Ações", "Edit" → "Editar"
- Filtro: "All Stock Levels" → "Todos os Níveis", "Low Stock" → "Estoque Baixo", "Out of Stock" → "Sem Estoque"
- Placeholder busca traduzido
- "Displaying 1-25 of 1,240 items" → "Exibindo 1-25 de 1.240 itens"
- "Page 1 / 50" → "Página 1 / 50"
- "Recent Ledger Movements" → "Movimentações Recentes"
- "Stock Inbound/Outbound" → "Entrada/Saída de Estoque"
- "Bulk Barcode Print" → "Impressão de Código de Barras", "Items Selected" → "Itens Selecionados", "Copies per SKU" → "Cópias por SKU", "Launch Print Protocol" → "Iniciar Impressão"
- Traduzir descrições dos movimentos

### 4. `src/pages/CRM.tsx`
- "Customer Index" → "Índice de Clientes", "Total" já OK
- Colunas: "Customer Name" → "Nome do Cliente", "Activity / Spent" → "Atividade / Gasto"
- "Customer ID" → "ID do Cliente"
- KPIs: "Average Ticket" → "Ticket Médio", "Purchase Frequency" → "Frequência de Compra", "Total Lifetime" → "Valor Vitalício"
- "Active Loans (Condicionais)" → "Condicionais Ativas"
- "Add Item to Loan" → "Adicionar Item à Condicional"
- "Interactions & Notes" → "Interações & Anotações"
- "Service Note" → "Nota de Atendimento", "Preference Update" → "Atualização de Preferência"
- Traduzir textos das notas
- "Master Transaction History" → "Histórico de Transações"
- Colunas e status: "Ref ID" → "Ref", "Date" → "Data", "Items" → "Itens", "Status" → "Status", "Amount" → "Valor", "SETTLED" → "LIQUIDADO", "RETURNED" → "DEVOLVIDO"
- "Edit Ledger" → "Editar Cadastro"
- Traduzir tempos: "2 days ago" → "2 dias atrás", etc.

### 5. `src/pages/POS.tsx`
- "Product Entry" → "Entrada de Produto"
- "Create Personalized Catalog" → "Criar Catálogo Personalizado"
- Placeholder: "Scan barcode or type product name..." → "Escaneie o código de barras ou digite o nome..."
- Colunas: "Item Description" → "Descrição do Item", "Quantity" → "Quantidade", "Unit Price" → "Preço Unit.", "Total" → "Total"
- Ações: "Apply Coupon" → "Aplicar Cupom", "Identify Client" → "Identificar Cliente", "Check Stock" → "Consultar Estoque", "Void Sale" → "Cancelar Venda"
- "Quick Catalog Generator" → "Gerador de Catálogo", "Personalized Offers" → "Ofertas Personalizadas", traduzir descrição
- "Generate & Copy Link" → "Gerar & Copiar Link"
- "Active Promotions" → "Promoções Ativas", "Mid-Season Sale" → "Liquidação de Temporada", "All Lighting Fixtures" → "Todos os Itens de Iluminação"
- "Last Transaction" → "Última Transação", "View History" → "Ver Histórico"
- "Subtotal", "Discount" → "Desconto", "Total Amount" → "Valor Total"
- "Payment Method" → "Forma de Pagamento", "Credit Card" → "Cartão de Crédito", "Cash" → "Dinheiro", "Store Credit" → "Crédito da Loja"
- "Fiscal Document" → "Documento Fiscal"
- "Send invoice by e-mail automatically" → "Enviar nota fiscal por e-mail automaticamente"
- "Finalize Transaction" → "Finalizar Venda"

### 6. `src/pages/Finance.tsx`
- "Financial & Administrative" → "Financeiro & Administrativo"
- "Consolidated Ledger Overview" → "Visão Consolidada do Livro Razão"
- DRE: "Gross Revenue" → "Receita Bruta", "Deductions & Taxes" → "Deduções & Impostos", "Net Revenue" → "Receita Líquida", "Costs of Goods Sold (COGS)" → "Custo das Mercadorias Vendidas (CMV)", "Gross Profit" → "Lucro Bruto", "Operational Expenses" → "Despesas Operacionais"
- "Net Profit (EBITDA)" → "Lucro Líquido (EBITDA)", "Margin" → "Margem"
- "Currency" → "Moeda"
- "Role Access Matrix" → "Matriz de Acesso por Função"
- Colunas: "Module" → "Módulo", "Manager" → "Gerente", "Salesperson" → "Vendedor", "Cashier" → "Caixa"
- Módulos: "Financial Reports" → "Relatórios Financeiros", "Inventory Mgmt" → "Gestão de Estoque", "Point of Sale" → "Ponto de Venda", "Audit Logs" → "Logs de Auditoria"
- "Active Team" → "Equipe Ativa", "Add Member" → "Adicionar Membro"
- Cargos: "Store Manager" → "Gerente de Loja", "Salesperson" → "Vendedor(a)", "Cashier" → "Caixa"
- "System Audit Log" → "Log de Auditoria do Sistema"
- Traduzir itens do audit log
- "Full History Report" → "Relatório Completo"
- "DRE • Statement of Results" → "DRE • Demonstrativo de Resultados", "Operational Performance" → "Desempenho Operacional"

## Detalhes Técnicos
- Apenas substituição de strings estáticas em 6 arquivos
- Nenhuma mudança estrutural ou de lógica
- Mantém todo o design system e classes CSS intactos

