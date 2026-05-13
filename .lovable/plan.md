# Backend + Refinamentos de UI

## Resumo

Ativar Supabase para persistir dados (produtos/estoque, clientes, agendamentos financeiros), remover botão "Novo Lançamento" do sidebar, substituir modais de Nova Venda e Novo Produto pelas referências enviadas, e adicionar busca + filtro de baixo estoque + tooltip no gráfico semanal.

## 1. Backend (Lovable Cloud)

Ativar Supabase e criar tabelas:

`**products**` (produtos + estoque na mesma tabela)

- `id` uuid pk, `name` text, `sku` text unique, `category` text, `price` numeric, `stock_quantity` int, `unit` text (UN/KG/CX/LT), `tags` text[], `status` text ('ativo'|'inativo'), `created_at`, `updated_at`

`**product_categories**`

- `id` uuid pk, `name` text unique, `created_at`
- Permite cadastrar novas categorias dinamicamente no modal

`**customers**`

- `id` uuid pk, `name` text, `document` text (CPF/CNPJ), `category` text (B2B/Retail/Wholesale), `email` text, `phone` text, `status` text, `created_at`

`**financial_schedules**` (agendamentos financeiros)

- `id` uuid pk, `description` text, `amount` numeric, `due_date` date, `type` text ('receber'|'pagar'), `status` text ('pendente'|'agendado'|'pago'|'cancelado'), `customer_id` uuid fk null, `created_at`

RLS: como ainda não há autenticação, políticas abertas (`true`) para leitura/escrita autenticada anônima — pode ser endurecido depois quando login for adicionado.

## 2. Sidebar (`AppLayout.tsx`)

- Remover o botão CTA "Novo Lançamento" do rodapé do sidebar.

## 3. Modal Nova Venda (`Vendas.tsx`)

Substituir o modal atual por versão drawer/centralizado conforme referência:

- Seção **Customer Information**: Client Name (busca/criação de cliente em `customers`), Document (CPF/CNPJ), Category (B2B Corporate / Retail Personal / Wholesale)
- Seção **Order Items**: card com produto (nome + License Code/SKU), preço, controle de quantidade (− 01 +), "Stock available: X units" puxando de `products`, ícone delete; botão "+ Add Another Product"
- Resumo: Subtotal, Tax (Service 5%), **Total** em destaque azul
- Botões: "Save as Draft" (secundário) + "Complete Order" (primário azul)

## 4. Modal Novo Produto → Drawer lateral direito (`Produtos.tsx`)

Substituir modal por drawer deslizante na lateral direita conforme referência Echelon ERP:

- Header: "Novo Produto" + subtítulo "Adicione um novo item ao seu catálogo mestre" + botão close
- Campos: Nome do Produto, SKU, **Categoria** (select carregando de `product_categories` + opção "Adicionar nova categoria" inline), Preço de Venda (prefixo R$), Quantidade em Estoque, Unidade de Medida (UN/KG/CX/LT), Tags do Produto (chips removíveis, Enter para adicionar)
- Footer: "Cancelar" + "Cadastrar Produto" (insere em `products` com `status='ativo'`)

## 5. Estoque (`Inventory.tsx`)

- Adicionar **campo de busca** no topo da tabela (filtra por nome/SKU)
- Adicionar **toggle/filtro "Baixo estoque"** que mostra apenas produtos com `stock_quantity < 5`
- Linhas com estoque < 5 destacadas em **vermelho** com ícone de alerta
- Carregar dados reais de `products`

## 6. Gráfico Desempenho Semanal (`Vendas.tsx`)

- Adicionar **tooltip on hover** mostrando dia + valor real (ex: "Quarta · R$ 12.450")
- Implementar com Recharts (BarChart + Tooltip) substituindo as divs estáticas atuais

## Detalhes técnicos

- Instalar Recharts (já presente no shadcn). Usar `<ChartContainer>` de `components/ui/chart.tsx`
- Criar `src/integrations/supabase/client.ts` (auto via Cloud)
- Hooks de fetch com TanStack Query (`useQuery`/`useMutation`) por entidade
- Drawer: usar `components/ui/sheet.tsx` (Radix Sheet) com `side="right"`
- Modal Nova Venda: `components/ui/dialog.tsx` com largura ~600px
- Validação com zod nos formulários
- Seed opcional: inserir algumas categorias padrão (Eletrônicos, Vestuário, Casa & Jardim, Escritório)