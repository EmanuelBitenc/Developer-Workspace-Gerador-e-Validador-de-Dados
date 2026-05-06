import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-senha',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Gerador de Senhas Fortes</h1>
        <p class="page-description">Gere senhas criptograficamente seguras com opções customizáveis.</p>
      </header>

      <div class="card max-w-2xl">
        <div class="password-display">
          <input type="text" class="password-input" [value]="password" readonly />
          <app-copy-btn [text]="password"></app-copy-btn>
        </div>

        <div class="controls">
          <div class="control-group">
            <label class="control-label">
              <span>Tamanho da Senha</span>
              <span class="value-badge">{{ length }}</span>
            </label>
            <input type="range" min="8" max="64" [(ngModel)]="length" (input)="generate()" class="slider" />
          </div>

          <div class="toggles">
            <label class="toggle-label">
              <input type="checkbox" [(ngModel)]="uppercase" (change)="generate()" /> Letras Maiúsculas (A-Z)
            </label>
            <label class="toggle-label">
              <input type="checkbox" [(ngModel)]="lowercase" (change)="generate()" /> Letras Minúsculas (a-z)
            </label>
            <label class="toggle-label">
              <input type="checkbox" [(ngModel)]="numbers" (change)="generate()" /> Números (0-9)
            </label>
            <label class="toggle-label">
              <input type="checkbox" [(ngModel)]="symbols" (change)="generate()" /> Símbolos (!@#$%^&*)
            </label>
          </div>

          <button class="btn btn-accent mt-4" (click)="generate()">Gerar Nova Senha</button>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .page-container { max-width: 1200px; margin: 0 auto; padding: 24px; }
      .page-header { margin-bottom: 32px; }
      .page-title { font-size: 24px; font-weight: 700; color: var(--color-text-primary); margin-bottom: 8px; }
      .page-description { color: var(--color-text-secondary); font-size: 15px; }
      
      .max-w-2xl { max-width: 42rem; margin: 0 auto; }
      .card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 24px; }
      
      .password-display { display: flex; align-items: center; gap: 12px; background: var(--color-bg-surface); padding: 12px 16px; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); margin-bottom: 24px; }
      .password-input { flex: 1; background: transparent; border: none; font-family: var(--font-mono); font-size: 20px; color: var(--color-accent); outline: none; }
      
      .controls { display: flex; flex-direction: column; gap: 24px; }
      .control-group { display: flex; flex-direction: column; gap: 12px; }
      .control-label { display: flex; justify-content: space-between; align-items: center; font-size: 14px; color: var(--color-text-primary); font-weight: 500; }
      .value-badge { background: var(--color-bg-elevated); padding: 2px 8px; border-radius: 12px; font-size: 12px; color: var(--color-accent); }
      
      .slider { -webkit-appearance: none; width: 100%; height: 6px; background: var(--color-border-subtle); border-radius: 3px; outline: none; }
      .slider::-webkit-slider-thumb { -webkit-appearance: none; appearance: none; width: 18px; height: 18px; border-radius: 50%; background: var(--color-accent); cursor: pointer; }
      
      .toggles { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
      @media (max-width: 600px) { .toggles { grid-template-columns: 1fr; } }
      .toggle-label { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--color-text-secondary); cursor: pointer; }
      .toggle-label input[type="checkbox"] { accent-color: var(--color-accent); width: 16px; height: 16px; cursor: pointer; }
      
      .btn { padding: 12px; border-radius: var(--radius-md); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; text-align: center; }
      .btn-accent { background: var(--color-accent); color: #fff; width: 100%; }
      .btn-accent:hover { background: var(--color-accent-hover); }
    `
  ]
})
export class SenhaComponent implements OnInit {
  password = '';
  length = 16;
  uppercase = true;
  lowercase = true;
  numbers = true;
  symbols = true;

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Gerador de Senhas Fortes — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Gere senhas seguras e aleatórias instantaneamente.' });
  }

  ngOnInit() {
    this.generate();
  }

  generate() {
    if (!this.uppercase && !this.lowercase && !this.numbers && !this.symbols) {
      this.lowercase = true;
    }

    const chars = {
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lower: 'abcdefghijklmnopqrstuvwxyz',
      num: '0123456789',
      sym: '!@#$%^&*()_+~`|}{[]:;?><,./-='
    };

    let allowedChars = '';
    if (this.uppercase) allowedChars += chars.upper;
    if (this.lowercase) allowedChars += chars.lower;
    if (this.numbers) allowedChars += chars.num;
    if (this.symbols) allowedChars += chars.sym;

    let newPassword = '';
    const randomArray = new Uint32Array(this.length);
    crypto.getRandomValues(randomArray);

    for (let i = 0; i < this.length; i++) {
      newPassword += allowedChars[randomArray[i] % allowedChars.length];
    }

    this.password = newPassword;
  }
}
