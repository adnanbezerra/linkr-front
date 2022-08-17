import { SearchContainerMobile, SearchResults, SearchContainer } from "./SearchBoxStyles";
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";
import { BASE_URL } from "../../../mock/data";
<<<<<<< HEAD
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UpdateContext from "../../contexts/UpdateContext.js";

export default function SearchBox() {
    const {updatePage, setUpdatePage} = useContext(UpdateContext);
=======
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox({ updatePage, setUpdatePage }) {

>>>>>>> e4be4e13159fa9cff0b478b1935fbf15016082ca
    const [usersResults, setUsersResults] = useState([]);
    const navigate = useNavigate();

    function handleNewSearch(text) {

        if (text.length < 3) setUsersResults([]);

        axios.get(`${BASE_URL}/user/${text}`)
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
                {usersResults.map((user) => {
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
                    debounceTimeout={3000}
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
            {usersResults[0] ? getSearchResults() : <></>}
        </div>
    )
}