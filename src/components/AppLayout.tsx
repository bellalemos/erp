import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Package, Users, ShoppingCart, DollarSign, 
  Settings, HelpCircle, Search, Bell, Clock, UserCircle 
} from "lucide-react";

const navItems = [
  { to: "/", label: "Painel", icon: LayoutDashboard },
  { to: "/inventory", label: "Estoque", icon: Package },
  { to: "/crm", label: "Clientes", icon: Users },
  { to: "/pos", label: "Caixa", icon: ShoppingCart },
  { to: "/finance", label: "Financeiro", icon: DollarSign },
];

const topNavTabs: Record<string, { label: string; tabs: string[] }> = {
  "/": { label: "", tabs: ["Entrada"] },
  "/inventory": { label: "Controle de Estoque", tabs: ["Entrada", "Saída", "Relatórios"] },
  "/crm": { label: "Gestão de Clientes", tabs: ["Entrada", "Saída", "Relatórios"] },
  "/pos": { label: "Gestão de Clientes", tabs: ["Entrada", "Saída", "Relatórios"] },
  "/finance": { label: "", tabs: ["Entrada", "Saída", "Relatórios"] },
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const currentNav = topNavTabs[location.pathname] || topNavTabs["/"];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="h-screen w-64 flex flex-col fixed left-0 top-0 z-50 bg-sidebar border-r border-sidebar-border py-8 text-[13px] uppercase font-bold tracking-tight">
        <div className="px-5 text-lg font-black tracking-tighter text-sidebar-primary border-b border-sidebar-border pb-4 mb-6">
          Absolute Ledger
          <div className="text-[10px] font-normal tracking-widest text-sidebar-foreground mt-1">
            ERP Varejo v1.0
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-3 transition-colors duration-150 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground border-l-4 border-sidebar-primary"
                    : "text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent/50"
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-sidebar-border space-y-1">
          <a href="#" className="flex items-center gap-3 text-sidebar-foreground hover:text-sidebar-primary px-5 py-3 transition-colors hover:bg-sidebar-accent/50">
            <Settings size={20} />
            <span>Configurações</span>
          </a>
          <a href="#" className="flex items-center gap-3 text-sidebar-foreground hover:text-sidebar-primary px-5 py-3 transition-colors hover:bg-sidebar-accent/50">
            <HelpCircle size={20} />
            <span>Suporte</span>
          </a>
          <div className="px-5 mt-6">
            <button className="w-full bg-sidebar-primary text-sidebar-primary-foreground py-3 text-center font-black active:scale-95 transition-transform">
              ABRIR CAIXA
            </button>
          </div>
        </div>
      </aside>

      {/* Main area */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top bar */}
        <header className="w-full h-16 border-b border-outline-variant/20 sticky top-0 z-40 bg-surface-container-low flex items-center justify-between px-8 text-sm font-medium tracking-wide">
          <div className="flex items-center gap-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={16} />
              <input
                className="bg-transparent border-none focus:ring-0 focus:outline-none pl-10 text-sm w-64 placeholder:text-outline"
                placeholder="Buscar dados..."
                type="text"
              />
            </div>
            <nav className="flex gap-6">
              {currentNav.tabs.map((tab, i) => (
                <a
                  key={tab}
                  href="#"
                  className={`h-16 flex items-center transition-colors ${
                    i === 0
                      ? "text-on-surface border-b-2 border-on-surface"
                      : "text-outline hover:text-on-surface"
                  }`}
                >
                  {tab}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <button className="bg-primary text-primary-foreground px-4 py-2 text-xs font-bold uppercase tracking-tight active:scale-95 transition-transform">
              Nova Transação
            </button>
            <div className="flex items-center gap-4 text-outline">
              <Bell size={20} className="cursor-pointer hover:text-on-surface transition-colors" />
              <Clock size={20} className="cursor-pointer hover:text-on-surface transition-colors" />
              <UserCircle size={24} className="cursor-pointer hover:text-on-surface transition-colors" />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8 bg-surface min-h-[calc(100vh-4rem)]">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
