import styled from "styled-components";
import Center from "./Center";
import Button from "./Button";
import ButtonLink from "./ButtonLink";
import CartIcon from "./icons/CartIcon";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import FlyingButton from "./FlyingButton";
import {RevealWrapper} from  'next-reveal'

const Backdrop = styled.div`
    background-color: #fff;
    color:#fff;
    padding: 50px 0;
`;
const Title = styled.h1`
    margin:0;
    font-weight:normal;
    color:#222;
    font-size:1.5rem;
    @media screen and (min-width: 768px){
        font-size:2rem
    }

`;
const Apr = styled.p`
    color:#222;
    font-size:1rem;
`;

const ColumnsWrapper = styled.div`
    display:grid;
    grid-template-columns: 1fr;
    gap: 40px;
    img.main{
        max-width:100%;
        max-width:230px;
        display: block;
        margin: 0 auto;
    }
    div:nth-child(1){
        order:2;
        margin-left: auto;
        margin-right: auto;
    }
   
    @media screen and (min-width: 768px){
        grid-template-columns: .8fr 1.2fr;
        & > div:nth-child(1) {
            order:1;
        }
        img{
            max-width:100%;
        }
    }
`;

const Column = styled.div`
    display: flex;
    align-items center;
`;
const ButtonsWrapper = styled.div`
    display: flex;
    gap:10px;
    margin-top:25px;
    align-items: center;
`;

const CenterImg = styled.div`
    display: flex;
    align-items: center;
    justify-contet: center;
    width: 100%;
`;

const ImgColumn = styled(Column)`
    & > div {
        width: 100%;
    }
`;

const ContentWrapper = styled.div`
    text-align: center;
`;

export default function Featured({product}){
    return(
        <Backdrop>
            <Center>
                <ColumnsWrapper>
                    <Column>
                        <div>
                        <RevealWrapper origin={'down'} delay={0}>
                        <ContentWrapper>
                            <Title>{product.title}</Title>
                            <Apr>{product.description}</Apr>
                            <ButtonsWrapper>
                            <ButtonLink href={'/product/'+product._id} outline={1} prpl={1} >Vairāk info</ButtonLink>
                                    <FlyingButton main={1} _id={product._id} src={product.images?.[0]}>
                                        <CartIcon/>
                                            Pievienot Grozam
                                </FlyingButton>
                            </ButtonsWrapper>
                        </ContentWrapper>
                    </RevealWrapper>
                        </div>
                    </Column>
                    <ImgColumn>
                    <RevealWrapper>
                        <CenterImg>
                            <img className={'main'} src={product.images?.[0]}/>
                        </CenterImg> 
                    </RevealWrapper>
                    </ImgColumn>
                </ColumnsWrapper>  
            </Center>
        </Backdrop>
    );
}