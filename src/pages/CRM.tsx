const customers = [
  { name: "Adriana Vasconcelos", email: "adriana.v@email.com", spent: "R$ 12.450,00", time: "2 days ago" },
  { name: "Bruno Fernandes", email: "bruno.fer@provider.net", spent: "R$ 4.210,00", time: "14 days ago" },
  { name: "Camila Rossi", email: "camilarr@icloud.com", spent: "R$ 8.900,00", time: "Yesterday" },
  { name: "Daniel Silveira", email: "d.silveira@business.com", spent: "R$ 2.150,00", time: "3 months ago" },
  { name: "Elaine Mendes", email: "elaine@mendes.me", spent: "R$ 15.620,00", time: "2 hours ago" },
];

const loans = [
  { item: "Silk Blazer – Black", ref: "#SLK-2024-B", date: "04/11" },
  { item: "Wool Trouser – Grey", ref: "#WOL-9921-G", date: "04/11" },
  { item: "Minimalist Scarf", ref: "#ACC-1020-W", date: "05/11" },
];

const transactions = [
  { id: "#TRX-88219", date: "28 SEP 2023", items: "Summer Dress (x2), Tote Bag", status: "SETTLED", amount: "R$ 3.250,00" },
  { id: "#TRX-88102", date: "14 SEP 2023", items: "Linen Shirt – White", status: "SETTLED", amount: "R$ 890,00" },
  { id: "#TRX-87944", date: "02 SEP 2023", items: "Winter Coat, Boots", status: "RETURNED", amount: "R$ 4.120,00" },
];

export default function CRM() {
  return (
    <div>
      <div className="flex items-baseline gap-4 mb-8">
        <h1 className="text-4xl font-black tracking-tighter uppercase">Customer Index</h1>
        <span className="ghost-border px-3 py-1 text-[10px] font-black uppercase">Total: 1,284</span>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Customer List */}
        <div className="col-span-4">
          <div className="ghost-border">
            <div className="bg-surface-container-high px-6 py-3 flex justify-between text-[10px] font-black uppercase tracking-widest text-outline">
              <span>Customer Name</span>
              <span>Activity / Spent</span>
            </div>
            {customers.map((c, i) => (
              <div key={i} className={`px-6 py-4 flex justify-between items-start hover:bg-surface-container-highest transition-colors cursor-pointer ${i === 0 ? "bg-surface-container-low border-l-4 border-primary" : "border-b border-outline-variant/10"}`}>
                <div>
                  <div className="text-sm font-bold">{c.name}</div>
                  <div className="text-[10px] text-success">{c.email}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold">{c.spent}</div>
                  <div className="text-[10px] text-outline uppercase">{c.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customer Detail */}
        <div className="col-span-8">
          {/* Profile Header */}
          <div className="flex items-start gap-6 mb-8">
            <div className="w-20 h-20 bg-surface-container-highest flex items-center justify-center text-2xl font-black">AV</div>
            <div className="flex-1">
              <h2 className="text-3xl font-black tracking-tighter uppercase">Adriana Vasconcelos</h2>
              <p className="text-xs text-outline uppercase mt-1">Customer ID: AL-08942-01</p>
              <div className="flex gap-2 mt-3">
                <span className="ghost-border px-2 py-1 text-[10px] font-bold uppercase">VIP Tier 1</span>
                <span className="ghost-border px-2 py-1 text-[10px] font-bold uppercase">Fashion Enthusiast</span>
              </div>
            </div>
            <button className="ghost-border-hover px-6 py-3 flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              ✎ Edit Ledger
            </button>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-surface-container-low ghost-border p-6 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Average Ticket</span>
              <div className="text-2xl font-black tracking-tighter mt-2">R$ 1.840</div>
            </div>
            <div className="bg-surface-container-low ghost-border p-6 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Purchase Frequency</span>
              <div className="text-2xl font-black tracking-tighter mt-2">1.4 / mo</div>
            </div>
            <div className="bg-surface-container-low ghost-border p-6 text-center">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Total Lifetime</span>
              <div className="text-2xl font-black tracking-tighter mt-2">R$ 34.200</div>
            </div>
          </div>

          {/* Loans & Notes */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <div className="bg-primary text-primary-foreground px-6 py-3 flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-widest">Active Loans (Condicionais)</h3>
              </div>
              <div className="ghost-border border-t-0">
                {loans.map((l, i) => (
                  <div key={i} className="px-6 py-4 flex justify-between items-center border-b border-outline-variant/10 last:border-b-0">
                    <div>
                      <div className="text-sm font-bold">{l.item}</div>
                      <div className="text-[10px] text-outline">REF: {l.ref}</div>
                    </div>
                    <span className="text-xs font-mono font-bold text-outline">{l.date}</span>
                  </div>
                ))}
                <button className="w-full py-3 border-t border-dashed border-outline-variant text-[10px] font-black uppercase tracking-widest text-outline hover:text-primary transition-colors">
                  Add Item to Loan
                </button>
              </div>
            </div>

            <div>
              <div className="bg-primary text-primary-foreground px-6 py-3 flex justify-between items-center">
                <h3 className="text-xs font-black uppercase tracking-widest">Interactions & Notes</h3>
              </div>
              <div className="ghost-border border-t-0 p-6 space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span className="text-xs font-black uppercase">Service Note</span>
                    <span className="text-[10px] text-outline">28 SEP 2023</span>
                  </div>
                  <p className="text-xs text-outline mt-1">Requested custom tailoring for the Wool Trouser. Prefer 2cm shorter on the hem.</p>
                </div>
                <div>
                  <div className="flex justify-between">
                    <span className="text-xs font-black uppercase">Preference Update</span>
                    <span className="text-[10px] text-outline">15 SEP 2023</span>
                  </div>
                  <p className="text-xs text-outline mt-1">Client mentioned avoiding synthetic fabrics. Lean into 100% natural fibers for future suggestions.</p>
                </div>
                <input className="w-full bg-surface border-b-2 border-outline focus:border-primary focus:ring-0 text-xs py-2 placeholder:text-outline" placeholder="Type a new internal log entry..." />
              </div>
            </div>
          </div>

          {/* Transaction History */}
          <div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-4">Master Transaction History</h3>
            <table className="w-full text-left ghost-border">
              <thead>
                <tr className="bg-surface-container-high text-[10px] font-black uppercase tracking-widest text-outline">
                  <th className="px-6 py-3">Ref ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Items</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => (
                  <tr key={t.id} className="border-b border-outline-variant/10 hover:bg-surface-container-highest transition-colors">
                    <td className="px-6 py-4 font-mono text-xs font-bold">{t.id}</td>
                    <td className="px-6 py-4 text-xs">{t.date}</td>
                    <td className="px-6 py-4 text-xs">{t.items}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 text-[10px] font-black uppercase ${t.status === "SETTLED" ? "bg-success/10 text-success" : "ghost-border"}`}>
                        {t.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-sm">{t.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
