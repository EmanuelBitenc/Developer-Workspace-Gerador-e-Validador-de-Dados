import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { DocumentoService } from '../../../services/documento.service';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-cnh',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">CNH</h1>
      <p class="page-subtitle">Validador de Carteira Nacional de Habilitação</p>

      <div class="card animate-fade-in">
        <div class="card-title">Validar CNH</div>
        <div class="input-row">
          <input
            class="input-field"
            type="text"
            placeholder="00000000000 (11 dígitos numéricos)"
            [(ngModel)]="inputValue"
            (ngModelChange)="onInput($event)"
            maxlength="11"
            id="cnh-input"
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
                CNH Válida
              </span>
              <app-copy-btn [text]="inputValue" label="Copiar" />
            } @else {
              <span class="badge badge-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                CNH Inválida
              </span>
            }
          </div>
        }
      </div>

      <div class="card">
        <div class="card-title">Sobre a CNH</div>
        <div class="result-row">
          <span class="result-label">Nome</span>
          <span class="result-value" style="font-size:13px">RENACH — Registro Nacional de Habilitação</span>
        </div>
        <div class="result-row">
          <span class="result-label">Total de dígitos</span>
          <span class="result-value" style="font-size:13px">11 (sem formatação)</span>
        </div>
        <div class="result-row">
          <span class="result-label">Dígitos verificadores</span>
          <span class="result-value" style="font-size:13px">Posições 10 e 11</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .input-row { display: flex; gap: 8px; align-items: center; }
    .status-row { display: flex; align-items: center; gap: 10px; margin-top: 14px; }
  `],
})
export class CnhComponent {
  private svc = inject(DocumentoService);
  private meta = inject(Meta);
  private title = inject(Title);

  inputValue = '';
  isValid = false;

  constructor() {
    this.title.setTitle('Validador de CNH (Carteira Nacional de Habilitação) | DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Valide online os dígitos verificadores e formato da CNH de forma rápida e segura para seus testes de sistema.' });
  }

  onInput(value: string): void {
    this.inputValue = this.svc.maskCnh(value);
    this.isValid = this.inputValue.length === 11 ? this.svc.validateCnh(this.inputValue) : false;
  }

  clear(): void { this.inputValue = ''; this.isValid = false; }
}
