import styled from "styled-components";

export const SearchContainerMobile = styled.div`
    display: none;
    align-items: center;
    box-sizing: border-box;
    background-color: #fff;
    z-index: 2;
    border-radius: 8px;
    color: #c6c6c6;
    font-size: 30px;

    height: 45px;
    justify-content: center;
    align-items: center;
    margin-top: 82px;
    width: 95%;
    padding: 0 15px;

    input {
        outline: none;
        width: 90%;
        border: 0;
        height: 43px;
        border-radius: 8px;
    }

    @media(max-width: 650px) {
        display: flex;
    }
`

export const SearchResults = styled.div`
    background-color: #E7E7E7;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding: 10px 17px;
    padding-top: 20px;
    color: #515151;
    font-size: 19px;

    z-index: 2;
    position: fixed;
    top: 48px;
    right: 32.27%;
    border: 0;
    border-radius: 8px;
    width: 35%;

    box-shadow: 0px 0px 4px 0px;
    font-size: 19px;

    img {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        margin-right: 12px;
    }

    p {
        color: #C5C5C5;
        margin-left: 10px;
    }

    @media(max-width: 650px) {
        z-index: 1;
        top: 110px;
        width: 95%;
        right: 2.5%;
    }
`

export const SearchContainer = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 35%;
    background-color: #fff;
    z-index: 3;
    border-radius: 8px;
    color: #c6c6c6;
    font-size: 30px;

    position: fixed;
    top: 13px;
    right: 32.3%;

    padding-left: 15px;
    box-sizing: border-box;

    input {
        outline: none;
        width: 90%;
        border: 0;
        height: 45px;
        border-radius: 8px;
    }

    @media(max-width: 650px) {
        display: none;
    }
`