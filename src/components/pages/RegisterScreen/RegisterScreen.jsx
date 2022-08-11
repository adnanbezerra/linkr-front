import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, getCookieByName } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { Container, LinkrLogo, RegisterButton, RegisterContainer, RegisterForm, RegisterInput, RegisterText, SiteContainer, TextRegister } from "./RegisterScreenStyle";

export default function RegisterScreen() {

    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== undefined) navigate('/timeline');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const tokenCookie = getCookieByName("token");
        if (tokenCookie) {
            setUser({ token: tokenCookie });
            navigate('/timeline');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function submitForm(event) {
        event.preventDefault();

        setDisabledButton(true);
        const RegisterInfo = { email, password, name, imageUrl };

        axios.post(`${BASE_URL}/signup`, RegisterInfo)
            .then(reponse => {
                navigate('/');
            }
            ).catch(error => {
                if (error.response.status === 409) {
                    alert("Email já cadastrado!");
                } else if (error.response.status === 422) {
                    alert("Envie dados válidos!");
                }

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