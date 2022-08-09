import styled from "styled-components";

// Fonts

// 

export const Container = styled.div`
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: center;
    position: absolute;
    background-color: #333333;
`

export const Main = styled.div`
    display: flex;
    flex-direction: column;

    
    box-sizing: border-box;
    margin-top: 100px;

    h1{
        width: 100%;
        margin-bottom: 50px;
        font-family: 'Oswald', sans-serif;
        font-size: 43px;
        color: #FFFFFF;
        font-weight: 700;
    }
`

export const Panel = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;

    box-sizing: border-box;
`

export const Posts = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    margin: 0 20px 0 0;
    border-radius: 15px;
`

export const NewPost = styled.div`
    height: 200px;
    display: flex;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 30px;

    box-sizing: border-box;
    background-color: white;

    p{
        width: 50px;
        height: 50px;
        background-color: yellow;
        border-radius: 50%;
    }
`

export const Post = styled.div`
    height: 270px;
    display: flex;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;

    box-sizing: border-box;
    background-color: #151515;
`

export const Perfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        margin-bottom: 20px;
    }

    p{
        width: 100%;
        text-align: center;
        margin-top: 5px;
    }
`

export const PostContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    box-sizing: border-box;


    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    input{
        width: 100%;
        margin-bottom: 5px;
        box-sizing: border-box;
        background-color: #EFEFEF;
        border: 0;
        border-radius: 5px;
    }

    button{
        width: 110px;
        height: 30px;
        background-color: #1877F2;
        border: 0;
        border-radius: 5px;
    }

    h2{
        margin-bottom: 10px;
    }

    h4{
        width: 100%;
        background-color: lightblue;
        margin-bottom: 10px;
    }

    h3{
        width: 100%;
        background-color: red;
        margin-bottom: 5px;
    }
`

export const Sidebar = styled.div`
    width: 300px;
    height: 400px;
    display: flex;
    border-radius: 15px;






    background-color: purple;
`







// export const Main = styled.div`
    
// `