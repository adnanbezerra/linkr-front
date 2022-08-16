import styled from "styled-components";

function FollowerButton({ follower, setFollower }) {

    if (follower === false) {
        return (
            <Follow color='#FFFFFF' back='#1877F2' onClick={() => setFollower(!follower)}>Follow</Follow>
        )
    }
    else {
        return (
            <Follow color='#1877F2' back='#FFFFFF' onClick={() => setFollower(!follower)}>Unfollow</Follow>
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