import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Plus, TrendingUp, ShoppingCart, Clock, X, Trash2, PlusCircle, Minus } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const kpis = [
  { label: "Vendas Totais", value: "R$ 84.230", change: "+12%", icon: TrendingUp },
  { label: "Pedidos Pendentes", value: "23", change: "5 urgentes", icon: Clock },
  { label: "Ticket Médio", value: "R$ 347", change: "+4.2%", icon: ShoppingCart },
];

const pedidos = [
  { id: "#VND-001", data: "09/04/2026", cliente: "Maria Silva", valor: "R$ 1.250,00", status: "PAGO" },
  { id: "#VND-002", data: "09/04/2026", cliente: "João Santos", valor: "R$ 890,00", status: "PENDENTE" },
  { id: "#VND-003", data: "08/04/2026", cliente: "Ana Oliveira", valor: "R$ 2.100,00", status: "PAGO" },
  { id: "#VND-004", data: "08/04/2026", cliente: "Carlos Mendes", valor: "R$ 450,00", status: "CANCELADO" },
  { id: "#VND-005", data: "07/04/2026", cliente: "Fernanda Lima", valor: "R$ 3.200,00", status: "PAGO" },
  { id: "#VND-006", data: "07/04/2026", cliente: "Pedro Costa", valor: "R$ 670,00", status: "PENDENTE" },
];

const weeklyPerf = [
  { label: "Seg", value: 8420 },
  { label: "Ter", value: 10750 },
  { label: "Qua", value: 12450 },
  { label: "Qui", value: 9100 },
  { label: "Sex", value: 14280 },
  { label: "Sáb", value: 11600 },
  { label: "Dom", value: 5230 },
];

const proximosPgtos = [
  { cliente: "Loja Centro", valor: "R$ 4.500", data: "12/04", status: "PENDENTE" },
  { cliente: "Filial Norte", valor: "R$ 2.300", data: "15/04", status: "AGENDADO" },
  { cliente: "E-commerce", valor: "R$ 8.100", data: "18/04", status: "PENDENTE" },
];

function statusChip(status: string) {
  switch (status) {
    case "PAGO": return "chip-success";
    case "PENDENTE": return "chip-warning";
    case "CANCELADO": return "chip-error";
    case "AGENDADO": return "chip-info";
    default: return "chip-info";
  }
}

const fmt = (v: number) =>
  v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

type Product = { id: string; name: string; sku: string; price: number; stock_quantity: number };
type OrderItem = { product: Product; qty: number };

