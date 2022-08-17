import styled from "styled-components";
import { useContext, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { config, BASE_URL } from "../../../mock/data";
import axios from "axios";

function FollowerButton({ follower, setFollower, id }) {

    const { user } = useContext(UserContext)
    const verifyUser = user === undefined;
    const [disable, setDisable] = useState(false)

    function FollowOrUnfollow() {

        const header = verifyUser ? "" : config(user.token);
        setDisable(true)

        const promise = axios.post(`${BASE_URL}/user/${id}`, '', header);
        promise.then((res) => {
            setFollower(!follower)
        }
        )
            .catch((err) => {
                alert('Não foi possívels seguir')
            }
            )

        setDisable(false)
    }

    if (follower === false) {
        return (
            <Follow disabled={disable} color='#FFFFFF' back='#1877F2' onClick={() => FollowOrUnfollow()}>Follow</Follow>
        )
    }
    else {
        return (
            <Follow disabled={disable} color='#1877F2' back='#FFFFFF' onClick={() => FollowOrUnfollow()}>Unfollow</Follow>
        )
    }
}

export const Follow = styled.button`
    width: 110px;
    border: 0;
    border-radius: 5px;
    color: ${(props) => props.color};
    background-color: ${(props) => props.back};
    cursor: pointer;
`

export default FollowerButton;