import styled from "styled-components";
import Center from "./Center";
import ProductsGrid from "./ProductsGrid";

const title = styled.h2`
    fonst-size: 2rem;
    margin:30px 0 20px;
    font-weight:normal;
`;

export default function NewProducts({products,wishedProducts}){
    return(
        <Center>
            <h2>Jaunumi mūsu veikalā</h2>
           <ProductsGrid products ={products} wishedProducts={wishedProducts}/>
        </Center>
        
    );
}