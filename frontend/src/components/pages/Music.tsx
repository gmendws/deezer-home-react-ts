import { useForm, SubmitHandler } from 'react-hook-form';
import api from '../../services/api';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../img/Deezer_Logo_RVB_White.svg";
import { Title } from '../styled-components/Title.style';
import { SubmitButton } from '../styled-components/SubmitButton.style';
import { useEffect, useState } from 'react';
import Alert from '../layout/Alert';
import config from '../../config/config';

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
  width: 500px;

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

const MusicListContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;

  h3 {
    font-size: 1.5rem;
    margin-bottom: 10px;
    color: #ffffff;
  }
`;

const MusicItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;

  p {
    font-size: 1.2rem;
    margin-bottom: 5px;
    color: #ffffff;
  }

  span {
    font-size: 1rem;
    color: #666;
  }
`;

type Inputs = {
  name: string,
  singer: string,
  musicSearch: string,
};

interface Music {
  name: string;
  singer: string;
}

export default function Music() {
  const { register, handleSubmit } = useForm<Inputs>();

  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [showSearchForm, setShowSearchForm] = useState(false);
  const [musics, setMusics] = useState<Array<Music>>([]);

  const clear = () => {
    setAlertMessage('')
    setAlertType('')
    setMusics([])
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (!showSearchForm) {
      try {
        const response = await api.post("/music", data, config);
        setAlertMessage(response.data.msg);
        setAlertType('sucess');
      } catch (error: any) {
        setAlertMessage(error.response.data.msg != '' ? error.response.data.msg : error.response.data.error);
        setAlertType('error');
      }
    } else {
      try {
        const response = await api.get(`/music/${data.musicSearch}`, config);
        setAlertMessage(response.data.name);
        setAlertType('sucess');
        setMusics(response.data)
      } catch (error: any) {
        setAlertMessage(error.response.data.error != '' ? error.response.data.error : error.response.data.errors);
        setAlertType('error');
      }
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
        {!showSearchForm ? (
          <>
            <Title>Publique uma música</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                {...register("singer")}
                type="singer"
                placeholder="Cantor"
              />
              <Input
                {...register("name")}
                type="name"
                placeholder="Nome da Música"
              />
              <SubmitButton type="submit">
                Enviar
              </SubmitButton>
              <a onClick={() => { setShowSearchForm(true), clear() }}>Clique aqui para consultar as músicas cadastradas!</a>
              <Link to="/chat">Acessar Chat</Link>
            </Form>
            {alertMessage && <Alert message={alertMessage} type={alertType} />}
          </>
        ) : (
          <>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Title>Busque uma música</Title>
              <Input
                {...register("musicSearch")}
                type="music"
                placeholder="Música"
              />
              <SubmitButton type="submit">
                Buscar
              </SubmitButton>
              <a onClick={() => { setShowSearchForm(false), clear() }}>Clique aqui para cadastrar uma música!</a>
              <Link to="/chat">Acessar Chat</Link>
            </Form>            
            {alertMessage && <Alert message={alertMessage} type={alertType} />}
            {musics.length > 0 &&
              <MusicListContainer>
                <h3>Resultados da Busca:</h3>
                {musics.map((music, index) => (
                  <MusicItem key={index}>
                    <p>{music.name}</p>
                    <span>por {music.singer}</span>
                  </MusicItem>
                ))}
              </MusicListContainer>
            }         
          </>
        )}
      </Container>
    </>
  )
}