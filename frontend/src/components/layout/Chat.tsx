import React, { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import styled from 'styled-components';
import NavBar from './NavBar';

interface Message {
  username: string;
  message: string;
}

const ChatContainer = styled.div`
  background-color: #f8f8f8;
  padding: 16px;
  border-radius: 4px;
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
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

const ChatButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #4caf50;
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const loggedInUser = localStorage.getItem('name');

const sendJoinMessage = () => {
  socket?.emit('join', loggedInUser);
};

  useEffect(() => {
    // Estabelecer conexão com o servidor WebSocket
    const socket = io('http://localhost:3002');
    setSocket(socket);

    sendJoinMessage();

    // Lidar com mensagens recebidas do servidor
    socket.on('chat message', (data: Message) => {
      setMessages(prevMessages => [...prevMessages, data]);
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
      socket?.emit('chat message', loggedInUser, inputValue);
      setInputValue('');
    }
  };

  return (
    <><NavBar />
      <ChatContainer>
        <ChatHeader>Chat</ChatHeader>
        <ChatMessages>
          {messages.map((message, index) => (
          <ChatMessage key={index}>
            <strong>{message.username}: </strong>
            {message.message}
          </ChatMessage>
        ))}
        </ChatMessages>
        <form onSubmit={handleSubmit}>
          <ChatInput type="text" value={inputValue} onChange={handleInputChange} placeholder="Digite sua mensagem" />
          <ChatButton type="submit">Enviar</ChatButton>
        </form>
      </ChatContainer>
    </>
  );
};

export default Chat;
