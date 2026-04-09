import { TrendingUp, TrendingDown, DollarSign, Calendar, BarChart3, Target } from "lucide-react";

const kpis = [
  { label: "Faturamento Diário", value: "R$ 4.280", change: "+12.5%", positive: true, icon: DollarSign, meta: "Meta: R$ 5.000" },
  { label: "Faturamento Semanal", value: "R$ 28.640", change: "+8.3%", positive: true, icon: Calendar, meta: "Meta: R$ 30.000" },
  { label: "Faturamento Mensal", value: "R$ 124.500", change: "-2.1%", positive: false, icon: BarChart3, meta: "Meta: R$ 150.000" },
  { label: "Faturamento Anual (YTD)", value: "R$ 1.480.000", change: "+15.7%", positive: true, icon: Target, meta: "Meta: R$ 2.000.000" },
];

const weeklyBars = [
  { label: "Seg", value: 65 },
  { label: "Ter", value: 80 },
  { label: "Qua", value: 45 },
  { label: "Qui", value: 90 },
  { label: "Sex", value: 72 },
  { label: "Sáb", value: 95 },
  { label: "Dom", value: 40 },
];

const transactions = [
  { name: "Maria Silva", category: "Vestuário", value: "+R$ 450,00", positive: true },
  { name: "João Santos", category: "Eletrônicos", value: "+R$ 1.200,00", positive: true },
  { name: "Devolução #1042", category: "Vestuário", value: "-R$ 89,90", positive: false },
  { name: "Ana Oliveira", category: "Acessórios", value: "+R$ 320,00", positive: true },
  { name: "Carlos Mendes", category: "Móveis", value: "+R$ 2.800,00", positive: true },
];

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Dashboard Executivo</h1>
        <p className="text-on-surface-muted text-sm mt-1">Visão geral de desempenho e métricas da loja</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card-surface p-5 relative">
            <div className={`absolute top-4 right-4 chip ${kpi.positive ? 'chip-success' : 'chip-error'} text-xs`}>
              {kpi.positive ? <TrendingUp size={12} className="mr-1" /> : <TrendingDown size={12} className="mr-1" />}
              {kpi.change}
            </div>
            <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center text-primary mb-3">
              <kpi.icon size={20} />
            </div>
            <p className="text-on-surface-muted text-xs font-medium uppercase tracking-wide">{kpi.label}</p>
            <p className="font-heading text-2xl font-bold text-foreground mt-1">{kpi.value}</p>
            <p className="text-on-surface-muted text-xs mt-2">{kpi.meta}</p>
          </div>
        ))}
      </div>

      {/* Charts & Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Bar Chart */}
        <div className="lg:col-span-2 card-surface p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">Tendências de Receita</h2>
              <p className="text-on-surface-muted text-xs mt-0.5">Desempenho semanal</p>
            </div>
            <div className="flex gap-1 bg-surface-low rounded-lg p-1">
              <button className="btn-primary text-xs !py-1.5 !px-3 !rounded-md">Semanal</button>
              <button className="text-xs py-1.5 px-3 text-on-surface-muted rounded-md hover:bg-surface-lowest transition-colors">Mensal</button>
            </div>
          </div>
          <div className="flex items-end gap-3 h-48">
            {weeklyBars.map((bar) => (
              <div key={bar.label} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full rounded-t-md" style={{
                  height: `${bar.value * 1.8}px`,
                  background: bar.value >= 90 ? 'hsl(160, 83%, 34%)' : 'hsl(211, 100%, 39%)',
                  opacity: bar.value >= 90 ? 1 : 0.7 + (bar.value / 300),
                }} />
                <span className="text-xs text-on-surface-muted">{bar.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Transactions */}
        <div className="card-surface p-6">
          <h2 className="font-heading text-lg font-semibold text-foreground mb-4">Transações Recentes</h2>
          <div className="space-y-4">
            {transactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-xs font-semibold text-primary">
                    {tx.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.name}</p>
                    <p className="text-xs text-on-surface-muted">{tx.category}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${tx.positive ? 'value-positive' : 'value-negative'}`}>
                  {tx.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Insight Banner */}
      <div className="mt-6 rounded-xl p-6 bg-foreground text-primary-foreground">
        <h3 className="font-heading text-lg font-semibold mb-1">💡 Insight do Dia</h3>
        <p className="text-sm opacity-80">
          Sua margem de lucro bruto está 3.2% acima da média do setor. Considere investir em campanhas de marketing para maximizar o crescimento durante a alta temporada.
        </p>
      </div>
    </div>
  );
}
