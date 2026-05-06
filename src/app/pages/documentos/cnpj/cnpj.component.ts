import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { DocumentoService } from '../../../services/documento.service';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-cnpj',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">CNPJ</h1>
      <p class="page-subtitle">Validador e gerador de Cadastro Nacional de Pessoa Jurídica</p>

      <div class="card animate-fade-in">
        <div class="card-title">Validar CNPJ</div>
        <div class="input-row">
          <input
            class="input-field"
            type="text"
            placeholder="00.000.000/0000-00"
            [(ngModel)]="inputValue"
            (ngModelChange)="onInput($event)"
            maxlength="18"
            id="cnpj-input"
            autocomplete="off"
          />
          <button class="btn-secondary" (click)="clear()" style="padding:10px 12px; flex-shrink:0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        @if (inputValue.length > 0) {
          <div class="status-row animate-fade-in">
            @if (isValid) {
              <span class="badge badge-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                CNPJ Válido
              </span>
              <app-copy-btn [text]="inputValue" label="Copiar" />
            } @else {
              <span class="badge badge-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                CNPJ Inválido
              </span>
            }
          </div>
        }
      </div>

      <div class="card">
        <div class="section-header">
          <div class="card-title" style="margin-bottom:0">Gerar CNPJ</div>
          <button class="btn-primary" (click)="generate()" id="btn-gerar-cnpj">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16V4a2 2 0 0 1 2-2h11"/><path d="M22 18H11v4l-5-4 5-4v4"/></svg>
            Gerar
          </button>
        </div>

        @if (generatedList.length > 0) {
          <div class="generated-list animate-fade-in">
            @for (cnpj of generatedList; track cnpj) {
              <div class="generated-item">
                <span class="result-value">{{ cnpj }}</span>
                <app-copy-btn [text]="cnpj" label="Copiar" />
              </div>
            }
          </div>
          <button class="btn-ghost" style="margin-top:8px" (click)="generateMore()">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Gerar mais 5
          </button>
        } @else {
          <div style="margin-top:12px;font-size:12px;color:var(--color-text-muted)">Clique em "Gerar" para criar CNPJs válidos</div>
        }
      </div>

      <!-- Tech Info -->
      <div class="card">
        <div class="card-title">Especificações do Campo</div>
        
        <div class="result-row">
          <span class="result-label">Tipo no Banco de Dados</span>
          <span class="result-value" style="font-size:13px">String (VARCHAR)</span>
        </div>
        <p class="tech-desc"><strong>Novo CNPJ Alfanumérico:</strong> A partir de 2026, a Receita Federal implementará o CNPJ alfanumérico. As posições da raiz (os 8 primeiros caracteres) poderão conter letras e números. Portanto, é <strong>obrigatório</strong> armazenar como String/VARCHAR, além de que números puramente podem perder os zeros à esquerda em tipos como BIGINT.</p>
        
        <div class="result-row">
          <span class="result-label">Tamanho com Máscara</span>
          <span class="result-value" style="font-size:13px">18 caracteres <span style="color:var(--color-text-muted)">(00.000.000/0000-00)</span></span>
        </div>
        
        <div class="result-row">
          <span class="result-label">Tamanho sem Máscara</span>
          <span class="result-value" style="font-size:13px">14 caracteres <span style="color:var(--color-text-muted)">(00000000000000)</span></span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .input-row { display: flex; gap: 8px; align-items: center; }
    .status-row { display: flex; align-items: center; gap: 10px; margin-top: 14px; }
    .generated-list { display: flex; flex-direction: column; gap: 3px; margin-top: 16px; }
    .generated-item { display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; background: var(--color-bg-elevated); border-radius: 6px; border: 1px solid var(--color-border-subtle); transition: border-color 0.15s; }
    .generated-item:hover { border-color: var(--color-border); }
    .tech-desc { font-size: 12px; color: var(--color-text-muted); line-height: 1.5; margin: 4px 0 12px 0; padding: 8px; background: var(--color-bg-elevated); border-radius: 6px; border-left: 3px solid var(--color-warning); }
  `],
})
export class CnpjComponent {
  private svc = inject(DocumentoService);
  private meta = inject(Meta);
  private title = inject(Title);

  inputValue = '';
  isValid = false;
  generatedList: string[] = [];

  constructor() {
    this.title.setTitle('Validador e Gerador de CNPJ Alfanumérico — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Valide e gere CNPJs (inclusive no novo formato alfanumérico) online. Ferramenta gratuita para desenvolvedores com algoritmos avançados.' });
  }

  onInput(value: string): void {
    this.inputValue = this.svc.maskCnpj(value);
    const chars = this.inputValue.replace(/[^a-zA-Z0-9]/g, '');
    this.isValid = chars.length === 14 ? this.svc.validateCnpj(chars) : false;
  }

  clear(): void { this.inputValue = ''; this.isValid = false; }
  generate(): void { this.generatedList = Array.from({ length: 5 }, () => this.svc.generateCnpj()); }
  generateMore(): void { this.generatedList = [...this.generatedList, ...Array.from({ length: 5 }, () => this.svc.generateCnpj())]; }
}
