# 📱 App de Solicitações UTFPR
Um aplicativo móvel desenvolvido em React Native com TypeScript para que a comunidade UTFPR possa enviar reclamações e solicitações à central de atendimento.

## 🚀 Funcionalidades

### 🔐 Autenticação de Usuários
- Login com e-mail e senha
- Registro de novos usuários com nome, e-mail e senha
- Persistência de sessão - o usuário permanece logado ao fechar o app
- Logout seguro

### 📋 Gestão de Solicitações
- Criar nova solicitação com título, descrição e foto
- Listagem pública de todas as solicitações ordenadas por data (mais recentes primeiro)
- Visualização de detalhes com todos os dados da solicitação
- Edição e exclusão de solicitações (apenas pelo dono)
- Upload automático de fotos para o Firebase Storage

### 📍 Geolocalização Automática
- Captura automática da localização do usuário ao criar solicitação
- Exibição de coordenadas (latitude e longitude) nos detalhes

### 💬 Sistema de Comentários
- Adicionar comentários em qualquer solicitação
- Lista de comentários em tempo real
- Modal elegante para adicionar novos comentários
- Identificação do autor e data do comentário

### 🎨 Interface e UX
- Design responsivo seguindo guidelines do Android
- Loading states para melhor feedback ao usuário
- SafeAreaView para compatibilidade com diferentes dispositivos
- Persistência de Sessão de Usuário com Async Storage
- Navegação fluida entre telas

### 🛠 Tecnologias Utilizadas
- React Native com TypeScript
- Expo para desenvolvimento e build
- Firebase (Auth, Firestore, Storage)
- React Navigation (Stack Navigator)
- Expo Camera para captura de fotos
- Expo Location para geolocalização
- Context API para gerenciamento de estado
- Async Storage para persistência de login

### 1. 📥 Passos para Instalação, Configurações e Execução do Projeto
Pré-requisitos

- Node.js (versão 22.12 ou superior)
- npm ou yarn
- Expo CLI (https://cursos.alura.com.br/forum/topico-duvida-passo-a-passo-para-instalar-o-expo-cli-302480)
- Dispositivo Android ou emulador

#### 🔧 Configuração do Ambiente
1. Clone o repositório
```bash
git clone https://github.com/kopsch/solicitacoes-utfpr-mobile.git
cd solicitacoes-utfpr-mobile
```
2. Instale as dependências
```bash 
npm install
```
ou
```bash 
yarn install
```
3. Configuração das Variáveis de Ambiente

O projeto já vem com um arquivo .env.example contendo as credenciais do Firebase configuradas para testes. Siga estes passos:

```bash
# Copie o arquivo de exemplo
cp .env.example .env
```

⚠️ Importante: Estas credenciais já estão configuradas no Firebase e permitem acesso total para testes.

5. Executar o aplicativo
```bash
# Desenvolvimento
npm run start
```

6. Testar no dispositivo
- Método 1 (Recomendado): Instale o app Expo Go na Play Store e escaneie o QR code gerado no terminal
- Método 2: Execute em um emulador Android (Android Studio)
- Método 3: Para desenvolvimento web: npx expo start --web

7. (opcional) Caso queira gerar o APK para teste (Build de Produção) 

-  Instale o EAS CLI:
```bash
npm install -g eas-cli
```
Faça login na sua conta Expo:

Se você ainda não tiver uma conta, crie gratuitamente em https://expo.dev/signup

```bash
eas login
```

Configure o projeto:

```bash
eas build:configure
```

Gere o APK:

```bash
eas build -p android --profile preview
```

Download do APK:
Após o build terminar, o terminal exibirá um link para download, por exemplo:

```ruby
✔ Build finished
Download: https://expo.dev/artifacts/eas/abcdef1234
```

### 2. 🧪 Dados e Informações para o Teste
🔑 Credenciais de Teste Pré-configuradas
O Firebase já está configurado com estas contas para testes:

```text
# conta com solicitação cadastrada
pedro.dono@utfpr.edu.br
teste1234

# conta sem solicitação cadastrada e com comentário cadastrado
pedro.teste@utfpr.edu.br
teste1234
```

#### 🎯 Fluxo de Teste Recomendado
- 1. Primeiro Acesso
    - Abra o app pelo Expo Go usando o QR Code gerado no terminal
    - Use uma das credenciais acima para fazer login
    - Ou crie uma nova conta clicando em "Não tem uma conta? Registre-se"

- 2. Criar Solicitação
    - Na tela inicial, clique no botão + no cabeçalho
    - Preencha:
        - Título: "Buraco na quadra esportiva"
        - Descrição: "Existe um buraco grande no meio da quadra que oferece risco aos alunos"
        - Clique em "Tirar Foto" e tire uma foto (simulada ou real)
        - Clique em "Cadastrar"

- 3. Visualizar e Interagir
    - Na lista inicial, clique na solicitação criada
    - Veja todos os detalhes: foto, localização, data, descrição
    - Como dono: Aparecerão botões para Editar/Excluir
    - Como qualquer usuário: Pode adicionar comentários

- 4. Sistema de Comentários
    - Na tela de detalhes, clique no botão + flutuante no canto inferior direito
    - Digite um comentário como: "Confirmo, já vi esse problema também!"
    - Clique em "Salvar"

### 📱 Telas para Testar
- ✅ Login Screen - Autenticação básica
- ✅ Register Screen - Criação de nova conta
- ✅ Home Screen - Listagem de solicitações
- ✅ New Request Screen - Formulário de criação
- ✅ Camera Screen - Captura de fotos
- ✅ Request Details Screen - Visualização completa + comentários

### 🔒 Permissões Necessárias
#### O app solicita automaticamente:
- 📷 Câmera: Para tirar fotos das solicitações
- 📍 Localização: Para geolocalização automática
