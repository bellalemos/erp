import { Search } from "lucide-react";

const inventory = [
  { sku: "AL-MOD-001", name: "Camiseta Oversized Tech-Fabric", category: "Vestuário / Tops", stock: 142, stockPct: 85, price: "R$ 45,00", lowStock: false },
  { sku: "AL-ACC-492", name: "Relógio Minimalista Estruturado", category: "Acessórios / Relógios", stock: 8, stockPct: 15, price: "R$ 189,00", lowStock: true },
  { sku: "AL-MOD-204", name: "Jeans Selvedge Cru", category: "Vestuário / Calças", stock: 42, stockPct: 45, price: "R$ 120,00", lowStock: false },
];

const movements = [
  { type: "in", sku: "AL-MOD-001", desc: "+50 Unidades do Fornecedor: Nord-Textiles", date: "22/05 14:30" },
  { type: "out", sku: "AL-ACC-492", desc: "-02 Unidades Vendidas na Shopee", date: "22/05 12:15" },
  { type: "out", sku: "AL-MOD-204", desc: "-01 Unidade Vendida no Site", date: "22/05 09:44" },
];

export default function Inventory() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Livro de Estoque</h1>
          <p className="text-outline font-medium mt-1">Sincronização de estoque em tempo real entre canais globais.</p>
        </div>
        <div className="flex gap-4">
          <button className="bg-primary text-primary-foreground px-6 py-3 flex items-center gap-2 font-bold uppercase text-xs tracking-widest active:scale-95 transition-all">
            ⊕ Registrar Entrada
          </button>
          <button className="ghost-border-hover px-6 py-3 flex items-center gap-2 font-bold uppercase text-xs tracking-widest active:scale-95 transition-all">
            ⊖ Registrar Saída
          </button>
        </div>
      </div>

      {/* Bento Cards */}
      <div className="grid grid-cols-12 gap-6 mb-12">
        <div className="col-span-4 bg-surface-container-low ghost-border p-6 flex flex-col justify-between h-48">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Sincronização Omnichannel</span>
          </div>
          <div className="space-y-3">
            {["Site Principal", "Mercado Livre"].map((ch) => (
              <div key={ch} className="flex items-center justify-between">
                <span className="text-xs font-bold">{ch}</span>
                <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-black uppercase">Ativo</span>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Shopee Global</span>
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-black uppercase">Atualizando</span>
            </div>
          </div>
        </div>

        <div className="col-span-5 bg-surface-container-low ghost-border p-6 flex flex-col justify-between h-48">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Geração de Etiquetas</span>
          <div>
            <p className="text-xs text-outline leading-relaxed mb-4">Imprima etiquetas térmicas de alta densidade para a seleção atual. Compatível com protocolos Zebra e Dymo.</p>
            <button className="w-full ghost-border-hover py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
              Gerar Etiquetas Selecionadas
            </button>
          </div>
        </div>

        <div className="col-span-3 bg-error-container p-6 flex flex-col justify-between h-48">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-error-container">Alertas Críticos</span>
          <div>
            <div className="text-2xl font-black text-on-error-container">12</div>
            <div className="text-[10px] font-bold uppercase text-on-error-container/70">SKUs com Estoque Baixo</div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <section className="bg-card ghost-border">
        <div className="p-6 border-b border-outline-variant/20 flex items-center justify-between gap-4">
          <div className="flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
            <input
              className="w-full bg-surface border-none border-b-2 border-outline focus:border-primary focus:ring-0 text-[11px] font-bold tracking-widest pl-10 py-3 uppercase placeholder:text-outline"
              placeholder="Buscar SKU, nome do produto ou código de barras..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-surface-container ghost-border text-[11px] font-bold uppercase tracking-widest py-2 px-4 focus:ring-0 focus:outline-none">
              <option>Todos os Níveis</option>
              <option>Estoque Baixo</option>
              <option>Sem Estoque</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant/20">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline w-10">
                <input type="checkbox" className="w-4 h-4 border-2 border-outline" />
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Código SKU</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Nome do Produto</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Nível de Estoque</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline text-right">Preço Unit.</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {inventory.map((item) => (
              <tr key={item.sku} className="hover:bg-surface-container-low transition-colors group">
                <td className="px-6 py-5"><input type="checkbox" className="w-4 h-4 border-2 border-outline" /></td>
                <td className="px-6 py-5 font-mono text-[11px] font-bold">{item.sku}</td>
                <td className="px-6 py-5">
                  <div className="text-xs font-bold uppercase tracking-tight">{item.name}</div>
                  <div className="text-[9px] text-outline uppercase mt-0.5">{item.category}</div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-surface-container overflow-hidden">
                      <div className={`h-full ${item.lowStock ? "bg-error" : "bg-primary"}`} style={{ width: `${item.stockPct}%` }}></div>
                    </div>
                    <span className={`text-xs font-bold ${item.lowStock ? "text-error" : ""}`}>{String(item.stock).padStart(2, "0")}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-right font-mono text-xs font-bold">{item.price}</td>
                <td className="px-6 py-5 text-right">
                  <span className="text-[10px] font-bold text-outline opacity-0 group-hover:opacity-100 transition-opacity uppercase cursor-pointer hover:text-primary">Editar</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase text-outline">Exibindo 1-25 de 1.240 itens</span>
          <div className="flex items-center gap-2">
            <button className="p-2 ghost-border hover:bg-surface-container-high transition-colors text-xs">‹</button>
            <span className="text-[11px] font-bold px-4">Página 1 / 50</span>
            <button className="p-2 ghost-border hover:bg-surface-container-high transition-colors text-xs">›</button>
          </div>
        </div>
      </section>

      {/* Ledger Movements */}
      <section className="mt-12 grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <h2 className="text-lg font-black uppercase tracking-widest mb-6">Movimentações Recentes</h2>
          <div className="space-y-4">
            {movements.map((m, i) => (
              <div key={i} className={`flex items-center justify-between p-4 bg-surface-container-low border-l-4 ${m.type === "in" ? "border-primary" : "border-outline-variant"}`}>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-tight">{m.type === "in" ? "Entrada" : "Saída"} de Estoque: {m.sku}</div>
                  <div className="text-[10px] text-outline uppercase">{m.desc}</div>
                </div>
                <span className="text-[10px] font-mono font-bold text-outline">{m.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4">
          <div className="bg-primary text-primary-foreground p-6">
            <h3 className="text-sm font-black uppercase tracking-widest mb-4">Impressão de Código de Barras</h3>
            <p className="text-[10px] opacity-70 leading-relaxed mb-6">Configure o layout para os 3 itens selecionados. O sistema gerará um PDF otimizado para rolos térmicos 50×30mm.</p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-primary-foreground/20 pb-2">
                <span className="text-[10px] font-bold uppercase">Itens Selecionados</span>
                <span className="text-[10px] font-mono font-bold">03</span>
              </div>
              <div className="flex justify-between border-b border-primary-foreground/20 pb-2">
                <span className="text-[10px] font-bold uppercase">Cópias por SKU</span>
                <span className="text-[10px] font-mono font-bold">10</span>
              </div>
            </div>
            <button className="w-full bg-primary-foreground text-primary py-3 text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
              Iniciar Impressão
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
