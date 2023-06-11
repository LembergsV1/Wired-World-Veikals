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
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";

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

const WishedProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
`;

export default function AccountPage(){
    const {data: session} = useSession();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [streetAdress, setStreetAdress] = useState('');
    const [country, setCountry] = useState('');
    const [addressLoaded, setAddressLoaded] = useState(true);
    const [wishlistLoaded, setWishlistLoaded] = useState(true);
    const [wishedProducts, setWishedProducts] = useState([]);
    const [ordersLoaded, setOrdersLoaded] = useState(true);
    const [activeTab, setActiveTab] = useState('Pasūtījumi');
    const [orders, setOrders] = useState([]);
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
        if (!session){
            return;
        }
            setAddressLoaded(false);
            setWishlistLoaded(false);
            setOrdersLoaded(false);
            axios.get('api/address').then(response => {
                setName(response.data?.name);
                setEmail(response.data?.email);
                setCity(response.data?.city);
                setPostalCode(response.data?.postalCode);
                setStreetAdress(response?.data?.streetAdress);
                setCountry(response.data?.country);
                setAddressLoaded(true);
            }); 
            axios.get('/api/wishlist').then(response =>{
                setWishedProducts(response.data.map(wp => wp.product));
                setWishlistLoaded(true);
            });
            axios.get('/api/orders').then(response => {
                setOrders(response.data);
                setOrdersLoaded(true);
            });
    }, [session]);
    function productRemovedFromWishList(idToRemove){
        setWishedProducts(products => {
            return [...products.filter(p => p?._id.toString() !== idToRemove)]
        });
    }
    return(
        <>
            <Header/>
            <Center>
                <ColsWrapper>
                    <div>
                    <RevealWrapper delay={0}>
                        <WhiteBox>
                            <Tabs 
                                tabs={['Pasūtījumi','Vēlmju saraksts']} 
                                active={activeTab} 
                                onChange={setActiveTab}
                                />
                                {activeTab === 'Pasūtījumi' && (
                                    <>
                                        {!ordersLoaded && (
                                            <Spinner fullWidth={true} />
                                        )}
                                        {ordersLoaded && (
                                            <div>
                                                {orders.length === 0 && (
                                                    <>
                                                    {session && (
                                                        <p>Vēl nekas nav nopirkts</p>
                                                    )}
                                                    {!session && (
                                                    <p>Lai redzētu pasūtījumus ir nepieciešams pieslēgties</p>
                                                )}
                                                    </>
                                                )}
                                                {orders.length > 0 && orders.map(o => (
                                                    <SingleOrder key={o._id} {...o} />
                                                ))}
                                            </div>
                                        )} 
                                    </>
                                )}
                                {activeTab === 'Vēlmju saraksts' && (
                                <>
                                {!wishlistLoaded && (
                                    <Spinner fullWidth={true} />
                                )}
                                {wishlistLoaded && (
                                    <>
                                    <WishedProductsGrid>
                                        {wishedProducts.length > 0 && wishedProducts.map(wp => (
                                        <ProductBox key={wp?._id} {...wp} wished={true} 
                                            onRemoveFromWishlist={productRemovedFromWishList} />
                                    ))}
                                    </WishedProductsGrid>
                                        {wishedProducts.length === 0 && (
                                        <>
                                            {session && (
                                                <p>Vai tiešām neko nevēlies? :/</p>
                                            )}
                                            {!session && (
                                                <p>Lai izveidotu vēlmju sarakstu ir nepieciešams profils</p>
                                            )}
                                        </>
                                    )}
                                    </>
                                )}
                                </>
                            )}
                        </WhiteBox>
                    </RevealWrapper> 
                    </div>
                    <div>
                        <RevealWrapper delay={100}>
                            <WhiteBox>
                            <h2>{session ? 'Par profilu' : 'Pieslēgties'}</h2>
                            {!addressLoaded && (
                                <Spinner fullWidth={true}/>
                            )}
                                {addressLoaded && session && (
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
                                    <Button primary onClick={login}>Ieiet (ar Google)</Button>
                                )}  
                            </WhiteBox>
                        </RevealWrapper>
                    </div>
                </ColsWrapper>
            </Center>
        </>
    );
}