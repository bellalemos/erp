import { useEffect, useState } from "react";
import { DollarSign, ArrowUpRight, ArrowDownRight, TrendingUp, AlertCircle, Plus, Calendar, X, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

type Schedule = {
  id: string;
  description: string;
  amount: number;
  due_date: string;
  type: "receber" | "pagar";
  status: string;
  customer_id: string | null;
  created_at: string;
};

type Customer = { id: string; name: string };

function statusChip(status: string) {
  const s = status.toUpperCase();
  switch (s) {
    case "PAGO": case "RECEBIDO": return "chip-success";
    case "PENDENTE": return "chip-warning";
    case "AGENDADO": return "chip-info";
    case "CRÍTICO": case "CANCELADO": return "chip-error";
    case "ESTE MÊS": return "chip-info";
    default: return "chip-info";
  }
}

const fmt = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function Finance() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [drawer, setDrawer] = useState<Schedule | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const load = async () => {
    const [{ data: sch }, { data: cust }] = await Promise.all([
      supabase.from("financial_schedules").select("*").order("due_date", { ascending: true }),
      supabase.from("customers").select("id,name").order("name"),
    ]);
    setSchedules((sch as Schedule[]) || []);
    setCustomers((cust as Customer[]) || []);
  };

  useEffect(() => { load(); }, []);

  const openNew = () => { setDrawer(null); setDrawerOpen(true); };
  const openEdit = (s: Schedule) => { setDrawer(s); setDrawerOpen(true); };

  const now = new Date();
  const receber = schedules.filter(s => s.type === "receber");
  const pagar = schedules.filter(s => s.type === "pagar");
  const totalReceber = receber.filter(s => s.status !== "pago").reduce((a, s) => a + Number(s.amount), 0);
  const totalPagar = pagar.filter(s => s.status !== "pago").reduce((a, s) => a + Number(s.amount), 0);
  const saldo = totalReceber - totalPagar + 200000; // saldo base ilustrativo
  const projecao = saldo + totalReceber * 0.4;

  const proximos = schedules
    .filter(s => s.status !== "pago" && s.status !== "recebido")
    .slice(0, 6);

  const atividade = [...schedules]
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
    .slice(0, 6);

  const kpis = [
    { label: "Saldo Atual", value: fmt(saldo), change: "+2.4%", positive: true, icon: DollarSign, badge: null },
    { label: "Contas a Receber", value: fmt(totalReceber), change: null, positive: true, icon: ArrowUpRight, badge: "ESTE MÊS" },
    { label: "Contas a Pagar", value: fmt(totalPagar), change: null, positive: false, icon: ArrowDownRight, badge: totalPagar > 20000 ? "CRÍTICO" : "ATENÇÃO" },
    { label: "Projeção Final", value: fmt(projecao), change: "+4.2%", positive: true, icon: TrendingUp, badge: null, highlight: true },
  ];

  // weekly bars for month estimate
  const weeks = [1, 2, 3, 4].map(w => {
    const realizado = schedules
      .filter(s => s.status === "pago" || s.status === "recebido")
      .filter(s => {
        const d = parseISO(s.due_date);
        return d.getMonth() === now.getMonth() && Math.ceil(d.getDate() / 7) === w;
      })
      .reduce((a, s) => a + Number(s.amount), 0);
    const previsto = schedules
      .filter(s => {
        const d = parseISO(s.due_date);
        return d.getMonth() === now.getMonth() && Math.ceil(d.getDate() / 7) === w;
      })
      .reduce((a, s) => a + Number(s.amount), 0);
    return { label: `Sem ${w}`, realizado, previsto };
  });
  const maxBar = Math.max(1, ...weeks.flatMap(w => [w.realizado, w.previsto]));

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-heading text-3xl font-bold text-foreground">Fluxo de Caixa</h1>
          <p className="text-on-surface-muted text-sm mt-1">Controle financeiro e projeções</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm" onClick={openNew}>
          <Plus size={16} /> Novo Agendamento
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className={`card-surface p-5 relative ${(kpi as any).highlight ? '!bg-secondary text-secondary-foreground' : ''}`}>
            {kpi.badge && <span className={`absolute top-4 right-4 chip ${statusChip(kpi.badge)} text-xs`}>{kpi.badge}</span>}
            {kpi.change && <span className={`absolute top-4 right-4 chip ${kpi.positive ? 'chip-success' : 'chip-error'} text-xs`}>{kpi.change}</span>}
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${(kpi as any).highlight ? 'bg-secondary-foreground/20' : 'bg-accent text-primary'}`}>
              <kpi.icon size={20} className={(kpi as any).highlight ? 'text-secondary-foreground' : ''} />
            </div>
            <p className={`text-xs font-medium uppercase tracking-wide ${(kpi as any).highlight ? 'text-secondary-foreground/70' : 'text-on-surface-muted'}`}>{kpi.label}</p>
            <p className={`font-heading text-2xl font-bold mt-1 ${(kpi as any).highlight ? '' : 'text-foreground'}`}>{kpi.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="card-surface p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Estimativa Mensal</h2>
            <div className="flex items-end gap-6 h-44">
              {weeks.map((sem) => (
                <div key={sem.label} className="flex-1 flex flex-col items-center gap-2">
                  <div className="flex gap-1 items-end w-full justify-center h-40">
                    <div className="w-5 rounded-t-md bg-secondary" style={{ height: `${(sem.realizado / maxBar) * 100}%` }} />
                    <div className="w-5 rounded-t-md" style={{ height: `${(sem.previsto / maxBar) * 100}%`, background: '#b3cde8' }} />
                  </div>
                  <span className="text-xs text-on-surface-muted">{sem.label}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4 text-xs text-on-surface-muted">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-secondary" /> Realizado</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm" style={{ background: '#b3cde8' }} /> Previsto</div>
            </div>
          </div>

          {totalReceber > 0 && (
            <div className="card-surface p-4 flex items-start gap-3 bg-accent/50">
              <AlertCircle size={18} className="text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-on-surface-muted">
                <strong className="text-foreground">Atenção:</strong> Há {fmt(totalReceber)} em recebíveis pendentes.
              </p>
            </div>
          )}

          <div className="card-surface p-6">
            <h2 className="font-heading text-lg font-semibold text-foreground mb-5">Atividade Recente</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-on-surface-muted text-xs uppercase tracking-wide">
                  <th className="text-left py-3 font-medium">Vencimento</th>
                  <th className="text-left py-3 font-medium">Descrição</th>
                  <th className="text-center py-3 font-medium">Tipo</th>
                  <th className="text-right py-3 font-medium">Valor</th>
                  <th className="text-center py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {atividade.length === 0 && (
                  <tr><td colSpan={5} className="py-8 text-center text-sm text-on-surface-muted">Nenhum agendamento ainda. Clique em "Novo Agendamento" para começar.</td></tr>
                )}
                {atividade.map((a) => (
                  <tr key={a.id} className="cursor-pointer hover:bg-surface-low/60" onClick={() => openEdit(a)}>
                    <td className="py-4 text-on-surface-muted">{format(parseISO(a.due_date), "dd/MM")}</td>
                    <td className="py-4 font-medium text-foreground">{a.description}</td>
                    <td className="py-4 text-center"><span className="chip chip-info">{a.type === "receber" ? "Receita" : "Despesa"}</span></td>
                    <td className={`py-4 text-right font-semibold ${a.type === "receber" ? 'value-positive' : 'value-negative'}`}>
                      {a.type === "receber" ? "+" : "-"}{fmt(Number(a.amount))}
                    </td>
                    <td className="py-4 text-center"><span className={`chip ${statusChip(a.status)}`}>{a.status.toUpperCase()}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-surface p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading text-base font-semibold text-foreground">Próximos Vencimentos</h3>
            <Calendar size={16} className="text-on-surface-muted" />
          </div>
          <div className="space-y-4">
            {proximos.length === 0 && (
              <p className="text-sm text-on-surface-muted py-4 text-center">Sem vencimentos pendentes.</p>
            )}
            {proximos.map((v) => (
              <button key={v.id} onClick={() => openEdit(v)} className="w-full text-left py-3 hover:bg-surface-low/60 rounded-md px-2 -mx-2 transition-colors">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-foreground">{v.description}</p>
                  <span className={`chip ${statusChip(v.status)} text-[10px]`}>{v.status.toUpperCase()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-on-surface-muted">{format(parseISO(v.due_date), "dd/MM")}</span>
                  <span className={`text-sm font-semibold ${v.type === "receber" ? "value-positive" : "value-negative"}`}>
                    {v.type === "receber" ? "+" : "-"}{fmt(Number(v.amount))}
                  </span>
                </div>
              </button>
            ))}
          </div>
          <button className="btn-primary w-full text-sm mt-4" onClick={openNew}>Novo Agendamento</button>
        </div>
      </div>

      {drawerOpen && (
        <ScheduleDrawer
          schedule={drawer}
          customers={customers}
          onClose={() => setDrawerOpen(false)}
          onSaved={() => { setDrawerOpen(false); load(); }}
        />
      )}
    </div>
  );
}

function ScheduleDrawer({
  schedule, customers, onClose, onSaved,
}: {
  schedule: Schedule | null;
  customers: Customer[];
  onClose: () => void;
  onSaved: () => void;
}) {
  const isEdit = !!schedule;
  const [description, setDescription] = useState(schedule?.description ?? "");
  const [amount, setAmount] = useState(schedule ? String(schedule.amount) : "");
  const [dueDate, setDueDate] = useState(schedule?.due_date ?? new Date().toISOString().slice(0, 10));
  const [type, setType] = useState<"receber" | "pagar">(schedule?.type ?? "receber");
  const [status, setStatus] = useState(schedule?.status ?? "pendente");
  const [customerId, setCustomerId] = useState(schedule?.customer_id ?? "");
  const [saving, setSaving] = useState(false);

  const submit = async () => {
    if (!description.trim() || !dueDate) {
      toast.error("Preencha descrição e data");
      return;
    }
    setSaving(true);
    const payload = {
      description: description.trim(),
      amount: Number(String(amount).replace(",", ".")) || 0,
      due_date: dueDate,
      type,
      status,
      customer_id: customerId || null,
    };
    const { error } = isEdit
      ? await supabase.from("financial_schedules").update(payload).eq("id", schedule!.id)
      : await supabase.from("financial_schedules").insert(payload);
    setSaving(false);
    if (error) { toast.error(error.message); return; }
    toast.success(isEdit ? "Agendamento atualizado" : "Agendamento criado");
    onSaved();
  };

  const remove = async () => {
    if (!schedule) return;
    if (!confirm("Excluir este agendamento?")) return;
    const { error } = await supabase.from("financial_schedules").delete().eq("id", schedule.id);
    if (error) { toast.error(error.message); return; }
    toast.success("Agendamento excluído");
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
            <h2 className="font-heading text-xl font-bold text-foreground">{isEdit ? "Editar Agendamento" : "Novo Agendamento"}</h2>
            <p className="text-sm text-on-surface-muted mt-0.5">
              {isEdit ? "Ajuste os detalhes e salve." : "Cadastre uma conta a pagar ou receber."}
            </p>
          </div>
          <button onClick={onClose} className="p-1 text-on-surface-muted hover:text-foreground"><X size={20} /></button>
        </div>

        <div className="px-6 pb-6 space-y-4">
          <Field label="Descrição">
            <input value={description} onChange={e => setDescription(e.target.value)} className="input-field" placeholder="Ex.: Fornecedor Alpha" />
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Valor">
              <div className="flex items-center bg-surface-low rounded-lg pl-3">
                <span className="text-sm text-on-surface-muted">R$</span>
                <input value={amount} onChange={e => setAmount(e.target.value)} className="bg-transparent px-2 py-2.5 text-sm w-full outline-none border-none" placeholder="0,00" />
              </div>
            </Field>
            <Field label="Vencimento">
              <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="input-field" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Tipo">
              <select value={type} onChange={e => setType(e.target.value as any)} className="input-field">
                <option value="receber">A Receber</option>
                <option value="pagar">A Pagar</option>
              </select>
            </Field>
            <Field label="Status">
              <select value={status} onChange={e => setStatus(e.target.value)} className="input-field">
                <option value="pendente">Pendente</option>
                <option value="agendado">Agendado</option>
                <option value="pago">Pago</option>
                <option value="recebido">Recebido</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </Field>
          </div>

          <Field label="Cliente (opcional)">
            <select value={customerId} onChange={e => setCustomerId(e.target.value)} className="input-field">
              <option value="">Sem cliente vinculado</option>
              {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
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
              {isEdit ? "Salvar" : "Cadastrar"}
            </button>
          </div>
        </div>
      </div>
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
