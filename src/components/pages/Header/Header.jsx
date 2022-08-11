import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL, config, getCookieByName } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { HeaderContainer, LinkrLogo } from "./HeaderStyle";
import { BiUserCircle } from 'react-icons/bi';

export default function Header() {

    const { user, setUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState();
    const profilePicture = userInfo === undefined ? <BiUserCircle /> : <img src={userInfo.imageUrl} alt="" />;

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const token = config(user.token);

        axios.get(`${BASE_URL}/user/me`, token)
            .catch(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <HeaderContainer>
            <LinkrLogo>linkr</LinkrLogo>
            {profilePicture}
        </HeaderContainer>
    )
}