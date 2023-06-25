import styled from 'styled-components';
import { Title } from '../styled-components/Title.style';
import { SubmitButton } from '../styled-components/SubmitButton.style';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useForm, SubmitHandler } from 'react-hook-form';
import logo from "../../img/Deezer_Logo_RVB_White.svg";
import Alert from '../layout/Alert';
import { useState } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px 0;
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

const DivLogo = styled.div`
  width: 148px;
  margin: 0 auto;  
  margin-top: 40px;
`;

const LogoStyle = styled.img`
  height: 24px;
  width: auto;
`

type Inputs = {
  email: string,
  password: string,
};

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await api.post("/auth/login", data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('name', response.data.name);
      setAlertMessage(response.data.msg);
      navigate('/music');
    } catch (error: any ) {
      setAlertMessage(error.response.data.error);
      setAlertType('error');
    }
  };

  return (
    <>
      <DivLogo>
        <Link to="/">
          <LogoStyle src={logo} alt="Deezer Logo" />
        </Link>
      </DivLogo>
      <Container>
        <Title>Fazer Login</Title>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("email")}
            type="email"
            placeholder="Email"
          />
          <Input
            {...register("password")}
            type="password"
            placeholder="Senha"
          />
          <SubmitButton type="submit">
            Entrar
          </SubmitButton>
          <Link to="/register">Ainda não tem uma conta? Cadastre-se agora</Link>
        </Form>
        {alertMessage && <Alert message={alertMessage} type={alertType}/>}
      </Container>
    </>
  );
}
