'use client'

import Button from '../Button';
import { IconClose } from '../Icons';
import styles from './chatBubble.module.css';
import ReactMarkdown from 'react-markdown';

export default function ChatBubble({ message, onRemove, isUser = false }  ) {
  return (
    <div className={`${styles.bubbleWrapper} ${isUser ? styles.user : styles.bot}`}>
      <div className={styles.bubble}>
        <ReactMarkdown>{message}</ReactMarkdown>
        <div>
        {!isUser ? (
            <>
              <Button variant={isUser ? 'secondary' : 'primary'} onClick={() => onRemove()}>
                Refazer <IconClose fill={isUser ? '#C5C5C5' : '#222222'} />
              </Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}