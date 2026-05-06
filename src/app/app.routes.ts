import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/cpf',
    pathMatch: 'full',
  },
  // Documentos e Registros
  {
    path: 'cpf',
    loadComponent: () =>
      import('./pages/documentos/cpf/cpf.component').then(m => m.CpfComponent),
    title: 'Validador e Gerador de CPF — DevUtils',
  },
  {
    path: 'cnpj',
    loadComponent: () =>
      import('./pages/documentos/cnpj/cnpj.component').then(m => m.CnpjComponent),
    title: 'Validador e Gerador de CNPJ — DevUtils',
  },
  {
    path: 'cnh',
    loadComponent: () =>
      import('./pages/documentos/cnh/cnh.component').then(m => m.CnhComponent),
    title: 'Validador de CNH — DevUtils',
  },
  {
    path: 'pis',
    loadComponent: () =>
      import('./pages/documentos/pis/pis.component').then(m => m.PisComponent),
    title: 'Validador de PIS/PASEP — DevUtils',
  },
  {
    path: 'titulo-eleitor',
    loadComponent: () =>
      import('./pages/documentos/titulo-eleitor/titulo-eleitor.component').then(
        m => m.TituloEleitorComponent,
      ),
    title: 'Validador de Título de Eleitor — DevUtils',
  },
  // Utilitários para Desenvolvedores
  {
    path: 'jwt',
    loadComponent: () =>
      import('./pages/devtools/jwt/jwt.component').then(m => m.JwtComponent),
    title: 'Decodificador JWT — DevUtils',
  },
  {
    path: 'json',
    loadComponent: () =>
      import('./pages/devtools/json/json.component').then(m => m.JsonComponent),
    title: 'Formatador e Validador de JSON — DevUtils',
  },
  {
    path: 'base64',
    loadComponent: () =>
      import('./pages/devtools/base64/base64.component').then(m => m.Base64Component),
    title: 'Codificador/Decodificador Base64 — DevUtils',
  },
  {
    path: 'uuid',
    loadComponent: () =>
      import('./pages/devtools/uuid/uuid.component').then(m => m.UuidComponent),
    title: 'Gerador e Validador de UUID — DevUtils',
  },
  {
    path: '**',
    redirectTo: '/cpf',
  },
];
