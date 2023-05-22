import { CartContextProvider } from "@/components/CartContext";
import { SessionProvider } from "next-auth/react";
import { Helmet } from "react-helmet";
import { createGlobalStyle } from "styled-components"


const GlobalStyles = createGlobalStyle`
  body{
    background-color: #eee;
    padding:0;
    margin:0;
    font-family: 'Poppins', sans-serif;
  }
`;

export default function App({ Component, pageProps: {session, ...pageProps} }) {
  return(
    <>
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>
      <GlobalStyles/>
      <SessionProvider session={session}>
        <CartContextProvider>
          <Component {...pageProps} />
        </CartContextProvider>
      </SessionProvider>  
    </>
  );
}
