export interface Servico { nome: string; descricao: string; preco: string; icone: string; destaque?: boolean; }

export const SERVICOS: Servico[] = [
  { nome: 'Lentes de contato dental', descricao: 'Lâminas finas de porcelana que harmonizam forma, cor e alinhamento, com resultado natural e duradouro.', preco: 'R$ 1.800 por dente', icone: 'M6 3h12l4 6-10 12L2 9z M2 9h20', destaque: true },
  { nome: 'Clareamento dental', descricao: 'Protocolo supervisionado, com sensibilidade controlada.', preco: 'R$ 650', icone: 'M12 8a4 4 0 100 8 4 4 0 000-8z M12 2v2 M12 20v2 M2 12h2 M20 12h2' },
  { nome: 'Limpeza e profilaxia', descricao: 'Remoção de tártaro e manchas, com orientação de higiene.', preco: 'R$ 180', icone: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18' },
  { nome: 'Implantes', descricao: 'Planejamento digital e reabilitação completa, do exame à coroa.', preco: 'R$ 2.900', icone: 'M9 3h6M10 6h4M9 9h6M10 12h4M11 15h2M12 15v6' },
  { nome: 'Alinhadores invisíveis', descricao: 'Ortodontia discreta, com acompanhamento mensal.', preco: 'R$ 320 por mês', icone: 'M3 14c3 5 15 5 18 0M5 11c2-4 12-4 14 0' },
];

export const DIFERENCIAIS = [
  { titulo: 'Avaliação sem pressa', texto: 'A primeira consulta é para ouvir você e explicar cada opção, sem empurrar procedimento.' },
  { titulo: 'Plano claro antes de começar', texto: 'Etapas, prazos e valores por escrito antes de você aprovar qualquer tratamento.' },
  { titulo: 'Conforto de ponta a ponta', texto: 'Anestesia moderna, horário marcado e retorno de dúvidas pelo WhatsApp.' },
];

export interface Depoimento { texto: string; autor: string; iniciais: string; }

export const DEPOIMENTOS: Depoimento[] = [
  { texto: 'Tinha pavor de dentista. Fui ouvida do começo ao fim e saí com o plano todo explicado.', autor: 'Camila R., clareamento', iniciais: 'CR' },
  { texto: 'As lentes ficaram tão naturais que ninguém percebe. Só elogiam meu sorriso.', autor: 'Rafael M., lentes de contato', iniciais: 'RM' },
  { texto: 'Valores combinados desde a primeira consulta e nenhuma surpresa no fim do tratamento.', autor: 'Helena T., implante', iniciais: 'HT' },
];

export interface Pergunta { pergunta: string; resposta: string; }

export const FAQ: Pergunta[] = [
  { pergunta: 'O tratamento dói?', resposta: 'Usamos anestesia moderna e técnicas de conforto. A maioria dos pacientes relata pouco ou nenhum desconforto durante e após o procedimento.' },
  { pergunta: 'Vocês aceitam convênio odontológico?', resposta: 'Atendemos os principais convênios da região. Confirme o seu na avaliação ou diretamente pelo WhatsApp antes de agendar.' },
  { pergunta: 'Posso parcelar o tratamento?', resposta: 'Sim. Trabalhamos com parcelamento no cartão e boleto, sempre combinado por escrito antes de iniciar qualquer procedimento.' },
  { pergunta: 'Quanto tempo dura cada tratamento?', resposta: 'Varia por caso. Na avaliação você recebe um cronograma com prazos estimados para cada etapa.' },
  { pergunta: 'Preciso de retorno depois do procedimento?', resposta: 'Sim, agendamos retornos de acompanhamento e você tem suporte pelo WhatsApp entre as consultas.' },
];

export const CONVENIOS: string[] = ['Amil Dental', 'Bradesco Dental', 'SulAmérica Odonto', 'Particular com parcelamento'];

export interface Horario { dias: string; horario: string; }

export interface Contato {
  endereco: string;
  bairro: string;
  cidade: string;
  cep: string;
  telefoneExibicao: string;
  horarios: Horario[];
  mapsQuery: string;
}

// Dados fictícios de demonstração — troque pelo endereço e telefone reais do cliente.
export const CONTATO: Contato = {
  endereco: 'Av. Exemplo Fictícia, 123 — conj. 45',
  bairro: 'Jardim Exemplo',
  cidade: 'São Paulo — SP',
  cep: '01310-000',
  telefoneExibicao: '(11) 90000-0000',
  horarios: [
    { dias: 'Segunda a sexta', horario: '08h às 19h' },
    { dias: 'Sábado', horario: '08h às 13h' },
  ],
  mapsQuery: 'Avenida Paulista, 1000, São Paulo, SP',
};
