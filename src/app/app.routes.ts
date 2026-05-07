import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Developer Workspace — Gerador e Validador de Dados',
    data: {
      seo: {
        title: 'Developer Workspace — Gerador e Validador de Dados',
        description: 'Plataforma unificada com ferramentas para desenvolvedores: Geradores de CPF/CNPJ, formatador SQL, JWT decoder, gerador de hashes e muito mais.',
        keywords: 'developer tools, gerador de cpf, validador de cnpj, jwt decoder, sql formatter, base64, uuid generator'
      }
    }
  },
  // Documentos e Registros
  {
    path: 'cpf',
    loadComponent: () =>
      import('./pages/documentos/cpf/cpf.component').then(m => m.CpfComponent),
    title: 'Validador e Gerador de CPF — DevUtils',
    data: {
      seo: {
        title: 'Validador e Gerador de CPF Válido — DevUtils',
        description: 'Gere CPFs válidos para testes de software ou valide números de CPF rapidamente. Ferramenta gratuita para desenvolvedores.',
        keywords: 'gerador de cpf, gerar cpf, validador de cpf, validar cpf, cpf para testes'
      }
    }
  },
  {
    path: 'cnpj',
    loadComponent: () =>
      import('./pages/documentos/cnpj/cnpj.component').then(m => m.CnpjComponent),
    title: 'Validador e Gerador de CNPJ — DevUtils',
    data: {
      seo: {
        title: 'Validador e Gerador de CNPJ Válido — DevUtils',
        description: 'Ferramenta online para gerar CNPJs válidos para testes de software e validar a autenticidade de números de CNPJ.',
        keywords: 'gerador de cnpj, gerar cnpj, validador de cnpj, validar cnpj, cnpj para testes'
      }
    }
  },
  {
    path: 'cnh',
    loadComponent: () =>
      import('./pages/documentos/cnh/cnh.component').then(m => m.CnhComponent),
    title: 'Validador de CNH — DevUtils',
    data: {
      seo: {
        title: 'Validador e Gerador de CNH — DevUtils',
        description: 'Valide números de CNH (Carteira Nacional de Habilitação) ou gere números válidos para ambiente de desenvolvimento.',
        keywords: 'validador cnh, gerador cnh, gerar cnh, validar cnh'
      }
    }
  },
  {
    path: 'pis',
    loadComponent: () =>
      import('./pages/documentos/pis/pis.component').then(m => m.PisComponent),
    title: 'Validador de PIS/PASEP — DevUtils',
    data: {
      seo: {
        title: 'Validador e Gerador de PIS/PASEP — DevUtils',
        description: 'Ferramenta utilitária para validar e gerar números de PIS/PASEP válidos para testes de sistemas de RH e folha de pagamento.',
        keywords: 'validador pis, gerador pis, validar pis, gerar pasep'
      }
    }
  },
  {
    path: 'titulo-eleitor',
    loadComponent: () =>
      import('./pages/documentos/titulo-eleitor/titulo-eleitor.component').then(
        m => m.TituloEleitorComponent,
      ),
    title: 'Validador de Título de Eleitor — DevUtils',
    data: {
      seo: {
        title: 'Validador e Gerador de Título de Eleitor — DevUtils',
        description: 'Gere e valide números de Título de Eleitor de acordo com as regras do TSE. Ideal para testes de software.',
        keywords: 'validador titulo de eleitor, gerador titulo eleitor'
      }
    }
  },
  // Utilitários para Desenvolvedores
  {
    path: 'jwt',
    loadComponent: () =>
      import('./pages/devtools/jwt/jwt.component').then(m => m.JwtComponent),
    title: 'Decodificador JWT — DevUtils',
    data: {
      seo: {
        title: 'Decodificador JWT Online (JSON Web Token) — DevUtils',
        description: 'Decodifique tokens JWT (JSON Web Token) e visualize o payload de forma segura e offline no seu navegador.',
        keywords: 'jwt decoder, jwt decode, decodificar jwt, json web token'
      }
    }
  },
  {
    path: 'json',
    loadComponent: () =>
      import('./pages/devtools/json/json.component').then(m => m.JsonComponent),
    title: 'Formatador e Validador de JSON — DevUtils',
    data: {
      seo: {
        title: 'Formatador e Validador de JSON Online — DevUtils',
        description: 'Cole seu JSON minificado e formate com indentação perfeita. Valide se a sintaxe do seu JSON está correta.',
        keywords: 'json formatter, formatador json, validar json, json validator'
      }
    }
  },
  {
    path: 'base64',
    loadComponent: () =>
      import('./pages/devtools/base64/base64.component').then(m => m.Base64Component),
    title: 'Codificador/Decodificador Base64 — DevUtils',
    data: {
      seo: {
        title: 'Encoder e Decoder Base64 Online — DevUtils',
        description: 'Codifique textos para Base64 ou decodifique strings Base64 de volta para texto legível instantaneamente.',
        keywords: 'base64 encode, base64 decode, decodificar base64, codificar base64'
      }
    }
  },
  {
    path: 'uuid',
    loadComponent: () =>
      import('./pages/devtools/uuid/uuid.component').then(m => m.UuidComponent),
    title: 'Gerador e Validador de UUID — DevUtils',
    data: {
      seo: {
        title: 'Gerador de UUID v4 Online — DevUtils',
        description: 'Gere IDs únicos universais (UUID versão 4) em massa e valide a estrutura de UUIDs existentes.',
        keywords: 'uuid generator, guid generator, gerar uuid, gerador uuid v4'
      }
    }
  },
  {
    path: 'massa-dados',
    loadComponent: () =>
      import('./pages/documentos/massa-dados/massa-dados.component').then(m => m.MassaDadosComponent),
    title: 'Gerador de Massa de Dados (JSON/CSV) — DevUtils',
    data: {
      seo: {
        title: 'Gerador de Massa de Dados para Testes (JSON/CSV) — DevUtils',
        description: 'Gere milhares de registros com nomes, CPFs, e-mails e celulares falsos e exporte em JSON ou CSV para popular seu banco de dados.',
        keywords: 'gerador de massa de dados, mock data generator, dados fake, json mock'
      }
    }
  },
  {
    path: 'cep',
    loadComponent: () =>
      import('./pages/documentos/cep/cep.component').then(m => m.CepComponent),
    title: 'Gerador de CEP e Endereços — DevUtils',
    data: {
      seo: {
        title: 'Gerador de CEP e Endereços Brasileiros — DevUtils',
        description: 'Gere CEPs válidos, ruas, bairros e cidades brasileiras para preencher formulários de testes e mockar dados de localização.',
        keywords: 'gerador de cep, gerar endereco, cep fake, endereco para testes'
      }
    }
  },
  {
    path: 'url',
    loadComponent: () =>
      import('./pages/devtools/url/url.component').then(m => m.UrlComponent),
    title: 'URL Encoder & Decoder — DevUtils',
    data: {
      seo: {
        title: 'URL Encoder & Decoder Online — DevUtils',
        description: 'Codifique (encode) ou decodifique (decode) URLs com caracteres especiais de forma rápida e segura.',
        keywords: 'url encode, url decode, decodificar url, codificar url'
      }
    }
  },
  {
    path: 'hash',
    loadComponent: () =>
      import('./pages/devtools/hash/hash.component').then(m => m.HashComponent),
    title: 'Gerador de Hashes (MD5, SHA-256) — DevUtils',
    data: {
      seo: {
        title: 'Gerador de Hash Online (MD5, SHA-1, SHA-256, SHA-512) — DevUtils',
        description: 'Gere hashes criptográficos de forma segura a partir de textos. Suporte para MD5, SHA-1, SHA-256 e SHA-512.',
        keywords: 'gerador de hash, md5 hash, sha256 generator, sha512, criptografia'
      }
    }
  },
  {
    path: 'sql',
    loadComponent: () =>
      import('./pages/devtools/sql/sql.component').then(m => m.SqlComponent),
    title: 'Formatador de SQL — DevUtils',
    data: {
      seo: {
        title: 'Formatador e Beautifier de SQL Online — DevUtils',
        description: 'Cole queries SQL desorganizadas e deixe-as formatadas, legíveis e com syntax highlight. Suporte a vários dialetos SQL.',
        keywords: 'sql formatter, formatador sql, sql beautifier, formatar query sql'
      }
    }
  },
  {
    path: 'diff',
    loadComponent: () =>
      import('./pages/devtools/diff/diff.component').then(m => m.DiffComponent),
    title: 'Text Diff (Comparador de Códigos) — DevUtils',
    data: {
      seo: {
        title: 'Comparador de Textos e Códigos (Text Diff) — DevUtils',
        description: 'Compare dois blocos de texto ou código-fonte e visualize as diferenças (diff) linha a linha de forma clara e visual.',
        keywords: 'text diff, comparador de texto, diff checker, comparar codigo'
      }
    }
  },
  {
    path: 'senha',
    loadComponent: () =>
      import('./pages/devtools/senha/senha.component').then(m => m.SenhaComponent),
    title: 'Gerador de Senhas Fortes — DevUtils',
    data: {
      seo: {
        title: 'Gerador de Senhas Fortes e Seguras — DevUtils',
        description: 'Gere senhas altamente seguras com letras maiúsculas, minúsculas, números e símbolos personalizáveis.',
        keywords: 'gerador de senhas, strong password generator, senha segura'
      }
    }
  },
  {
    path: '**',
    redirectTo: '/cpf',
  },
];
