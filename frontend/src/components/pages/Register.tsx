import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Title } from '../styled-components/Title.style';
import { SubmitButton } from '../styled-components/SubmitButton.style';
import { SubmitHandler, useForm } from 'react-hook-form';
import api from '../../services/api';

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 150px 0;

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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 350px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 5px;
  color: #bebec7;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #f4511e;
  color: #fff;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

type Inputs = {
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
}

export default function Register() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await api.post("/auth/register", data);
    console.log(response);
    alert('Usuario criado com sucesso!');
  }

  return (
    <RegisterWrapper>
      <Title>Cadastre-se</Title>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper>
          <Label>Nome</Label>
          <Input {...register("name", { required: true })} type="text" />
        </InputWrapper>
        <InputWrapper>
          <Label>Email</Label>
          <Input {...register("email", { required: true })} type="email" />
        </InputWrapper>
        <InputWrapper>
          <Label>Senha</Label>
          <Input {...register("password", { required: true })} type="password" />
        </InputWrapper>
        <InputWrapper>
          <Label>Confirme sua senha</Label>
          <Input {...register("confirmPassword", { required: true })} type="password" />
        </InputWrapper>
        <ButtonWrapper>
          <SubmitButton type="submit">Registrar</SubmitButton>
        </ButtonWrapper>
      </Form>
      <Link to="/login">Você Já está cadastrado na Deezer? Login.</Link>
    </RegisterWrapper>
  );
};
