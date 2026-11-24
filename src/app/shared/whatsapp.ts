// Número fictício de demonstração. Troque pelo do cliente real.
export const DEMO_PHONE = '5511900000000';

export function whatsappLink(message: string, phone = DEMO_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
