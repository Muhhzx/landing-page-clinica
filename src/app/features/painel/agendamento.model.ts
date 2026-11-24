export type StatusAgendamento = 'agendado' | 'confirmado' | 'concluido' | 'cancelado';

export const STATUS: StatusAgendamento[] = ['agendado', 'confirmado', 'concluido', 'cancelado'];
export const STATUS_LABEL: Record<StatusAgendamento, string> = {
  agendado: 'Agendado', confirmado: 'Confirmado', concluido: 'Concluído', cancelado: 'Cancelado',
};

export interface Agendamento {
  id: string;
  paciente: string;
  tratamento: string;
  profissional: string;
  data: string; // AAAA-MM-DD
  hora: string; // HH:mm
  status: StatusAgendamento;
}

export type NovoAgendamento = Omit<Agendamento, 'id' | 'status'>;

const dois = (n: number) => String(n).padStart(2, '0');
export const toIso = (d: Date) => `${d.getFullYear()}-${dois(d.getMonth() + 1)}-${dois(d.getDate())}`;
export const dataBr = (iso: string) => iso.split('-').reverse().slice(0, 2).join('/');

export function segundaDe(d: Date): Date {
  const r = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  r.setDate(r.getDate() - ((r.getDay() + 6) % 7));
  return r;
}
