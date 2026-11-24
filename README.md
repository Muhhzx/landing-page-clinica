# Clínica Aurora — site para clínica odontológica

Landing page completa para uma clínica odontológica fictícia, com painel interno de agenda. Projeto de portfólio feito em Angular 21.

**Demo:** _(cole aqui o link do Netlify)_
**Área da clínica (demo):** `/painel` · senha `aurora2026`

## O problema

Clínicas pequenas dependem de indicação e do Instagram. Quando alguém procura "dentista perto de mim" no Google, ou recebe o link no WhatsApp, a clínica não tem um site rápido que passe confiança, mostre preços e leve a pessoa direto para a conversa de agendamento. E a recepção costuma controlar a agenda em papel ou planilha.

## A solução

- **Página de conversão:** tratamentos com preço de referência, diferenciais, depoimentos, convênios, FAQ, mapa e horário de funcionamento.
- **Agendamento pelo WhatsApp:** formulário com validação que já monta a mensagem com o nome e o tratamento de interesse, mais botão flutuante de WhatsApp.
- **Painel da recepção:** agenda semanal por profissional, cadastro de consultas e mudança de status (agendado, confirmado, concluído, cancelado), salvo no navegador. Protegido por senha de demonstração.
- **Pronto para o Google:** title e description por página, Open Graph para o preview no WhatsApp, dados estruturados `Dentist` (schema.org), sitemap e robots.
- **LGPD e métricas:** página de política de privacidade, aceite no formulário e eventos de clique no WhatsApp prontos para o Google Analytics 4.

## Tecnologias

Angular 21 (standalone components, signals, novo control flow `@for`/`@if`, lazy loading por rota, route guard), TypeScript, SCSS, Vitest, deploy no Netlify.

## Resultado

- Bundle inicial de ~64 kB transferidos; cada página carrega só o seu código.
- Pensado para celular primeiro, que é de onde vem a maioria dos pacientes.
- Serve de base para adaptar a outros negócios locais (clínicas, salões, academias) trocando só os dados em `clinica.data.ts`.

> Dados, nomes, telefone e endereço são fictícios.

## Rodar localmente

```bash
npm install
npm start            # http://localhost:4200
npm run build        # gera dist/clinica-aurora/browser
```
