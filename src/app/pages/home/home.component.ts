import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Title, Meta, DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface ToolItem {
  title: string;
  path: string;
  description: string;
  icon: SafeHtml;
}

interface ToolGroup {
  name: string;
  items: ToolItem[];
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="page-container animate-fade-in">
      <header class="hero-section">
        <h1 class="hero-title">Developer Workspace</h1>
        <p class="hero-subtitle">Seu canivete suíço de ferramentas para o dia a dia. Gere, valide e formate dados com eficiência e rapidez em uma interface premium.</p>
      </header>

      <div class="dashboard">
        @for (group of toolGroups; track group.name) {
          <section class="tool-group">
            <h2 class="group-title">{{ group.name }}</h2>
            <div class="grid">
              @for (tool of group.items; track tool.path) {
                <a [routerLink]="tool.path" class="tool-card">
                  <div class="tool-icon" [innerHTML]="tool.icon"></div>
                  <div class="tool-content">
                    <h3 class="tool-title">{{ tool.title }}</h3>
                    <p class="tool-desc">{{ tool.description }}</p>
                  </div>
                </a>
              }
            </div>
          </section>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .page-container { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
      
      .hero-section { text-align: center; margin-bottom: 48px; padding: 16px 0; }
      .hero-title { font-size: 38px; font-weight: 800; color: var(--color-text-primary); margin-bottom: 16px; letter-spacing: -0.5px; }
      .hero-subtitle { font-size: 16px; color: var(--color-text-secondary); max-width: 600px; margin: 0 auto; line-height: 1.5; }
      
      .dashboard { display: flex; flex-direction: column; gap: 48px; }
      
      .tool-group { display: flex; flex-direction: column; gap: 20px; }
      .group-title { font-size: 18px; font-weight: 700; color: var(--color-text-primary); padding-bottom: 12px; border-bottom: 1px solid var(--color-border-subtle); margin-bottom: 4px; letter-spacing: -0.2px; }
      
      .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 20px; }
      
      .tool-card { 
        display: flex; align-items: flex-start; gap: 16px; 
        padding: 24px; background: var(--color-bg-card); 
        border: 1px solid var(--color-border); border-radius: var(--radius-lg); 
        text-decoration: none; transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative; overflow: hidden;
      }
      .tool-card::before {
        content: ''; position: absolute; inset: 0; background: linear-gradient(135deg, rgba(108, 99, 255, 0.05), transparent);
        opacity: 0; transition: opacity 0.3s ease;
      }
      .tool-card:hover { 
        transform: translateY(-4px); 
        border-color: var(--color-accent); 
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2), 0 0 15px rgba(108, 99, 255, 0.1); 
      }
      .tool-card:hover::before { opacity: 1; }
      
      .tool-icon { 
        width: 48px; height: 48px; flex-shrink: 0; 
        background: var(--color-accent-dim); border-radius: 12px; 
        display: flex; align-items: center; justify-content: center; 
        color: var(--color-accent-hover);
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative; z-index: 1;
      }
      .tool-card:hover .tool-icon {
        transform: scale(1.1) rotate(-3deg);
      }
      
