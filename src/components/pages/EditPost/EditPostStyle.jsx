import styled from "styled-components";


export const Edit = styled.div`
width: 50px;
display: flex;
justify-content: space-between;
position: absolute;
top: 0;
right: 0;
padding: 20px;
svg :hover {
    color: lightblue;
}
`
export const PostModal = styled.div`
color: white;
height: 270px;
width: 597px;
display: flex;
flex-direction: column;
border-radius: 15px;
font-weight: 700;
font-size: 34px;
padding: 20px;
justify-content: center;
text-align: center;
align-items: center;
box-sizing: border-box;
background-color: rgba(51, 51, 51, 1);
&& button:last-child {
    background-color: #1877F2;;
    color: white;
}
button {
    border: none;
    padding: 10px;
    margin: 30px 10px 10px 10px;
    border-radius: 5px;
    color: #1877F2;;
    font-size: 18px;
    font-weight: bold;
    font-family: 'Lato';
}
`
