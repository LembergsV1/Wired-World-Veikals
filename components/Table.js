import styled from "styled-components";

const StyledTable = styled.table`
    width:100%;
    th{
        text-align: left;
        text-transform: uppercase;
        color: 	#5A5A5A;
        font-weight: normal;
        font-size: .9rem;
    }

    td{
        border-top: 1px solid rbga(0, 0, 0, 1);
    }
`;



export default function Table(props){
    return <StyledTable {...props}/>
}