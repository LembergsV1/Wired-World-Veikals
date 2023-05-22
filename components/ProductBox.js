import styled from "styled-components";
import Button, { ButtonStyle } from "./Button";
import CartIcon from "./icons/CartIcon";
import Link from "next/link";
import { useContext } from "react";
import { CartContext } from "./CartContext";
import { primary } from "@/lib/colors";
import FlyingButton from "./FlyingButton";


const ProductWrapper = styled.div`
    button{
        width: 100%;
        text-align: center;
        justify-content: center;
    }

`;

const WhiteBox = styled(Link)`
    background-color: #fff;
    padding: 15px;
    height: 125px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    img{
        max-width:100%;
        max-height:100px;
    }
    margin-bottom: 10px; /* Add margin to the bottom of the box */
`;

const Title = styled(Link)`
    font-weight: normal;
    font-size: 0.9rem;
    color:inherit;
    text-decoration: none;

`;

const ProductInfoBox = styled.div`
    margin-top: 0;
`;

const PriceRow = styled.div`
    display: block;
    @media screen and (min-width: 768px){
        display: flex;
        gap: 5px;
    }
    align-items: center;
    justify-content: space-between;
    margin-top: 2px;

`;

const Price = styled.div`
    font-size: .8rem;
    font-weight: 400;
    text-align: right;
    @media screen and (min-width: 768px){
        font-size: 1rem;
        font-weight: 600;
        text-align: left;
    }
`;





export default function ProductBox({_id,title,description,price,images}){

    const url = '/product/'+_id;
    return(
        <ProductWrapper>
            <WhiteBox href={url}>
                <div>
                    <img src={images?.[0]} alt=""/>
                </div>
            </WhiteBox>
            <ProductInfoBox>
                <Title href={url}>
                    {title}
                </Title>
                <PriceRow>
                    <Price>
                        €{price}
                    </Price>
                    <FlyingButton _id={_id} src={images?.[0]}><CartIcon/>Uz Grozu</FlyingButton>
                </PriceRow>
            </ProductInfoBox>
        </ProductWrapper>  
    );
}