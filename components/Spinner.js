import { FadeLoader } from "react-spinners";
import styled from "styled-components";

const Spin =styled.div`
    ${props => props.fullWidth ? `
        display: block;
        display:flex;
        justify-content: center;
    ` : ``}
`;

export default function Spinner({fullWidth}){
    return(
        <Spin fullWidth={fullWidth}>
            <FadeLoader speedMultiplier={3} color={'#FC0FC0'} />
        </Spin> 
    );
}