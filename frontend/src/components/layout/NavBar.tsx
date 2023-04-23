import styles from "./NavBar.module.css"
import logo from "../../img/Deezer_Logo_RVB_White.svg"
import Partners from "../styled-components/Partners.style";
import styled from 'styled-components'

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  padding: 0 16px;
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
  return (
    <Nav>
      <Partners />
      <DivLogo>
        <LogoStyle src={logo} alt="Deezer Logo" />
      </DivLogo>
      <DivLogin>
        <ButtonLogin>Login</ButtonLogin>
      </DivLogin> 
    </Nav>
  );
}

