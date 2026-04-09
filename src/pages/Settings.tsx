import { useState } from "react";
import { User, Bell, ShoppingBag, Shield, Globe, Save, X } from "lucide-react";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    vendas: true,
    estoque: true,
    integracoes: false,
  });

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold text-foreground">Configurações</h1>
        <p className="text-on-surface-muted text-sm mt-1">Gerencie seu perfil e preferências do sistema</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          {/* Perfil */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-6">
              <User size={18} className="text-primary" />
              <h2 className="font-heading text-lg font-semibold text-foreground">Perfil do Usuário</h2>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shrink-0">
                AL
              </div>
              <div className="flex-1 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">Nome</label>
                    <input defaultValue="André Lemos" className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none" />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">Cargo</label>
                    <input defaultValue="Gerente de Loja" className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-medium text-on-surface-muted uppercase tracking-wide block mb-1.5">E-mail</label>
                  <input defaultValue="andre@curatedledger.com" className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell size={18} className="text-primary" />
              <h2 className="font-heading text-lg font-semibold text-foreground">Notificações</h2>
            </div>
            <div className="space-y-4">
              {[
                { key: "vendas", label: "Relatórios de Vendas", desc: "Receba resumos diários de vendas" },
                { key: "estoque", label: "Alertas de Estoque", desc: "Notificações de estoque baixo e crítico" },
                { key: "integracoes", label: "Novas Integrações", desc: "Atualizações sobre canais conectados" },
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-on-surface-muted">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => setNotifications(prev => ({ ...prev, [item.key]: !prev[item.key as keyof typeof prev] }))}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      notifications[item.key as keyof typeof notifications] ? 'bg-tertiary' : 'bg-surface-low'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-surface-lowest shadow-sm transition-transform ${
                      notifications[item.key as keyof typeof notifications] ? 'left-[22px]' : 'left-0.5'
                    }`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Segurança */}
          <div className="card-surface p-6">
            <div className="flex items-center gap-2 mb-6">
              <Shield size={18} className="text-primary" />
              <h2 className="font-heading text-lg font-semibold text-foreground">Segurança</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Alterar Senha</p>
                  <p className="text-xs text-on-surface-muted">Última alteração há 30 dias</p>
                </div>
                <button className="btn-secondary text-sm !py-2">Alterar</button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm font-medium text-foreground">Autenticação 2FA</p>
                  <p className="text-xs text-on-surface-muted">Adicione uma camada extra de segurança</p>
                </div>
                <span className="chip chip-warning">Desativado</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-5">
          {/* E-commerce */}
          <div className="card-surface p-5">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingBag size={18} className="text-primary" />
              <h3 className="font-heading text-base font-semibold text-foreground">E-commerce & Canais</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-xs font-bold text-primary">S</div>
                  <span className="text-sm font-medium text-foreground">Shopify</span>
                </div>
                <span className="chip chip-success">Conectado</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-xs font-bold text-primary">ML</div>
                  <span className="text-sm font-medium text-foreground">Mercado Livre</span>
                </div>
                <button className="btn-secondary text-xs !py-1.5 !px-3">Configurar</button>
              </div>
            </div>
          </div>

          {/* Localização */}
          <div className="card-surface p-5">
            <div className="flex items-center gap-2 mb-4">
              <Globe size={18} className="text-primary" />
              <h3 className="font-heading text-base font-semibold text-foreground">Localização & Idioma</h3>
            </div>
            <select className="bg-surface-low rounded-lg px-4 py-2.5 text-sm w-full outline-none border-none">
              <option>Português (Brasil)</option>
              <option>English (US)</option>
              <option>Español</option>
            </select>
          </div>

          {/* Info */}
          <div className="card-surface p-5">
            <p className="text-xs text-on-surface-muted">Última alteração: 09/04/2026 às 14:30</p>
            <div className="flex gap-3 mt-4">
              <button className="btn-secondary flex-1 text-sm flex items-center justify-center gap-1">
                <X size={14} /> Descartar
              </button>
              <button className="btn-primary flex-1 text-sm flex items-center justify-center gap-1">
                <Save size={14} /> Salvar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
