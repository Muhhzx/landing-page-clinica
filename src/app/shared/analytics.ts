// Camada fina sobre o gtag (Google Analytics 4). Funciona mesmo sem GA configurado:
// nesse caso só registra no console, pra não perder o rastro em dev/demo.
// Para ativar de verdade, descomente o bloco do GA4 em index.html e troque o ID.
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function rastrearEvento(nome: string, parametros: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined') return;

  if (typeof window.gtag === 'function') {
    window.gtag('event', nome, parametros);
  } else {
    console.info('[analytics]', nome, parametros);
  }
}
