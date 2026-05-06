import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';
import { DocumentoService } from '../../../services/documento.service';

interface GeneratedData {
  id: string;
  nome: string;
  cpf: string;
  dataNascimento: string;
  email: string;
}

@Component({
  selector: 'app-massa-dados',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Gerador de Massa de Dados</h1>
        <p class="page-description">Gere listas de dados fictícios válidos em lote para testes de software.</p>
      </header>

      <div class="split-layout">
        <!-- Controls -->
        <div class="card p-6 h-fit">
          <h2 class="section-title">Configurações</h2>
          
          <div class="form-group">
            <label class="form-label">Quantidade de Registros (Max 100)</label>
            <input type="number" min="1" max="100" [(ngModel)]="quantity" class="form-input" />
          </div>

          <button class="btn btn-accent w-full" (click)="generate()">Gerar Dados</button>
        </div>

        <!-- Output -->
        <div class="card p-6 min-h-[500px] flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <div class="format-tabs">
              <button class="tab" [class.active]="format === 'json'" (click)="format = 'json'">JSON</button>
              <button class="tab" [class.active]="format === 'csv'" (click)="format = 'csv'">CSV</button>
            </div>
            <app-copy-btn [textToCopy]="output"></app-copy-btn>
          </div>
          <textarea class="editor-textarea" readonly [value]="output"></textarea>
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
      
      .split-layout { display: grid; grid-template-columns: 300px 1fr; gap: 24px; }
      @media (max-width: 768px) { .split-layout { grid-template-columns: 1fr; } }
      
      .card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
      .p-6 { padding: 24px; }
      .h-fit { height: fit-content; }
      .min-h-\\[500px\\] { min-height: 500px; }
      .flex { display: flex; }
      .flex-col { flex-direction: column; }
      .justify-between { justify-content: space-between; }
      .items-center { align-items: center; }
      .mb-4 { margin-bottom: 16px; }
      
      .section-title { font-size: 16px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 16px; }
      
      .form-group { margin-bottom: 24px; }
      .form-label { display: block; font-size: 13px; color: var(--color-text-secondary); margin-bottom: 8px; font-weight: 500; }
      .form-input { width: 100%; padding: 10px 12px; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); color: var(--color-text-primary); outline: none; font-family: var(--font-mono); }
      .form-input:focus { border-color: var(--color-accent); }
      
      .btn { padding: 12px; border-radius: var(--radius-md); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; text-align: center; }
      .btn-accent { background: var(--color-accent); color: #fff; }
      .btn-accent:hover { background: var(--color-accent-hover); }
      .w-full { width: 100%; }
      
      .format-tabs { display: flex; background: var(--color-bg-surface); padding: 4px; border-radius: var(--radius-md); border: 1px solid var(--color-border-subtle); }
      .tab { padding: 6px 16px; font-size: 13px; font-weight: 500; color: var(--color-text-secondary); background: transparent; border: none; border-radius: var(--radius-sm); cursor: pointer; transition: all 0.2s; }
      .tab:hover { color: var(--color-text-primary); }
      .tab.active { background: var(--color-bg-elevated); color: var(--color-text-primary); box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
      
      .editor-textarea { flex: 1; width: 100%; resize: none; border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); background: var(--color-bg-surface); color: var(--color-text-primary); font-family: var(--font-mono); font-size: 13px; padding: 16px; outline: none; line-height: 1.6; }
    `
  ]
})
export class MassaDadosComponent {
  private docService = inject(DocumentoService);
  
  quantity = 10;
  format: 'json' | 'csv' = 'json';
  output = '';

  private readonly firstNames = ['Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Julia', 'Lucas', 'Mariana', 'Pedro', 'Rafael', 'Sofia'];
  private readonly lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes'];

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Gerador de Massa de Dados JSON/CSV — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Gere lotes de dados válidos e aleatórios para testes e mock de banco de dados.' });
    this.generate();
  }

  generate() {
    if (this.quantity < 1) this.quantity = 1;
    if (this.quantity > 100) this.quantity = 100;

    const data: GeneratedData[] = [];

    for (let i = 0; i < this.quantity; i++) {
      const fName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
      const lName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
      const email = \`\${fName.toLowerCase()}.\${lName.toLowerCase()}.\${Math.floor(Math.random() * 9999)}@example.com\`;
      
      const year = 1960 + Math.floor(Math.random() * 40);
      const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
      const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');

      data.push({
        id: crypto.randomUUID(),
        nome: \`\${fName} \${lName}\`,
        cpf: this.docService.generateCpf(true),
        dataNascimento: \`\${year}-\${month}-\${day}\`,
        email: email
      });
    }

    if (this.format === 'json') {
      this.output = JSON.stringify(data, null, 2);
    } else {
      const headers = ['id', 'nome', 'cpf', 'dataNascimento', 'email'];
      const rows = data.map(obj => \`\${obj.id},\${obj.nome},\${obj.cpf},\${obj.dataNascimento},\${obj.email}\`);
      this.output = [headers.join(','), ...rows].join('\\n');
    }
  }
}
