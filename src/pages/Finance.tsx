const dreLines = [
  { label: "Gross Revenue", value: "1,450,000.00", negative: false, highlight: false },
  { label: "Deductions & Taxes", value: "(245,000.00)", negative: true, highlight: false },
  { label: "Net Revenue", value: "1,205,000.00", negative: false, highlight: true },
  { label: "Costs of Goods Sold (COGS)", value: "(580,000.00)", negative: true, highlight: false },
  { label: "Gross Profit", value: "625,000.00", negative: false, highlight: false },
  { label: "Operational Expenses", value: "(310,000.00)", negative: true, highlight: false },
];

const team = [
  { name: "Ricardo Mendes", role: "Store Manager", id: "8820" },
  { name: "Ana Clara Silveira", role: "Salesperson", id: "8825" },
  { name: "Luiz Fernando", role: "Cashier", id: "8901" },
];

const auditLog = [
  { icon: "✎", title: "Permission Change: Salesperson", desc: "Modified by Ricardo", date: "10 OCT 2023 • 09:44 AM" },
  { icon: "→", title: "New Device Login: Luiz Fernando", desc: "(Terminal 02)", date: "10 OCT 2023 • 08:30 AM" },
  { icon: "⚠", title: "Override Required: Inventory", desc: "Adjustment > 10%", date: "09 OCT 2023 • 18:12 PM", alert: true },
];

const roleMatrix = [
  { module: "Financial Reports", manager: true, sales: false, cashier: false },
  { module: "Inventory Mgmt", manager: true, sales: true, cashier: false },
  { module: "Point of Sale", manager: true, sales: true, cashier: true },
  { module: "Audit Logs", manager: true, sales: false, cashier: false },
];

export default function Finance() {
  return (
    <div>
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tighter uppercase">Financial & Administrative</h1>
        <p className="text-sm text-outline font-medium uppercase tracking-widest mt-1">Consolidated Ledger Overview • Q3 2024</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* DRE */}
        <div className="col-span-7">
          <div className="ghost-border p-8">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h2 className="text-xl font-black tracking-tighter uppercase">DRE • Statement of Results</h2>
                <p className="text-[10px] text-outline uppercase tracking-widest mt-1">Operational Performance</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase text-outline">Currency</span>
                <div className="text-sm font-bold">BRL (R$)</div>
              </div>
            </div>

            <div className="space-y-0">
              {dreLines.map((line, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center py-4 ${
                    line.highlight ? "bg-surface-container-high px-4 -mx-4 font-black" : ""
                  } ${i < dreLines.length - 1 ? "border-b border-outline-variant/10" : ""}`}
                >
                  <span className={`text-sm uppercase ${line.highlight ? "font-black" : "font-bold"} ${line.label.startsWith("  ") || line.negative && !line.highlight ? "pl-4 text-outline" : ""}`}>
                    {line.label}
                  </span>
                  <span className={`text-sm font-bold font-mono ${line.negative ? "text-error" : ""}`}>
                    {line.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Net Profit */}
            <div className="bg-primary text-primary-foreground p-6 mt-6 flex justify-between items-end">
              <div>
                <h3 className="text-lg font-black uppercase tracking-tight">Net Profit (EBITDA)</h3>
              </div>
              <div className="text-right">
                <div className="text-2xl font-black">315,000.00</div>
                <div className="text-[10px] font-bold uppercase opacity-60">26.1% Margin</div>
              </div>
            </div>
          </div>

          {/* Role Access Matrix */}
          <div className="mt-12">
            <h2 className="text-lg font-black uppercase tracking-widest mb-6">Role Access Matrix</h2>
            <table className="w-full text-left ghost-border">
              <thead>
                <tr className="bg-surface-container-high text-[10px] font-black uppercase tracking-widest text-outline">
                  <th className="px-6 py-4">Module</th>
                  <th className="px-6 py-4 text-center">Manager</th>
                  <th className="px-6 py-4 text-center">Salesperson</th>
                  <th className="px-6 py-4 text-center">Cashier</th>
                </tr>
              </thead>
              <tbody>
                {roleMatrix.map((r) => (
                  <tr key={r.module} className="border-b border-outline-variant/10">
                    <td className="px-6 py-4 text-xs font-bold uppercase">{r.module}</td>
                    {[r.manager, r.sales, r.cashier].map((checked, i) => (
                      <td key={i} className="px-6 py-4 text-center">
                        <input type="checkbox" checked={checked} readOnly className="w-4 h-4 border-2 border-outline" />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-5 space-y-8">
          {/* Active Team */}
          <div className="ghost-border">
            <div className="bg-surface-container-high px-6 py-4 flex justify-between items-center">
              <h3 className="text-xs font-black uppercase tracking-widest">Active Team</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-outline hover:text-primary transition-colors">Add Member</button>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {team.map((t) => (
                <div key={t.id} className="px-6 py-4 flex items-center gap-4">
                  <div className="w-10 h-10 bg-surface-container-highest flex items-center justify-center text-xs font-black">
                    {t.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{t.name}</div>
                    <div className="text-[10px] text-outline uppercase">{t.role} • ID: {t.id}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Audit Log */}
          <div className="ghost-border">
            <div className="bg-primary text-primary-foreground px-6 py-4">
              <h3 className="text-xs font-black uppercase tracking-widest">System Audit Log</h3>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {auditLog.map((log, i) => (
                <div key={i} className="px-6 py-4 flex gap-4">
                  <div className={`w-8 h-8 flex items-center justify-center text-sm ${log.alert ? "bg-error/10 text-error" : "bg-surface-container-high"}`}>
                    {log.icon}
                  </div>
                  <div>
                    <div className="text-xs font-black uppercase">{log.title}</div>
                    <div className="text-[10px] text-outline">{log.desc}</div>
                    <div className="text-[10px] font-mono text-outline/60 mt-1">{log.date}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full py-3 border-t border-outline-variant/20 text-[10px] font-black uppercase tracking-widest text-outline hover:text-primary transition-colors">
              Full History Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