      .tool-content { display: flex; flex-direction: column; gap: 6px; position: relative; z-index: 1; }
      .tool-title { font-size: 16px; font-weight: 600; color: var(--color-text-primary); margin: 0; letter-spacing: -0.3px; }
      .tool-desc { font-size: 13.5px; color: var(--color-text-muted); line-height: 1.5; margin: 0; }
    `
  ]
})
export class HomeComponent {
  private sanitizer = inject(DomSanitizer);

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Developer Workspace — Gerador e Validador de Dados');
    this.meta.updateTag({ name: 'description', content: 'Plataforma completa para desenvolvedores: validação de CPF/CNPJ, conversores, gerador de massa de dados, formatador de SQL e muito mais.' });
  }

  private svgIcon(path: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`);
  }

  toolGroups: ToolGroup[] = [
    {
      name: 'Documentos e Registros',
      items: [
        { title: 'CPF', path: '/cpf', description: 'Validar e gerar Cadastro de Pessoa Física (CPF)', icon: this.svgIcon('<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>') },
        { title: 'CNPJ', path: '/cnpj', description: 'Validar e gerar Cadastro Nacional de Pessoa Jurídica', icon: this.svgIcon('<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>') },
        { title: 'CNH', path: '/cnh', description: 'Validar Carteira Nacional de Habilitação', icon: this.svgIcon('<rect width="18" height="12" x="3" y="6" rx="2"/><path d="M3 10h18"/><circle cx="9" cy="15" r="1"/><path d="M13 15h4"/>') },
        { title: 'PIS / PASEP', path: '/pis', description: 'Validador de registros do PIS e PASEP', icon: this.svgIcon('<path d="M4 7l8 8 8-8"/><path d="M4 13l8 8 8-8"/>') },
        { title: 'Título de Eleitor', path: '/titulo-eleitor', description: 'Validar registros de Título de Eleitor', icon: this.svgIcon('<path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7z"/><path d="M22 19H2"/>') },
        { title: 'Massa de Dados', path: '/massa-dados', description: 'Gerador robusto de dados aleatórios (JSON/CSV)', icon: this.svgIcon('<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>') },
        { title: 'CEP e Endereço', path: '/cep', description: 'Busca rápida de CEP e gerador de endereços falsos', icon: this.svgIcon('<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>') },
      ]
    },
    {
      name: 'Dev Tools',
      items: [
        { title: 'JWT', path: '/jwt', description: 'Decodificador visual de tokens JWT', icon: this.svgIcon('<circle cx="21" cy="21" r="1"/><path d="M21 12V7a5 5 0 0 0-9.9-1M8.5 8.5l-1 1-1-1M6 6v5"/><path d="M2 10h5"/><path d="M4 8l2 2-2 2"/>') },
        { title: 'JSON', path: '/json', description: 'Formatador, validador e minificador de JSON', icon: this.svgIcon('<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>') },
        { title: 'Base64', path: '/base64', description: 'Ferramenta de codificação e decodificação Base64', icon: this.svgIcon('<rect width="4" height="4" x="3" y="15"/><rect width="4" height="4" x="17" y="15"/><rect width="4" height="4" x="10" y="15"/><rect width="4" height="4" x="3" y="8"/><rect width="4" height="4" x="17" y="8"/><rect width="4" height="4" x="10" y="8"/><rect width="4" height="4" x="10" y="1"/><rect width="4" height="4" x="3" y="1"/><rect width="4" height="4" x="17" y="1"/>') },
        { title: 'UUID', path: '/uuid', description: 'Gerador e validador de identificadores UUID v4', icon: this.svgIcon('<path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10"/><path d="M12 18a6 6 0 1 0-6-6"/><circle cx="12" cy="12" r="2"/>') },
        { title: 'URL Encoder', path: '/url', description: 'Codifique e decodifique parâmetros de URLs com facilidade', icon: this.svgIcon('<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>') },
        { title: 'Gerador Hash', path: '/hash', description: 'Gerador de hashes criptográficos (MD5, SHA)', icon: this.svgIcon('<line x1="4" x2="20" y1="9" y2="9"/><line x1="4" x2="20" y1="15" y2="15"/><line x1="10" x2="8" y1="3" y2="21"/><line x1="16" x2="14" y1="3" y2="21"/>') },
        { title: 'Formatador SQL', path: '/sql', description: 'Formate e embeleze (Beautifier) suas queries SQL', icon: this.svgIcon('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 15 21.84"/><path d="M21 5V12"/><path d="M3 12A9 3 0 0 0 12 15"/><path d="m16 19 2 2 4-4"/>') },
        { title: 'Text Diff', path: '/diff', description: 'Compare a diferença entre dois blocos de texto/código', icon: this.svgIcon('<path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22v-8"/><path d="M3 21h18"/>') },
        { title: 'Senhas', path: '/senha', description: 'Gerador de senhas altamente seguras e customizáveis', icon: this.svgIcon('<rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>') },
      ]
    }
  ];
}
