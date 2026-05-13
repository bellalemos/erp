import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, ShoppingCart, Package, Boxes, Settings,
  Search, Bell, HelpCircle, LogOut, Plus, UserCircle
} from "lucide-react";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/vendas", label: "Vendas", icon: ShoppingCart },
  { to: "/produtos", label: "Produtos", icon: Package },
  { to: "/estoque", label: "Estoque", icon: Boxes },
  { to: "/financeiro", label: "Financeiro", icon: LayoutDashboard },
  { to: "/settings", label: "Configurações", icon: Settings },
];

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="h-screen w-64 flex flex-col fixed left-0 top-0 z-50 bg-surface-low py-6">
        <div className="px-6 mb-8">
          <h1 className="font-heading text-xl font-bold text-foreground tracking-tight">
            Curated Ledger
          </h1>
          <p className="text-xs text-on-surface-muted mt-0.5">ERP Varejo v2.0</p>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-[10px] text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-surface-lowest text-primary shadow-card font-semibold"
                    : "text-on-surface-muted hover:bg-surface-lowest/60 hover:text-foreground"
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="px-3 mt-auto space-y-1">
          <a href="#" className="flex items-center gap-3 text-on-surface-muted hover:text-foreground px-4 py-2.5 rounded-[10px] text-sm transition-colors hover:bg-surface-lowest/60">
            <HelpCircle size={18} />
            <span>Suporte</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-on-surface-muted hover:text-foreground px-4 py-2.5 rounded-[10px] text-sm transition-colors hover:bg-surface-lowest/60">
            <LogOut size={18} />
            <span>Sair</span>
          </a>
        </div>
      </aside>

      {/* Main area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top bar */}
        <header className="w-full h-16 sticky top-0 z-40 bg-background flex items-center justify-between px-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted" size={16} />
            <input
              className="bg-surface-lowest border-none border-b-2 border-b-transparent focus:border-b-secondary rounded-t-[10px] rounded-b-none pl-10 pr-4 py-2.5 text-sm w-72 placeholder:text-on-surface-muted outline-none transition-colors"
              placeholder="Buscar dados..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-lg text-on-surface-muted hover:text-foreground hover:bg-surface-low transition-colors">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error rounded-full" />
            </button>
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-semibold">
              AL
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8 bg-background min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
