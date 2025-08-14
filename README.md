# Timeline Project

Um projeto de timeline interativa construído com React e Parcel.

## 🚀 Como executar localmente

1. Instale as dependências:

```bash
npm install
```

2. Execute o projeto em modo de desenvolvimento:

```bash
npm start
```

O projeto será aberto automaticamente no seu navegador em `http://localhost:1234`.

## 📦 Build para produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos serão gerados na pasta `dist/`.

## 🌐 Deploy no GitHub Pages

### Passo 1: Preparar o repositório

1. Crie um novo repositório no GitHub
2. Clone o repositório para sua máquina local
3. Copie todos os arquivos deste projeto para o repositório

### Passo 2: Configurar o projeto

1. **Atualize o `homepage` no `package.json`:**

   - Substitua `[SEU_USUARIO]` pelo seu nome de usuário do GitHub
   - Substitua `[NOME_DO_REPO]` pelo nome do seu repositório

2. **Instale as dependências:**

```bash
npm install
```

3. **Instale o gh-pages globalmente (opcional):**

```bash
npm install -g gh-pages
```

### Passo 3: Fazer deploy

1. **Faça commit das suas alterações:**

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Execute o deploy:**

```bash
npm run deploy
```

### Passo 4: Configurar GitHub Pages

1. Vá para as configurações do seu repositório no GitHub
2. Navegue até "Pages" na barra lateral
3. Em "Source", selecione "Deploy from a branch"
4. Escolha a branch `gh-pages` e a pasta `/ (root)`
5. Clique em "Save"

### Passo 5: Acessar seu site

Seu site estará disponível em: `https://[SEU_USUARIO].github.io/[NOME_DO_REPO]`

## 🔧 Scripts disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria o build de produção
- `npm run deploy` - Faz deploy no GitHub Pages

## 📁 Estrutura do projeto

```
timeline/
├── src/
│   ├── App.js          # Componente principal
│   ├── Timeline.js      # Componente da timeline
│   ├── TimelineItem.js  # Item individual da timeline
│   ├── EditModal.js     # Modal de edição
│   ├── assignLanes.js   # Lógica de atribuição de faixas
│   ├── timelineItems.js # Dados da timeline
│   ├── app.css         # Estilos globais
│   ├── Timeline.css    # Estilos da timeline
│   ├── index.html      # HTML principal
│   └── index.js        # Ponto de entrada
├── package.json         # Dependências e scripts
└── README.md           # Este arquivo
```

## 🎨 Tecnologias utilizadas

- **React 18** - Biblioteca para interfaces de usuário
- **Parcel** - Bundler e dev server
- **CSS** - Estilização
- **GitHub Pages** - Hospedagem

## 📝 Notas importantes

- O deploy é feito automaticamente na branch `gh-pages`
- Certifique-se de que o `homepage` no `package.json` está correto
- Após o deploy, pode levar alguns minutos para o site ficar disponível
- Para atualizações futuras, basta executar `npm run deploy` novamente
