import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    color: #FFFFFF;

    @media(max-width: 650px) {
        flex-direction: column;        
    }
`

const LinkrLogo = styled.p`
    font-family: 'Passion One', cursive;
    font-size: 106px;
    font-weight: 700;

    @media(max-width: 650px) {
        font-size: 76px;
    }
`

const RegisterForm = styled.form`
    display: flex;
    width: 80%;
    flex-direction: column;
    align-items: center;

    @media(max-width: 650px) {
        width: 90%;
    }
`

const RegisterInput = styled.input`
    height: 60px;
    width: 100%;
    border-radius: 5px;
    border: 0;
    margin-bottom: 13px;

    padding-left: 20px;
    box-sizing: border-box;

    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;

    @media(max-width: 650px) {
        font-size: 22px;
        height: 55px;
    }
`

const RegisterButton = styled.button`
    background-color: ${props => props.disabled ? "#71a5eb" : "#1877F2"};
    width: 100%;
    height: 60px;
    border-radius: 5px;
    border: 0;
    color: white;

    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;

    &:hover {
       cursor: pointer; 
    }

    @media(max-width: 650px) {
        font-size: 22px;
    }
`

const RegisterText = styled.p`
    font-size: 20px;
    font-weight: 400px;
    margin-top: 22px;

    @media(max-width: 650px) {
        font-size: 17px;
    }
`

const TextRegister = styled.div`
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: 700;
    width: 40%;

    @media(max-width: 650px) {
        width: 100%;
        font-size: 23px;
    }
`

const RegisterContainer = styled.div`
    background-color: #333333;
    height: 100%;
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    @media(max-width: 650px) {
        width: 100%;
        height: 70%;
        justify-content: flex-start;
        padding-top: 40px;
        box-sizing: border-box;
    }
`

const SiteContainer = styled.div`
    background-color: #151515;
    width: 65%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-left: 5%;
    box-sizing: border-box;

    @media(max-width: 650px) {
        width: 100%;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        height: 30%;
        align-items: center;
        text-align: center;
        padding: 0 5%;
    }
`

export { Container, RegisterContainer, SiteContainer, LinkrLogo, TextRegister, RegisterButton, RegisterInput, RegisterText, RegisterForm };