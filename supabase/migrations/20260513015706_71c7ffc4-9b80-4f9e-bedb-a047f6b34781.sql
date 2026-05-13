
-- Categorias de produtos
CREATE TABLE public.product_categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Produtos / Estoque
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sku TEXT NOT NULL UNIQUE,
  category TEXT,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  unit TEXT NOT NULL DEFAULT 'UN',
  tags TEXT[] NOT NULL DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Clientes
CREATE TABLE public.customers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  document TEXT,
  category TEXT NOT NULL DEFAULT 'B2B',
  email TEXT,
  phone TEXT,
  status TEXT NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Agendamentos Financeiros
CREATE TABLE public.financial_schedules (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  description TEXT NOT NULL,
  amount NUMERIC(12,2) NOT NULL DEFAULT 0,
  due_date DATE NOT NULL,
  type TEXT NOT NULL DEFAULT 'receber',
  status TEXT NOT NULL DEFAULT 'pendente',
  customer_id UUID REFERENCES public.customers(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- updated_at trigger para products
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER products_set_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- RLS
ALTER TABLE public.product_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_schedules ENABLE ROW LEVEL SECURITY;

-- Políticas abertas (sem auth ainda)
CREATE POLICY "open_all_categories" ON public.product_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all_products"   ON public.products           FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all_customers"  ON public.customers          FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all_schedules"  ON public.financial_schedules FOR ALL USING (true) WITH CHECK (true);

-- Seed de categorias
INSERT INTO public.product_categories (name) VALUES
  ('Eletrônicos'), ('Vestuário'), ('Casa & Jardim'), ('Escritório'), ('Móveis'), ('Acessórios');

-- Seed de produtos
INSERT INTO public.products (name, sku, category, price, stock_quantity, unit, tags, status) VALUES
  ('Luminária Mesa LED', 'LUM-001', 'Eletrônicos', 189.90, 42, 'UN', ARRAY['Premium'], 'ativo'),
  ('Camiseta Básica Preta', 'VES-012', 'Vestuário', 59.90, 8, 'UN', ARRAY['Básico'], 'ativo'),
  ('Cadeira Escritório Pro', 'MOV-003', 'Móveis', 1290.00, 15, 'UN', ARRAY['Premium'], 'ativo'),
  ('Fone Bluetooth Sport', 'ELE-045', 'Eletrônicos', 249.90, 0, 'UN', ARRAY['Importado'], 'ativo'),
  ('Bolsa Couro Sintético', 'ACE-022', 'Acessórios', 159.90, 31, 'UN', ARRAY[]::text[], 'ativo'),
  ('Mesa Lateral Madeira', 'MOV-018', 'Móveis', 420.00, 3, 'UN', ARRAY[]::text[], 'ativo');
