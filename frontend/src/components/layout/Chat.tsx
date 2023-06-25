import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';

const ChatContainer = styled.div`
  background-color: #f8f8f8;
  padding: 16px;
  border-radius: 4px;
  width: 400px;
`;

const ChatHeader = styled.h2`
  font-size: 18px;
  margin-bottom: 16px;
`;

const ChatMessages = styled.div`
  max-height: 300px;
  overflow-y: scroll;
  margin-bottom: 16px;
`;

const ChatMessage = styled.div`
  background-color: #ffffff;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const ChatInput = styled.input`
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Estabelecer conexão com o servidor WebSocket
    const socket = io('http://localhost:3001');
    setSocket(socket);

    // Lidar com mensagens recebidas do servidor
    socket.on('chat message', (message: string) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Limpar conexão ao desmontar o componente
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputValue.trim() !== '') {
      socket?.emit('chat message', inputValue);
      setInputValue('');
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>Chat</ChatHeader>
      <ChatMessages>
        {messages.map((message, index) => (
          <ChatMessage key={index}>{message}</ChatMessage>
        ))}
      </ChatMessages>
      <form onSubmit={handleSubmit}>
        <ChatInput type="text" value={inputValue} onChange={handleInputChange} placeholder="Digite sua mensagem" />
        <button type="submit">Enviar</button>
      </form>
    </ChatContainer>
  );
};

export default Chat;
