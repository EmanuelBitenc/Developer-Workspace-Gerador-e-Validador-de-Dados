import { Component, Input } from '@angular/core';

const ICONS: Record<string, string> = {
  copy: '<path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
};

@Component({
  selector: 'app-copy-btn',
  template: `
    <button
      class="copy-btn"
      [class.copied]="copied"
      (click)="copy()"
      [title]="copied ? 'Copiado!' : 'Copiar'"
    >
      @if (copied) {
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
        Copiado!
      } @else {
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/></svg>
        {{ label }}
      }
    </button>
  `,
})
export class CopyBtnComponent {
  @Input() text = '';
  @Input() label = 'Copiar';

  copied = false;
  private timeout: ReturnType<typeof setTimeout> | null = null;

  async copy(): Promise<void> {
    if (!this.text) return;
    try {
      await navigator.clipboard.writeText(this.text);
      this.copied = true;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => { this.copied = false; }, 2000);
    } catch { /* SSR/non-secure context fallback */ }
  }
}
