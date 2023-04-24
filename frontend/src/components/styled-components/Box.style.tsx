import styled from 'styled-components'

type BoxDivProps = {
    background: string;
}

export const BoxDiv = styled.div.attrs((props:BoxDivProps) => ({
    background: props.background,
})) `
  width: 600px;
  height: 260px;
  background: ${props => props.background};
  border-radius: 20px;
  color: #ffffff;
  margin: 20px;
  text-align: center;
  padding: 30px 30px;
  

  & h2 {
    font-size: 38px;
  }

  & h4 {
    font-size: 16px;  
  }

  & h5 {
    text-decoration: underline;
    color: gray;
  }

  & h2, h4, h5 {
    padding: 8px;
  }
`