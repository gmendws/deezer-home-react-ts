import { useForm, SubmitHandler } from 'react-hook-form';
import { string } from 'zod';
import api from '../../services/api';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import logo from "../../img/Deezer_Logo_RVB_White.svg";
import { Title } from '../styled-components/Title.style';
import { SubmitButton } from '../styled-components/SubmitButton.style';
import { useState } from 'react';
import Alert from '../layout/Alert';

const DivLogo = styled.div`
  width: 148px;
  margin: 0 auto;  
  margin-top: 40px;
`;

const LogoStyle = styled.img`
  height: 24px;
  width: auto;
`

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
    nameMusic: string,
    singer: string,
};

export default function Music() {
    const { register, handleSubmit } = useForm<Inputs>();
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('');
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      try{
        const response = await api.post("/createMusic", data);
        setAlertMessage(response.data.msg);
        setAlertType('sucess');
      } catch(error: any) {
        setAlertMessage(error.response.data.msg);
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
            <Title>Publique uma música</Title> 
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input             
                {...register("singer")}
                type="singer"
                placeholder="Cantor"
              />
              <Input             
                {...register("nameMusic")}
                type="nameMusic"
                placeholder="Nome da Música"
              />
              <SubmitButton type="submit">
                Enviar
              </SubmitButton>
            </Form>
            {alertMessage && <Alert message={alertMessage} type={alertType}/>}
          </Container>
        </>
    )
}