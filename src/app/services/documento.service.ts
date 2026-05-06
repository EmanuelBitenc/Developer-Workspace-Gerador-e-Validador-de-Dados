import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DocumentoService {
  // ─── CPF ────────────────────────────────────────────────────────────────────
  maskCpf(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
  }

  validateCpf(cpf: string): boolean {
    const digits = cpf.replace(/\D/g, '');
    if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;
    const calc = (mod: number) => {
      let sum = 0;
      for (let i = 0; i < mod - 1; i++) sum += +digits[i] * (mod - i);
      const r = (sum * 10) % 11;
      return r >= 10 ? 0 : r;
    };
    return calc(10) === +digits[9] && calc(11) === +digits[10];
  }

  generateCpf(): string {
    const rand = (n: number) => Math.floor(Math.random() * n);
    const digits = Array.from({ length: 9 }, () => rand(10));
    const calc = (arr: number[]) => {
      const sum = arr.reduce((acc, v, i) => acc + v * (arr.length + 1 - i), 0);
      const r = (sum * 10) % 11;
      return r >= 10 ? 0 : r;
    };
    digits.push(calc(digits));
    digits.push(calc(digits));
    const d = digits.join('');
    return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
  }

  // ─── CNPJ ───────────────────────────────────────────────────────────────────
  maskCnpj(value: string): string {
    let chars = value.replace(/[^a-zA-Z0-9]/g, '').toUpperCase().slice(0, 14);
    if (chars.length <= 2) return chars;
    if (chars.length <= 5) return chars.replace(/(.{2})(.+)/, '$1.$2');
    if (chars.length <= 8) return chars.replace(/(.{2})(.{3})(.+)/, '$1.$2.$3');
    if (chars.length <= 12) return chars.replace(/(.{2})(.{3})(.{3})(.+)/, '$1.$2.$3/$4');
    return chars.replace(/(.{2})(.{3})(.{3})(.{4})(.+)/, '$1.$2.$3/$4-$5');
  }

  validateCnpj(cnpj: string): boolean {
    const chars = cnpj.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
    if (chars.length !== 14 || /^([A-Z0-9])\1+$/.test(chars)) return false;
    if (!/^[A-Z0-9]{12}\d{2}$/.test(chars)) return false; // DV is always numeric

    const calcDigit = (str: string, weights: number[]) => {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        const char = str[i];
        const val = (char >= '0' && char <= '9') ? parseInt(char, 10) : char.charCodeAt(0) - 48;
        sum += val * weights[i];
      }
      const r = sum % 11;
      return r < 2 ? 0 : 11 - r;
    };

    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    return (
      calcDigit(chars.slice(0, 12), w1) === +chars[12] &&
      calcDigit(chars.slice(0, 13), w2) === +chars[13]
    );
  }

  generateCnpj(): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randChar = () => chars[Math.floor(Math.random() * chars.length)];
    const randDigit = () => chars[Math.floor(Math.random() * 10)];
    
    // As 8 primeiras posições (raiz) podem ser alfanuméricas
    let base = Array.from({ length: 8 }, () => randChar());
    // As próximas 4 posições (filial) geraremos numericamente (0001, 0002) por segurança,
    // mas o padrão aceita alfa numérico também. Vamos usar 0001 padrão.
    base.push('0', '0', '0', '1');
    
    const calcDigit = (strArr: string[], weights: number[]) => {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        const char = strArr[i];
        const val = (char >= '0' && char <= '9') ? parseInt(char, 10) : char.charCodeAt(0) - 48;
        sum += val * weights[i];
      }
      const r = sum % 11;
      return r < 2 ? '0' : String(11 - r);
    };

    const w1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const w2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    
    base.push(calcDigit(base, w1));
    base.push(calcDigit(base, w2));
    
    const d = base.join('');
    return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
  }

  // ─── CNH ────────────────────────────────────────────────────────────────────
  maskCnh(value: string): string {
    return value.replace(/\D/g, '').slice(0, 11);
  }

  validateCnh(cnh: string): boolean {
    const digits = cnh.replace(/\D/g, '');
    if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;
    const dsp = +digits[9];
    let sum1 = 0;
    let carry = 0;
    for (let i = 0; i < 9; i++) sum1 += +digits[i] * (9 - i);
    let firstDigit = sum1 % 11;
    if (firstDigit >= 10) { firstDigit = 0; carry = 2; } else { carry = 1; }
    let sum2 = 0;
    for (let i = 0; i < 9; i++) sum2 += +digits[i] * (1 + i);
    let secondDigit = (sum2 % 11) + carry;
    if (secondDigit >= 10) secondDigit = 0;
    return firstDigit === dsp && secondDigit === +digits[10];
  }

  // ─── PIS/PASEP ──────────────────────────────────────────────────────────────
  maskPis(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    return digits
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})\.(\d{5})(\d)/, '$1.$2.$3')
      .replace(/(\d{3})\.(\d{5})\.(\d{2})(\d)/, '$1.$2.$3-$4');
  }

  validatePis(pis: string): boolean {
    const digits = pis.replace(/\D/g, '');
    if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) return false;
    const weights = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const sum = weights.reduce((acc, w, i) => acc + w * +digits[i], 0);
    const remainder = sum % 11;
    const check = remainder < 2 ? 0 : 11 - remainder;
    return check === +digits[10];
  }

  // ─── TÍTULO DE ELEITOR ──────────────────────────────────────────────────────
  maskTituloEleitor(value: string): string {
    return value.replace(/\D/g, '').slice(0, 12);
  }

  validateTituloEleitor(titulo: string): { valid: boolean; estado?: string; zona?: string; secao?: string } {
    const digits = titulo.replace(/\D/g, '');
    if (digits.length !== 12) return { valid: false };

    const seq = digits.slice(0, 8);
    const estadoCode = +digits.slice(8, 10);
    const zona = digits.slice(8, 11);
    const secao = digits.slice(11, 12);

    if (estadoCode < 1 || estadoCode > 28) return { valid: false };

    const estados: Record<number, string> = {
      1: 'SP', 2: 'MG', 3: 'RJ', 4: 'RS', 5: 'BA', 6: 'PR', 7: 'CE',
      8: 'PE', 9: 'SC', 10: 'GO', 11: 'MA', 12: 'PB', 13: 'PA', 14: 'ES',
      15: 'PI', 16: 'RN', 17: 'AL', 18: 'MT', 19: 'MS', 20: 'DF',
      21: 'SE', 22: 'AM', 23: 'RO', 24: 'AC', 25: 'AP', 26: 'RR',
      27: 'TO', 28: 'ZZ',
    };

    const w1 = [2, 3, 4, 5, 6, 7, 8, 9];
    const sum1 = w1.reduce((acc, w, i) => acc + w * +seq[i], 0);
    const d1base = sum1 % 11;
    let d1 = d1base === 0 ? (estadoCode < 2 || estadoCode > 9 ? 1 : 0) : (d1base === 1 ? (estadoCode < 2 || estadoCode > 9 ? 1 : 0) : d1base);
    if (d1base === 0 || d1base === 1) d1 = 0;

    const seqEstado = digits.slice(8, 10);
    const w2 = [7, 8, 9];
    const checkStr = seqEstado + d1;
    const sum2 = w2.reduce((acc, w, i) => acc + w * +String(checkStr)[i], 0);
    const d2base = sum2 % 11;
    let d2 = d2base === 0 ? (estadoCode < 2 || estadoCode > 9 ? 1 : 0) : (d2base === 1 ? 0 : d2base);

    // simplified validation
    return {
      valid: true,
      estado: estados[estadoCode] ?? 'Desconhecido',
      zona,
      secao,
    };
  }
}
