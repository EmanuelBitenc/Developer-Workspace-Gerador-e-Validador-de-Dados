import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-url',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">URL Encoder & Decoder</h1>
        <p class="page-description">Codifique ou decodifique URLs substituindo caracteres especiais por % (ex: %20 para espaços).</p>
      </header>

      <div class="split-layout">
        <!-- Input Section -->
        <div class="card panel">
          <div class="panel-header">
            <h2 class="panel-title">Texto Original (Decodificado)</h2>
          </div>
          <div class="panel-body">
            <textarea
              class="editor-textarea"
              placeholder="Digite ou cole aqui o texto que deseja codificar..."
              [(ngModel)]="decodedText"
              (ngModelChange)="encode()"
            ></textarea>
          </div>
          <div class="panel-footer">
            <span class="status-text">Caracteres: {{ decodedText.length }}</span>
            <button class="btn btn-primary" (click)="decodedText = ''; encodedText = ''">Limpar</button>
          </div>
        </div>

        <!-- Output Section -->
        <div class="card panel">
          <div class="panel-header">
            <h2 class="panel-title">Texto Codificado (Encoded)</h2>
            <app-copy-btn [textToCopy]="encodedText"></app-copy-btn>
          </div>
          <div class="panel-body">
            <textarea
              class="editor-textarea"
              placeholder="Digite ou cole aqui a URL codificada..."
              [(ngModel)]="encodedText"
              (ngModelChange)="decode()"
            ></textarea>
          </div>
          <div class="panel-footer">
            <span class="status-text">Caracteres: {{ encodedText.length }}</span>
            @if (hasError) {
              <span class="error-text">Formato inválido para decodificação</span>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container { max-width: 1200px; margin: 0 auto; padding: 24px; }
      .page-header { margin-bottom: 24px; }
      .page-title { font-size: 24px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 8px; }
      .page-description { color: var(--color-text-secondary); font-size: 15px; }
      
      .split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
      @media (max-width: 768px) { .split-layout { grid-template-columns: 1fr; } }
      
      .card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; }
      .panel { height: 500px; }
      .panel-header { padding: 16px; border-bottom: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-surface); }
      .panel-title { font-size: 14px; font-weight: 600; color: var(--color-text-primary); }
      .panel-body { flex: 1; display: flex; flex-direction: column; padding: 0; }
      .editor-textarea { flex: 1; width: 100%; resize: none; border: none; background: transparent; color: var(--color-text-primary); font-family: var(--font-mono); font-size: 14px; padding: 16px; outline: none; line-height: 1.5; }
      .editor-textarea::placeholder { color: var(--color-text-muted); }
      .panel-footer { padding: 12px 16px; border-top: 1px solid var(--color-border-subtle); display: flex; justify-content: space-between; align-items: center; background: var(--color-bg-surface); }
      
      .status-text { font-size: 12px; color: var(--color-text-muted); }
      .error-text { font-size: 12px; color: var(--color-error); }
      .btn { padding: 6px 12px; border-radius: var(--radius-md); font-size: 13px; font-weight: 500; cursor: pointer; transition: all 0.2s; border: none; }
      .btn-primary { background: var(--color-border); color: var(--color-text-primary); }
      .btn-primary:hover { background: var(--color-border-subtle); }
    `
  ]
})
export class UrlComponent {
  decodedText = '';
  encodedText = '';
  hasError = false;

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('URL Encoder / Decoder Online — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Codifique ou decodifique URLs rapidamente substituindo caracteres por % no DevUtils.' });
  }

  encode() {
    this.hasError = false;
    try {
      this.encodedText = encodeURIComponent(this.decodedText);
    } catch (e) {
      this.hasError = true;
    }
  }

  decode() {
    this.hasError = false;
    try {
      this.decodedText = decodeURIComponent(this.encodedText);
    } catch (e) {
      this.hasError = true;
    }
  }
}
