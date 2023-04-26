import React from 'react';
import styled from 'styled-components';
import { Title } from '../styled-components/Title.style';
import { SubmitButton } from '../styled-components/SubmitButton.style';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useForm, SubmitHandler } from 'react-hook-form';

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

  & a {
    color: #ef5466;
    text-decoration: none;
    margin-top: 20px;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
      color: #f00d0d;
    }
  }
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

type Inputs = {
  email: string,
  password: string,
};


export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => { 
    //await api.post("/auth/login", data);
    const response = await api.post("/auth/login", data);
    console.log(response);
  };

  return (
    <Container>
      <Title>Fazer Login</Title> 
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email", {required: true})} type="email" placeholder="Email" />
        <Input {...register("password", {required: true})} type="password" placeholder="Senha" />
        <SubmitButton type="submit">Entrar</SubmitButton>
        <Link to="/register">Ainda não tem uma conta? Cadastre-se agora</Link>
      </Form>
    </Container>
  );
}
