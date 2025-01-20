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
import { useState } from 'react';

export const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg.content} isUser={msg.role === 'user'} />
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
    </section>
  );
};