import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { DocumentoService } from '../../../services/documento.service';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

@Component({
  selector: 'app-cpf',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">Validador de CPF Online</h1>
      <p class="page-subtitle">Valide e gere números de CPF (Cadastro de Pessoa Física) com segurança — 100% no seu navegador</p>

      <!-- Validate -->
      <div class="card animate-fade-in">
        <div class="card-title">Validar CPF</div>
        <div class="input-row">
          <input
            class="input-field"
            type="text"
            placeholder="Digite o CPF: 000.000.000-00"
            [(ngModel)]="inputValue"
            (ngModelChange)="onInput($event)"
            maxlength="14"
            id="cpf-input"
            autocomplete="off"
            aria-label="Campo para digitar o CPF a ser validado"
          />
          <button class="btn-secondary" (click)="clear()" title="Limpar campo" style="padding:10px 12px; flex-shrink:0">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>

        @if (inputValue.length > 0) {
          <div class="status-row animate-fade-in">
            @if (isValid) {
              <span class="badge badge-success">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></svg>
                CPF Válido
              </span>
              <app-copy-btn [text]="inputValue" label="Copiar" />
            } @else {
              <span class="badge badge-error">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/></svg>
                CPF Inválido
              </span>
            }
          </div>
        }
      </div>

      <!-- Generate -->
      <div class="card">
        <div class="section-header">
          <div class="card-title" style="margin-bottom:0">Gerar CPF Válido para Testes</div>
          <button class="btn-primary" (click)="generate()" id="btn-gerar-cpf">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16V4a2 2 0 0 1 2-2h11"/><path d="M22 18H11v4l-5-4 5-4v4"/><path d="M5 14H4a2 2 0 1 1 0-4h1"/></svg>
            Gerar
          </button>
        </div>

        @if (generatedList.length > 0) {
          <div class="generated-list animate-fade-in">
            @for (cpf of generatedList; track cpf) {
              <div class="generated-item">
                <span class="result-value">{{ cpf }}</span>
                <app-copy-btn [text]="cpf" label="Copiar" />
              </div>
            }
          </div>
          <button class="btn-ghost" style="margin-top:8px" (click)="generateMore()">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Gerar mais 5
          </button>
        } @else {
          <div class="empty-hint">Clique em "Gerar" para criar CPFs válidos para testes de software</div>
        }
      </div>

      <!-- Privacy Trust Signal -->
      <div class="card privacy-card">
        <div class="privacy-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span>Privacidade Total</span>
        </div>
        <p class="privacy-text">Toda validação e geração de CPF é feita <strong>100% no seu navegador</strong> (client-side) via JavaScript. Nenhum dado é enviado, transmitido ou armazenado em nossos servidores. Sua privacidade está garantida.</p>
      </div>

      <!-- Tech Info -->
      <div class="card">
        <div class="card-title">Especificações do Campo</div>
        <div class="result-row">
          <span class="result-label">Tipo no Banco de Dados</span>
          <span class="result-value" style="font-size:13px">String (VARCHAR)</span>
        </div>
        <p class="tech-desc"><strong>Nota:</strong> É altamente recomendável armazenar como texto (String/VARCHAR) em vez de número (INT/BIGINT), pois números que começam com zero perdem os zeros à esquerda em tipos numéricos, corrompendo o dado.</p>
        
        <div class="result-row">
          <span class="result-label">Tamanho com Máscara</span>
          <span class="result-value" style="font-size:13px">14 caracteres <span style="color:var(--color-text-muted)">(000.000.000-00)</span></span>
        </div>
        
        <div class="result-row">
          <span class="result-label">Tamanho sem Máscara</span>
          <span class="result-value" style="font-size:13px">11 caracteres <span style="color:var(--color-text-muted)">(00000000000)</span></span>
        </div>
      </div>

      <!-- SEO Content: Algorithm Explanation -->
      <article class="seo-content">
        <h2 class="seo-heading">Como funciona o Validador de CPF?</h2>
        <p class="seo-paragraph">
          Nosso <strong>validador de CPF online</strong> utiliza o algoritmo oficial de cálculo dos dígitos verificadores,
          conhecido como <strong>módulo 11</strong>, para garantir que um Cadastro de Pessoa Física seja matematicamente válido.
          O processo é instantâneo: ao digitar os 11 números, a ferramenta calcula os dois últimos dígitos verificadores
          e compara com o valor informado, determinando a validade do CPF em milissegundos.
        </p>

        <h3 class="seo-subheading">O Algoritmo Módulo 11 Explicado</h3>
        <p class="seo-paragraph">
          O CPF é composto por 9 dígitos base + 2 dígitos verificadores. Para <strong>verificar os dígitos do CPF</strong>,
          multiplica-se cada um dos 9 primeiros números por pesos decrescentes (de 10 a 2 para o primeiro dígito,
          de 11 a 2 para o segundo), soma-se os resultados e aplica-se o resto da divisão por 11.
          Se o resto for menor que 2, o dígito verificador é 0; caso contrário, subtrai-se o resto de 11.
        </p>

        <h3 class="seo-subheading">Gerador de CPF Válido para Testes de Software</h3>
        <p class="seo-paragraph">
          Se você é desenvolvedor ou profissional de QA, utilize nosso <strong>gerador de CPF válido para teste</strong>
          para popular bancos de dados, testar formulários e validar regras de negócio em ambientes de desenvolvimento
          e homologação. Os CPFs gerados seguem o <strong>algoritmo de validação de CPF</strong> e são
          matematicamente corretos, mas não pertencem a nenhuma pessoa real.
        </p>

        <h3 class="seo-subheading">Implementação em TypeScript</h3>
        <p class="seo-paragraph">
          Como desenvolvedor, você pode implementar a validação de CPF diretamente no seu código.
          Abaixo está o algoritmo utilizado por esta ferramenta:
        </p>
        <pre class="code-block"><code>function validateCpf(cpf: string): boolean &#123;
  const digits = cpf.replace(/\\D/g, '');
  if (digits.length !== 11 || /^(\\d)\\1+$/.test(digits))
    return false;

  const calc = (mod: number) =&gt; &#123;
    let sum = 0;
    for (let i = 0; i &lt; mod - 1; i++)
      sum += +digits[i] * (mod - i);
    const r = (sum * 10) % 11;
    return r &gt;= 10 ? 0 : r;
  &#125;;

  return calc(10) === +digits[9]
      &amp;&amp; calc(11) === +digits[10];
&#125;</code></pre>

        <!-- FAQ Section -->
        <h2 class="seo-heading" style="margin-top:32px">Perguntas Frequentes (FAQ)</h2>
        
        <div class="faq-list">
          @for (faq of faqItems; track faq.question) {
            <details class="faq-item">
              <summary class="faq-question">{{ faq.question }}</summary>
              <p class="faq-answer">{{ faq.answer }}</p>
            </details>
          }
        </div>
      </article>
    </div>
  `,
  styles: [`
    .input-row { display: flex; gap: 8px; align-items: center; }
    .status-row { display: flex; align-items: center; gap: 10px; margin-top: 14px; }
    .generated-list { display: flex; flex-direction: column; gap: 3px; margin-top: 16px; }
    .generated-item { display: flex; align-items: center; justify-content: space-between; padding: 9px 12px; background: var(--color-bg-elevated); border-radius: 6px; border: 1px solid var(--color-border-subtle); transition: border-color 0.15s; }
    .generated-item:hover { border-color: var(--color-border); }
    .empty-hint { margin-top: 12px; font-size: 12px; color: var(--color-text-muted); }
    .tech-desc { font-size: 12px; color: var(--color-text-muted); line-height: 1.5; margin: 4px 0 12px 0; padding: 8px; background: var(--color-bg-elevated); border-radius: 6px; border-left: 3px solid var(--color-info); }

    /* Privacy card */
    .privacy-card { border-left: 3px solid var(--color-success); background: linear-gradient(135deg, var(--color-bg-card), rgba(34, 197, 94, 0.03)); }
    .privacy-header { display: flex; align-items: center; gap: 8px; color: var(--color-success); font-weight: 600; font-size: 14px; margin-bottom: 8px; }
    .privacy-text { font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; margin: 0; }

    /* SEO Content */
    .seo-content { margin-top: 8px; padding: 28px 24px; background: var(--color-bg-card); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); }
    .seo-heading { font-size: 18px; font-weight: 700; color: var(--color-text-primary); margin: 0 0 12px 0; letter-spacing: -0.3px; }
    .seo-subheading { font-size: 15px; font-weight: 600; color: var(--color-text-primary); margin: 24px 0 8px 0; }
    .seo-paragraph { font-size: 13.5px; color: var(--color-text-secondary); line-height: 1.7; margin: 0 0 12px 0; }

    /* FAQ */
    .faq-list { display: flex; flex-direction: column; gap: 4px; }
    .faq-item { background: var(--color-bg-elevated); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-md); overflow: hidden; transition: border-color 0.2s; }
    .faq-item[open] { border-color: var(--color-accent); }
    .faq-item[open] .faq-question { color: var(--color-accent-hover); }
    .faq-question { padding: 14px 16px; font-size: 13.5px; font-weight: 600; color: var(--color-text-primary); cursor: pointer; list-style: none; transition: color 0.2s; }
    .faq-question::-webkit-details-marker { display: none; }
    .faq-question::before { content: '›'; display: inline-block; margin-right: 10px; font-size: 16px; font-weight: 700; color: var(--color-text-muted); transition: transform 0.2s; }
    .faq-item[open] .faq-question::before { transform: rotate(90deg); color: var(--color-accent); }
    .faq-question:hover { color: var(--color-accent-hover); }
    .faq-answer { padding: 0 16px 14px 26px; font-size: 13px; color: var(--color-text-secondary); line-height: 1.6; margin: 0; }
  `],
})
export class CpfComponent {
  private svc = inject(DocumentoService);
  private meta = inject(Meta);
  private title = inject(Title);

  inputValue = '';
  isValid = false;
  generatedList: string[] = [];

  faqItems = [
    {
      question: 'Os dados digitados no validador de CPF são salvos em algum servidor?',
      answer: 'Não. Toda a validação e geração de CPF é feita via JavaScript diretamente no seu navegador (client-side). Nenhum dado é enviado, transmitido ou armazenado em nossos servidores. Privacidade total.'
    },
    {
      question: 'O CPF gerado pertence a alguma pessoa real?',
      answer: 'Não. Os CPFs gerados são números matematicamente válidos criados aleatoriamente. Eles não estão vinculados a nenhum cadastro real na Receita Federal e devem ser usados exclusivamente para testes de software.'
    },
    {
      question: 'Posso usar o gerador de CPF para testes de software e QA?',
      answer: 'Sim! O gerador de CPF válido para testes é ideal para desenvolvedores e profissionais de QA que precisam popular bancos de dados, testar formulários ou validar regras de negócio em ambientes de desenvolvimento e homologação.'
    },
    {
      question: 'Como o algoritmo de validação de CPF funciona?',
      answer: 'O CPF é validado através do algoritmo módulo 11. Os 9 primeiros dígitos são multiplicados por pesos decrescentes, somados e divididos por 11. O resultado determina os dois dígitos verificadores. Se os dígitos calculados coincidem com os informados, o CPF é válido.'
    },
    {
      question: 'Qual o melhor tipo de campo para armazenar CPF no banco de dados?',
      answer: 'Recomenda-se VARCHAR(14) com máscara ou VARCHAR(11) sem máscara. Nunca use campos numéricos (INT/BIGINT), pois CPFs que começam com zero perderiam os zeros à esquerda, corrompendo o dado.'
    }
  ];

  constructor() {
    this.title.setTitle('Validador de CPF Online — Verificar e Gerar CPF Válido Grátis');
    this.meta.updateTag({ name: 'description', content: 'Validador e Gerador de CPF online grátis. Validação matemática instantânea com algoritmo módulo 11, 100% privada no seu navegador. Ideal para testes de software e QA.' });
  }

  onInput(value: string): void {
    this.inputValue = this.svc.maskCpf(value);
    const digits = this.inputValue.replace(/\D/g, '');
    this.isValid = digits.length === 11 ? this.svc.validateCpf(digits) : false;
  }

  clear(): void { this.inputValue = ''; this.isValid = false; }

  generate(): void {
    this.generatedList = Array.from({ length: 5 }, () => this.svc.generateCpf());
  }

  generateMore(): void {
    this.generatedList = [...this.generatedList, ...Array.from({ length: 5 }, () => this.svc.generateCpf())];
  }
}
