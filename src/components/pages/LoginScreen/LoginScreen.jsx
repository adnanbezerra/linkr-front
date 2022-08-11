import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL, getCookieByName } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { Container, LinkrLogo, LoginButton, LoginContainer, LoginForm, LoginInput, RegisterText, SiteContainer, TextLogin } from "./LoginScreenStyle";

export default function LoginScreen() {

    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (user !== undefined) navigate('/timeline');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        let tokenCookie = getCookieByName("token");
        if (tokenCookie) {
            setUser({ token: tokenCookie });
            navigate('/timeline');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function submitForm(event) {
        event.preventDefault();

        setDisabledButton(true);
        const loginInfo = { email, password };

        axios.post(`${BASE_URL}/signin`, loginInfo)
            .then(response => {
                document.cookie = `token=${response.data}; expires=${getDateOneWeekFromNow()}`
                setUser({ token: response.data });
                navigate('/timeline');
            }
            ).catch(error => {
                if (error.response.status === 401) {
                    alert("Email ou senha errados! Tente novamente.");
                } else if (error.response.status === 422) {
                    alert("Envie dados válidos!");
                }

                setDisabledButton(false);
            }
            );
    }

    function getDateOneWeekFromNow() {
        const today = new Date();
        const nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);
        return nextWeek;
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