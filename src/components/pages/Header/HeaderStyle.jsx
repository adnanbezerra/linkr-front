import styled from "styled-components";

const Icon = styled.div`
    position: sticky;
    font-size: 30px;
    background-color: #fff;
    border-radius: 0 8px 8px 0;
    color: #C6C6C6;
    height: 47px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-right: 15px;
    z-index: 3;

    @media(max-width: 650px) {
        display: none;
    }

`

const SearchBoxMobile = styled.div`
    background-color: #E7E7E7;
    display: none;
    box-sizing: border-box;
    padding: 15px 17px;
    top: 60px;
    right: 33%;
    border: 0;
    border-radius: 8px;
    width: 35%;

    @media screen {
        
    }
`

const SearchResults = styled.div`
    background-color: #E7E7E7;
    display: flex;
    box-sizing: border-box;
    padding: 15px 17px;
    padding-top: 20px;
    color: #515151;

    z-index: 2;
    position: fixed;
    top: 48px;
    right: 32.27%;
    border: 0;
    border-radius: 8px;
    width: 35%;

    box-shadow: 0px 0px 4px 0px;
    font-size: 19px;
`

const SearchAndResults = styled.div`
    /* width: 100%; */
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
`

const SearchBox = styled.div`
    display: flex;
    position: absolute;
    align-items: center;
    box-sizing: border-box;
    width: 35%;
    background-color: #fff;
    z-index: 3;
    border-radius: 8px;
    color: #c6c6c6;
    font-size: 30px;

    input {
        outline: none;
        width: 90%;
        border: 0;
        height: 45px;
        padding-left: 15px;
        border-radius: 8px;
    }

     @media(max-width: 650px) {
        input{
            display: none;
        } 
    }
 `

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

    @media(max-width: 650px) {
        width: 130px;
    }
`

const ArrowBox = styled.div`
    display: flex;
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

    font-size: 45px;
    z-index: 2;

    img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }

    @media(max-width: 650px) {
        padding: 0 17px;
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

export { HeaderContainer, LinkrLogo, ArrowBox, LogoffContainer, SearchBox, SearchResults, SearchAndResults, SearchBoxMobile, Icon }