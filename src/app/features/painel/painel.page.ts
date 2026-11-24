import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SERVICOS } from '../clinica/clinica.data';
import { AgendaService } from './agenda.service';
import { CHAVE_SESSAO_PAINEL } from './painel.guard';
import { Agendamento, NovoAgendamento, STATUS, STATUS_LABEL, StatusAgendamento, dataBr, segundaDe, toIso } from './agendamento.model';

const HORAS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
const DIAS = ['seg', 'ter', 'qua', 'qui', 'sex', 'sáb'];

@Component({
  selector: 'app-painel-page',
  imports: [RouterLink],
  templateUrl: './painel.page.html',
  styleUrl: './painel.page.scss',
})
export class PainelPage {
  private readonly agenda = inject(AgendaService);
  private readonly router = inject(Router);

  readonly status = STATUS;
  readonly rotulo = STATUS_LABEL;
  readonly horas = HORAS;
  readonly tratamentos = SERVICOS.map(s => s.nome);
  readonly profissionais = ['Dra. Helena Duarte', 'Dr. Bruno Alves'];
  readonly dataBr = dataBr;

  readonly visao = signal<'lista' | 'semana'>('lista');
  readonly filtro = signal<StatusAgendamento | 'todos'>('todos');
  readonly busca = signal('');
  readonly inicio = signal(segundaDe(new Date()));
  readonly formAberto = signal(false);
  readonly novo = signal<NovoAgendamento>(this.vazio());

  readonly filtrados = computed(() => {
    const q = this.busca().trim().toLowerCase();
    const f = this.filtro();
    return this.agenda.itens()
      .filter(a => (f === 'todos' || a.status === f) && (!q || (a.paciente + a.tratamento).toLowerCase().includes(q)))
      .sort((x, y) => (x.data + x.hora).localeCompare(y.data + y.hora));
  });

  readonly contagem = computed(() => {
    const c: Record<string, number> = { todos: this.agenda.itens().length };
    STATUS.forEach(s => (c[s] = this.agenda.itens().filter(a => a.status === s).length));
    return c;
  });

  readonly dias = computed(() =>
    DIAS.map((nome, i) => {
      const d = new Date(this.inicio());
      d.setDate(d.getDate() + i);
      return { iso: toIso(d), rotulo: `${nome} ${d.getDate()}` };
    }));

  readonly titulo = computed(() => `${dataBr(this.dias()[0].iso)} a ${dataBr(this.dias()[5].iso)}`);

  readonly mapa = computed(() => {
    const m = new Map<string, Agendamento[]>();
    for (const a of this.filtrados()) {
      const k = `${a.data}|${a.hora}`;
      m.set(k, [...(m.get(k) ?? []), a]);
    }
    return m;
  });

  mudar(a: Agendamento, s: StatusAgendamento): void { this.agenda.mudarStatus(a.id, s); }

  /** Encerra a sessão de demonstração do painel e volta para o site. */
  sair(): void {
    sessionStorage.removeItem(CHAVE_SESSAO_PAINEL);
    this.router.navigateByUrl('/clinica');
  }

  semana(delta: number): void {
    this.inicio.update(d => { const n = new Date(d); n.setDate(n.getDate() + delta * 7); return n; });
  }

  campo(k: keyof NovoAgendamento, e: Event): void {
    const v = (e.target as HTMLInputElement | HTMLSelectElement).value;
    this.novo.update(n => ({ ...n, [k]: v }));
  }

  salvar(): void {
    const n = this.novo();
    if (!n.paciente.trim() || !n.data) return;
    this.agenda.adicionar({ ...n, paciente: n.paciente.trim() });
    this.novo.set(this.vazio());
    this.formAberto.set(false);
  }

  private vazio(): NovoAgendamento {
    return { paciente: '', tratamento: SERVICOS[0].nome, profissional: 'Dra. Helena Duarte', data: toIso(new Date()), hora: '09:00' };
  }
}
