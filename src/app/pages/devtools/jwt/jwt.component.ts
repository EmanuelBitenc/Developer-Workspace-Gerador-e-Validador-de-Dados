import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import { CopyBtnComponent } from '../../../shared/copy-btn/copy-btn.component';

interface JwtPayload { [key: string]: unknown; }

@Component({
  selector: 'app-jwt',
  imports: [FormsModule, CopyBtnComponent],
  template: `
    <div class="page-container">
      <h1 class="page-title">JWT Decoder</h1>
      <p class="page-subtitle">Decodifique e inspecione tokens JSON Web Token</p>

      <div class="card animate-fade-in">
        <div class="card-title">Token JWT</div>
        <textarea
          class="textarea-field"
          placeholder="Cole o token JWT aqui... eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
          [(ngModel)]="tokenInput"
          (ngModelChange)="decode()"
          id="jwt-input"
          rows="4"
        ></textarea>
        @if (error) {
          <div class="error-msg animate-fade-in">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
            {{ error }}
          </div>
        }
      </div>

      @if (header) {
        <div class="card animate-fade-in">
          <div class="section-header">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="card-title" style="margin-bottom:0">Header</span>
              <span class="tag">alg: {{ header['alg'] }}</span>
              <span class="tag">typ: {{ header['typ'] }}</span>
            </div>
            <app-copy-btn [text]="headerJson" label="Copiar" />
          </div>
          <pre class="code-block">{{ headerJson }}</pre>
        </div>
      }

      @if (payload) {
        <div class="card animate-fade-in">
          <div class="section-header">
            <div style="display:flex;align-items:center;gap:8px">
              <span class="card-title" style="margin-bottom:0">Payload</span>
              @if (isExpired === true) {
                <span class="badge badge-error">Expirado</span>
              } @else if (isExpired === false) {
                <span class="badge badge-success">Válido</span>
              }
            </div>
            <app-copy-btn [text]="payloadJson" label="Copiar" />
          </div>
          <pre class="code-block">{{ payloadJson }}</pre>
          @if (payload['exp']) {
            <div style="margin-top:12px">
              <div class="result-row">
                <span class="result-label">Expira em</span>
                <span class="result-value" style="font-size:13px">{{ expDate }}</span>
              </div>
              @if (payload['iat']) {
                <div class="result-row">
                  <span class="result-label">Emitido em</span>
                  <span class="result-value" style="font-size:13px">{{ iatDate }}</span>
                </div>
              }
            </div>
          }
        </div>
      }

      @if (signature) {
        <div class="card animate-fade-in">
          <div class="section-header">
            <span class="card-title" style="margin-bottom:0">Signature</span>
            <app-copy-btn [text]="signature" label="Copiar" />
          </div>
          <div class="code-block" style="word-break:break-all">{{ signature }}</div>
          <p style="font-size:11px;color:var(--color-text-muted);margin-top:8px">⚠️ A assinatura não pode ser verificada no browser sem a chave secreta.</p>
        </div>
      }
    </div>
  `,
  styles: [`.error-msg{display:flex;align-items:center;gap:6px;margin-top:10px;color:var(--color-error);font-size:12px}`],
})
export class JwtComponent {
  private meta = inject(Meta);
  private title = inject(Title);
  tokenInput = '';
  header: JwtPayload | null = null;
  payload: JwtPayload | null = null;
  signature = '';
  headerJson = '';
  payloadJson = '';
  error = '';
  isExpired: boolean | null = null;
  expDate = '';
  iatDate = '';

  constructor() {
    this.title.setTitle('Decodificador JWT Online — Inspecione JSON Web Tokens | DevUtils');
    this.meta.updateTag({ name: 'description', content: 'Decodifique, analise e inspecione o Header e Payload de tokens JWT (JSON Web Token) de forma rápida e segura no browser, sem enviar dados a servidores externos.' });
  }

  decode(): void {
    this.header = null; this.payload = null; this.signature = ''; this.error = ''; this.isExpired = null;
    const token = this.tokenInput.trim();
    if (!token) return;
    const parts = token.split('.');
    if (parts.length !== 3) { this.error = 'Token inválido: um JWT deve ter exatamente 3 partes separadas por ponto.'; return; }
    try { this.header = JSON.parse(atob(this.b64(parts[0]))); this.headerJson = JSON.stringify(this.header, null, 2); } catch { this.error = 'Não foi possível decodificar o Header.'; return; }
    try {
      const p: JwtPayload = JSON.parse(atob(this.b64(parts[1])));
      this.payload = p; this.payloadJson = JSON.stringify(p, null, 2);
      if (p['exp']) { const exp = +p['exp'] * 1000; this.isExpired = Date.now() > exp; this.expDate = new Date(exp).toLocaleString('pt-BR'); }
      if (p['iat']) { this.iatDate = new Date(+p['iat'] * 1000).toLocaleString('pt-BR'); }
    } catch { this.error = 'Não foi possível decodificar o Payload.'; return; }
    this.signature = parts[2];
  }

  private b64(s: string): string {
    return s.replace(/-/g, '+').replace(/_/g, '/').padEnd(s.length + ((4 - (s.length % 4)) % 4), '=');
  }
}
