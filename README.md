![](thumbnail.png)
# Assistente Pessoal com IA

Um assistente pessoal baseado em IA que responde perguntas sobre o seu perfil, curiosidades e outras informações personalizadas. O projeto utiliza **Next.js 15.1**, **Google Generative AI (Gemini)** e dados JSON para criar respostas ricas e contextuais.

---

## 🚀 Funcionalidades

- **Perfil Personalizado**: Responde perguntas sobre informações pessoais (idade, data de nascimento, endereço, hobbies, etc.) baseadas em um arquivo JSON.
- **Curiosidades**: Reconhece palavras-chave e retorna curiosidades pré-definidas.
- **IA Generativa**: Gera respostas dinâmicas utilizando o modelo Gemini da Google Generative AI.
- **Histórico de Conversas**: Mantém o contexto de mensagens para respostas mais relevantes.

---

## 🛠️ Tecnologias Utilizadas

- **Front-End**: React com Next.js 15.1
- **Back-End**: Next.js API Route
- **IA**: Google Generative AI (Gemini)
- **Estilização**: TailwindCSS
- **Gerenciamento de Dados**: JSON para informações de perfil e curiosidades

---

## 📂 Estrutura do Projeto
.
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── chat/
│   │   │   │   └── route.js      # Rota principal da API para interações
│   │   └── page.js               # Página principal do projeto
│   ├── data/
│   │   ├── perfil.json           # Dados personalizados do perfil
│   │   └── curiosidades.json     # Curiosidades relacionadas a palavras-chave
│   ├── styles/
│   │   └── globals.css           # Estilização global com TailwindCSS
└── README.md                     # Documentação do projeto



---

## ⚙️ Pré-Requisitos

- **Node.js** (v18 ou superior)
- **NPM** ou **Yarn**
- Conta no Google Cloud com acesso ao **Google Generative AI API (Gemini)**

---

## 🛠️ Configuração do Projeto

## Ajustes e Melhorias

    Adicionar Mais Curiosidades: Atualize o arquivo curiosidades.json.
    Personalizar o Perfil: Modifique o arquivo perfil.json.
    Melhorias no Prompt: Ajuste o texto enviado ao modelo Gemini para refinar as respostas.

## Licença

Este projeto está licenciado sob a MIT License.


## Autor

Aparecido Celso De Souza Junior
    LinkedIn
    GitHub

## 🛠️ Como executar o projeto

Siga os passos abaixo para rodar o projeto localmente:

1. Clone o repositório para sua máquina.
2. Abra o projeto no seu editor de código preferido.
3. No terminal, navegue até o diretório do projeto.
4. Execute o comando `npm install` para instalar as dependências.
5. Inicie o servidor de desenvolvimento com `npm run dev`.
6. Acesse `http://localhost:3000` no seu navegador para visualizar o projeto.


## Como Usar

    Faça Perguntas: Utilize o campo de entrada para perguntar qualquer coisa sobre o perfil ou as curiosidades.
    Exemplos de Perguntas:
        "Qual é a sua idade?"
        "Onde você mora?"
        "tem plano para o futuro?"
