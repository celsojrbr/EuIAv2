import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";
import perfil from '@/data/perfil.json';
import curiosidades from '@/data/curiosidades.json';


// Instanciar o cliente do Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);



// Função para buscar informações do perfil
const funcoes ={ buscarInformacao: (message) => {
    const mensagemLower = message.toLowerCase();

    if (mensagemLower.includes('idade')) {
      return `Minha idade é ${perfil.idade}.`;
    }

    if (mensagemLower.includes('data de nascimento') || mensagemLower.includes('nascimento')) {
      return `Minha data de nascimento é ${perfil.datanascimento}.`;
    }

    if (mensagemLower.includes('endereço')) {
      return `Meu endereço é ${perfil.endereço}.`;
    }

    if (mensagemLower.includes('hobbies') || mensagemLower.includes('hobby')) {
      return `Meus hobbies incluem: ${perfil.hobbies.join(', ')}.`;
    }
    if (mensagemLower.includes('cor') || mensagemLower.includes('cor')) {
      return `Minha cor de pele é ${perfil.cor}.`;
    }

    return null; // Retorna null se nenhuma palavra-chave for encontrada
  }
};


const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash",systemInstruction:"Você é uma assistente virtual especializada em auxiliar na contratação de Aparecido Celso de Souza Junior. Suas respostas devem ser focadas em fornecer informações de Aparecido quais quer que seja elas presentadas no final. Caso a conversa se desvie para outros assuntos, responda de forma educada e profissional, indicando que não possui informações sobre o tema.agora algumas infomações util sobre Aparecido Celso de Souza Junior: ${JSON.stringify(perfil, null, 2)}, e outra curiosidades  ${JSON.stringify(curiosidades, null, 2)}" },{apiVersion:"v1beta"});




export async function POST(req) {
  try {
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Oi, estou procurando um novo programador para contratalo na minha empresa!" }],
        },
        {
          role: "model",
          parts: [
            { text: "Aqui estão informações detalhadas sobre Aparecido Celso de Souza Junior." },
            { text: JSON.stringify(perfil, null, 2) },
            { text: JSON.stringify(curiosidades, null, 2) },
          ],
        },
      ],
      generationConfig: {
        //esse config serve para limitar o tamanho do texto que vai ser exibido pro user, limita tamanho do texto do gimini
        maxOutputTokens: 1000,
      },
    });
    // Obter o corpo da requisição sem o useChat, no postman funcionou
    /*const body = await req.json();
    const userMessage = body.message;*/
    /*console.log(perfil);
    console.log(curiosidades);*/
    const { messages } = await req.json();
    //console.log(messages);
    console.log('usechat mandou pra a api:', messages);
    const userMessage = messages[messages.length - 1].content;
    
    // Validação do campo 'message'
    if (!userMessage || typeof userMessage !== "string" || !userMessage.trim()) {
      return NextResponse.json(
        { error: "O campo 'message' é obrigatório e deve ser uma string não vazia." },
        { status: 400 }
      );
    }

   
    // Configurar o prompt para o modelo
    const prompt = userMessage;

    
    const result = await chat.sendMessage(prompt);
    
    // Verificar o retorno da API e extrair a resposta
    const reply =
      result?.response?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Não consegui gerar uma resposta.";
    
    // Retornar todas as mensagens, incluindo a nova resposta do assistente
    const updatedMessages = [
      ...messages,
      { id: Date.now().toString(), role: "assistant", content: reply },
    ];
    
    // Retornar a resposta da IA
    console.log('Mensagens finalque envio devolta pro useChat:', updatedMessages);
    return NextResponse.json([
      ...messages,
      { id: Date.now().toString(), role: "assistant", content: reply },
    ],{
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Erro na API de chat:", error);
    return NextResponse.json(
      { error: "Erro ao processar a requisição. Tente novamente mais tarde." },
      { status: 500 }
    );
  }
}
