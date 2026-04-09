import { DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Plus, Calendar } from "lucide-react";

const kpis = [
  { label: "Saldo Atual", value: "R$ 248.500", change: "+2.4%", positive: true, icon: DollarSign, badge: null },
  { label: "Contas a Receber", value: "R$ 42.300", change: null, positive: true, icon: ArrowUpRight, badge: "ESTE MÊS" },
  { label: "Contas a Pagar", value: "R$ 31.800", change: null, positive: false, icon: ArrowDownRight, badge: "CRÍTICO" },
  { label: "Projeção Final", value: "R$ 259.000", change: "+4.2%", positive: true, icon: TrendingUp, badge: null, highlight: true },
];

const estimativa = [
  { label: "Sem 1", realizado: 70, previsto: 80 },
  { label: "Sem 2", realizado: 85, previsto: 75 },
  { label: "Sem 3", realizado: 60, previsto: 90 },
  { label: "Sem 4", realizado: 0, previsto: 85 },
];

const vencimentos = [
  { descricao: "Fornecedor Alpha", valor: "R$ 8.500", data: "12/04", status: "PENDENTE" },
  { descricao: "Aluguel Loja Centro", valor: "R$ 4.200", data: "15/04", status: "AGENDADO" },
  { descricao: "Energia Elétrica", valor: "R$ 1.890", data: "18/04", status: "PENDENTE" },
  { descricao: "Fornecedor Beta", valor: "R$ 12.000", data: "20/04", status: "AGENDADO" },
];

const atividade = [
  { data: "09/04", descricao: "Pagamento Fornecedor Alpha", categoria: "Operacional", valor: "-R$ 8.500", status: "PAGO" },
  { data: "08/04", descricao: "Recebimento Venda #1042", categoria: "Receita", valor: "+R$ 3.200", status: "RECEBIDO" },
  { data: "07/04", descricao: "Folha de Pagamento", categoria: "Pessoal", valor: "-R$ 24.000", status: "PAGO" },
  { data: "06/04", descricao: "Recebimento Venda #1038", categoria: "Receita", valor: "+R$ 1.450", status: "RECEBIDO" },
];

function statusChip(status: string) {
  switch (status) {
    case "PAGO": case "RECEBIDO": return "chip-success";
    case "PENDENTE": return "chip-warning";
    case "AGENDADO": return "chip-info";
    case "CRÍTICO": return "chip-error";
    case "ESTE MÊS": return "chip-info";
    default: return "chip-info";
  }
}

export default function Finance() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Fluxo de Caixa</h1>
          <p className="text-on-surface-muted text-sm mt-1">Controle financeiro e projeções</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} /> Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`card-surface p-5 relative ${(kpi as any).highlight ? '!bg-secondary text-secondary-foreground' : ''}`}>
            {kpi.badge && <span className={`absolute top-4 right-4 chip ${statusChip(kpi.badge)} text-xs`}>{kpi.badge}</span>}
            {kpi.change && <span className={`absolute top-4 right-4 chip ${kpi.positive ? 'chip-success' : 'chip-error'} text-xs`}>{kpi.change}</span>}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${(kpi as any).highlight ? 'bg-secondary-foreground/20' : 'bg-accent text-primary'}`}>
              <kpi.icon size={20} className={(kpi as any).highlight ? 'text-secondary-foreground' : ''} />
            </div>
            <p className={`text-xs font-medium uppercase tracking-wide ${(kpi as any).highlight ? 'text-secondary-foreground/70' : 'text-on-surface-muted'}`}>{kpi.label}</p>
            <p className={`font-heading text-2xl font-bold mt-1 ${(kpi as any).highlight ? '' : 'text-foreground'}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="card-surface p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Estimativa Mensal</h2>
            <div className="flex items-end gap-6 h-44">
              {estimativa.map((sem) => (
                <div key={sem.label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex gap-1 items-end w-full justify-center">
                    <div className="w-5 rounded-t-md bg-secondary" style={{ height: `${sem.realizado * 1.5}px` }} />
                    <div className="w-5 rounded-t-md" style={{ height: `${sem.previsto * 1.5}px`, background: '#b3cde8' }} />
                  </div>
                  <span className="text-xs text-on-surface-muted">{sem.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4 text-xs text-on-surface-muted">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-secondary" /> Realizado</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ background: '#b3cde8' }} /> Previsto</div>
            </div>
          </div>

          <div className="card-surface p-4 flex items-start gap-3 bg-accent/50">
            <AlertCircle size={18} className="text-primary mt-0.5 shrink-0" />
            <p className="text-sm text-on-surface-muted">
              <strong className="text-foreground">Atenção:</strong> Há R$ 42.300 em recebíveis pendentes para este mês.
            </p>
          </div>

          <div className="card-surface p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Atividade Recente</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-on-surface-muted text-xs uppercase tracking-wide">
                  <th className="text-left py-3 font-medium">Data</th>
                  <th className="text-left py-3 font-medium">Descrição</th>
                  <th className="text-center py-3 font-medium">Categoria</th>
                  <th className="text-right py-3 font-medium">Valor</th>
                  <th className="text-center py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {atividade.map((a, i) => (
                  <tr key={i}>
                    <td className="py-4 text-on-surface-muted">{a.data}</td>
                    <td className="py-4 font-medium text-foreground">{a.descricao}</td>
                    <td className="py-4 text-center"><span className="chip chip-info">{a.categoria}</span></td>
                    <td className={`py-4 text-right font-semibold ${a.valor.startsWith('+') ? 'value-positive' : 'value-negative'}`}>{a.valor}</td>
                    <td className="py-4 text-center"><span className={`chip ${statusChip(a.status)}`}>{a.status}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-base font-semibold text-foreground">Próximos Vencimentos</h3>
            <Calendar size={16} className="text-on-surface-muted" />
          </div>
          <div className="space-y-4">
            {vencimentos.map((v, i) => (
              <div key={i} className="py-3">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{v.descricao}</p>
                  <span className={`chip ${statusChip(v.status)} text-[10px]`}>{v.status}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-muted">{v.data}</span>
                  <span className="text-sm font-semibold value-negative">{v.valor}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn-primary w-full text-sm mt-4">Novo Agendamento</button>
        </div>
      </div>
    </div>
  );
}
