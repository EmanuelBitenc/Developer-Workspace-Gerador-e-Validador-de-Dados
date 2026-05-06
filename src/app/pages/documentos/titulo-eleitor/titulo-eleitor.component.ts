import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { DocumentoService } from '../../../services/documento.service';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-titulo-eleitor',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">Título de Eleitor</h1>
      <p class="page-subtitle">Validador de Título de Eleitor Brasileiro</p>

      <div class="card animate-fade-in">
        <div class="card-title">Validar Título</div>
        <div class="input-row">
          <input
            class="input-field"
            type="text"
            placeholder="000000000000 (12 dígitos)"
            [(ngModel)]="inputValue"
            (ngModelChange)="onInput($event)"
            maxlength="12"
            id="titulo-input"
            autocomplete="off"
          />
          <button class="btn-secondary" (click)="clear()" style="padding:10px 12px; flex-shrink:0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        @if (inputValue.length > 0) {
          <div class="status-row animate-fade-in">
            @if (result?.valid) {
              <span class="badge badge-success">Título Válido</span>
              <app-copy-btn [text]="inputValue" label="Copiar" />
            } @else if (inputValue.length === 12) {
              <span class="badge badge-error">Título Inválido</span>
            } @else {
              <span class="badge badge-info">{{ inputValue.length }}/12 dígitos</span>
            }
          </div>
        }
      </div>

      @if (result?.valid) {
        <div class="card animate-fade-in">
          <div class="card-title">Informações Extraídas</div>
          <div class="result-row">
            <span class="result-label">Estado</span>
            <span class="result-value">{{ result?.estado }}</span>
          </div>
          <div class="result-row">
            <span class="result-label">Zona Eleitoral</span>
            <span class="result-value">{{ result?.zona }}</span>
          </div>
          <div class="result-row">
            <span class="result-label">Seção</span>
            <span class="result-value">{{ result?.secao }}</span>
          </div>
        </div>
      }
    </div>
  `,
  styles: [`.input-row{display:flex;gap:8px;align-items:center}.status-row{display:flex;align-items:center;gap:10px;margin-top:14px}`],
})
export class TituloEleitorComponent {
  private svc = inject(DocumentoService);
  private meta = inject(Meta);
  private title = inject(Title);

  inputValue = '';
  result: { valid: boolean; estado?: string; zona?: string; secao?: string } | null = null;

  constructor() {
    this.title.setTitle('Validador de Título de Eleitor Online | DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Valide o Título de Eleitor brasileiro, descobrindo o Estado (UF) e verificando a integridade dos dígitos verificadores online de forma grátis.' });
  }

  onInput(v: string): void {
    this.inputValue = this.svc.maskTituloEleitor(v);
    this.result = this.inputValue.length === 12 ? this.svc.validateTituloEleitor(this.inputValue) : null;
  }

  clear(): void { this.inputValue = ''; this.result = null; }
}
