import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

interface Address {
  cep: string;
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

@Component({
  selector: 'app-cep',
  standalone: true,
  imports: [CommonModule, FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Gerador de Endereços Brasileiros</h1>
        <p class="page-description">Gere endereços aleatórios e reais do Brasil para preencher formulários de testes.</p>
      </header>

      <div class="split-layout">
        <!-- Input -->
        <div class="card p-6 h-fit">
          <h2 class="section-title">Ações</h2>
          
          <button class="btn btn-accent w-full mb-4" (click)="generateRandom()">Gerar Novo Endereço</button>
          
          <div class="form-group">
            <label class="form-label">Buscar por CEP específico</label>
            <div class="flex gap-2">
              <input type="text" placeholder="Ex: 01001-000" [(ngModel)]="searchCep" (keyup.enter)="fetchCep()" class="form-input" />
              <button class="btn btn-primary" (click)="fetchCep()" [disabled]="isLoading">Buscar</button>
            </div>
            @if (hasError) {
              <span class="error-text mt-2 block">CEP não encontrado ou inválido.</span>
            }
          </div>
        </div>

        <!-- Output -->
        <div class="card p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="section-title mb-0">Endereço Gerado</h2>
            <app-copy-btn [text]="formattedAddress"></app-copy-btn>
          </div>

          <div class="address-grid">
            <div class="field-group">
              <span class="field-label">CEP</span>
              <input type="text" class="field-input" [value]="currentAddress.cep" readonly />
            </div>
            <div class="field-group">
              <span class="field-label">Logradouro</span>
              <input type="text" class="field-input" [value]="currentAddress.logradouro" readonly />
            </div>
            <div class="field-group">
              <span class="field-label">Bairro</span>
              <input type="text" class="field-input" [value]="currentAddress.bairro" readonly />
            </div>
            <div class="grid-2-cols">
              <div class="field-group">
                <span class="field-label">Cidade</span>
                <input type="text" class="field-input" [value]="currentAddress.localidade" readonly />
              </div>
              <div class="field-group">
                <span class="field-label">Estado (UF)</span>
                <input type="text" class="field-input" [value]="currentAddress.uf" readonly />
              </div>
            </div>
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
      
      .split-layout { display: grid; grid-template-columns: 320px 1fr; gap: 24px; }
      @media (max-width: 768px) { .split-layout { grid-template-columns: 1fr; } }
      
      .card { background: var(--color-bg-card); border: 1px solid var(--color-border); border-radius: var(--radius-lg); }
      .p-6 { padding: 24px; }
      .h-fit { height: fit-content; }
      .flex { display: flex; }
      .gap-2 { gap: 8px; }
      .justify-between { justify-content: space-between; }
      .items-center { align-items: center; }
      .mb-4 { margin-bottom: 16px; }
      .mb-6 { margin-bottom: 24px; }
      .mb-0 { margin-bottom: 0 !important; }
      .mt-2 { margin-top: 8px; }
      .block { display: block; }
      
      .section-title { font-size: 16px; font-weight: 600; color: var(--color-text-primary); margin-bottom: 16px; }
      
      .form-group { margin-bottom: 24px; }
      .form-label { display: block; font-size: 13px; color: var(--color-text-secondary); margin-bottom: 8px; font-weight: 500; }
      .form-input { flex: 1; min-width: 0; padding: 10px 12px; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); color: var(--color-text-primary); outline: none; font-family: var(--font-mono); }
      .form-input:focus { border-color: var(--color-accent); }
      
      .btn { padding: 12px; border-radius: var(--radius-md); font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.2s; border: none; text-align: center; }
      .btn-accent { background: var(--color-accent); color: #fff; }
      .btn-accent:hover { background: var(--color-accent-hover); }
      .btn-primary { background: var(--color-border); color: var(--color-text-primary); }
      .btn-primary:hover { background: var(--color-border-subtle); }
      .btn:disabled { opacity: 0.5; cursor: not-allowed; }
      .w-full { width: 100%; }
      
      .error-text { font-size: 12px; color: var(--color-error); }
      
      .address-grid { display: flex; flex-direction: column; gap: 16px; }
      .grid-2-cols { display: grid; grid-template-columns: 2fr 1fr; gap: 16px; }
      .field-group { display: flex; flex-direction: column; gap: 6px; }
      .field-label { font-size: 12px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-text-muted); }
      .field-input { width: 100%; padding: 12px; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); color: var(--color-text-primary); font-family: var(--font-mono); font-size: 14px; outline: none; transition: border-color 0.2s; }
      .field-input:focus { border-color: var(--color-accent); }
    `
  ]
})
export class CepComponent {
  searchCep = '';
  isLoading = false;
  hasError = false;

  // Mock de dados para geração aleatória rápida (sem depender de API 100% das vezes)
  private readonly mockAddresses: Address[] = [
    { cep: '01001-000', logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' },
    { cep: '20040-002', logradouro: 'Avenida Rio Branco', bairro: 'Centro', localidade: 'Rio de Janeiro', uf: 'RJ' },
    { cep: '30130-151', logradouro: 'Praça da Liberdade', bairro: 'Savassi', localidade: 'Belo Horizonte', uf: 'MG' },
    { cep: '40020-000', logradouro: 'Avenida Sete de Setembro', bairro: 'Dois de Julho', localidade: 'Salvador', uf: 'BA' },
    { cep: '80020-310', logradouro: 'Rua XV de Novembro', bairro: 'Centro', localidade: 'Curitiba', uf: 'PR' },
    { cep: '60060-170', logradouro: 'Avenida Monsenhor Tabosa', bairro: 'Centro', localidade: 'Fortaleza', uf: 'CE' },
    { cep: '70040-010', logradouro: 'Esplanada dos Ministérios', bairro: 'Zona Cívico-Administrativa', localidade: 'Brasília', uf: 'DF' },
    { cep: '50030-230', logradouro: 'Rua do Bom Jesus', bairro: 'Recife', localidade: 'Recife', uf: 'PE' },
    { cep: '69010-000', logradouro: 'Avenida Eduardo Ribeiro', bairro: 'Centro', localidade: 'Manaus', uf: 'AM' },
    { cep: '90010-150', logradouro: 'Rua dos Andradas', bairro: 'Centro Histórico', localidade: 'Porto Alegre', uf: 'RS' },
  ];

  currentAddress: Address = this.mockAddresses[0];

  constructor(private title: Title, private meta: Meta) {
    this.title.setTitle('Gerador de CEP e Endereços — DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Gere endereços brasileiros válidos e CEPs para testes de desenvolvimento e QA.' });
    this.generateRandom();
  }

  get formattedAddress(): string {
    return `CEP: ${this.currentAddress.cep}
Logradouro: ${this.currentAddress.logradouro}
Bairro: ${this.currentAddress.bairro}
Cidade/UF: ${this.currentAddress.localidade} - ${this.currentAddress.uf}`;
  }

  generateRandom() {
    this.hasError = false;
    const randomIndex = Math.floor(Math.random() * this.mockAddresses.length);
    this.currentAddress = { ...this.mockAddresses[randomIndex] };
  }

  async fetchCep() {
    const cleanCep = this.searchCep.replace(/\D/g, '');
    if (cleanCep.length !== 8) {
      this.hasError = true;
      return;
    }

    this.isLoading = true;
    this.hasError = false;

    try {
      const res = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`);
      const data = await res.json();

      if (data.erro) {
        this.hasError = true;
        this.currentAddress = { cep: '', logradouro: '', bairro: '', localidade: '', uf: '' };
      } else {
        this.currentAddress = {
          cep: data.cep,
          logradouro: data.logradouro,
          bairro: data.bairro,
          localidade: data.localidade,
          uf: data.uf
        };
      }
    } catch (e) {
      this.hasError = true;
    } finally {
      this.isLoading = false;
    }
  }
}
