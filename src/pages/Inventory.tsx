import { Search } from "lucide-react";

const inventory = [
  { sku: "AL-MOD-001", name: "Tech-Fabric Oversized Tee", category: "Apparel / Tops", stock: 142, stockPct: 85, price: "$ 45.00", lowStock: false },
  { sku: "AL-ACC-492", name: "Structured Minimalist Watch", category: "Accessories / Watches", stock: 8, stockPct: 15, price: "$ 189.00", lowStock: true },
  { sku: "AL-MOD-204", name: "Raw Selvedge Denim", category: "Apparel / Bottoms", stock: 42, stockPct: 45, price: "$ 120.00", lowStock: false },
];

const movements = [
  { type: "in", sku: "AL-MOD-001", desc: "+50 Units from Supplier: Nord-Textiles", date: "22/05 14:30" },
  { type: "out", sku: "AL-ACC-492", desc: "-02 Units Sold on Shopee", date: "22/05 12:15" },
  { type: "out", sku: "AL-MOD-204", desc: "-01 Unit Sold on Website", date: "22/05 09:44" },
];

export default function Inventory() {
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Inventory Ledger</h1>
          <p className="text-outline font-medium mt-1">Real-time stock synchronization across global channels.</p>
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
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Omnichannel Sync</span>
          </div>
          <div className="space-y-3">
            {["Main Website", "Mercado Livre"].map((ch) => (
              <div key={ch} className="flex items-center justify-between">
                <span className="text-xs font-bold">{ch}</span>
                <span className="px-2 py-0.5 bg-success/10 text-success text-[10px] font-black uppercase">Active</span>
              </div>
            ))}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold">Shopee Global</span>
              <span className="px-2 py-0.5 bg-primary text-primary-foreground text-[10px] font-black uppercase">Updating</span>
            </div>
          </div>
        </div>

        <div className="col-span-5 bg-surface-container-low ghost-border p-6 flex flex-col justify-between h-48">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Label Generation</span>
          <div>
            <p className="text-xs text-outline leading-relaxed mb-4">Print high-density thermal labels for current selection. Compatible with Zebra and Dymo protocols.</p>
            <button className="w-full ghost-border-hover py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
              Generate Selected Labels
            </button>
          </div>
        </div>

        <div className="col-span-3 bg-error-container p-6 flex flex-col justify-between h-48">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-error-container">Critical Alerts</span>
          <div>
            <div className="text-2xl font-black text-on-error-container">12</div>
            <div className="text-[10px] font-bold uppercase text-on-error-container/70">Low Stock SKUs Detected</div>
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
              placeholder="Search SKU, product name or barcode..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <select className="bg-surface-container ghost-border text-[11px] font-bold uppercase tracking-widest py-2 px-4 focus:ring-0 focus:outline-none">
              <option>All Stock Levels</option>
              <option>Low Stock</option>
              <option>Out of Stock</option>
            </select>
          </div>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-high border-b border-outline-variant/20">
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline w-10">
                <input type="checkbox" className="w-4 h-4 border-2 border-outline" />
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">SKU Identifier</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Product Name</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline">Stock Level</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline text-right">Unit Price</th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-outline text-right">Actions</th>
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
                  <span className="text-[10px] font-bold text-outline opacity-0 group-hover:opacity-100 transition-opacity uppercase cursor-pointer hover:text-primary">Edit</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-6 border-t border-outline-variant/20 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase text-outline">Displaying 1-25 of 1,240 items</span>
          <div className="flex items-center gap-2">
            <button className="p-2 ghost-border hover:bg-surface-container-high transition-colors text-xs">‹</button>
            <span className="text-[11px] font-bold px-4">Page 1 / 50</span>
            <button className="p-2 ghost-border hover:bg-surface-container-high transition-colors text-xs">›</button>
          </div>
        </div>
      </section>

      {/* Ledger Movements */}
      <section className="mt-12 grid grid-cols-12 gap-8">
        <div className="col-span-8">
          <h2 className="text-lg font-black uppercase tracking-widest mb-6">Recent Ledger Movements</h2>
          <div className="space-y-4">
            {movements.map((m, i) => (
              <div key={i} className={`flex items-center justify-between p-4 bg-surface-container-low border-l-4 ${m.type === "in" ? "border-primary" : "border-outline-variant"}`}>
                <div>
                  <div className="text-[11px] font-black uppercase tracking-tight">Stock {m.type === "in" ? "Inbound" : "Outbound"}: {m.sku}</div>
                  <div className="text-[10px] text-outline uppercase">{m.desc}</div>
                </div>
                <span className="text-[10px] font-mono font-bold text-outline">{m.date}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-4">
          <div className="bg-primary text-primary-foreground p-6">
            <h3 className="text-sm font-black uppercase tracking-widest mb-4">Bulk Barcode Print</h3>
            <p className="text-[10px] opacity-70 leading-relaxed mb-6">Configure the layout for the 3 selected items. System will generate a PDF optimized for 50×30mm thermal rolls.</p>
            <div className="space-y-4 mb-8">
              <div className="flex justify-between border-b border-primary-foreground/20 pb-2">
                <span className="text-[10px] font-bold uppercase">Items Selected</span>
                <span className="text-[10px] font-mono font-bold">03</span>
              </div>
              <div className="flex justify-between border-b border-primary-foreground/20 pb-2">
                <span className="text-[10px] font-bold uppercase">Copies per SKU</span>
                <span className="text-[10px] font-mono font-bold">10</span>
              </div>
            </div>
            <button className="w-full bg-primary-foreground text-primary py-3 text-[11px] font-black uppercase tracking-widest hover:opacity-90 transition-opacity">
              Launch Print Protocol
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
