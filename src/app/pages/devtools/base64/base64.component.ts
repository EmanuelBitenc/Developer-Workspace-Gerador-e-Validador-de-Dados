import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-base64',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">Base64</h1>
      <p class="page-subtitle">Codifique texto para Base64 e decodifique de volta</p>

      <div class="card animate-fade-in">
        <div class="section-header">
          <div class="card-title" style="margin-bottom:0">Texto → Base64</div>
          <button class="btn-primary" (click)="encode()" id="btn-encode">Codificar →</button>
        </div>
        <textarea class="textarea-field" placeholder="Cole o texto para codificar..." [(ngModel)]="rawInput" id="raw-input"></textarea>
        @if (encoded) {
          <div class="out-block animate-fade-in">
            <div class="out-label-row">
              <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--color-text-muted)">Base64</span>
              <app-copy-btn [text]="encoded" label="Copiar" />
            </div>
            <div class="code-block" style="word-break:break-all;margin-top:8px">{{ encoded }}</div>
          </div>
        }
      </div>

      <div class="card animate-fade-in">
        <div class="section-header">
          <div class="card-title" style="margin-bottom:0">Base64 → Texto</div>
          <button class="btn-primary" (click)="decode()" id="btn-decode">← Decodificar</button>
        </div>
        <textarea class="textarea-field" placeholder="Cole o Base64 para decodificar..." [(ngModel)]="b64Input" id="b64-input"></textarea>
        @if (decodeError) {
          <div style="display:flex;align-items:center;gap:6px;margin-top:8px;color:var(--color-error);font-size:12px">
            ⚠ {{ decodeError }}
          </div>
        }
        @if (decoded) {
          <div class="out-block animate-fade-in">
            <div class="out-label-row">
              <span style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--color-text-muted)">Texto decodificado</span>
              <app-copy-btn [text]="decoded" label="Copiar" />
            </div>
            <div class="code-block" style="white-space:pre-wrap;margin-top:8px">{{ decoded }}</div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`.out-block{margin-top:12px}.out-label-row{display:flex;justify-content:space-between;align-items:center}`],
})
export class Base64Component {
  private meta = inject(Meta);
  private title = inject(Title);
  rawInput = ''; b64Input = ''; encoded = ''; decoded = ''; decodeError = '';

  constructor() {
    this.title.setTitle('Base64 Encode e Decode Online | DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Codifique textos para Base64 e decodifique strings Base64 de volta para texto no browser sem enviar para servidores. Rápido, seguro e online.' });
  }

  encode(): void {
    if (!this.rawInput) return;
    try { this.encoded = btoa(unescape(encodeURIComponent(this.rawInput))); } catch { this.encoded = ''; }
  }

  decode(): void {
    this.decodeError = ''; this.decoded = '';
    if (!this.b64Input.trim()) return;
    try { this.decoded = decodeURIComponent(escape(atob(this.b64Input.trim()))); }
    catch { this.decodeError = 'String Base64 inválida.'; }
  }
}
