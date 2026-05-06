import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-uuid',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">UUID Generator</h1>
      <p class="page-subtitle">Gere e valide Universally Unique Identifiers v4</p>

      <div class="card animate-fade-in">
        <div class="section-header">
          <div class="card-title" style="margin-bottom:0">Gerar UUIDs v4</div>
          <div style="display:flex;gap:6px">
            <button class="btn-primary" (click)="generateBatch()" id="btn-gen-uuid">⟳ Gerar 5</button>
            <button class="btn-ghost" (click)="clearGenerated()" [disabled]="generated.length === 0">Limpar</button>
          </div>
        </div>

        @if (generated.length > 0) {
          <div class="gen-list animate-fade-in">
            @for (uuid of generated; track uuid) {
              <div class="gen-item">
                <span class="result-value" style="font-size:13px">{{ uuid }}</span>
                <app-copy-btn [text]="uuid" label="Copiar" />
              </div>
            }
          </div>
          <div style="display:flex;gap:8px;margin-top:10px;align-items:center">
            <button class="btn-ghost" (click)="generateBatch()">+ Mais 5</button>
            <app-copy-btn [text]="generated.join('\n')" label="Copiar todos" />
          </div>
        } @else {
          <div style="text-align:center;padding:32px;color:var(--color-text-muted);font-size:13px">
            Clique em "Gerar 5" para criar UUIDs v4
          </div>
        }
      </div>

      <div class="card animate-fade-in">
        <div class="card-title">Validar UUID</div>
        <div style="display:flex;gap:8px;align-items:center">
          <input
            class="input-field"
            type="text"
            placeholder="xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
            [(ngModel)]="validateInput"
            (ngModelChange)="validate()"
            id="uuid-validate-input"
            autocomplete="off"
          />
          <button class="btn-secondary" (click)="clearValidate()" style="padding:10px 12px;flex-shrink:0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        @if (validateInput) {
          <div style="display:flex;align-items:center;gap:8px;margin-top:12px;flex-wrap:wrap" class="animate-fade-in">
            @if (isValid === true) {
              <span class="badge badge-success">UUID v{{ uuidVersion }} Válido</span>
              <app-copy-btn [text]="validateInput" label="Copiar" />
            } @else if (isValid === false) {
              <span class="badge badge-error">UUID Inválido</span>
            }
          </div>
        }
      </div>
    </div>
  `,
  styles: [`.gen-list{display:flex;flex-direction:column;gap:4px;margin-top:12px}.gen-item{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:var(--color-bg-elevated);border-radius:6px;border:1px solid var(--color-border-subtle);transition:border-color .15s}.gen-item:hover{border-color:var(--color-border)}`],
})
export class UuidComponent {
  private meta = inject(Meta);
  private title = inject(Title);
  generated: string[] = [];
  validateInput = '';
  isValid: boolean | null = null;
  uuidVersion = '';
  private readonly UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-5])[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  constructor() {
    this.title.setTitle('Gerador e Validador de UUID / GUID Online | DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Gere lotes de UUID v4 (Universally Unique Identifier) e valide formatos UUID diretamente no browser de forma gratuita e rápida.' });
  }

  generateUuid(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
      const r = (Math.random() * 16) | 0;
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
  }

  generateBatch(): void { this.generated = [...this.generated, ...Array.from({ length: 5 }, () => this.generateUuid())]; }
  clearGenerated(): void { this.generated = []; }

  validate(): void {
    if (!this.validateInput.trim()) { this.isValid = null; return; }
    const m = this.UUID_REGEX.exec(this.validateInput.trim());
    this.isValid = !!m; this.uuidVersion = m ? m[1] : '';
  }

  clearValidate(): void { this.validateInput = ''; this.isValid = null; }
}
