import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { rastrearEvento } from '../../shared/analytics';
import { whatsappLink } from '../../shared/whatsapp';
import { CONTATO, CONVENIOS, DEPOIMENTOS, DIFERENCIAIS, FAQ, SERVICOS } from './clinica.data';

@Component({
  selector: 'app-clinica-page',
  imports: [RouterLink],
  templateUrl: './clinica.page.html',
  styleUrl: './clinica.page.scss',
})
export class ClinicaPage {
  private readonly sanitizer = inject(DomSanitizer);

  readonly servicos = SERVICOS;
  readonly diferenciais = DIFERENCIAIS;
  readonly depoimentos = DEPOIMENTOS;
  readonly faq = FAQ;
  readonly convenios = CONVENIOS;
  readonly contato = CONTATO;

  readonly mapaSrc: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    `https://www.google.com/maps?q=${encodeURIComponent(this.contato.mapsQuery)}&output=embed`,
  );

  readonly nome = signal('');
  readonly nomeTocado = signal(false);
  readonly tratamento = signal(SERVICOS[0].nome);
  readonly aceitaPrivacidade = signal(false);
  readonly perguntaAberta = signal<number | null>(null);

  readonly nomeValido = computed(() => this.nome().trim().length >= 3);
  readonly formValido = computed(() => this.nomeValido() && this.aceitaPrivacidade());

  readonly linkAvaliacao = whatsappLink('Olá! Gostaria de agendar uma avaliação.');

  readonly linkFormulario = computed(() =>
    whatsappLink(`Olá! Sou ${this.nome().trim() || 'um novo paciente'} e tenho interesse em: ${this.tratamento()}.`),
  );

  definirNome(valor: string): void {
    this.nome.set(valor);
  }

  marcarNomeTocado(): void {
    this.nomeTocado.set(true);
  }

  alternarPergunta(indice: number): void {
    this.perguntaAberta.update(atual => (atual === indice ? null : indice));
  }

  rastrearClique(origem: string): void {
    rastrearEvento('clique_whatsapp', { origem });
  }

  enviarFormulario(evento: Event): void {
    this.marcarNomeTocado();
    if (!this.formValido()) {
      evento.preventDefault();
      return;
    }
    this.rastrearClique('formulario_agendar');
  }

  /** Holofote dourado que acompanha o mouse dentro do card. */
  spot(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }

  /** Inclinação suave do cartão e leve paralaxe do dente. */
  tilt(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty('--ry', `${x * 8}deg`);
    el.style.setProperty('--rx', `${-y * 8}deg`);
    el.style.setProperty('--px', `${x * -14}px`);
    el.style.setProperty('--py', `${y * -14}px`);
  }

  reset(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    ['--rx', '--ry', '--px', '--py'].forEach(p => el.style.removeProperty(p));
  }
}
