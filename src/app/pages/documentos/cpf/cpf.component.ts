import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { DocumentoService } from '../../../services/documento.service';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-cpf',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">CPF</h1>
      <p class="page-subtitle">Validador e gerador de Cadastro de Pessoa Física</p>

      <!-- Validate -->
      <div class="card animate-fade-in">
        <div class="card-title">Validar CPF</div>
        <div class="input-row">
          <input
            class="input-field"
            type="text"
            placeholder="000.000.000-00"
            [(ngModel)]="inputValue"
            (ngModelChange)="onInput($event)"
            maxlength="14"
            id="cpf-input"
            autocomplete="off"
          />
          <button class="btn-secondary" (click)="clear()" title="Limpar" style="padding:10px 12px; flex-shrink:0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        @if (inputValue.length > 0) {
          <div class="status-row animate-fade-in">
            @if (isValid) {
              <span class="badge badge-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                CPF Válido
              </span>
              <app-copy-btn [text]="inputValue" label="Copiar" />
            } @else {
              <span class="badge badge-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                CPF Inválido
              </span>
            }
          </div>
        }
      </div>

      <!-- Generate -->
      <div class="card">
        <div class="section-header">
          <div class="card-title" style="margin-bottom:0">Gerar CPF</div>
          <button class="btn-primary" (click)="generate()" id="btn-gerar-cpf">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16V4a2 2 0 0 1 2-2h11"/><path d="M22 18H11v4l-5-4 5-4v4"/><path d="M5 14H4a2 2 0 1 1 0-4h1"/></svg>
            Gerar
          </button>
        </div>

        @if (generatedList.length > 0) {
          <div class="generated-list animate-fade-in">
            @for (cpf of generatedList; track cpf) {
              <div class="generated-item">
                <span class="result-value">{{ cpf }}</span>
                <app-copy-btn [text]="cpf" label="Copiar" />
              </div>
            }
          </div>
          <button class="btn-ghost" style="margin-top:8px" (click)="generateMore()">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Gerar mais 5
          </button>
        } @else {
          <div class="empty-hint">Clique em "Gerar" para criar CPFs válidos</div>
        }
      </div>

      <!-- Tech Info -->
      <div class="card">
        <div class="card-title">Especificações do Campo</div>
        <div class="result-row">
          <span class="result-label">Tipo no Banco de Dados</span>
          <span class="result-value" style="font-size:13px">String (VARCHAR)</span>
        </div>
        <p class="tech-desc"><strong>Nota:</strong> É altamente recomendável armazenar como texto (String/VARCHAR) em vez de número (INT/BIGINT), pois números que começam com zero perdem os zeros à esquerda em tipos numéricos, corrompendo o dado.</p>
        
        <div class="result-row">
          <span class="result-label">Tamanho com Máscara</span>
          <span class="result-value" style="font-size:13px">14 caracteres <span style="color:var(--color-text-muted)">(000.000.000-00)</span></span>
        </div>
        
        <div class="result-row">
          <span class="result-label">Tamanho sem Máscara</span>
          <span class="result-value" style="font-size:13px">11 caracteres <span style="color:var(--color-text-muted)">(00000000000)</span></span>
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
    .empty-hint { margin-top: 12px; font-size: 12px; color: var(--color-text-muted); }
    .tech-desc { font-size: 12px; color: var(--color-text-muted); line-height: 1.5; margin: 4px 0 12px 0; padding: 8px; background: var(--color-bg-elevated); border-radius: 6px; border-left: 3px solid var(--color-info); }
  `],
})
export class CpfComponent {
  private svc = inject(DocumentoService);
  private meta = inject(Meta);
  private title = inject(Title);

  inputValue = '';
  isValid = false;
  generatedList: string[] = [];

  constructor() {
    this.title.setTitle('Validador e Gerador de CPF Grátis — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Gerador e validador de CPF online. Valide rapidamente se um CPF é verdadeiro ou gere CPF válido para testes. Sem dependências externas.' });
  }

  onInput(value: string): void {
    this.inputValue = this.svc.maskCpf(value);
    const digits = this.inputValue.replace(/\D/g, '');
    this.isValid = digits.length === 11 ? this.svc.validateCpf(digits) : false;
  }

  clear(): void { this.inputValue = ''; this.isValid = false; }

  generate(): void {
    this.generatedList = Array.from({ length: 5 }, () => this.svc.generateCpf());
  }

  generateMore(): void {
    this.generatedList = [...this.generatedList, ...Array.from({ length: 5 }, () => this.svc.generateCpf())];
  }
}
