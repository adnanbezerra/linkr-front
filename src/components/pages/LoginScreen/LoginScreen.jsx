import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../../mock/data";
import { Container, LinkrLogo, LoginButton, LoginContainer, LoginForm, LoginInput, RegisterText, SiteContainer, TextLogin } from "./LoginScreenStyle";

export default function LoginScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);
    const navigate = useNavigate();

    function submitForm(event) {
        event.preventDefault();

        setDisabledButton(true);
        const loginInfo = [email, password];

        axios.post(`${BASE_URL}/signin`, loginInfo)
            .then(reponse => {
                navigate('/timeline');
            }
            ).catch(error => {
                console.error(error);
                alert("Erro no login! Contate o administrador.");
                setDisabledButton(false);
            }
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
                    <LoginInput placeholder="e-mail" type='email' value={email} required onChange={e => setEmail(e.target.value)} />
                    <LoginInput placeholder="password" type='password' value={password} required onChange={e => setPassword(e.target.value)} />
                    <LoginButton disabled={disabledButton}>Log In</LoginButton>
                </LoginForm>
                <Link to={'/sign-up'} style={{ color: '#FFF' }}><RegisterText>First time? Create an account!</RegisterText></Link>
            </LoginContainer>

        </Container>
    )
}