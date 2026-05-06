import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Developer Workspace — Gerador e Validador de Dados',
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
    path: 'massa-dados',
    loadComponent: () =>
      import('./pages/documentos/massa-dados/massa-dados.component').then(m => m.MassaDadosComponent),
    title: 'Gerador de Massa de Dados (JSON/CSV) — DevUtils',
  },
  {
    path: 'cep',
    loadComponent: () =>
      import('./pages/documentos/cep/cep.component').then(m => m.CepComponent),
    title: 'Gerador de CEP e Endereços — DevUtils',
  },
  {
    path: 'url',
    loadComponent: () =>
      import('./pages/devtools/url/url.component').then(m => m.UrlComponent),
    title: 'URL Encoder & Decoder — DevUtils',
  },
  {
    path: 'hash',
    loadComponent: () =>
      import('./pages/devtools/hash/hash.component').then(m => m.HashComponent),
    title: 'Gerador de Hashes (MD5, SHA-256) — DevUtils',
  },
  {
    path: 'sql',
    loadComponent: () =>
      import('./pages/devtools/sql/sql.component').then(m => m.SqlComponent),
    title: 'Formatador de SQL — DevUtils',
  },
  {
    path: 'diff',
    loadComponent: () =>
      import('./pages/devtools/diff/diff.component').then(m => m.DiffComponent),
    title: 'Text Diff (Comparador de Códigos) — DevUtils',
  },
  {
    path: 'senha',
    loadComponent: () =>
      import('./pages/devtools/senha/senha.component').then(m => m.SenhaComponent),
    title: 'Gerador de Senhas Fortes — DevUtils',
  },
  {
    path: '**',
    redirectTo: '/cpf',
  },
];
