import styled, { css } from "styled-components";
import { primary } from "@/lib/colors";

export const ButtonStyle = css`
border:0;
padding: 5px 15px;
border-radius: 3px;
cursor: pointer;
display: inline-flex;
align-items:center;
text-decoration: none;
font-weight: 400;
font-size: 16px;
font-family: 'Source Sans Pro', sans-serif;
svg{
    height: 16px;
    margin-right: 5px;
}
${props => props.block && css`
    display: block;
    width: 100%;
`}
${props => props.prpl && !props.outline && css`
    background-color: #75004B;
    color:#fff;
`}
${props => props.prpl && props.outline && css`
    background-color: transparent;
    color:#222;
    border: 2px solid #222;
`}
${props => props.primary && !props.outline && css`
    background-color: ${primary};
    color:#fff;
`}
${props => props.primary && props.outline && css`
    background-color: transperent;
    border: 2px solid ${primary};
    color:${primary};
`}
${props => props.size === 'l' && css`
    font-size:1rem;
    padding: 9px 13px;
    svg{
        height: 19px;
    }
`}
${props => props.gren && !props.outline && css`
    background-color: #50C878;
    color:#fff;
`}
${props => props.gren && props.outline && css`
    background-color: transparent;
    color:#222;
    border: 2px solid #222;
`}

`;

export const StyledButton = styled.button`
   ${ButtonStyle}
`;

export default function Button({children,...rest}){
    return(
        <StyledButton {...rest}>{children}</StyledButton>
    );
}