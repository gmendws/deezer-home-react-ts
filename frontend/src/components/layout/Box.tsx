import { BoxDiv } from "../styled-components/Box.style";
import { BoxButton } from "../styled-components/Button.style";

interface BoxProps {
    title: string;
    descripcion: string;
    button: string;
    background: string;
}

function Box({ title, descripcion, button, background}: BoxProps) {
    return (
        <BoxDiv background={background}>
          <h2>{title}</h2>
          <h4>{descripcion}</h4>
          <BoxButton>{button}</BoxButton>
          <h4>Não precisa pagar nada</h4>
          <h5>Saiba mais</h5>
        </BoxDiv>
    );
}

export default Box;

