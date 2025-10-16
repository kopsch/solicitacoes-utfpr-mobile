#📱 App de Solicitações UTFPR
Um aplicativo móvel desenvolvido em React Native com TypeScript para que a comunidade UTFPR possa enviar reclamações e solicitações à central de atendimento.

##🚀 Funcionalidades

###🔐 Autenticação de Usuários
Login com e-mail e senha

Registro de novos usuários com nome, e-mail e senha

Persistência de sessão - o usuário permanece logado ao fechar o app

Logout seguro

###📋 Gestão de Solicitações
Criar nova solicitação com título, descrição e foto

Listagem pública de todas as solicitações ordenadas por data (mais recentes primeiro)

Visualização de detalhes com todos os dados da solicitação

Edição e exclusão de solicitações (apenas pelo dono)

Upload automático de fotos para o Firebase Storage

###📍 Geolocalização Automática
Captura automática da localização do usuário ao criar solicitação

Exibição de coordenadas (latitude e longitude) nos detalhes

###💬 Sistema de Comentários
Adicionar comentários em qualquer solicitação

Lista de comentários em tempo real

Modal elegante para adicionar novos comentários

Identificação do autor e data do comentário

###🎨 Interface e UX
Design responsivo seguindo guidelines do Android

Cabeçalhos personalizados com cores específicas

Loading states para melhor feedback ao usuário

SafeAreaView para compatibilidade com diferentes dispositivos

Navegação fluida entre telas

🛠 Tecnologias Utilizadas
React Native com TypeScript

Expo para desenvolvimento e build

Firebase (Auth, Firestore, Storage)

React Navigation (Stack Navigator)

Expo Camera para captura de fotos

Expo Location para geolocalização

Context API para gerenciamento de estado

Async Storage para persistência de login

1. 📥 Passos para Instalação, Configurações e Execução do Projeto
Pré-requisitos
Node.js (versão 16 ou superior)

npm ou yarn

Expo CLI

Conta no Google (para Firebase)

Dispositivo Android ou emulador

🔧 Configuração do Ambiente
1. Clone o repositório
bash
git clone <url-do-repositorio>
cd solicitacoes-utfpr
2. Instale as dependências
bash
npm install
# ou
yarn install
3. Configuração das Variáveis de Ambiente
O projeto já vem com um arquivo .env.example contendo as credenciais do Firebase configuradas para testes. Siga estes passos:

bash
# Copie o arquivo de exemplo
cp .env.example .env

# O arquivo .env já contém as credenciais de teste:
EXPO_PUBLIC_API_KEY=AIzaSyAJTzobg6jgucOGsalG8OKU_RZnl0_7fGA
EXPO_PUBLIC_AUTH_DOMAIN=utfpr-solicitacoes.firebaseapp.com
EXPO_PUBLIC_PROJECT_ID=utfpr-solicitacoes
EXPO_PUBLIC_STORAGE_BUCKET=utfpr-solicitacoes.firebasestorage.app
EXPO_PUBLIC_MESSAGING_SENDER_ID=865958766471
EXPO_PUBLIC_APP_ID=1:865958766471:web:837f667d29249aee629522
EXPO_PUBLIC_MEASUREMENT_ID=G-ZCEDSXZT7L
⚠️ Importante: Estas credenciais já estão configuradas no Firebase e permitem acesso total para testes. Para produção, configure suas próprias credenciais seguindo o próximo passo.