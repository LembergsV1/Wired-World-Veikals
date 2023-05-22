import Button from "@/components/Button";
import Center from "@/components/Center";
import Header from "@/components/Header";
import Title from "@/components/Title";
import WhiteBox from "@/components/WhiteBox";
import {signOut, useSession, signIn } from "next-auth/react"
import { RevealWrapper } from "next-reveal";
import styled from "styled-components";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

const ColsWrapper = styled.div`
    display:grid;
    grid-template-columns: 1.2fr .8fr;
    gap: 20px;
    gap: 40px;
    margin: 40px 0;
`;

const CityHolder = styled.div`
    display:flex;
    gap:5px;
`;

export default function AccountPage(){
    const {data: session} = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAdress, setStreetAdress] = useState('');
    const [country, setCountry] = useState('');
    const [loaded, setLoaded] = useState(false);
    async function logout(){
        await signOut({
            callbackUrl: process.env.NEXT_PUBLIC_URL,
        });
    }
    async function login(){
        await signIn('google');
    }
    function saveAddress(){
        const data = {name, email, city, streetAdress, postalCode, country};
        axios.put('/api/address', data);
    }
    useEffect(() => {
        
            axios.get('api/address').then(response => {
                setName(response.data.name);
                setEmail(response.data.email);
                setCity(response.data.city);
                setPostalCode(response.data.postalCode);
                setStreetAdress(response.data.streetAdress);
                setCountry(response.data.country);
                setLoaded(true);
            });  
    }, []); 
    return(
        <>
            <Header/>
            <Center>
                <ColsWrapper>
                    <div>
                    <RevealWrapper delay={0}>
                        <WhiteBox>
                            <h2>Vēlmju saraksts</h2>
                        </WhiteBox>
                    </RevealWrapper> 
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                            <h2>Profila Detaļas</h2>
                            {!loaded && (
                                <Spinner fullWidth={true}/>
                            )}
                                {loaded && (
                                    <>
                                        <Input 
                                    type="text" 
                                    placeholder="Vārds" 
                                    value={name}
                                    name="name" 
                                    onChange={ev => setName(ev.target.value)}/>
                                <Input 
                                    type="text"
                                    placeholder="E-Pasts" 
                                    value={email}
                                    name="email" 
                                    onChange={ev => setEmail(ev.target.value)}/>
                                <CityHolder>
                                    <Input 
                                        type="text" 
                                        placeholder="Pilsēta" 
                                        value={city}
                                        name="city" 
                                        onChange={ev => setCity(ev.target.value)}/>
                                    <Input 
                                        type="text" 
                                        placeholder="Zip" 
                                        value={postalCode} 
                                        name="postalCode"
                                        onChange={ev => setPostalCode(ev.target.value)}/>
                                </CityHolder>
                                    <Input 
                                        type="text" 
                                        placeholder="Adrese" 
                                        value={streetAdress}
                                        name="streetAdress" 
                                        onChange={ev => setStreetAdress(ev.target.value)}/>
                                    <Input 
                                        type="text" 
                                        placeholder="Valsts" 
                                        value={country}
                                        name="country" 
                                        onChange={ev => setCountry(ev.target.value)}/>
                                <Button gren block onClick={saveAddress}>Saglabāt izmaiņas</Button>
                                <hr/>
                                    </>
                                )}
                                {session && (
                                    <Button primary onClick={logout}>Iziet</Button>
                                )}
                                    {!session && (
                                    <Button primary onClick={login}>Ieiet</Button>
                                )}  
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                </ColsWrapper>
            </Center>
        </>
    );
}