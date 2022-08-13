import { useState } from "react";
import { ArrowBox, HeaderContainer, LinkrLogo } from "./HeaderStyle";
import { BiUserCircle } from 'react-icons/bi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import LogoffBox from "../timeline/LogoffBox";

export default function Header({ userInfo }) {

    const [arrowDown, setArrowDown] = useState(true);
    const [displayBox, setDisplayBox] = useState(false);

    const verifyUser = userInfo === undefined;

    const profilePicture = userInfo === undefined ? <BiUserCircle /> : <img src={verifyUser ? "" : userInfo.imageUrl} alt="" />;

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