export default function Vendas() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Gestão de Vendas</h1>
          <p className="text-on-surface-muted text-sm mt-1">Acompanhe pedidos, pagamentos e desempenho</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm" onClick={() => setShowModal(true)}>
          <Plus size={16} /> Nova Venda
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-primary">
                <kpi.icon size={20} />
              </div>
              <span className="chip chip-success text-xs">{kpi.change}</span>
            </div>
            <p className="text-on-surface-muted text-xs font-medium uppercase tracking-wide">{kpi.label}</p>
            <p className="font-heading text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card-surface p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">Pedidos Recentes</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" size={14} />
                <input className="bg-surface-low rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-on-surface-muted outline-none border-none w-48" placeholder="Buscar pedido..." />
              </div>
              <button className="p-2 rounded-lg bg-surface-low text-on-surface-muted hover:text-foreground transition-colors">
                <Filter size={16} />
              </button>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-on-surface-muted text-xs uppercase tracking-wide">
                <th className="text-left py-3 font-medium">Pedido</th>
                <th className="text-left py-3 font-medium">Data</th>
                <th className="text-left py-3 font-medium">Cliente</th>
                <th className="text-right py-3 font-medium">Valor</th>
                <th className="text-center py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((p) => (
                <tr key={p.id}>
                  <td className="py-4 font-medium text-foreground">{p.id}</td>
                  <td className="py-4 text-on-surface-muted">{p.data}</td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-primary">
                        {p.cliente.split(' ').map(w => w[0]).join('')}
                      </div>
                      <span className="text-foreground">{p.cliente}</span>
                    </div>
                  </td>
                  <td className="py-4 text-right font-medium text-foreground">{p.valor}</td>
                  <td className="py-4 text-center">
                    <span className={`chip ${statusChip(p.status)}`}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-5">
          <div className="card-surface p-5">
            <h3 className="font-heading text-base font-semibold text-foreground mb-4">Desempenho Semanal</h3>
            <div className="h-36">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyPerf} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--on-surface-muted))', fontSize: 10 }} />
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--surface-low))' }}
                    contentStyle={{
                      background: 'hsl(var(--surface-lowest))',
                      border: 'none',
                      borderRadius: '10px',
                      boxShadow: '0 12px 32px -4px rgba(42,52,58,0.12)',
                      fontSize: 12,
                      padding: '8px 12px',
                    }}
                    formatter={(value: number) => [fmt(value), 'Vendas']}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                    {weeklyPerf.map((_, i) => (
                      <Cell key={i} fill="hsl(var(--secondary))" />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card-surface p-5">
            <h3 className="font-heading text-base font-semibold text-foreground mb-4">Próximos Pagamentos</h3>
            <div className="space-y-3">
              {proximosPgtos.map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{p.cliente}</p>
                    <p className="text-xs text-on-surface-muted">{p.data}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{p.valor}</p>
                    <span className={`chip ${statusChip(p.status)} text-[10px]`}>{p.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && <NewSaleModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

function NewSaleModal({ onClose }: { onClose: () => void }) {
  const [clientName, setClientName] = useState("");
  const [document, setDocument] = useState("");
  const [category, setCategory] = useState("B2B Corporate");
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("products").select("id,name,sku,price,stock_quantity").eq("status", "ativo")
      .then(({ data }) => setProducts(data || []));
  }, []);

  const subtotal = useMemo(
    () => items.reduce((s, it) => s + Number(it.product.price) * it.qty, 0),
    [items]
  );
  const tax = subtotal * 0.05;
  const total = subtotal + tax;

  const addProduct = () => {
    const p = products.find(x => x.sku === selectedSku);
    if (!p) return;
    if (items.find(i => i.product.id === p.id)) return;
    setItems([...items, { product: p, qty: 1 }]);
    setSelectedSku("");
  };

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(i => i.product.id === id ? { ...i, qty: Math.max(1, Math.min(i.product.stock_quantity, i.qty + delta)) } : i));
  };

  const removeItem = (id: string) => setItems(items.filter(i => i.product.id !== id));

  const completeOrder = async (draft = false) => {
    if (!clientName.trim()) {
      toast.error("Informe o nome do cliente");
      return;
    }
    if (items.length === 0) {
      toast.error("Adicione pelo menos um produto");
      return;
    }
    setSaving(true);
    // Upsert customer
    const { data: existing } = await supabase.from("customers").select("id").eq("name", clientName).maybeSingle();
    if (!existing) {
      await supabase.from("customers").insert({ name: clientName, document, category });
    }
    setSaving(false);
    toast.success(draft ? "Rascunho salvo" : "Pedido registrado");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative bg-surface-lowest rounded-2xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">Nova Venda</h2>
            <p className="text-sm text-on-surface-muted mt-0.5">Insira os detalhes da transação abaixo.</p>
          </div>
          <button onClick={onClose} className="p-1 text-on-surface-muted hover:text-foreground"><X size={20} /></button>
        </div>

        <div className="px-6 pb-6 space-y-6">
          {/* Customer */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-muted mb-3">Informações do Cliente</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-on-surface-muted block mb-1">Nome do Cliente</label>
                <input value={clientName} onChange={e => setClientName(e.target.value)}
                  className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none"
                  placeholder="Buscar ou criar novo cliente..." />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-on-surface-muted block mb-1">Documento (CPF/CNPJ)</label>
                  <input value={document} onChange={e => setDocument(e.target.value)}
                    className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none"
                    placeholder="000.000.000-00" />
                </div>
                <div>
                  <label className="text-xs text-on-surface-muted block mb-1">Categoria</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}
                    className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none">
                    <option>B2B Corporate</option>
                    <option>Retail Personal</option>
                    <option>Wholesale</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Items */}
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-muted mb-3">Itens do Pedido</p>
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.product.id} className="bg-surface-low rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{it.product.name}</p>
                      <p className="text-xs text-on-surface-muted">SKU: {it.product.sku}</p>
                    </div>
                    <p className="font-semibold text-foreground">{fmt(Number(it.product.price))}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQty(it.product.id, -1)} className="w-8 h-8 rounded-md bg-surface-lowest flex items-center justify-center text-on-surface-muted hover:text-foreground"><Minus size={14} /></button>
                      <span className="w-8 text-center text-sm font-medium">{String(it.qty).padStart(2, '0')}</span>
                      <button onClick={() => updateQty(it.product.id, 1)} className="w-8 h-8 rounded-md bg-surface-lowest flex items-center justify-center text-on-surface-muted hover:text-foreground"><Plus size={14} /></button>
                      <span className="text-xs text-on-surface-muted ml-2">Estoque disponível: {it.product.stock_quantity} un.</span>
                    </div>
                    <button onClick={() => removeItem(it.product.id)} className="text-error hover:opacity-70"><Trash2 size={16} /></button>
                  </div>
                </div>
              ))}
              <div className="flex gap-2">
                <select value={selectedSku} onChange={e => setSelectedSku(e.target.value)} className="bg-surface-low rounded-lg px-4 py-2.5 text-sm flex-1 outline-none border-none">
                  <option value="">Selecionar produto...</option>
                  {products.filter(p => !items.find(i => i.product.id === p.id)).map(p => (
                    <option key={p.id} value={p.sku}>{p.name} — {fmt(Number(p.price))}</option>
                  ))}
                </select>
                <button onClick={addProduct} disabled={!selectedSku} className="btn-secondary text-sm flex items-center gap-2 disabled:opacity-40">
                  <PlusCircle size={16} /> Adicionar Produto
                </button>
              </div>
            </div>
          </section>

          {/* Totals */}
          <section className="bg-surface-low rounded-xl p-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-muted">Subtotal</span>
              <span className="text-foreground font-medium">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-muted">Imposto (Serviço 5%)</span>
              <span className="text-foreground font-medium">{fmt(tax)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 mt-2 border-t border-border">
              <span className="font-heading text-base font-bold text-foreground">Total</span>
              <span className="font-heading text-2xl font-bold text-primary">{fmt(total)}</span>
            </div>
          </section>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 bg-surface-low/40 rounded-b-2xl">
          <button className="btn-secondary text-sm" disabled={saving} onClick={() => completeOrder(true)}>Salvar como rascunho</button>
          <button className="btn-primary text-sm" disabled={saving} onClick={() => completeOrder(false)}>Concluir Pedido</button>
        </div>
      </div>
    </div>
  );
}
