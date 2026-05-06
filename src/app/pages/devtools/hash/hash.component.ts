import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-hash',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Gerador de Hashes</h1>
        <p class="page-description">Criptografe seus textos instantaneamente usando MD5, SHA-1, SHA-256 e SHA-512.</p>
      </header>

      <div class="split-layout">
        <!-- Input -->
        <div class="card panel">
          <div class="panel-header">
            <h2 class="panel-title">Texto de Entrada</h2>
          </div>
          <div class="panel-body">
            <textarea
              class="editor-textarea"
              placeholder="Digite ou cole aqui o texto que deseja transformar em hash..."
              [(ngModel)]="inputText"
              (ngModelChange)="generateHashes()"
            ></textarea>
          </div>
        </div>

        <!-- Output -->
        <div class="card p-6 h-fit results-card">
          <div class="hash-group">
            <div class="hash-header">
              <span class="hash-title">MD5</span>
              <app-copy-btn [text]="md5Hash"></app-copy-btn>
            </div>
            <input type="text" class="hash-input" [value]="md5Hash" readonly />
          </div>

          <div class="hash-group">
            <div class="hash-header">
              <span class="hash-title">SHA-1</span>
              <app-copy-btn [text]="sha1Hash"></app-copy-btn>
            </div>
            <input type="text" class="hash-input" [value]="sha1Hash" readonly />
          </div>

          <div class="hash-group">
            <div class="hash-header">
              <span class="hash-title">SHA-256</span>
              <app-copy-btn [text]="sha256Hash"></app-copy-btn>
            </div>
            <input type="text" class="hash-input" [value]="sha256Hash" readonly />
          </div>

          <div class="hash-group">
            <div class="hash-header">
              <span class="hash-title">SHA-512</span>
              <app-copy-btn [text]="sha512Hash"></app-copy-btn>
            </div>
            <textarea class="hash-input sha512-input" readonly [value]="sha512Hash"></textarea>
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
      
      .p-6 { padding: 24px; }
      .h-fit { height: fit-content; }
      .results-card { display: flex; flex-direction: column; gap: 20px; }
      
      .hash-group { display: flex; flex-direction: column; gap: 8px; }
      .hash-header { display: flex; justify-content: space-between; align-items: center; }
      .hash-title { font-size: 14px; font-weight: 600; color: var(--color-accent); }
      .hash-input { width: 100%; padding: 10px 12px; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); color: var(--color-text-primary); font-family: var(--font-mono); font-size: 13px; outline: none; }
      .sha512-input { height: 60px; resize: none; }
    `
  ]
})
export class HashComponent {
  inputText = '';
  md5Hash = '';
  sha1Hash = '';
  sha256Hash = '';
  sha512Hash = '';

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Gerador de Hashes (MD5, SHA-256) — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Gere hashes MD5, SHA-1, SHA-256 e SHA-512 instantaneamente.' });
  }

  generateHashes() {
    if (!this.inputText) {
      this.md5Hash = '';
      this.sha1Hash = '';
      this.sha256Hash = '';
      this.sha512Hash = '';
      return;
    }
    
    this.md5Hash = CryptoJS.MD5(this.inputText).toString();
    this.sha1Hash = CryptoJS.SHA1(this.inputText).toString();
    this.sha256Hash = CryptoJS.SHA256(this.inputText).toString();
    this.sha512Hash = CryptoJS.SHA512(this.inputText).toString();
  }
}
