# 🚀 Deploy no GitHub Pages

Este guia explica como fazer o deploy automático do projeto no GitHub Pages.

## 📋 Pré-requisitos

1. Ter uma conta no GitHub
2. Ter o Git instalado localmente

## 🔧 Configuração Inicial

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com)
2. Clique em **"New repository"** (botão verde)
3. Configure o repositório:
   - **Repository name**: `ruleta-aleatoria`
   - **Description**: "Roleta Aleatória - Random Wheel"
   - **Visibility**: Public
   - ⚠️ **NÃO** marque "Add a README file"
4. Clique em **"Create repository"**

### 2. Configurar GitHub Pages

1. No seu repositório, vá em **Settings** (Configurações)
2. No menu lateral, clique em **Pages**
3. Em **Source** (Origem), selecione:
   - **Source**: GitHub Actions
4. Pronto! Não precisa fazer mais nada aqui

### 3. Subir o Código para o GitHub

Execute os seguintes comandos no terminal (dentro da pasta do projeto):

```bash
# Inicializar repositório Git (se ainda não foi feito)
git init

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "🎡 Projeto inicial - Roleta Aleatória"

# Adicionar o repositório remoto
# ⚠️ SUBSTITUA 'SEU-USUARIO' pelo seu nome de usuário do GitHub
git remote add origin https://github.com/SEU-USUARIO/ruleta-aleatoria.git

# Renomear a branch para main (se necessário)
git branch -M main

# Fazer push para o GitHub
git push -u origin main
```

## ✅ Deploy Automático

Após fazer o push, o GitHub Actions irá:

1. ✨ Detectar automaticamente o push
2. 📦 Instalar as dependências (`npm ci`)
3. 🔨 Fazer o build do projeto (`npm run build`)
4. 🚀 Fazer deploy para o GitHub Pages

### Acompanhar o Deploy

1. Vá até a aba **Actions** no seu repositório
2. Você verá o workflow "Deploy to GitHub Pages" rodando
3. Aguarde até aparecer um ✅ verde (leva ~1-2 minutos)

## 🌐 Acessar o Site

Após o deploy concluído, seu site estará disponível em:

```
https://SEU-USUARIO.github.io/ruleta-aleatoria/
```

Exemplo: `https://eduardodiogo.github.io/ruleta-aleatoria/`

## 🔄 Atualizações Futuras

Para atualizar o site, basta fazer push para a branch `main`:

```bash
# Fazer alterações no código...

# Adicionar as mudanças
git add .

# Fazer commit
git commit -m "✨ Descrição das alterações"

# Fazer push
git push
```

O deploy será automático! 🎉

## 🛠️ Arquivo de Configuração

O workflow do GitHub Actions está em:
```
.github/workflows/deploy.yml
```

## ⚙️ Configurações Importantes

### Base URL no Vite

O arquivo `vite.config.ts` está configurado com:

```typescript
base: '/ruleta-aleatoria/'
```

⚠️ **IMPORTANTE**: Se você mudar o nome do repositório, atualize esta linha!

## 🆘 Solução de Problemas

### Deploy falhou?

1. Verifique a aba **Actions** para ver o erro
2. Certifique-se de que:
   - O GitHub Pages está configurado com "GitHub Actions" como source
   - O nome do repositório é `ruleta-aleatoria` (ou ajuste o `base` no vite.config.ts)
   - Não há erros de build localmente (`npm run build`)

### Página em branco?

1. Verifique se o `base` no `vite.config.ts` está correto
2. Limpe o cache do navegador (Ctrl+Shift+R ou Cmd+Shift+R)
3. Aguarde alguns minutos - pode demorar para propagar

## 📝 Checklist

- [ ] Repositório criado no GitHub
- [ ] GitHub Pages configurado (Source: GitHub Actions)
- [ ] Código enviado para o GitHub (`git push`)
- [ ] Workflow executou com sucesso (✅ verde na aba Actions)
- [ ] Site acessível em `https://SEU-USUARIO.github.io/ruleta-aleatoria/`

## 🎯 Recursos Adicionais

- [Documentação do GitHub Pages](https://docs.github.com/pt/pages)
- [Documentação do Vite Deploy](https://vitejs.dev/guide/static-deploy.html#github-pages)
- [GitHub Actions Docs](https://docs.github.com/pt/actions)

---

**Feito com ❤️ usando React + TypeScript + Vite**
