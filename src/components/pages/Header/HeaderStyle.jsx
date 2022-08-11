import styled from "styled-components";

const HeaderContainer = styled.div`
    height: 72px;
    width: 100%;
    background-color: #151515;
    position: fixed;
    top: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 28px;
    box-sizing: border-box;
`

const LinkrLogo = styled.p`
    font-family: 'Passion One', cursive;
    font-size: 49px;
    font-weight: 700;

    @media(max-width: 650px) {
        font-size: 45px;
    }
`

export { HeaderContainer, LinkrLogo }