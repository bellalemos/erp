import { useEffect, useMemo, useState } from "react";
import { AlertTriangle, ArrowDownCircle, ArrowUpCircle, Package, Activity, Search } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  stock_quantity: number;
};

const historico = [
  { tipo: "entrada", produto: "LUM-001", qtd: "+50 un.", operador: "Maria S.", data: "09/04 14:30" },
  { tipo: "saida", produto: "VES-012", qtd: "-12 un.", operador: "João P.", data: "09/04 11:15" },
  { tipo: "entrada", produto: "MOV-003", qtd: "+20 un.", operador: "Ana O.", data: "08/04 16:45" },
  { tipo: "saida", produto: "ELE-045", qtd: "-8 un.", operador: "Carlos M.", data: "08/04 09:30" },
];

function statusFor(qty: number) {
  if (qty < 5) return { label: "CRÍTICO", chip: "chip-error" };
  if (qty < 10) return { label: "ALERTA", chip: "chip-warning" };
  return { label: "OK", chip: "chip-success" };
}

export default function Inventory() {
  const [tipoAjuste, setTipoAjuste] = useState<"entrada" | "saida">("entrada");
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [lowOnly, setLowOnly] = useState(false);

  useEffect(() => {
    supabase.from("products").select("id,name,sku,category,stock_quantity").eq("status", "ativo")
      .then(({ data }) => setProducts((data as Product[]) || []));
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
    }
    if (lowOnly) list = list.filter(p => p.stock_quantity < 5);
    return list;
  }, [products, search, lowOnly]);

  const lowCount = products.filter(p => p.stock_quantity < 5).length;

  const kpis = [
    { label: "Total de SKUs", value: String(products.length), icon: Package, chip: null },
    { label: "Itens Críticos", value: String(lowCount), icon: AlertTriangle, chip: lowCount > 0 ? "chip-error" : null },
    { label: "Movimentações Hoje", value: "47", icon: Activity, chip: "chip-info" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Controle de Estoque</h1>
        <p className="text-on-surface-muted text-sm mt-1">Monitoramento e ajustes de inventário em tempo real</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card-surface p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-primary">
                <kpi.icon size={20} />
              </div>
              {kpi.chip && <span className={`chip ${kpi.chip} text-xs`}>Atenção</span>}
            </div>
            <p className="text-on-surface-muted text-xs font-medium uppercase tracking-wide">{kpi.label}</p>
            <p className="font-heading text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 card-surface p-6">
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <h2 className="font-heading text-lg font-semibold text-foreground">Níveis de Estoque</h2>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" size={14} />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="bg-surface-low rounded-lg pl-9 pr-3 py-2 text-sm placeholder:text-on-surface-muted outline-none border-none w-56"
                  placeholder="Buscar por nome ou SKU..."
                />
              </div>
              <button
                onClick={() => setLowOnly(v => !v)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  lowOnly ? "bg-error/10 text-error" : "bg-surface-low text-on-surface-muted hover:text-foreground"
                }`}
              >
                <AlertTriangle size={14} /> Baixo estoque
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-on-surface-muted text-xs uppercase tracking-wide">
                  <th className="text-left py-3 font-medium">Produto / SKU</th>
                  <th className="text-center py-3 font-medium">Categoria</th>
                  <th className="text-center py-3 font-medium">Atual</th>
                  <th className="text-center py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((item) => {
                  const st = statusFor(item.stock_quantity);
                  const low = item.stock_quantity < 5;
                  return (
                    <tr key={item.id} className={low ? "bg-error/5" : ""}>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {low && <AlertTriangle size={14} className="text-error" />}
                          <div>
                            <p className={`font-medium ${low ? "text-error" : "text-foreground"}`}>{item.name}</p>
                            <p className="text-xs text-on-surface-muted">{item.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-center"><span className="chip chip-info">{item.category || "—"}</span></td>
                      <td className={`py-4 text-center font-semibold ${low ? "text-error" : "text-foreground"}`}>{item.stock_quantity}</td>
                      <td className="py-4 text-center"><span className={`chip ${st.chip}`}>{st.label}</span></td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={4} className="py-8 text-center text-sm text-on-surface-muted">Nenhum produto encontrado</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-5">
          <div className="card-surface p-5">
            <h3 className="font-heading text-base font-semibold text-foreground mb-4">Ajuste de Estoque</h3>
            <div className="space-y-4">
              <select className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none">
                <option>Selecionar Produto</option>
                {products.map(i => <option key={i.id}>{i.name} ({i.sku})</option>)}
              </select>
              <div className="flex gap-2">
                <button onClick={() => setTipoAjuste("entrada")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${tipoAjuste === "entrada" ? "bg-tertiary/10 text-tertiary" : "bg-surface-low text-on-surface-muted"}`}>
                  <ArrowDownCircle size={16} /> Entrada
                </button>
                <button onClick={() => setTipoAjuste("saida")} className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${tipoAjuste === "saida" ? "bg-error/10 text-error" : "bg-surface-low text-on-surface-muted"}`}>
                  <ArrowUpCircle size={16} /> Saída
                </button>
              </div>
              <input type="number" placeholder="Quantidade" className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none" />
              <input placeholder="Motivo do ajuste" className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none" />
              <button className="btn-primary w-full text-sm">Confirmar Ajuste</button>
            </div>
          </div>

          <div className="card-surface p-5">
            <h3 className="font-heading text-base font-semibold text-foreground mb-4">Histórico Recente</h3>
            <div className="space-y-3">
              {historico.map((h, i) => (
                <div key={i} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${h.tipo === 'entrada' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'}`}>
                      {h.tipo === 'entrada' ? <ArrowDownCircle size={14} /> : <ArrowUpCircle size={14} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{h.produto}</p>
                      <p className="text-xs text-on-surface-muted">{h.operador} · {h.data}</p>
                    </div>
                  </div>
                  <span className={`text-sm font-semibold ${h.tipo === 'entrada' ? 'value-positive' : 'value-negative'}`}>{h.qtd}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
