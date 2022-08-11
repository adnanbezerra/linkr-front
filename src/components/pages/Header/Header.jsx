import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { BASE_URL, config, getCookieByName } from "../../../mock/data";
import UserContext from "../../contexts/UserContext";
import { ArrowBox, HeaderContainer, LinkrLogo } from "./HeaderStyle";
import { BiUserCircle } from 'react-icons/bi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import LogoffBox from "../timeline/LogoffBox";

export default function Header() {

    const { user, setUser } = useContext(UserContext);
    const [userInfo, setUserInfo] = useState();
    const [arrowDown, setArrowDown] = useState(true);
    const [displayBox, setDisplayBox] = useState(false);
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

    function clickOnTheArrow() {
        setArrowDown(!arrowDown);
        setDisplayBox(!displayBox);
    }

    return (
        <>
            <HeaderContainer>
                <LinkrLogo>linkr</LinkrLogo>
                <ArrowBox onClick={clickOnTheArrow}>
                    {arrowDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    {profilePicture}
                </ArrowBox>
            </HeaderContainer>
            <LogoffBox displayBox={displayBox} />
        </>
    )
}