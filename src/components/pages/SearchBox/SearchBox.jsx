import { SearchContainerMobile, SearchResults, SearchContainer } from "./SearchBoxStyles";
import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";
import { BASE_URL } from "../../../mock/data";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBox() {

    const [usersResults, setUsersResults] = useState([]);
    const navigate = useNavigate();

    function handleNewSearch(text) {

        if(text.length < 3) setUsersResults([]);

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
                        <div onClick={() => navigate(`/user/${user.id}`)} style={{display: 'flex', width: '100%', alignItems: 'center', marginTop: '10px'}}>
                            <img src={user.imageUrl} alt="" />
                            {user.name}
                        </div>
                    )
                })}
            </SearchResults>
        );
    };

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
        <>
            {getSearchContainerForWeb()};
            {getSearchContainerForMobile()};
            {usersResults[0] ? getSearchResults() : <></>}
        </>
    )
}