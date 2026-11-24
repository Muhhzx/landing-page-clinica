import { Routes } from '@angular/router';
import { painelGuard } from './features/painel/painel.guard';

// Cada demo do portfólio entra aqui como uma rota com lazy loading.
export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'clinica' },
  {
    path: 'clinica',
    title: 'Clínica Aurora Odontologia',
    loadComponent: () => import('./features/clinica/clinica.page').then(m => m.ClinicaPage),
  },
  {
    path: 'painel',
    title: 'Agenda | Clínica Aurora',
    canActivate: [painelGuard],
    loadComponent: () => import('./features/painel/painel.page').then(m => m.PainelPage),
  },
  {
    path: 'privacidade',
    title: 'Política de Privacidade | Clínica Aurora',
    loadComponent: () => import('./features/privacidade/privacidade.page').then(m => m.PrivacidadePage),
  },
  { path: '**', redirectTo: 'clinica' },
];
