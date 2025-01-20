'use client';

import styles from './chat.module.css';
import { IconSend } from "../Icons";

export const ChatForm = ({ input, handleInputChange, handleSubmit, isLoading }) => {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="Digite sua mensagem..."
        required
        onChange={handleInputChange}
        value={input}
      />
      <button
        className={styles.btn}
        type="submit"
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? <span>Enviando...</span> : <IconSend />}
      </button>
    </form>
  );
};
