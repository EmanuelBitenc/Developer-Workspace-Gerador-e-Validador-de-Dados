import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';
import { DocumentoService } from '../../../services/documento.service';

interface FieldOption {
  id: string;
  label: string;
  selected: boolean;
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
            <label class="form-label">Quantidade de Registros (Max 1000)</label>
            <input type="number" min="1" max="1000" [(ngModel)]="quantity" (change)="generate()" class="form-input" />
          </div>

          <div class="form-group">
            <label class="form-label mb-2">Campos a Gerar</label>
            <div class="fields-grid">
              <label class="field-checkbox" *ngFor="let field of fields">
                <input type="checkbox" [(ngModel)]="field.selected" (change)="generate()" />
                <span class="checkmark"></span>
                <span class="label-text">{{field.label}}</span>
              </label>
            </div>
          </div>

          <button class="btn btn-accent w-full" (click)="generate()">Gerar Dados Novamente</button>
        </div>

        <!-- Output -->
        <div class="card p-6 min-h-[500px] flex flex-col">
          <div class="flex justify-between items-center mb-4">
            <div class="format-tabs">
              <button class="tab" [class.active]="format === 'json'" (click)="setFormat('json')">JSON</button>
              <button class="tab" [class.active]="format === 'csv'" (click)="setFormat('csv')">CSV</button>
            </div>
            <app-copy-btn [text]="output"></app-copy-btn>
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
      
      .split-layout { display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
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
      .mb-2 { margin-bottom: 8px; }
      
      .section-title { font-size: 16px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 16px; }
      
      .form-group { margin-bottom: 24px; }
      .form-label { display: block; font-size: 13px; color: var(--color-text-secondary); margin-bottom: 8px; font-weight: 500; }
      .form-input { width: 100%; padding: 10px 12px; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); color: var(--color-text-primary); outline: none; font-family: var(--font-mono); }
      .form-input:focus { border-color: var(--color-accent); }
      
      .fields-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
      @media (max-width: 480px) { .fields-grid { grid-template-columns: 1fr; } }
      .field-checkbox { display: flex; align-items: center; gap: 8px; cursor: pointer; user-select: none; }
      .field-checkbox input { display: none; }
      .checkmark { width: 18px; height: 18px; border: 1px solid var(--color-border-subtle); border-radius: 4px; display: flex; align-items: center; justify-content: center; background: var(--color-bg-surface); transition: all 0.2s; }
      .field-checkbox input:checked + .checkmark { background: var(--color-accent); border-color: var(--color-accent); }
      .field-checkbox input:checked + .checkmark::after { content: ''; width: 4px; height: 8px; border: solid white; border-width: 0 2px 2px 0; transform: rotate(45deg); margin-bottom: 2px; }
      .label-text { font-size: 13px; color: var(--color-text-primary); }

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

  fields: FieldOption[] = [
    { id: 'id', label: 'ID (UUID)', selected: true },
    { id: 'nome', label: 'Nome Completo', selected: true },
    { id: 'cpf', label: 'CPF', selected: true },
    { id: 'cnpj', label: 'CNPJ', selected: false },
    { id: 'dataNascimento', label: 'Data Nascimento', selected: true },
    { id: 'email', label: 'E-mail', selected: true },
    { id: 'telefone', label: 'Telefone', selected: false },
    { id: 'cep', label: 'CEP', selected: false },
  ];

  private readonly firstNames = ['Ana', 'Bruno', 'Carlos', 'Daniela', 'Eduardo', 'Fernanda', 'Gabriel', 'Helena', 'Igor', 'Julia', 'Lucas', 'Mariana', 'Pedro', 'Rafael', 'Sofia', 'Thiago', 'Vitória', 'Rodrigo', 'Carolina', 'Amanda'];
  private readonly lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Alves', 'Pereira', 'Lima', 'Gomes', 'Costa', 'Ribeiro', 'Martins', 'Carvalho', 'Almeida'];

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Gerador de Massa de Dados JSON/CSV — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Gere lotes de dados válidos e aleatórios para testes e mock de banco de dados.' });
    this.generate();
  }

  setFormat(fmt: 'json' | 'csv') {
    this.format = fmt;
    this.generate();
  }

  generate() {
    if (this.quantity < 1) this.quantity = 1;
    if (this.quantity > 1000) this.quantity = 1000;

    const data: Record<string, string>[] = [];
    const selectedFields = this.fields.filter(f => f.selected).map(f => f.id);

    for (let i = 0; i < this.quantity; i++) {
      const fName = this.firstNames[Math.floor(Math.random() * this.firstNames.length)];
      const lName = this.lastNames[Math.floor(Math.random() * this.lastNames.length)];
      const email = `${fName.toLowerCase()}.${lName.toLowerCase()}.${Math.floor(Math.random() * 9999)}@example.com`;
      
      const year = 1960 + Math.floor(Math.random() * 40);
      const month = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
      const day = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');

      const record: Record<string, string> = {};

      if (selectedFields.includes('id')) record['id'] = crypto.randomUUID();
      if (selectedFields.includes('nome')) record['nome'] = `${fName} ${lName}`;
      if (selectedFields.includes('cpf')) record['cpf'] = this.docService.generateCpf();
      if (selectedFields.includes('cnpj')) record['cnpj'] = this.docService.generateCnpj();
      if (selectedFields.includes('dataNascimento')) record['dataNascimento'] = `${year}-${month}-${day}`;
      if (selectedFields.includes('email')) record['email'] = email;
      if (selectedFields.includes('telefone')) {
        const ddd = 11 + Math.floor(Math.random() * 88);
        const prefix = 90000 + Math.floor(Math.random() * 9999);
        const suffix = String(Math.floor(Math.random() * 9999)).padStart(4, '0');
        record['telefone'] = `(${ddd}) ${prefix}-${suffix}`;
      }
      if (selectedFields.includes('cep')) {
        const prefix = String(Math.floor(Math.random() * 99999)).padStart(5, '0');
        const suffix = String(Math.floor(Math.random() * 999)).padStart(3, '0');
        record['cep'] = `${prefix}-${suffix}`;
      }

      data.push(record);
    }

    if (this.format === 'json') {
      this.output = JSON.stringify(data, null, 2);
    } else {
      if (data.length === 0) {
        this.output = '';
      } else {
        const headers = selectedFields;
        const rows = data.map(obj => headers.map(h => {
          // Wrap in quotes if it contains comma
          const val = obj[h] || '';
          return val.includes(',') ? `"${val}"` : val;
        }).join(','));
        this.output = [headers.join(','), ...rows].join('\n');
      }
    }
  }
}
