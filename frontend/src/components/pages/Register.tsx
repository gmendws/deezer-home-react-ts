import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Title } from '../styled-components/Title.style';
import { SubmitButton } from '../styled-components/SubmitButton.style';

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

const Register = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <RegisterWrapper>
      <Title>Cadastre-se</Title>
      <Form onSubmit={handleSubmit}>
        <InputWrapper>
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" name="name" />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" name="email" />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" name="password" />
        </InputWrapper>
        <InputWrapper>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input type="password" id="confirmPassword" name="confirmPassword" />
        </InputWrapper>
        <ButtonWrapper>
          <SubmitButton type="submit">Register</SubmitButton>
        </ButtonWrapper>
      </Form>
      <Link to="/login">Você Já está cadastrado na Deezer? Login.</Link>
    </RegisterWrapper>
  );
};

export default Register;
