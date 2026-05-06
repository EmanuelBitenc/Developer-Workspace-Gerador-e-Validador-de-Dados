import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-json',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">JSON Formatter</h1>
      <p class="page-subtitle">Formate, valide e minifique JSON</p>

      <div class="card animate-fade-in">
        <div class="section-header">
          <div class="card-title" style="margin-bottom:0">Entrada</div>
          <div style="display:flex;gap:6px">
            <button class="btn-primary" (click)="format()" id="btn-format-json">Formatar</button>
            <button class="btn-secondary" (click)="minify()" id="btn-minify-json">Minificar</button>
            <button class="btn-ghost" (click)="clear()">Limpar</button>
          </div>
        </div>
        <textarea
          class="textarea-field"
          style="min-height:200px"
          placeholder='Cole seu JSON aqui...'
          [(ngModel)]="input"
          (ngModelChange)="validateOnly()"
          id="json-input"
        ></textarea>
        @if (status === 'valid') {
          <div class="status-bar valid animate-fade-in">
            ✓ JSON válido
            @if (lineCount > 0) {
              <span class="stat">· {{ lineCount }} linhas · {{ charCount }} chars</span>
            }
          </div>
        } @else if (status === 'error') {
          <div class="status-bar error animate-fade-in">✗ {{ errorMsg }}</div>
        }
      </div>

      @if (output) {
        <div class="card animate-fade-in">
          <div class="section-header">
            <span class="card-title" style="margin-bottom:0">Resultado</span>
            <app-copy-btn [text]="output" label="Copiar" />
          </div>
          <pre class="code-block" style="max-height:400px;overflow-y:auto">{{ output }}</pre>
        </div>
      }
    </div>
  `,
  styles: [`.status-bar{display:flex;align-items:center;gap:6px;margin-top:10px;font-size:12px;font-weight:500}.status-bar.valid{color:var(--color-success)}.status-bar.error{color:var(--color-error)}.stat{color:var(--color-text-muted);font-weight:400;margin-left:4px}`],
})
export class JsonComponent {
  private meta = inject(Meta);
  private title = inject(Title);
  input = ''; output = ''; status: 'idle' | 'valid' | 'error' = 'idle';
  errorMsg = ''; lineCount = 0; charCount = 0;

  constructor() {
    this.title.setTitle('Formatador e Validador JSON Online | DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Formate, valide, pretifique e minifique códigos JSON online. Ferramenta grátis de developer utilities para manipulação rápida de JSON.' });
  }

  validateOnly(): void {
    if (!this.input.trim()) { this.status = 'idle'; this.output = ''; return; }
    try { JSON.parse(this.input); this.status = 'valid'; this.charCount = this.input.length; this.lineCount = this.input.split('\n').length; }
    catch (e: unknown) { this.status = 'error'; this.errorMsg = e instanceof Error ? e.message : 'JSON inválido'; }
  }

  format(): void {
    if (!this.input.trim()) return;
    try { const p = JSON.parse(this.input); this.output = JSON.stringify(p, null, 2); this.status = 'valid'; this.lineCount = this.output.split('\n').length; this.charCount = this.output.length; }
    catch (e: unknown) { this.status = 'error'; this.errorMsg = e instanceof Error ? e.message : 'JSON inválido'; this.output = ''; }
  }

  minify(): void {
    if (!this.input.trim()) return;
    try { this.output = JSON.stringify(JSON.parse(this.input)); this.status = 'valid'; this.lineCount = 1; this.charCount = this.output.length; }
    catch (e: unknown) { this.status = 'error'; this.errorMsg = e instanceof Error ? e.message : 'JSON inválido'; this.output = ''; }
  }

  clear(): void { this.input = ''; this.output = ''; this.status = 'idle'; this.errorMsg = ''; }
}
