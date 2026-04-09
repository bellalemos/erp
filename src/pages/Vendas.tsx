import { useState } from "react";
import { Search, Filter, Plus, TrendingUp, ShoppingCart, Clock } from "lucide-react";

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
  { label: "Seg", value: 55 },
  { label: "Ter", value: 70 },
  { label: "Qua", value: 85 },
  { label: "Qui", value: 60 },
  { label: "Sex", value: 90 },
  { label: "Sáb", value: 78 },
  { label: "Dom", value: 35 },
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

      {/* KPIs */}
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
        {/* Orders Table */}
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
                <tr key={p.id} className="group">
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

        {/* Right panel */}
        <div className="space-y-5">
          {/* Weekly Chart */}
          <div className="card-surface p-5">
            <h3 className="font-heading text-base font-semibold text-foreground mb-4">Desempenho Semanal</h3>
            <div className="flex items-end gap-2 h-32">
              {weeklyPerf.map((bar) => (
                <div key={bar.label} className="flex-1 flex flex-col items-center gap-1.5">
                  <div className="w-full rounded-t-md bg-secondary" style={{ height: `${bar.value * 1.2}px`, opacity: 0.7 + bar.value / 300 }} />
                  <span className="text-[10px] text-on-surface-muted">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Próximos Pagamentos */}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowModal(false)}>
          <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
          <div className="relative bg-surface-lowest rounded-2xl shadow-modal p-8 w-full max-w-lg" onClick={e => e.stopPropagation()}>
            <h2 className="font-heading text-xl font-bold text-foreground mb-6">Anotar Nova Venda</h2>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">Cliente</label>
                <input className="bg-surface-lowest border-none border-b-2 border-b-border focus:border-b-secondary rounded-t-[10px] rounded-b-none px-4 py-2.5 text-sm w-full outline-none" placeholder="Nome do cliente" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">Data</label>
                  <input type="date" className="bg-surface-lowest border-none border-b-2 border-b-border focus:border-b-secondary rounded-t-[10px] rounded-b-none px-4 py-2.5 text-sm w-full outline-none" />
                </div>
                <div>
                  <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">Valor Total</label>
                  <input className="bg-surface-lowest border-none border-b-2 border-b-border focus:border-b-secondary rounded-t-[10px] rounded-b-none px-4 py-2.5 text-sm w-full outline-none" placeholder="R$ 0,00" />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">Produtos / Itens</label>
                <textarea className="bg-surface-lowest border-none border-b-2 border-b-border focus:border-b-secondary rounded-t-[10px] rounded-b-none px-4 py-2.5 text-sm w-full outline-none resize-none h-20" placeholder="Descreva os itens..." />
              </div>
              <div>
                <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">Condição de Pagamento</label>
                <select className="bg-surface-lowest border-none border-b-2 border-b-border focus:border-b-secondary rounded-t-[10px] rounded-b-none px-4 py-2.5 text-sm w-full outline-none">
                  <option>À Vista</option>
                  <option>Cartão de Crédito</option>
                  <option>Boleto</option>
                  <option>PIX</option>
                </select>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-8">
              <button className="btn-secondary text-sm" onClick={() => setShowModal(false)}>Cancelar</button>
              <button className="btn-primary text-sm" onClick={() => setShowModal(false)}>Salvar Venda</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
