import { useEffect, useState } from "react";
import { Grid3X3, List, Plus, Download, Package, X, Pencil, Trash2, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Product = {
  id: string;
  name: string;
  sku: string;
  category: string | null;
  price: number;
  stock_quantity: number;
  unit: string;
  tags: string[];
  status: string;
};

type Category = { id: string; name: string };

function statusFromStock(qty: number) {
  if (qty === 0) return "ESGOTADO";
  if (qty < 5) return "ESTOQUE BAIXO";
  return "EM ESTOQUE";
}
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
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const load = async () => {
    const [{ data: prods }, { data: cats }] = await Promise.all([
      supabase.from("products").select("*").eq("status", "ativo").order("created_at", { ascending: false }),
      supabase.from("product_categories").select("*").order("name"),
    ]);
    setProducts((prods as Product[]) || []);
    setCategories((cats as Category[]) || []);
  };

  useEffect(() => { load(); }, []);

  const allCats = ["Todos", ...categories.map(c => c.name)];
  const filtered = activeCategory === "Todos" ? products : products.filter(p => p.category === activeCategory);

  const openNew = () => { setDrawerProduct(null); setDrawerOpen(true); };
  const openEdit = (p: Product) => { setDrawerProduct(p); setDrawerOpen(true); };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-on-surface-muted mb-1">Início / Produtos</p>
          <h1 className="font-heading text-3xl font-bold text-foreground">Catálogo de Produtos</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={16} /> Exportar
          </button>
          <button className="btn-primary flex items-center gap-2 text-sm" onClick={openNew}>
            <Plus size={16} /> Novo Produto
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 flex-wrap">
          {allCats.map((cat) => (
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

      <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" : "space-y-3"}>
        {filtered.map((product) => {
          const status = statusFromStock(product.stock_quantity);
          return viewMode === "grid" ? (
            <button key={product.id} onClick={() => openEdit(product)} className="card-surface p-5 hover:shadow-modal transition-shadow text-left">
              <div className="w-full h-36 bg-surface-low rounded-lg flex items-center justify-center mb-4">
                <Package size={40} className="text-on-surface-muted/30" />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className={`chip ${statusChip(status)}`}>{status}</span>
                <span className="text-xs text-on-surface-muted">{product.stock_quantity} un.</span>
              </div>
              <p className="text-xs text-on-surface-muted">{product.sku}</p>
              <p className="text-sm font-semibold text-foreground mt-1">{product.name}</p>
              <p className="font-heading text-lg font-bold text-foreground mt-2">
                {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </p>
            </button>
          ) : (
            <button key={product.id} onClick={() => openEdit(product)} className="card-surface p-4 flex items-center justify-between w-full text-left hover:shadow-modal transition-shadow">
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
                <span className="text-sm text-on-surface-muted">{product.stock_quantity} un.</span>
                <span className={`chip ${statusChip(status)}`}>{status}</span>
                <span className="font-heading font-bold text-foreground">
                  {Number(product.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                </span>
              </div>
            </button>
          );
        })}
        {viewMode === "grid" && (
          <button onClick={openNew} className="card-surface p-5 flex items-center justify-center border-2 border-dashed border-border hover:border-primary/30 transition-colors min-h-[260px]">
            <div className="text-center">
              <Plus size={32} className="mx-auto text-on-surface-muted mb-2" />
              <p className="text-sm font-medium text-on-surface-muted">Novo Produto</p>
            </div>
          </button>
        )}
      </div>

      <div className="mt-6 text-center text-sm text-on-surface-muted">
        Mostrando {filtered.length} de {products.length} produtos
      </div>

      {drawerOpen && (
        <ProductDrawer
          product={drawerProduct}
          categories={categories}
          onClose={() => setDrawerOpen(false)}
          onSaved={() => { setDrawerOpen(false); load(); }}
          reloadCategories={async () => {
            const { data } = await supabase.from("product_categories").select("*").order("name");
            setCategories((data as Category[]) || []);
          }}
        />
      )}
    </div>
  );
}

function ProductDrawer({
  product, categories, onClose, onSaved, reloadCategories,
}: {
  product: Product | null;
  categories: Category[];
  onClose: () => void;
  onSaved: () => void;
  reloadCategories: () => Promise<void>;
}) {
  const isEdit = !!product;
  const [name, setName] = useState(product?.name ?? "");
  const [sku, setSku] = useState(product?.sku ?? "");
  const [category, setCategory] = useState(product?.category ?? "");
  const [price, setPrice] = useState(product ? String(product.price) : "");
  const [stock, setStock] = useState(product ? String(product.stock_quantity) : "");
  const [unit, setUnit] = useState(product?.unit ?? "UN");
  const [tags, setTags] = useState<string[]>(product?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [manageCats, setManageCats] = useState(false);

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
    }
  };

  const submit = async () => {
    if (!name.trim() || !sku.trim() || !category) {
      toast.error("Preencha nome, SKU e categoria");
      return;
    }
    setSaving(true);
    const payload = {
      name: name.trim(),
      sku: sku.trim(),
      category,
      price: Number(String(price).replace(",", ".")) || 0,
      stock_quantity: Number(stock) || 0,
      unit,
      tags,
      status: "ativo",
    };
    const { error } = isEdit
      ? await supabase.from("products").update(payload).eq("id", product!.id)
      : await supabase.from("products").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(isEdit ? "Produto atualizado" : "Produto cadastrado");
    onSaved();
  };

  const remove = async () => {
    if (!product) return;
    if (!confirm(`Excluir "${product.name}"?`)) return;
    const { error } = await supabase.from("products").delete().eq("id", product.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Produto excluído");
    onSaved();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" />
      <div
        className="relative bg-surface-lowest w-full max-w-md h-full overflow-y-auto shadow-modal animate-in slide-in-from-right duration-200"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-start justify-between p-6 pb-4">
          <div>
            <h2 className="font-heading text-xl font-bold text-foreground">{isEdit ? "Editar Produto" : "Novo Produto"}</h2>
            <p className="text-sm text-on-surface-muted mt-0.5">
              {isEdit ? "Altere as informações e salve." : "Adicione um novo item ao seu catálogo mestre."}
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-on-surface-muted hover:text-foreground"><X size={20} /></button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <Field label="Nome do Produto">
            <input value={name} onChange={e => setName(e.target.value)} className="input-field" placeholder="Ex.: Luminária Mesa LED" />
          </Field>
          <Field label="SKU">
            <input value={sku} onChange={e => setSku(e.target.value)} className="input-field" placeholder="Ex.: LUM-001" />
          </Field>

          <Field label="Categoria">
            <div className="flex gap-2 items-start">
              <select value={category} onChange={e => setCategory(e.target.value)} className="input-field flex-1">
                <option value="">Escolha uma categoria</option>
                {categories.map(c => <option key={c.id} value={c.name}>{c.name}</option>)}
              </select>
              <button
                type="button"
                onClick={() => setManageCats(v => !v)}
                title="Gerenciar categorias"
                className="p-2.5 rounded-lg text-on-surface-muted hover:text-foreground hover:bg-surface-low transition-colors"
              >
                <Pencil size={15} />
              </button>
            </div>
            {manageCats && (
              <CategoryManager
                categories={categories}
                onChanged={async (renamedFrom, renamedTo) => {
                  await reloadCategories();
                  if (renamedFrom && category === renamedFrom) setCategory(renamedTo ?? "");
                }}
              />
            )}
            <NewCategoryInline onCreated={async (name) => { await reloadCategories(); setCategory(name); }} />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Preço de Venda">
              <div className="flex items-center bg-surface-low rounded-lg pl-3">
                <span className="text-sm text-on-surface-muted">R$</span>
                <input value={price} onChange={e => setPrice(e.target.value)} className="bg-transparent px-2 py-2.5 text-sm w-full outline-none border-none" placeholder="0,00" />
              </div>
            </Field>
            <Field label="Quantidade em Estoque">
              <input type="number" value={stock} onChange={e => setStock(e.target.value)} className="input-field" placeholder="0" />
            </Field>
          </div>

          <Field label="Unidade de Medida">
            <select value={unit} onChange={e => setUnit(e.target.value)} className="input-field">
              <option value="UN">Unidade (UN)</option>
              <option value="KG">Kilograma (KG)</option>
              <option value="CX">Caixa (CX)</option>
              <option value="LT">Litro (LT)</option>
            </select>
          </Field>

          <Field label="Tags do Produto">
            <div className="bg-surface-low rounded-lg p-2 flex flex-wrap gap-2 min-h-[44px]">
              {tags.map((t, i) => (
                <span key={i} className="chip chip-info flex items-center gap-1">
                  {t}
                  <button onClick={() => setTags(tags.filter((_, j) => j !== i))} className="hover:opacity-70"><X size={12} /></button>
                </span>
              ))}
              <input value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKey}
                className="bg-transparent text-sm outline-none flex-1 min-w-[120px] px-1" placeholder="Pressione Enter para adicionar" />
            </div>
          </Field>
        </div>

        <div className="sticky bottom-0 flex justify-between gap-3 px-6 py-4 bg-surface-lowest border-t border-border">
          {isEdit ? (
            <button className="text-sm text-error hover:opacity-70 flex items-center gap-1.5" onClick={remove}>
              <Trash2 size={14} /> Excluir
            </button>
          ) : <span />}
          <div className="flex gap-3">
            <button className="btn-secondary text-sm" onClick={onClose}>Cancelar</button>
            <button className="btn-primary text-sm" disabled={saving} onClick={submit}>
              {isEdit ? "Salvar Alterações" : "Cadastrar Produto"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function NewCategoryInline({ onCreated }: { onCreated: (name: string) => Promise<void> }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const add = async () => {
    if (!name.trim()) return;
    const { error } = await supabase.from("product_categories").insert({ name: name.trim() });
    if (error) { toast.error(error.message); return; }
    await onCreated(name.trim());
    setName(""); setOpen(false);
    toast.success("Categoria criada");
  };
  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="mt-2 text-xs text-primary hover:opacity-80">+ Nova categoria</button>
    );
  }
  return (
    <div className="mt-2 flex gap-2">
      <input value={name} onChange={e => setName(e.target.value)} className="input-field flex-1 text-sm" placeholder="Nome da nova categoria" autoFocus />
      <button type="button" onClick={add} className="btn-primary text-xs px-3">Salvar</button>
      <button type="button" onClick={() => { setOpen(false); setName(""); }} className="btn-secondary text-xs px-3">×</button>
    </div>
  );
}

function CategoryManager({
  categories, onChanged,
}: {
  categories: Category[];
  onChanged: (renamedFrom?: string, renamedTo?: string) => Promise<void>;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const startEdit = (c: Category) => { setEditingId(c.id); setEditValue(c.name); };

  const saveEdit = async (c: Category) => {
    const newName = editValue.trim();
    if (!newName || newName === c.name) { setEditingId(null); return; }
    // update category row + all products that reference the old name
    const { error } = await supabase.from("product_categories").update({ name: newName }).eq("id", c.id);
    if (error) { toast.error(error.message); return; }
    await supabase.from("products").update({ category: newName }).eq("category", c.name);
    toast.success("Categoria renomeada");
    setEditingId(null);
    await onChanged(c.name, newName);
  };

  const remove = async (c: Category) => {
    const { count } = await supabase.from("products").select("id", { count: "exact", head: true }).eq("category", c.name);
    if ((count ?? 0) > 0) {
      toast.error(`Não é possível excluir: ${count} produto(s) usam essa categoria`);
      return;
    }
    if (!confirm(`Excluir categoria "${c.name}"?`)) return;
    const { error } = await supabase.from("product_categories").delete().eq("id", c.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Categoria excluída");
    await onChanged();
  };

  return (
    <div className="mt-2 bg-surface-low rounded-lg p-2 space-y-1">
      {categories.length === 0 && <p className="text-xs text-on-surface-muted px-2 py-1">Nenhuma categoria cadastrada</p>}
      {categories.map(c => (
        <div key={c.id} className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-surface-lowest">
          {editingId === c.id ? (
            <>
              <input
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") saveEdit(c); if (e.key === "Escape") setEditingId(null); }}
                className="bg-surface-lowest rounded px-2 py-1 text-sm flex-1 outline-none border-none"
                autoFocus
              />
              <button onClick={() => saveEdit(c)} className="text-primary p-1"><Check size={14} /></button>
              <button onClick={() => setEditingId(null)} className="text-on-surface-muted p-1"><X size={14} /></button>
            </>
          ) : (
            <>
              <span className="text-sm text-foreground flex-1">{c.name}</span>
              <button onClick={() => startEdit(c)} className="text-on-surface-muted hover:text-foreground p-1"><Pencil size={13} /></button>
              <button onClick={() => remove(c)} className="text-on-surface-muted hover:text-error p-1"><Trash2 size={13} /></button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">{label}</label>
      {children}
    </div>
  );
}
