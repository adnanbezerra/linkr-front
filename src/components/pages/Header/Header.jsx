import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, config } from "../../../mock/data";
import { ArrowBox, Debounce, HeaderContainer, LinkrLogo } from "./HeaderStyle";
import { BiUserCircle } from 'react-icons/bi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import LogoffBox from "../timeline/LogoffBox";
import {DebounceInput} from 'react-debounce-input';

export default function Header({ user }) {

    const [userInfo, setUserInfo] = useState();
    const [arrowDown, setArrowDown] = useState(true);
    const [displayBox, setDisplayBox] = useState(false);

    const verifyUser = user.token === undefined;

    const profilePicture = userInfo === undefined ? <BiUserCircle /> : <img src={verifyUser ? "" : userInfo.imageUrl} alt="" />;

    useEffect(() => {
        const token = config(verifyUser ? "" : user.token);

        axios.get(`${BASE_URL}/user/me`, token)
            .then(response => {
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

    function handleNewSearch(text) {

    }

    return (
        <>
            <HeaderContainer>
                <LinkrLogo>linkr</LinkrLogo>
                <Debounce
                    minLength={2}
                    debouceTimeout={300}
                    onChange={e => handleNewSearch(e.target.value)}
                />
                <ArrowBox onClick={clickOnTheArrow}>
                    {arrowDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    {profilePicture}
                </ArrowBox>
            </HeaderContainer>
            <LogoffBox displayBox={displayBox} />
        </>
    )
}