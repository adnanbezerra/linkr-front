import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../../mock/data.js";
import { Container, LinkrLogo, RegisterButton, RegisterContainer, RegisterForm, RegisterInput, RegisterText, SiteContainer, TextRegister } from "./RegisterScreenStyle.jsx";

export default function RegisterScreen() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);
    const navigate = useNavigate();

    function submitForm(event) {
        event.preventDefault();

        setDisabledButton(true);
        const RegisterInfo = [email, password];

        axios.post(`${BASE_URL}/signup`, RegisterInfo)
            .then(reponse => {
                navigate('/');
            }
            ).catch(error => {
                console.error(error);
                alert("Erro no cadastro! Contate o administrador.");
                setDisabledButton(false);
            }
            );
    }

    return (
        <Container>
            <SiteContainer>
                <LinkrLogo>linkr</LinkrLogo>
                <TextRegister>save, share and discover the best links on the web</TextRegister>
            </SiteContainer>

            <RegisterContainer>
                <RegisterForm onSubmit={submitForm}>
                    <RegisterInput placeholder="e-mail" type='email' value={email} required onChange={e => setEmail(e.target.value)} />
                    <RegisterInput placeholder="password" type='password' value={password} required onChange={e => setPassword(e.target.value)} />
                    <RegisterInput placeholder="username" value={name} required onChange={e => setName(e.target.value)} />
                    <RegisterInput placeholder="picture url" value={imageUrl} required onChange={e => setImageUrl(e.target.value)} />
                    <RegisterButton disabled={disabledButton}>Sign up</RegisterButton>
                </RegisterForm>
                <Link to={'/'} style={{ color: '#FFF' }}><RegisterText>Switch back to log in</RegisterText></Link>
            </RegisterContainer>

        </Container>
    )
}