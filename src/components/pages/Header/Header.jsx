import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL, config } from "../../../mock/data";
import { ArrowBox, HeaderContainer, LinkrLogo, SearchAndResults, SearchBox, SearchResults, SearchBoxMobile } from "./HeaderStyle";
import { BiUserCircle } from 'react-icons/bi';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io'
import LogoffBox from "../timeline/LogoffBox";
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';

export default function Header({ user }) {

    const [userInfo, setUserInfo] = useState();
    const [arrowDown, setArrowDown] = useState(true);
    const [displayBox, setDisplayBox] = useState(false);
    const [usersResults, setUsersResults] = useState([]);

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
        axios.get(`${BASE_URL}/users/${text}`)
            .then(response => {
                setUsersResults(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getSearchResults() {
        return (
            <SearchResults>
                oii
            </SearchResults>
        );
    };

    function getSearchResultsForMobile() {
        return (
            <SearchBoxMobile>
                oii
            </SearchBoxMobile>
        )
    }

    return (
        <>
            <HeaderContainer>
                <LinkrLogo>linkr</LinkrLogo>

                <SearchAndResults>
                    <SearchBox>
                        <DebounceInput
                            minLength={3}
                            debounceTimeout={3000}
                            onChange={e => handleNewSearch(e.target.value)}
                            placeholder='Search for people'
                        />
                        <AiOutlineSearch />

                    </SearchBox>
                    {getSearchResults()}
                    {/* {usersResults[0] ? getSearchResults() : <></>} */}
                </SearchAndResults>

                <ArrowBox onClick={clickOnTheArrow}>
                    {arrowDown ? <IoIosArrowDown /> : <IoIosArrowUp />}
                    {profilePicture}
                </ArrowBox>
            </HeaderContainer>
            <LogoffBox displayBox={displayBox} />
        </>
    )
}