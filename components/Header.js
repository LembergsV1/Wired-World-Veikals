import Link from "next/link";
import styled from "styled-components";
import Center from "./Center";
import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import BurgerIcon from "./icons/Burger";
import SearchIcon from "./icons/Search";

const StyledHeader = styled.header`
    background-color: #296E85;
    position:sticky;
    top:0;
    z-index: 10;
`;

const Logo = styled(Link)`
    color:#fff;
    text-decoration:none;
    position: relative;
    z-index: 3;
`;
const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
`;
const StyledNav = styled.nav`
    ${props => props.mobileNavActive ? `
        display: block;
    ` : `
        display: none;
    `}
    gap: 20px;
    position: fixed;
    top: 0px;
    bottom: 0px;
    left: 0px;
    right: 0;
    padding: 70px 20px 20px;
    background-color: #296E85;
    @media screen and (min-width: 768px){
        display:flex;
        position: static;
        padding: 0px;
    }
`;
const NavLink = styled(Link)`
    display: block;
    color: #fff;
    text-decoration:none;
    min-width: 30px;
    padding: 10px 0;
    svg{
        height: 20px;
    }
    @media screen and (min-width: 768px){
        padding:0;
    }
`;

const NavButton = styled.button`
    background-color: transparent;
    width: 30px;
    height: 30px;
    border:0;
    color: white;
    cursor: pointer;
    position: relative;
    z-index: 3;
    @media screen and (min-width: 768px) {
        display: none;
    }
`;

const SideIcons = styled.div`
    display: flex;
    align-items: center;
    a{
        display: inline-block;
        min-width: 20px;
        color: white;
        svg{
            width: 15px;
            height: 15px;

        }
    }
`;


export default function Header(){
    const {cartProducts} = useContext(CartContext);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    return(
        <StyledHeader>
            <Center>
                <Wrapper>
                    <Logo href={'/'}>Wired World</Logo>
                        <StyledNav mobileNavActive={mobileNavActive}>
                            <NavLink href={'/'}>Home</NavLink>
                            <NavLink href={'/products'}>Visas preces</NavLink>
                            <NavLink href={'/categories'}>Kategorijas</NavLink>
                            <NavLink href={'/account'}>Mans Profils</NavLink>
                            <NavLink href={'/cart'}>Grozs({cartProducts.length})</NavLink>
                        </StyledNav>
                        <SideIcons>
                            <Link href={'/search'}><SearchIcon/></Link>
                            <NavButton onClick={() => setMobileNavActive(prev => !prev)}>
                                <BurgerIcon/>
                            </NavButton>
                        </SideIcons>      
                </Wrapper>
            </Center>
        </StyledHeader>
    );
}   