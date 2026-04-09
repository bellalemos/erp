import { useState } from "react";
import { Grid3X3, List, Plus, Download, Package } from "lucide-react";

const categories = ["Todos", "Eletrônicos", "Vestuário", "Móveis", "Acessórios"];

const products = [
  { name: "Luminária Mesa LED", sku: "LUM-001", price: "R$ 189,90", units: 42, status: "EM ESTOQUE", category: "Eletrônicos" },
  { name: "Camiseta Básica Preta", sku: "VES-012", price: "R$ 59,90", units: 8, status: "ESTOQUE BAIXO", category: "Vestuário" },
  { name: "Cadeira Escritório Pro", sku: "MOV-003", price: "R$ 1.290,00", units: 15, status: "EM ESTOQUE", category: "Móveis" },
  { name: "Fone Bluetooth Sport", sku: "ELE-045", price: "R$ 249,90", units: 0, status: "ESGOTADO", category: "Eletrônicos" },
  { name: "Bolsa Couro Sintético", sku: "ACE-022", price: "R$ 159,90", units: 31, status: "EM ESTOQUE", category: "Acessórios" },
  { name: "Mesa Lateral Madeira", sku: "MOV-018", price: "R$ 420,00", units: 5, status: "ESTOQUE BAIXO", category: "Móveis" },
];

function statusChip(status: string) {
  switch (status) {
    case "EM ESTOQUE": return "chip-success";
    case "ESTOQUE BAIXO": return "chip-warning";
    case "ESGOTADO": return "chip-error";
    default: return "chip-info";
  }
}

export default function Produtos() {
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filtered = activeCategory === "Todos" ? products : products.filter(p => p.category === activeCategory);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-on-surface-muted mb-1">Home / Produtos</p>
          <h1 className="font-heading text-3xl font-bold text-foreground">Catálogo de Produtos</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={16} /> Exportar
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={16} /> Novo Produto
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-surface-low text-on-surface-muted hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-surface-low rounded-lg p-1">
          <button onClick={() => setViewMode("grid")} className={`p-2 rounded-md transition-colors ${viewMode === "grid" ? "bg-surface-lowest text-primary shadow-sm" : "text-on-surface-muted"}`}>
            <Grid3X3 size={16} />
          </button>
          <button onClick={() => setViewMode("list")} className={`p-2 rounded-md transition-colors ${viewMode === "list" ? "bg-surface-lowest text-primary shadow-sm" : "text-on-surface-muted"}`}>
            <List size={16} />
          </button>
        </div>
      </div>

      {/* Product Grid */}
      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-3"}>
        {filtered.map((product) => (
          viewMode === "grid" ? (
            <div key={product.sku} className="card-surface p-5 hover:shadow-modal transition-shadow cursor-pointer">
              <div className="w-full h-36 bg-surface-low rounded-lg flex items-center justify-center mb-4">
                <Package size={40} className="text-on-surface-muted/30" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className={`chip ${statusChip(product.status)}`}>{product.status}</span>
                <span className="text-xs text-on-surface-muted">{product.units} un.</span>
              </div>
              <p className="text-xs text-on-surface-muted">{product.sku}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{product.name}</p>
              <p className="font-heading text-lg font-bold text-foreground mt-2">{product.price}</p>
            </div>
          ) : (
            <div key={product.sku} className="card-surface p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-low rounded-lg flex items-center justify-center">
                  <Package size={20} className="text-on-surface-muted/30" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{product.name}</p>
                  <p className="text-xs text-on-surface-muted">{product.sku} · {product.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <span className="text-sm text-on-surface-muted">{product.units} un.</span>
                <span className={`chip ${statusChip(product.status)}`}>{product.status}</span>
                <span className="font-heading font-bold text-foreground">{product.price}</span>
              </div>
            </div>
          )
        ))}
        {viewMode === "grid" && (
          <div className="card-surface p-5 flex items-center justify-center border-2 border-dashed border-border cursor-pointer hover:border-primary/30 transition-colors min-h-[260px]">
            <div className="text-center">
              <Plus size={32} className="mx-auto text-on-surface-muted mb-2" />
              <p className="text-sm font-medium text-on-surface-muted">Novo Produto</p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-on-surface-muted">
        Mostrando {filtered.length} de 124 produtos
      </div>
    </div>
  );
}
