import React from 'react';
import styled from 'styled-components';
import { Title } from '../styled-components/Title.style';
import { SubmitButton } from '../styled-components/SubmitButton.style';
import { SignUpLink } from '../styled-components/SignUpLink.style';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 150px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 400px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
`;

export default function Login() {
  return (
    <Container>
      <Title>Fazer Login</Title> 
      <Form>
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Senha" />
        <SubmitButton>Entrar</SubmitButton>
        <SignUpLink href="/register">Ainda não tem uma conta? Cadastre-se agora</SignUpLink>
      </Form>
    </Container>
  );
}
