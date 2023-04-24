import React from "react";
import Box from "../layout/Box";
import styled from 'styled-components'
import NavBar from "../layout/NavBar";
import { Title } from "../styled-components/Title.style";


const SectionHome = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4em;

  & img {
    width: 350px;
    margin: 2em 0;
  }
`

const Home: React.FC = () => {
  return (   
    <SectionHome>
      <Title>O Poder da Música</Title>
      <Box 
        title="deezer Free"
        descripcion="Música, podcasts e rádios. Recomendações personalizadas de acordo com seu gosto musical."
        button="CADASTRE-SE DE GRAÇA"
        background="linear-gradient(57.8deg,#6b42b4 9.75%,#943aab 95.44%)"
      />
      <Box 
        title="deezer Premium"
        descripcion="Escolha e toque qualquer faixa, sem anúncios, e, além disso, faça download dos seus favoritos e ouça offline."
        button="EXPERIMENTE DE GRAÇA"
        background="linear-gradient(69.06deg,#b84fdd -26.76%,#4965f4 44.6%,#2efb74 132.54%)"
      />
    </SectionHome>
  )
};

export default Home;