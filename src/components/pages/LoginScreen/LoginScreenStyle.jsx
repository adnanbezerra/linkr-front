import styled from "styled-components";

const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    color: #FFFFFF;
`

const LinkrLogo = styled.p`
    font-family: 'Passion One', cursive;
    font-size: 106px;
    font-weight: 700;
`

const LoginForm = styled.form`
    display: flex;
    width: 80%;
    flex-direction: column;
    align-items: center;
`

const LoginInput = styled.input`
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
`

const LoginButton = styled.button`
    background-color: #1877F2;
    width: 100%;
    height: 60px;
    border-radius: 5px;
    border: 0;
    color: white;

    font-family: 'Oswald', sans-serif;
    font-size: 27px;
    font-weight: 700;
`

const RegisterText = styled.p`
    font-size: 20px;
    font-weight: 400px;
    margin-top: 22px;
`

const TextLogin = styled.div`
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    font-weight: 700;
    width: 40%;
`

const LoginContainer = styled.div`
    background-color: #333333;
    height: 100%;
    width: 35%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
`

export { Container, LoginContainer, SiteContainer, LinkrLogo, TextLogin, LoginButton, LoginInput, RegisterText, LoginForm };