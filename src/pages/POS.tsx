const cartItems = [
  { name: "Industrial Steel Desk Lamp - Matte Black", sku: "88291-BL", qty: 1, unitPrice: "R$ 249,00", total: "R$ 249,00" },
  { name: "Ergonomic Office Chair - Premium Mesh", sku: "11029-GR", qty: 2, unitPrice: "R$ 1.150,00", total: "R$ 2.300,00" },
];

const paymentMethods = [
  { label: "Credit Card", active: true },
  { label: "Cash", active: false },
  { label: "PIX", active: false },
  { label: "Store Credit", active: false },
];

export default function POS() {
  return (
    <div>
      <div className="grid grid-cols-12 gap-8">
        {/* Left: Product Entry & Cart */}
        <div className="col-span-8">
          {/* Product Entry */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest">Product Entry</h3>
              <button className="text-[10px] font-black uppercase tracking-widest text-outline hover:text-primary transition-colors">
                ⊞ Create Personalized Catalog
              </button>
            </div>
            <input
              className="w-full bg-card ghost-border p-4 text-sm placeholder:text-outline focus:outline-none focus:ring-0 border-b-2 border-transparent focus:border-primary"
              placeholder="Scan barcode or type product name..."
            />
          </div>

          {/* Cart Table */}
          <table className="w-full text-left mb-8">
            <thead>
              <tr className="bg-surface-container-high text-[10px] font-black uppercase tracking-widest text-outline">
                <th className="px-6 py-3">Item Description</th>
                <th className="px-6 py-3 text-center">Quantity</th>
                <th className="px-6 py-3 text-right">Unit Price</th>
                <th className="px-6 py-3 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i} className="border-b border-outline-variant/10">
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold">{item.name}</div>
                    <div className="text-[10px] text-outline">SKU: {item.sku}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-3">
                      <button className="text-outline hover:text-primary text-lg">−</button>
                      <span className="text-sm font-bold w-8 text-center">{String(item.qty).padStart(2, "0")}</span>
                      <button className="text-outline hover:text-primary text-lg">+</button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-sm text-outline">{item.unitPrice}</td>
                  <td className="px-6 py-4 text-right text-sm font-black">{item.total}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Quick Actions */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            {["Apply Coupon", "Identify Client", "Check Stock"].map((action) => (
              <button key={action} className="ghost-border-hover py-4 px-4 text-center hover:bg-surface-container-high transition-colors">
                <span className="text-[10px] font-black uppercase tracking-widest">{action}</span>
              </button>
            ))}
            <button className="ghost-border-hover py-4 px-4 text-center hover:bg-surface-container-high transition-colors">
              <span className="text-[10px] font-black uppercase tracking-widest text-error">Void Sale</span>
            </button>
          </div>

          {/* Bottom Cards */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-surface-container-low ghost-border p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Quick Catalog Generator</span>
              <h4 className="text-lg font-black tracking-tighter mt-1">Personalized Offers</h4>
              <p className="text-xs text-outline mt-2 leading-relaxed">Generate a temporary digital catalog based on this customer's purchase history and current selection.</p>
              <button className="w-full mt-4 ghost-border-hover py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
                Generate & Copy Link
              </button>
            </div>
            <div className="bg-surface-container-low ghost-border p-6">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">Active Promotions</span>
              <h4 className="text-lg font-black tracking-tighter mt-1">Mid-Season Sale</h4>
              <div className="text-3xl font-black tracking-tighter mt-2">20% OFF</div>
              <div className="text-[10px] text-outline uppercase font-bold">All Lighting Fixtures</div>
            </div>
            <div className="bg-primary text-primary-foreground p-6 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Last Transaction</span>
                <div className="text-sm font-bold mt-1">#ORD-20948</div>
                <div className="text-2xl font-black tracking-tighter">R$ 4.120,50</div>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest opacity-80 hover:opacity-100 transition-opacity text-left mt-4">
                View History →
              </button>
            </div>
          </div>
        </div>

        {/* Right: Order Summary */}
        <div className="col-span-4 space-y-6">
          {/* Totals */}
          <div className="bg-surface-container-low ghost-border p-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="font-bold uppercase">Subtotal</span>
              <span className="font-bold">R$ 2.549,00</span>
            </div>
            <div className="flex justify-between text-xs mb-6">
              <span className="font-bold uppercase">Discount</span>
              <span className="font-bold">- R$ 0,00</span>
            </div>
            <div className="text-center border-t border-outline-variant/20 pt-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-outline">Total Amount</span>
              <div className="text-xs text-outline">R$</div>
              <div className="text-4xl font-black tracking-tighter">2.549,00</div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="ghost-border p-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Payment Method</span>
            <div className="grid grid-cols-2 gap-3 mt-4">
              {paymentMethods.map((m) => (
                <button
                  key={m.label}
                  className={`py-4 text-center text-[10px] font-black uppercase tracking-widest transition-colors ${
                    m.active
                      ? "bg-primary text-primary-foreground"
                      : "ghost-border hover:bg-surface-container-high"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Fiscal Document */}
          <div className="bg-surface-container-low ghost-border p-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-outline">Fiscal Document</span>
            <div className="flex gap-3 mt-4">
              <button className="flex-1 ghost-border-hover py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
                Emitir NFC-e
              </button>
              <button className="flex-1 ghost-border-hover py-2 text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors">
                Emitir NF-e
              </button>
            </div>
            <label className="flex items-center gap-2 mt-4 text-[10px] text-outline">
              <input type="checkbox" className="w-4 h-4 border-2 border-outline" />
              Send invoice by e-mail automatically
            </label>
          </div>

          {/* Finalize */}
          <button className="w-full bg-primary text-primary-foreground py-5 text-sm font-black uppercase tracking-[0.3em] hover:opacity-90 transition-opacity">
            Finalize Transaction
          </button>
        </div>
      </div>
    </div>
  );
}
