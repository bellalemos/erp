import heroImage from "@/assets/hero-architecture.jpg";

const salesData = [
  { name: "Jaqueta de Couro Midnight", sku: "LDG-4421", qty: 84, revenue: "R$ 12.600,00" },
  { name: "Echarpe de Seda Minimalista", sku: "LDG-2190", qty: 156, revenue: "R$ 9.360,00" },
  { name: "Vaso de Concreto Brutalista", sku: "LDG-8812", qty: 42, revenue: "R$ 8.190,00" },
  { name: "Bolsa Estruturada", sku: "LDG-3301", qty: 38, revenue: "R$ 7.600,00" },
  { name: "Conjunto de Copos Obsidian", sku: "LDG-1102", qty: 92, revenue: "R$ 6.440,00" },
];

const activities = [
  { title: "Nova Venda Registrada", desc: "#ORD-9901 para Elena Rostova", time: "2 min atrás", filled: true },
  { title: "Alerta de Estoque", desc: "SKU: LDG-4421 atingiu limite mínimo", time: "45 min atrás", filled: false },
  { title: "Cadastro de Cliente", desc: "Marcus Aurelius adicionado ao CRM", time: "2 horas atrás", filled: true },
  { title: "Ajuste de Caixa", desc: "Fundo de troco verificado pelo Admin", time: "4 horas atrás", filled: true },
];

export default function Dashboard() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">Painel Executivo</h1>
        <p className="text-sm text-outline font-medium uppercase tracking-widest">Visão Geral da Loja & Métricas de Desempenho</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-surface-container-low p-6 ghost-border">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Vendas Totais (Mês)</span>
          </div>
          <div className="text-4xl font-black tracking-tighter mb-2">R$ 142.850,00</div>
          <div className="text-[10px] font-bold text-success uppercase flex items-center gap-1">
            ↗ 12,4% vs mês anterior
          </div>
        </div>

        <div className="bg-surface-container-low p-6 ghost-border">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Novos Clientes</span>
          </div>
          <div className="text-4xl font-black tracking-tighter mb-2">482</div>
          <div className="text-[10px] font-bold text-outline uppercase">Meta de crescimento: 500</div>
        </div>

        <div className="bg-primary p-6 text-primary-foreground">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status do Caixa</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success"></div>
              <span className="text-[10px] font-black uppercase">Ativo</span>
            </div>
          </div>
          <div className="text-4xl font-black tracking-tighter mb-2 uppercase">Aberto</div>
          <div className="text-[10px] font-bold opacity-60 uppercase">Sessão: #88219 - Início 08:45</div>
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Ranking Table */}
        <div className="lg:col-span-8">
          <div className="bg-card ghost-border">
            <div className="bg-surface-container-high px-6 py-4 flex justify-between items-center border-b border-outline-variant/20">
              <h3 className="text-xs font-black uppercase tracking-widest">Ranking: Mais Vendidos</h3>
            </div>
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container text-[10px] font-black uppercase tracking-widest text-outline">
                  <th className="px-6 py-3">Nome do Produto</th>
                  <th className="px-6 py-3">SKU</th>
                  <th className="px-6 py-3 text-right">Quantidade</th>
                  <th className="px-6 py-3 text-right">Receita</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {salesData.map((item) => (
                  <tr key={item.sku} className="border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors cursor-default">
                    <td className="px-6 py-4 font-bold">{item.name}</td>
                    <td className="px-6 py-4 text-xs font-mono">{item.sku}</td>
                    <td className="px-6 py-4 text-right">{item.qty}</td>
                    <td className="px-6 py-4 text-right font-bold">{item.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-low p-6 ghost-border h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest">Atividade Recente</h3>
            </div>
            <div className="space-y-6">
              {activities.map((a, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-2 h-2 mt-2 ${a.filled ? "bg-primary" : "border border-primary"}`}></div>
                  <div>
                    <p className="text-xs font-bold leading-tight uppercase">{a.title}</p>
                    <p className="text-xs text-outline mb-1">{a.desc}</p>
                    <p className="text-[10px] font-mono text-outline/60 uppercase">{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 border-t border-outline-variant/20 pt-4 text-[10px] font-black uppercase tracking-widest hover:text-primary transition-colors">
              Ver Histórico Completo
            </button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 border-t border-outline-variant/20 pt-8">
        <h3 className="text-xs font-black uppercase tracking-widest mb-6">Ações Rápidas</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between hover:opacity-90 transition-opacity">
            <span className="text-xs font-bold uppercase tracking-widest">Abrir/Fechar Caixa</span>
          </button>
          <button className="ghost-border-hover py-4 px-6 flex items-center justify-between transition-colors hover:bg-surface-container-high">
            <span className="text-xs font-bold uppercase tracking-widest">Gerar Catálogo</span>
          </button>
          <button className="ghost-border-hover py-4 px-6 flex items-center justify-between transition-colors hover:bg-surface-container-high">
            <span className="text-xs font-bold uppercase tracking-widest">Nova Malinha</span>
          </button>
          <button className="ghost-border-hover py-4 px-6 flex items-center justify-between transition-colors hover:bg-surface-container-high">
            <span className="text-xs font-bold uppercase tracking-widest">Adicionar Cliente</span>
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div className="mt-12 w-full h-48 relative overflow-hidden grayscale contrast-125">
        <img className="w-full h-full object-cover" src={heroImage} alt="Arquitetura" width={1920} height={512} />
        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
          <p className="text-primary-foreground text-[10px] font-black tracking-[0.4em] uppercase">Arquitetura de Dados</p>
        </div>
      </div>
    </div>
  );
}
