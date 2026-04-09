import { useState } from "react";
import { AlertTriangle, ArrowDownCircle, ArrowUpCircle, Package, Activity } from "lucide-react";

const kpis = [
  { label: "Total de SKUs", value: "1.240", icon: Package, chip: null },
  { label: "Itens Críticos", value: "18", icon: AlertTriangle, chip: "chip-error" },
  { label: "Movimentações Hoje", value: "47", icon: Activity, chip: "chip-info" },
];

const estoqueItems = [
  { produto: "Luminária Mesa LED", sku: "LUM-001", categoria: "Eletrônicos", minimo: 10, atual: 42, status: "OK" },
  { produto: "Camiseta Básica Preta", sku: "VES-012", categoria: "Vestuário", minimo: 20, atual: 8, status: "CRÍTICO" },
  { produto: "Cadeira Escritório Pro", sku: "MOV-003", categoria: "Móveis", minimo: 5, atual: 15, status: "OK" },
  { produto: "Fone Bluetooth Sport", sku: "ELE-045", categoria: "Eletrônicos", minimo: 15, atual: 3, status: "CRÍTICO" },
  { produto: "Bolsa Couro Sintético", sku: "ACE-022", categoria: "Acessórios", minimo: 10, atual: 12, status: "ALERTA" },
  { produto: "Mesa Lateral Madeira", sku: "MOV-018", categoria: "Móveis", minimo: 8, atual: 5, status: "CRÍTICO" },
];

const historico = [
  { tipo: "entrada", produto: "LUM-001", qtd: "+50 un.", operador: "Maria S.", data: "09/04 14:30" },
  { tipo: "saida", produto: "VES-012", qtd: "-12 un.", operador: "João P.", data: "09/04 11:15" },
  { tipo: "entrada", produto: "MOV-003", qtd: "+20 un.", operador: "Ana O.", data: "08/04 16:45" },
  { tipo: "saida", produto: "ELE-045", qtd: "-8 un.", operador: "Carlos M.", data: "08/04 09:30" },
];

function statusChip(status: string) {
  switch (status) {
    case "OK": return "chip-success";
    case "ALERTA": return "chip-warning";
    case "CRÍTICO": return "chip-error";
    default: return "chip-info";
  }
}

export default function Inventory() {
  const [tipoAjuste, setTipoAjuste] = useState<"entrada" | "saida">("entrada");

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
          <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Níveis de Estoque</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-on-surface-muted text-xs uppercase tracking-wide">
                  <th className="text-left py-3 font-medium">Produto / SKU</th>
                  <th className="text-center py-3 font-medium">Categoria</th>
                  <th className="text-center py-3 font-medium">Mín.</th>
                  <th className="text-center py-3 font-medium">Atual</th>
                  <th className="text-center py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {estoqueItems.map((item) => (
                  <tr key={item.sku}>
                    <td className="py-4">
                      <p className="font-medium text-foreground">{item.produto}</p>
                      <p className="text-xs text-on-surface-muted">{item.sku}</p>
                    </td>
                    <td className="py-4 text-center"><span className="chip chip-info">{item.categoria}</span></td>
                    <td className="py-4 text-center text-on-surface-muted">{item.minimo}</td>
                    <td className={`py-4 text-center font-semibold ${item.atual <= item.minimo ? 'value-negative' : 'text-foreground'}`}>{item.atual}</td>
                    <td className="py-4 text-center"><span className={`chip ${statusChip(item.status)}`}>{item.status}</span></td>
                  </tr>
                ))}
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
                {estoqueItems.map(i => <option key={i.sku}>{i.produto} ({i.sku})</option>)}
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
