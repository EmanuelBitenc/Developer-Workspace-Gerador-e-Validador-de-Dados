import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface NavItem {
  label: string;
  path: string;
  icon: any;
  description: string;
  svgIcon: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  template: `
    @if (isOpen) {
      <div class="sidebar-backdrop" (click)="closeSidebar.emit()"></div>
    }
    <aside class="sidebar" [class.open]="isOpen">
      <!-- Logo -->
      <div class="sidebar-logo">
        <div class="logo-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/>
            <path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>
          </svg>
        </div>
        <div class="logo-text">
          <span class="logo-name">Developer Workspace</span>
          <span class="logo-tagline">Gerador e Validação de Dados</span>
        </div>
      </div>

      <!-- Navigation -->
      <nav class="sidebar-nav">
        @for (group of navGroups; track group.title) {
          <div class="nav-group">
            <div class="nav-group-title">{{ group.title }}</div>
            @for (item of group.items; track item.path) {
              <a
                [routerLink]="item.path"
                routerLinkActive="active"
                [title]="item.description"
                class="nav-link"
                (click)="closeSidebar.emit()"
              >
                <span class="nav-icon" [innerHTML]="item.svgIcon"></span>
                <span class="nav-label">{{ item.label }}</span>
              </a>
            }
          </div>
        }
      </nav>

      <!-- Footer -->
      <div class="sidebar-footer">
        <span class="footer-version">v1.0.0</span>
        <span class="footer-separator">·</span>
        <span class="footer-credits">Open Source</span>
      </div>
    </aside>
  `,
  styles: [
    `
      .sidebar {
        width: 220px; min-width: 220px; height: 100vh;
        background: var(--color-bg-surface);
        border-right: 1px solid var(--color-border-subtle);
        display: flex; flex-direction: column; overflow-y: auto; overflow-x: hidden;
        transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 40;
      }
      .sidebar-backdrop {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.6);
        z-index: 30;
      }
      @media (max-width: 768px) {
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          transform: translateX(-100%);
        }
        .sidebar.open {
          transform: translateX(0);
        }
        .sidebar-backdrop {
          display: block;
        }
      }
      .sidebar-logo {
        display: flex; align-items: center; gap: 10px;
        padding: 20px 16px; border-bottom: 1px solid var(--color-border-subtle);
      }
      .logo-icon {
        width: 30px; height: 30px;
        background: var(--color-accent-dim); border: 1px solid var(--color-accent);
        border-radius: 8px; display: flex; align-items: center; justify-content: center;
        color: var(--color-accent-hover); flex-shrink: 0;
      }
      .logo-text { display: flex; flex-direction: column; gap: 1px; }
      .logo-name { font-size: 14px; font-weight: 600; color: var(--color-text-primary); line-height: 1.2; }
      .logo-tagline { font-size: 10px; color: var(--color-text-muted); letter-spacing: 0.3px; }
      .sidebar-nav { flex: 1; padding: 12px 10px; display: flex; flex-direction: column; gap: 20px; }
      .nav-group { display: flex; flex-direction: column; gap: 2px; }
      .nav-group-title { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.9px; color: var(--color-text-muted); padding: 0 8px; margin-bottom: 4px; }
      .nav-link { display: flex; align-items: center; gap: 9px; padding: 8px 10px; border-radius: 7px; color: var(--color-text-secondary); text-decoration: none; font-size: 13px; font-weight: 450; transition: all 0.15s ease; border: 1px solid transparent; }
      .nav-link:hover { background: var(--color-bg-elevated); color: var(--color-text-primary); }
      .nav-link.active { background: var(--color-accent-dim); color: var(--color-accent-hover); border-color: #6c63ff22; }
      .nav-icon { display: flex; align-items: center; flex-shrink: 0; color: var(--color-text-muted); transition: color 0.15s ease; }
      .nav-link:hover .nav-icon { color: var(--color-text-secondary); }
      .nav-link.active .nav-icon { color: var(--color-accent-hover); }
      .nav-label { line-height: 1; }
      .sidebar-footer { padding: 12px 16px; border-top: 1px solid var(--color-border-subtle); display: flex; align-items: center; gap: 6px; }
      .footer-version, .footer-credits, .footer-separator { font-size: 11px; color: var(--color-text-muted); }
    `,
  ],
})
export class SidebarComponent {
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  private svgIcon(path: string): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
  }

  readonly navGroups: NavGroup[] = [
    {
      title: 'Documentos e Registros',
      items: [
        { label: 'CPF', path: '/cpf', icon: null, description: 'Validar e gerar CPF', svgIcon: this.svgIcon('<circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>') },
        { label: 'CNPJ', path: '/cnpj', icon: null, description: 'Validar e gerar CNPJ', svgIcon: this.svgIcon('<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v8h4"/><path d="M18 9h2a2 2 0 0 1 2 2v11h-4"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>') },
        { label: 'CNH', path: '/cnh', icon: null, description: 'Validar CNH', svgIcon: this.svgIcon('<rect width="18" height="12" x="3" y="6" rx="2"/><path d="M3 10h18"/><circle cx="9" cy="15" r="1"/><path d="M13 15h4"/>') },
        { label: 'PIS / PASEP', path: '/pis', icon: null, description: 'Validar PIS/PASEP', svgIcon: this.svgIcon('<path d="M4 7l8 8 8-8"/><path d="M4 13l8 8 8-8"/>') },
        { label: 'Título de Eleitor', path: '/titulo-eleitor', icon: null, description: 'Validar Título de Eleitor', svgIcon: this.svgIcon('<path d="m9 12 2 2 4-4"/><path d="M5 7c0-1.1.9-2 2-2h10a2 2 0 0 1 2 2v12H5V7z"/><path d="M22 19H2"/>') },
      ],
    },
    {
      title: 'Dev Tools',
      items: [
        { label: 'JWT', path: '/jwt', icon: null, description: 'Decodificar JWT', svgIcon: this.svgIcon('<circle cx="21" cy="21" r="1"/><path d="M21 12V7a5 5 0 0 0-9.9-1M8.5 8.5l-1 1-1-1M6 6v5"/><path d="M2 10h5"/><path d="M4 8l2 2-2 2"/>') },
        { label: 'JSON', path: '/json', icon: null, description: 'Formatar e validar JSON', svgIcon: this.svgIcon('<path d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"/><path d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"/>') },
        { label: 'Base64', path: '/base64', icon: null, description: 'Codificar/Decodificar Base64', svgIcon: this.svgIcon('<rect width="4" height="4" x="3" y="15"/><rect width="4" height="4" x="17" y="15"/><rect width="4" height="4" x="10" y="15"/><rect width="4" height="4" x="3" y="8"/><rect width="4" height="4" x="17" y="8"/><rect width="4" height="4" x="10" y="8"/><rect width="4" height="4" x="10" y="1"/><rect width="4" height="4" x="3" y="1"/><rect width="4" height="4" x="17" y="1"/>') },
        { label: 'UUID', path: '/uuid', icon: null, description: 'Gerar e validar UUID v4', svgIcon: this.svgIcon('<path d="M12 22C6.5 22 2 17.5 2 12S6.5 2 12 2s10 4.5 10 10"/><path d="M12 18a6 6 0 1 0-6-6"/><circle cx="12" cy="12" r="2"/>') },
      ],
    },
  ];
}
