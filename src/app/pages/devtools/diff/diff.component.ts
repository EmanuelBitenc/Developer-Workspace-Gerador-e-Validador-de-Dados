import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import * as Diff from 'diff';

interface DiffResult {
  value: string;
  added?: boolean;
  removed?: boolean;
}

@Component({
  selector: 'app-diff',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Comparador de Textos (Text Diff)</h1>
        <p class="page-description">Encontre diferenças exatas entre dois textos, JSONs ou trechos de código.</p>
      </header>

      <div class="split-layout">
        <div class="card panel">
          <div class="panel-header">
            <h2 class="panel-title">Texto Original (Antigo)</h2>
          </div>
          <div class="panel-body">
            <textarea
              class="editor-textarea"
              placeholder="Cole o texto original aqui..."
              [(ngModel)]="oldText"
              (ngModelChange)="compare()"
            ></textarea>
          </div>
        </div>

        <div class="card panel">
          <div class="panel-header">
            <h2 class="panel-title">Texto Modificado (Novo)</h2>
          </div>
          <div class="panel-body">
            <textarea
              class="editor-textarea"
              placeholder="Cole o novo texto aqui..."
              [(ngModel)]="newText"
              (ngModelChange)="compare()"
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Diff Output -->
      <div class="card mt-6">
        <div class="panel-header">
          <h2 class="panel-title">Resultado das Diferenças</h2>
        </div>
        <div class="diff-body">
          @if (!diffs.length) {
            <span class="empty-state">Os textos são idênticos ou estão vazios.</span>
          } @else {
            <div class="diff-viewer">
              @for (part of diffs; track $index) {
                <span [class.added]="part.added" [class.removed]="part.removed">{{ part.value }}</span>
              }
            </div>
          }
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
      .panel { height: 350px; }
      .mt-6 { margin-top: 24px; }
      
      .panel-header { padding: 16px; border-bottom: 1px solid var(--color-border-subtle); background: var(--color-bg-surface); }
      .panel-title { font-size: 14px; font-weight: 600; color: var(--color-text-primary); margin: 0; }
      
      .panel-body { flex: 1; display: flex; flex-direction: column; padding: 0; }
      .editor-textarea { flex: 1; width: 100%; resize: none; border: none; background: transparent; color: var(--color-text-primary); font-family: var(--font-mono); font-size: 13px; padding: 16px; outline: none; line-height: 1.5; }
      .editor-textarea::placeholder { color: var(--color-text-muted); }
      
      .diff-body { min-height: 150px; padding: 16px; background: var(--color-bg-surface); color: var(--color-text-primary); font-family: var(--font-mono); font-size: 13px; overflow-x: auto; white-space: pre-wrap; word-break: break-all; }
      .empty-state { color: var(--color-text-muted); }
      
      .diff-viewer { display: block; line-height: 1.6; }
      .added { background-color: rgba(46, 160, 67, 0.2); color: #3fb950; text-decoration: none; border-radius: 2px; }
      .removed { background-color: rgba(248, 81, 73, 0.2); color: #ff7b72; text-decoration: line-through; border-radius: 2px; }
    `
  ]
})
export class DiffComponent {
  oldText = '';
  newText = '';
  diffs: DiffResult[] = [];

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Text Diff (Comparador de Códigos) — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Compare dois textos ou códigos para encontrar diferenças linha por linha instantaneamente.' });
  }

  compare() {
    if (!this.oldText && !this.newText) {
      this.diffs = [];
      return;
    }
    this.diffs = Diff.diffChars(this.oldText, this.newText);
  }
}
