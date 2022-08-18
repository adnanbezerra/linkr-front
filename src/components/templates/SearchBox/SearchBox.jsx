import { SearchContainerMobile, SearchResults, SearchContainer } from "./SearchBoxStyles";
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";

import { BASE_URL } from "../../../mock/data";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UpdateContext from "../../contexts/UpdateContext.js";

export default function SearchBox() {
    const {updatePage, setUpdatePage} = useContext(UpdateContext);
  const [usersResults, setUsersResults] = useState(false);
    const [myFollowers, setMyfollowers] = useState([]);
    const [otherUsers, setOtherUsers] = useState([]);
    const navigate = useNavigate();
    const u = useContext(UserContext);
    const verifyUser = u.user === undefined;

    function handleNewSearch(text) {
        const user = u.user

        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);

        if (text.length < 3) setUsersResults([]);
        console.log(`${BASE_URL}/user/${text}`)

        axios.get(`${BASE_URL}/user/profile/${text}`, token)
            .then(response => {
                if ((response.data.myFolowers) === undefined) {
                    setMyfollowers([])
                }
                else {
                    console.log(response.data.myFolowers)
                    setMyfollowers(response.data.myFolowers)
                }
                setOtherUsers(response.data.otherFollowers)
                setUsersResults(true);
            })
            .catch(error => {
                console.error(error);
            });
    }

    function getSearchResults() {
        return (
            <SearchResults>
                {(myFollowers).map((user) => {
                    return (
                        <div onClick={() => navigateAndUpdatePage(user.id)} style={{ display: 'flex', width: '100%', alignItems: 'center', marginTop: '10px' }}>
                            <img src={user.imageUrl} alt="" />
                            {user.name} <p>• following</p>
                        </div>
                    )
                })}
                {(otherUsers).map((user) => {
                    return (
                        <div onClick={() => navigateAndUpdatePage(user.id)} style={{ display: 'flex', width: '100%', alignItems: 'center', marginTop: '10px' }}>
                            <img src={user.imageUrl} alt="" />
                            {user.name}
                        </div>
                    )
                })}
            </SearchResults>
        );
    };

    function navigateAndUpdatePage(id) {
        navigate(`/user/${id}`)
        setUpdatePage(!updatePage);
    }

    function getSearchContainerForMobile() {
        return (
            <SearchContainerMobile>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    onChange={e => handleNewSearch(e.target.value)}
                    placeholder='Search for people'
                />
                <AiOutlineSearch />

            </SearchContainerMobile>
        )
    }

    function getSearchContainerForWeb() {
        return (
            <SearchContainer>
                <DebounceInput
                    minLength={3}
                    debounceTimeout={300}
                    onChange={e => handleNewSearch(e.target.value)}
                    placeholder='Search for people'
                />
                <AiOutlineSearch />

            </SearchContainer>
        )
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {getSearchContainerForWeb()};
            {getSearchContainerForMobile()};
            {(usersResults === true) ? getSearchResults() : <></>}
        </div>
    )
}