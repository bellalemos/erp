import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Plus, TrendingUp, ShoppingCart, Clock, X, Trash2, PlusCircle, Minus } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, parseISO, startOfWeek, addDays, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

type Product = { id: string; name: string; sku: string; price: number; stock_quantity: number };
type OrderItem = { product: Product; qty: number };
type Sale = {
  id: string;
  customer_id: string | null;
  customer_name: string;
  items: any;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  created_at: string;
};

function statusChip(status: string) {
  const s = status.toUpperCase();
  switch (s) {
    case "PAGO": return "chip-success";
    case "PENDENTE": return "chip-warning";
    case "CANCELADO": return "chip-error";
    case "RASCUNHO": return "chip-info";
    default: return "chip-info";
  }
}

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Vendas() {
  const [showModal, setShowModal] = useState(false);
  const [editingSale, setEditingSale] = useState<Sale | null>(null);
  const [sales, setSales] = useState<Sale[]>([]);
  const [search, setSearch] = useState("");

  const load = async () => {
    const { data } = await supabase.from("sales").select("*").order("created_at", { ascending: false });
    setSales((data as Sale[]) || []);
  };

  useEffect(() => { load(); }, []);

  const today = new Date();
  const dateLabel = format(today, "EEEE, dd 'de' MMMM 'de' yyyy", { locale: ptBR });

  // Weekly aggregation (current week Mon-Sun)
  const weekStart = startOfWeek(today, { weekStartsOn: 1 });
  const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];
  const weeklyPerf = days.map((label, i) => {
    const day = addDays(weekStart, i);
    const value = sales
      .filter(s => s.status !== "cancelado" && isSameDay(parseISO(s.created_at), day))
      .reduce((a, s) => a + Number(s.total), 0);
    return { label, value };
  });

  const totalVendas = sales.filter(s => s.status !== "cancelado").reduce((a, s) => a + Number(s.total), 0);
  const pendentes = sales.filter(s => s.status === "pendente").length;
  const paidCount = sales.filter(s => s.status === "pago").length;
  const ticketMedio = paidCount > 0 ? totalVendas / Math.max(1, sales.filter(s => s.status !== "cancelado").length) : 0;

  const kpis = [
    { label: "Vendas Totais", value: fmt(totalVendas), change: sales.length ? `${sales.length} pedidos` : "—", icon: TrendingUp },
    { label: "Pedidos Pendentes", value: String(pendentes), change: pendentes > 0 ? `${pendentes} para revisar` : "Em dia", icon: Clock },
    { label: "Ticket Médio", value: fmt(ticketMedio), change: "média", icon: ShoppingCart },
  ];

  const filteredSales = sales.filter(s =>
    !search.trim() ||
    s.customer_name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.slice(0, 8).toLowerCase().includes(search.toLowerCase())
  );

  const proximosPgtos = sales.filter(s => s.status === "pendente").slice(0, 3);

  const openNew = () => { setEditingSale(null); setShowModal(true); };
  const openEdit = (s: Sale) => { setEditingSale(s); setShowModal(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-on-surface-muted mb-1 capitalize">{dateLabel}</p>
          <h1 className="font-heading text-3xl font-bold text-foreground">Gestão de Vendas</h1>
          <p className="text-on-surface-muted text-sm mt-1">Acompanhe pedidos, pagamentos e desempenho</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm" onClick={openNew}>
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
              <span className="chip chip-info text-xs">{kpi.change}</span>
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
                <input
                  value={search} onChange={e => setSearch(e.target.value)}
                  className="bg-surface-low rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-on-surface-muted outline-none border-none w-48"
                  placeholder="Buscar pedido..."
                />
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
              {filteredSales.length === 0 && (
                <tr><td colSpan={5} className="py-8 text-center text-sm text-on-surface-muted">
                  Nenhuma venda registrada. Clique em "Nova Venda".
                </td></tr>
              )}
              {filteredSales.map((p) => {
                const initials = (p.customer_name || "?").split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
                return (
                  <tr key={p.id} className="cursor-pointer hover:bg-surface-low/60" onClick={() => openEdit(p)}>
                    <td className="py-4 font-medium text-foreground">#{p.id.slice(0, 8).toUpperCase()}</td>
                    <td className="py-4 text-on-surface-muted">{format(parseISO(p.created_at), "dd/MM/yyyy")}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-primary">{initials}</div>
                        <span className="text-foreground">{p.customer_name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-right font-medium text-foreground">{fmt(Number(p.total))}</td>
                    <td className="py-4 text-center"><span className={`chip ${statusChip(p.status)}`}>{p.status.toUpperCase()}</span></td>
                  </tr>
                );
              })}
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
              {proximosPgtos.length === 0 && (
                <p className="text-sm text-on-surface-muted py-2">Nenhum pendente.</p>
              )}
              {proximosPgtos.map((p) => (
                <button key={p.id} onClick={() => openEdit(p)} className="w-full flex items-center justify-between py-2 hover:bg-surface-low/60 rounded-md px-2 -mx-2 transition-colors">
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{p.customer_name}</p>
                    <p className="text-xs text-on-surface-muted">{format(parseISO(p.created_at), "dd/MM")}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-foreground">{fmt(Number(p.total))}</p>
                    <span className={`chip ${statusChip(p.status)} text-[10px]`}>{p.status.toUpperCase()}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <SaleModal
          sale={editingSale}
          onClose={() => setShowModal(false)}
          onSaved={() => { setShowModal(false); load(); }}
        />
      )}
    </div>
  );
}

function SaleModal({ sale, onClose, onSaved }: { sale: Sale | null; onClose: () => void; onSaved: () => void }) {
  const isEdit = !!sale;
  const [clientName, setClientName] = useState(sale?.customer_name ?? "");
  const [document, setDocument] = useState("");
  const [category, setCategory] = useState("B2B Corporate");
  const [status, setStatus] = useState(sale?.status ?? "pago");
  const [products, setProducts] = useState<Product[]>([]);
  const [items, setItems] = useState<OrderItem[]>([]);
  const [selectedSku, setSelectedSku] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.from("products").select("id,name,sku,price,stock_quantity").eq("status", "ativo")
      .then(({ data }) => {
        const prods = (data as Product[]) || [];
        setProducts(prods);
        if (sale && Array.isArray(sale.items)) {
          const restored: OrderItem[] = sale.items.map((it: any) => {
            const p = prods.find(x => x.id === it.product_id) ?? {
              id: it.product_id, name: it.name, sku: it.sku, price: it.price, stock_quantity: it.qty,
            };
            return { product: p, qty: it.qty };
          });
          setItems(restored);
        }
      });
  }, [sale]);

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

  const save = async (draft = false) => {
    if (!clientName.trim()) { toast.error("Informe o nome do cliente"); return; }
    if (items.length === 0) { toast.error("Adicione pelo menos um produto"); return; }
    setSaving(true);

    // Upsert customer (only when creating)
    let customerId: string | null = sale?.customer_id ?? null;
    if (!isEdit) {
      const { data: existing } = await supabase.from("customers").select("id").eq("name", clientName).maybeSingle();
      if (existing) customerId = existing.id;
      else {
        const { data: created } = await supabase.from("customers").insert({ name: clientName, document, category }).select("id").maybeSingle();
        customerId = created?.id ?? null;
      }
    }

    const payload = {
      customer_id: customerId,
      customer_name: clientName,
      items: items.map(i => ({ product_id: i.product.id, name: i.product.name, sku: i.product.sku, price: i.product.price, qty: i.qty })),
      subtotal, tax, total,
      status: draft ? "rascunho" : status,
    };

    const { error } = isEdit
      ? await supabase.from("sales").update(payload).eq("id", sale!.id)
      : await supabase.from("sales").insert(payload);

    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(isEdit ? "Venda atualizada" : (draft ? "Rascunho salvo" : "Pedido registrado"));
    onSaved();
  };

  const remove = async () => {
    if (!sale) return;
    if (!confirm("Excluir esta venda?")) return;
    const { error } = await supabase.from("sales").delete().eq("id", sale.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Venda excluída");
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div className="relative bg-surface-lowest rounded-2xl shadow-modal w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">{isEdit ? "Editar Venda" : "Nova Venda"}</h2>
            <p className="text-sm text-on-surface-muted mt-0.5">Insira os detalhes da transação abaixo.</p>
          </div>
          <button onClick={onClose} className="p-1 text-on-surface-muted hover:text-foreground"><X size={20} /></button>
        </div>

        <div className="px-6 pb-6 space-y-6">
          <section>
            <p className="text-xs font-semibold uppercase tracking-wider text-on-surface-muted mb-3">Informações do Cliente</p>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-on-surface-muted block mb-1">Nome do Cliente</label>
                <input value={clientName} onChange={e => setClientName(e.target.value)}
                  className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none"
                  placeholder="Buscar ou criar novo cliente..." />
              </div>
              {!isEdit && (
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
              )}
              <div>
                <label className="text-xs text-on-surface-muted block mb-1">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value)}
                  className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none">
                  <option value="pago">Pago</option>
                  <option value="pendente">Pendente</option>
                  <option value="cancelado">Cancelado</option>
                </select>
              </div>
            </div>
          </section>

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
                      <span className="text-xs text-on-surface-muted ml-2">Estoque: {it.product.stock_quantity} un.</span>
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
                  <PlusCircle size={16} /> Adicionar
                </button>
              </div>
            </div>
          </section>

          <section className="bg-surface-low rounded-xl p-5 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-muted">Subtotal</span>
              <span className="text-foreground font-medium">{fmt(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-on-surface-muted">Imposto (5%)</span>
              <span className="text-foreground font-medium">{fmt(tax)}</span>
            </div>
            <div className="flex justify-between items-center pt-2 mt-2 border-t border-border">
              <span className="font-heading text-base font-bold text-foreground">Total</span>
              <span className="font-heading text-2xl font-bold text-primary">{fmt(total)}</span>
            </div>
          </section>
        </div>

        <div className="flex justify-between gap-3 px-6 py-4 bg-surface-low/40 rounded-b-2xl">
          {isEdit ? (
            <button className="text-sm text-error hover:opacity-70 flex items-center gap-1.5" onClick={remove}>
              <Trash2 size={14} /> Excluir
            </button>
          ) : <span />}
          <div className="flex gap-3">
            {!isEdit && <button className="btn-secondary text-sm" disabled={saving} onClick={() => save(true)}>Salvar rascunho</button>}
            <button className="btn-primary text-sm" disabled={saving} onClick={() => save(false)}>
              {isEdit ? "Salvar Alterações" : "Concluir Pedido"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
