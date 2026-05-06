import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  template: `
    <div class="app-shell">
      <app-sidebar [isOpen]="sidebarOpen" (closeSidebar)="sidebarOpen = false" />
      <main class="main-content">
        <header class="global-topbar">
          <div class="topbar-left">
            <button class="menu-btn" (click)="sidebarOpen = true">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>
            <div class="breadcrumbs">
              <span class="workspace-label">Developer Workspace</span>
              <span class="separator">/</span>
              <span class="slogan-text">Gerador e Validação de Dados</span>
            </div>
          </div>
        </header>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      .app-shell {
        display: flex;
        height: 100vh;
        overflow: hidden;
        position: relative;
      }

      .main-content {
        flex: 1;
        overflow-y: auto;
        background: var(--color-bg-base);
        display: flex;
        flex-direction: column;
      }
      
      .global-topbar {
        display: flex;
        align-items: center;
        padding: 12px 28px;
        background: rgba(17, 17, 21, 0.85);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid var(--color-border-subtle);
        position: sticky;
        top: 0;
        z-index: 10;
      }
      
      .topbar-left {
        display: flex;
        align-items: center;
        gap: 16px;
      }
      
      .menu-btn {
        background: transparent;
        border: none;
        color: var(--color-text-primary);
        padding: 4px;
        display: none;
        cursor: pointer;
        transition: color 0.15s ease;
      }
      
      .menu-btn:hover {
        color: var(--color-accent-hover);
      }
      
      .breadcrumbs {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      .workspace-label {
        font-size: 13px;
        font-weight: 600;
        color: var(--color-text-primary);
        letter-spacing: 0.3px;
      }
      
      .separator {
        color: var(--color-text-muted);
        font-weight: 300;
        font-size: 14px;
        opacity: 0.5;
      }
      
      .slogan-text {
        font-size: 13px;
        font-weight: 500;
        color: var(--color-text-muted);
        letter-spacing: 0.3px;
      }
      
      @media (max-width: 768px) {
        .global-topbar {
          padding: 14px 20px;
        }
        .menu-btn {
          display: flex;
        }
      }
    `,
  ],
})
export class App {
  sidebarOpen = false;
}
