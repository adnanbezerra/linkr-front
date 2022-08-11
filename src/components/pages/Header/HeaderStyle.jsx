import styled from "styled-components";

const LogoffContainer = styled.div`
    display: ${props => props.display ? 'flex' : 'none'};
    position: fixed;
    top: 70px;
    right: 0px;
    color: white;
    width: 150px;
    height: 47px;
    border-radius: 0px 0px 0 20px;
    background-color: #171717;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    font-weight: 700;
    cursor: pointer;
`

const ArrowBox = styled.div`
    cursor: pointer;
`

const HeaderContainer = styled.div`
    height: 72px;
    width: 100%;
    background-color: #151515;
    position: fixed;
    top: 0;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    box-sizing: border-box;

    font-size: 50px;

    img {

    }
`

const LinkrLogo = styled.p`
    font-family: 'Passion One', cursive;
    font-size: 49px;
    font-weight: 700;

    @media(max-width: 650px) {
        font-size: 45px;
    }
`

export { HeaderContainer, LinkrLogo, ArrowBox, LogoffContainer }