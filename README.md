# Developer Workspace: Gerador e Validação de Dados

Uma plataforma web de alta performance focada em utilitários e ferramentas para desenvolvedores (*DevTools*). Construída para operar 100% no lado do cliente (e otimizada via SSR), oferece validações e gerações instantâneas sem a necessidade de requisições a APIs externas, garantindo total privacidade e velocidade.

## 🚀 Funcionalidades

A plataforma centraliza utilitários em um **Dashboard (Painel Inicial)** interativo, dividido em dois grupos principais:

### 📄 Documentos e Registros Brasileiros
Validações algorítmicas baseadas em cálculos de módulo 11 e regras governamentais.
- **CPF:** Validação, máscara em tempo real e gerador em lote.
- **CNPJ:** Suporte total ao **novo CNPJ Alfanumérico** da Receita Federal. Validação ASCII de dígitos e geração de massa.
- **CNH:** Validação de segurança dos dígitos verificadores (RENACH).
- **PIS / PASEP / NIT:** Validação utilizando algoritmo oficial e máscaras automatizadas.
- **Título de Eleitor:** Descobre automaticamente o Estado (UF) e Zona com base na composição do número e valida os DVs.
- **Massa de Dados (Data Generator):** Geração customizada de lotes de dados aleatórios estruturados em JSON ou CSV para mock de APIs e testes de QA.
- **CEP e Endereços:** Busca por CEP integrando API externa e gerador de endereços falsos válidos do Brasil.

### 🛠️ Developer Tools
- **JWT Decoder:** Decodifica tokens (JSON Web Token), expõe Header e Payload com *pretty-print* e checa a data de expiração (exp/iat) com base no relógio do sistema.
- **JSON Formatter:** Validação em tempo real (Syntax catch), pretificação de JSON (indentação) e minificação para 1-line.
- **Base64 Converter:** Encode e Decode base64 bidirecional lidando corretamente com strings e URIs.
- **UUID Generator:** Gera lotes de UUID v4 usando a API de Criptografia Web nativa (`crypto.randomUUID()`) e conta com Regex para validação.
- **URL Encoder & Decoder:** Codifique ou decodifique URLs, parâmetros de consulta (Query Params) e strings especiais de forma instantânea.
- **Gerador de Hashes:** Ferramenta veloz para produzir hashes criptográficos, gerando MD5, SHA-1, SHA-256 e SHA-512 ao mesmo tempo.
- **Formatador SQL (Beautifier):** Limpa, indenta e formata queries SQL sujas para os padrões PostgreSQL, facilitando a leitura de logs.
- **Comparador de Textos (Text Diff):** Analisador visual para destacar diferenças (adições e remoções) entre dois textos ou arquivos JSON parecidos.
- **Gerador de Senhas:** Motor de geração de senhas altamente seguras com customização de complexidade e tamanho, usando entropia forte no client-side.

## 💻 Tecnologias e Bibliotecas

Este projeto foi desenhado sob uma arquitetura de vanguarda e minimalista:

- **Framework:** [Angular 19+](https://angular.dev/)
  - Utilizando a mais nova engine do Angular com Componentes Standalone (sem `NgModules`).
  - **SSR (Server-Side Rendering):** Habilitado com Hydration para carregar mais rápido e melhorar indexações (SEO).
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
  - Abordagem híbrida: O motor do Tailwind processa o CSS, enquanto um sistema poderoso de *Design Tokens* personalizados em CSS puro (`styles.css`) dá a vida ao **Dark Mode nativo**.
- **Ícones:** SVGs Inline desenhados à mão e inspirados no padrão *Lucide*, eliminando dependências pesadas no pacote final (`bundle`).
- **Fontes:** Google Fonts (Inter para leitura, JetBrains Mono para códigos).

## ⚙️ Configurações e Instalação

Siga as instruções abaixo para rodar o ambiente de desenvolvimento na sua máquina.

### Pré-requisitos
- **Node.js** (versão 18.19.1+ recomendada)
- **NPM** ou **Yarn**
- **Angular CLI** global (Opcional, pode usar via npx)

### Rodando o projeto

1. **Clone o repositório ou acesse a pasta do projeto:**
   \`\`\`bash
   cd Validador
   \`\`\`

2. **Instale as dependências:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Inicie o servidor de desenvolvimento:**
   \`\`\`bash
   npm run start
   # ou
   ng serve
   \`\`\`

4. **Acesse no navegador:**
   Navegue até `http://localhost:4200/`. A aplicação recarregará automaticamente ao salvar novos arquivos.

### Gerando o Build de Produção

Para publicar a aplicação otimizada:
\`\`\`bash
npm run build
\`\`\`
Isso irá gerar os arquivos estáticos e o Node server (SSR) dentro do diretório `dist/`.

## 📚 Documentação Técnica (Destaques)

- **`DocumentoService` (Core Logic):** Centraliza toda a matemática das ferramentas de "Documentos". Não consome chamadas de rede (fetch/axios) para gerar ou validar CPFs/CNPJs, o que diminui latência e protege os dados gerados/validados.
- **Otimização SEO (Search Engine Optimization):** Implementa o `@angular/platform-browser` (`Title` e `Meta`) para atualizar `og:tags`, títulos de página e injeções contextuais por rota (Dynamic Route SEO). Possui JSON-LD (`schema.org`) estruturado no `index.html`.
- **Clipboard API Global:** O componente independente `app-copy-btn` encapsula a API nativa de clipboard (`navigator.clipboard`) com gerenciamento de estado assíncrono, exibindo *feedbacks* temporários ("Copiado! ✓") sem poluir os códigos das páginas utilitárias.
- **Responsividade:** Estrutura baseada em App Shell. O menu (`sidebar`) se converte nativamente para uma visualização *off-canvas* em dispositivos móveis, acionado pela global-topbar com foco na usabilidade em telas pequenas.

---
*Desenvolvido sob padrões de engenharia de software de ponta, visando simplicidade, robustez e a melhor experiência de usuário.*
