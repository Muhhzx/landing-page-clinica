import { Injectable, effect, signal } from '@angular/core';
import { Agendamento, NovoAgendamento, StatusAgendamento, segundaDe, toIso } from './agendamento.model';

const CHAVE = 'clinica-aurora-agenda';
const DOCS = ['Dra. Helena Duarte', 'Dr. Bruno Alves'];

// Dados de exemplo gerados na semana atual, para a demo sempre parecer viva.
function exemplo(): Agendamento[] {
  const seg = segundaDe(new Date());
  const lin = (dia: number, hora: string, paciente: string, tratamento: string, doc: number, status: StatusAgendamento): Agendamento => {
    const d = new Date(seg); d.setDate(d.getDate() + dia);
    return { id: crypto.randomUUID(), paciente, tratamento, profissional: DOCS[doc], data: toIso(d), hora, status };
  };
  return [
    lin(0, '09:00', 'Camila Ribeiro', 'Clareamento dental', 0, 'confirmado'),
    lin(0, '14:00', 'Rafael Moura', 'Lentes de contato dental', 1, 'agendado'),
    lin(1, '10:00', 'Helena Tavares', 'Implantes', 1, 'confirmado'),
    lin(1, '15:00', 'Lucas Fernandes', 'Limpeza e profilaxia', 0, 'agendado'),
    lin(2, '09:00', 'Marina Costa', 'Alinhadores invisíveis', 0, 'concluido'),
    lin(2, '11:00', 'Pedro Nogueira', 'Limpeza e profilaxia', 1, 'cancelado'),
    lin(3, '16:00', 'Juliana Prado', 'Clareamento dental', 0, 'agendado'),
    lin(4, '08:00', 'Thiago Barros', 'Implantes', 1, 'confirmado'),
    lin(4, '13:00', 'Aline Duarte', 'Lentes de contato dental', 0, 'agendado'),
  ];
}

@Injectable({ providedIn: 'root' })
export class AgendaService {
  readonly itens = signal<Agendamento[]>(this.carregar());

  constructor() {
    effect(() => {
      try { localStorage.setItem(CHAVE, JSON.stringify(this.itens())); } catch { /* storage indisponível */ }
    });
  }

  adicionar(dados: NovoAgendamento): void {
    this.itens.update(l => [...l, { ...dados, id: crypto.randomUUID(), status: 'agendado' }]);
  }

  mudarStatus(id: string, status: StatusAgendamento): void {
    this.itens.update(l => l.map(a => (a.id === id ? { ...a, status } : a)));
  }

  private carregar(): Agendamento[] {
    try {
      const bruto = localStorage.getItem(CHAVE);
      if (bruto) return JSON.parse(bruto) as Agendamento[];
    } catch { /* usa o exemplo */ }
    return exemplo();
  }
}
