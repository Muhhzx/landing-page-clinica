import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const CHAVE_SESSAO_PAINEL = 'clinica-aurora-painel-autenticado';

// Senha de demonstração só para exemplificar, no portfólio, uma área interna protegida.
// Em produção isso seria substituído por login real (API + sessão/JWT), nunca por senha no front-end.
const SENHA_DEMO = 'aurora2026';

export const painelGuard: CanActivateFn = () => {
  const router = inject(Router);

  if (typeof window === 'undefined') return true; // SSR: a checagem real acontece no cliente

  if (sessionStorage.getItem(CHAVE_SESSAO_PAINEL) === 'sim') return true;

  const senha = window.prompt('Área restrita da clínica.\nDigite a senha de demonstração para continuar:');
  if (senha === SENHA_DEMO) {
    sessionStorage.setItem(CHAVE_SESSAO_PAINEL, 'sim');
    return true;
  }

  window.alert('Senha incorreta. Esta área é protegida apenas para fins de demonstração do portfólio.');
  return router.parseUrl('/clinica');
};
