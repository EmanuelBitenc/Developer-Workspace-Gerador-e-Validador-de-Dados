import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { DocumentoService } from '../../../services/documento.service';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-pis',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">PIS / PASEP</h1>
      <p class="page-subtitle">Validador de Programa de Integração Social</p>

      <div class="card animate-fade-in">
        <div class="card-title">Validar PIS/PASEP</div>
        <div class="input-row">
          <input
            class="input-field"
            type="text"
            placeholder="000.00000.00-0"
            [(ngModel)]="inputValue"
            (ngModelChange)="onInput($event)"
            maxlength="14"
            id="pis-input"
            autocomplete="off"
          />
          <button class="btn-secondary" (click)="clear()" style="padding:10px 12px; flex-shrink:0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        @if (inputValue.length > 0) {
          <div class="status-row animate-fade-in">
            @if (isValid) {
              <span class="badge badge-success">PIS Válido</span>
              <app-copy-btn [text]="inputValue" label="Copiar" />
            } @else {
              <span class="badge badge-error">PIS Inválido</span>
            }
          </div>
        }
      </div>

      <div class="card">
        <div class="card-title">Algoritmo</div>
        <div class="result-row">
          <span class="result-label">Tipo</span>
          <span class="result-value" style="font-size:13px">Módulo 11</span>
        </div>
        <div class="result-row">
          <span class="result-label">Pesos</span>
          <span class="result-value" style="font-size:13px">3, 2, 9, 8, 7, 6, 5, 4, 3, 2</span>
        </div>
      </div>
    </div>
  `,
  styles: [`.input-row{display:flex;gap:8px;align-items:center}.status-row{display:flex;align-items:center;gap:10px;margin-top:14px}`],
})
export class PisComponent {
  private svc = inject(DocumentoService);
  private meta = inject(Meta);
  private title = inject(Title);

  inputValue = '';
  isValid = false;

  constructor() {
    this.title.setTitle('Validador de PIS / PASEP / NIT Online | DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Validador online de PIS, PASEP e NIT. Aplique máscaras e verifique se o número do abono salarial é válido utilizando o algoritmo correto.' });
  }

  onInput(v: string): void {
    this.inputValue = this.svc.maskPis(v);
    const d = this.inputValue.replace(/\D/g, '');
    this.isValid = d.length === 11 ? this.svc.validatePis(d) : false;
  }

  clear(): void { this.inputValue = ''; this.isValid = false; }
}
