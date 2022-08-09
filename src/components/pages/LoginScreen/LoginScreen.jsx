import axios from "axios";
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom';
import { BASE_URL } from "../../../mock/data";
import { Container, LinkrLogo, LoginButton, LoginContainer, LoginForm, LoginInput, RegisterText, SiteContainer, TextLogin } from "./LoginScreenStyle";

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function submitForm(event) {
        event.preventDefault();

        const loginInfo = [email, password];

        axios.post(`${BASE_URL}/login`, loginInfo)
            .then(
                navigate('/timeline')
            ).catch(
                alert("Erro no login! Contate o administrador.")
            );
    }

    return (
        <Container>
            <SiteContainer>
                <LinkrLogo>linkr</LinkrLogo>
                <TextLogin>save, share and discover the best links on the web</TextLogin>
            </SiteContainer>

            <LoginContainer>
                <LoginForm onSubmit={submitForm}>
                    <LoginInput placeholder="e-mail" type='email' value={email} onChange={e => setEmail(e.target.value)} />
                    <LoginInput placeholder="password" type='password' value={password} onChange={e => setPassword(e.target.value)} />
                    <LoginButton>Log In</LoginButton>
                </LoginForm>
                <Link to={<></>} style={{ color: '#FFF' }}><RegisterText>First time? Create an account!</RegisterText></Link>
            </LoginContainer>

        </Container>
    )
}