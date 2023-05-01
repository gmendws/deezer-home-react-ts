import styles from "./NavBar.module.css"
import logo from "../../img/Deezer_Logo_RVB_White.svg"
import Partners from "../styled-components/Partners.style"
import styled from 'styled-components'
import { Link } from "react-router-dom"
import Home from "../pages/Home"
import { useEffect, useState } from "react"

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 0 16px;
`;

const DivLogo = styled.div`
  margin: 0 auto;  
  margin-top: 40px;
  width: 30px;
`;

const LogoStyle = styled.img`
  height: 24px;
  width: auto;
`
const DivLogin = styled.div`
  margin-top: 10px;
`

const ButtonLogin = styled.button`
  color: #fff;
  background-color: transparent;
  border: 1px solid;
  border-radius: 100px;
  padding: 10px 20px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  text-transform: uppercase;
  border-width: 1px;
  margin-right: 20px;
  margin-top: 20px;
`

export default function NavBar() {
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  const handleClick = () => {
    if (isLogged) {
      localStorage.removeItem('token');
      setIsLogged(false);
    } else {
      window.location.href = '/login';
    }
  };

  return (
    <Nav>
      <Partners />
      <DivLogo>
        <Link to="/">
          <LogoStyle src={logo} alt="Deezer Logo"/>
        </Link>
      </DivLogo>
      <DivLogin>
        <Link to="/login">
          <ButtonLogin onClick={handleClick}>{isLogged ? 'Deslogar' : 'Login'}</ButtonLogin>
        </Link>    
      </DivLogin> 
    </Nav>
  );
}

