'use client';

import Button from '../Button';
import ChatBubble from '../ChatBubble';
import { ChatForm } from '../ChatForm';
import { ChatHeader } from '../ChatHeader';
import { IconStop } from '../Icons';
import { Loader } from '../Loader';
import { RetryButton } from '../RetryButton';
import { useChat } from 'ai/react';
import styles from './container.module.css';
import { useState,useEffect } from 'react';


export const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

    // Carregar conversa salva ao iniciar o chat (se existir)
    useEffect(() => {
      const savedMessages = localStorage.getItem('chatHistory');
      if (savedMessages) {
        try {
          const parsedMessages = JSON.parse(savedMessages);
          if (Array.isArray(parsedMessages)) {
            setMessages(parsedMessages);
          }
        } catch (error) {
          console.error('Erro ao carregar mensagens salvas:', error);
        }
      }
    }, []);

  const clearConversation = () => {
    localStorage.removeItem('chatHistory');  // Remove do localStorage
    setMessages([]);  // Limpa o estado do chat
    alert('Histórico de conversa apagado com sucesso!');
  };
    

  // Salvar conversa no localStorage
  const saveConversation = () => {
    if (messages.length > 0) {
      localStorage.setItem('chatHistory', JSON.stringify(messages));
      alert('Conversa salva com sucesso!');
    } else {
      alert('Nenhuma mensagem para salvar.');
    }
  };

  // Função refazer conversa do chat
  const handleRetry = async (index) => {
    if (!messages[index]?.content) {
      setError('Mensagem inválida para refazer.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const retryMessage = messages[index-1];
      console.log(`Reenviando: ${retryMessage.content}`);
      messages.pop();
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages] }),
      });

      if (!response.ok) throw new Error('Erro ao processar a solicitação.');

      const data = await response.json();
      setMessages(data);
      setInput('');
    } catch (err) {
      setError('Erro ao refazer a mensagem.');
    } finally {
      setIsLoading(false);
    }
  };

   // Função para remover mensagem para futuras implementações
  const handleRemoveMessage = (index) => {
    const updatedMessages = messages.filter((_, i) => i !== index);
    setMessages(updatedMessages);
  };

  // Função para enviar a mensagem
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    const newMessage = { id: Date.now().toString(), role: 'user', content: input };

    // Atualiza as mensagens com a entrada do usuário
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, newMessage] }),
      });

      if (!response.ok) throw new Error('Erro ao processar a solicitação.');

      const data = await response.json();
      setMessages(data);
      setInput('');
    } catch (err) {
      setError('Erro ao enviar a mensagem. Tente novamente.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className={styles.container}>
      <ChatHeader />

      <div className={styles.chat}>
        {messages.map((msg,index) => (
          <ChatBubble key={msg.id} message={msg.content} isUser={msg.role === 'user'} onRemove={() => handleRetry(index)}  />
        ))}

        {isLoading && (
          <div className={styles.loader}>
            <Loader />
          </div>
        )}

        {error && <div className={styles.error}><p>{error}</p></div>}
      </div>

      <ChatForm
        input={input}
        handleInputChange={(e) => setInput(e.target.value)}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />

      
      <div className={styles.gridContainer}>
        <Button onClick={saveConversation} variant="secondary">Salvar Conversa</Button>
        <Button onClick={clearConversation} variant="secondary">Limpar Conversa</Button>
      </div>
    </section>
  );
};