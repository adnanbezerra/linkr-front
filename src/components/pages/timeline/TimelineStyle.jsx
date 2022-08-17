import styled from "styled-components";

// Fonts

// 

export const TimelineTitle = styled.p`
    margin-bottom: 50px;
    font-family: 'Oswald', sans-serif;
    font-size: 43px;
    color: #FFFFFF;
    font-weight: 700;
`

export const Container = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    position: absolute;
    background-color: #333333;
    overflow-y: scroll;
    flex-direction: column;
`

export const Main = styled.div`
    display: flex;
    height: 100%;
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

    @media(max-width: 650px) {
        margin-top: 19px;
    }
`

export const Panel = styled.div`
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-sizing: border-box;
    width: 100%;
    align-items: center;

    text-align: left;
`

export const Posts = styled.div`
    width: 600px;
    display: flex;
    flex-direction: column;
    margin: 0 20px 0 0;
    border-radius: 15px;
    position: relative;

    @media(max-width: 980px){
        margin: 0;
    }

    @media(max-width: 650px){
        width: 100%;
        margin: 0;
        border-radius: 0;
    }
`

export const NewPost = styled.div`
    height: 210px;
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

    @media(max-width: 650px){
        border-radius: 0;
    }
`

export const Post = styled.div`
    height: 270px;
    display: flex;
    border-radius: 15px;
    padding: 20px;
    margin-bottom: 20px;
    position: relative;
    box-sizing: border-box;
    background-color: #151515;

    @media(max-width: 650px){
        border-radius: 0;
    }
`

export const Perfil = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 50px;

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
        font-size: 11px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        color: #FFFFFF;
    }
`

export const PostContent = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    box-sizing: border-box;
    word-break: break-all;

    form{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
    }

    input{
        width: 100%;
        height: 30px;
        margin-bottom: 5px;
        box-sizing: border-box;
        background-color: #EFEFEF;
        border: 0;
        border-radius: 5px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        padding: 10px;
    }

    textarea{
        width: 100%;
        height: 60px;
        box-sizing: border-box;
        border: 0;
        border-radius: 5px;
        background-color: #EFEFEF;
        font-size: 15px;
        resize: none;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
        padding: 10px;
        margin-bottom: 10px;
    }

    button{
        width: 110px;
        height: 30px;
        background-color: #1877F2;
        border: 0;
        border-radius: 5px;
        margin-top: 5px;
        color: #FFFFFF;
        cursor: pointer;
    }

    h2{
        margin-bottom: 10px;
        font-size: 20px;
        font-family: 'Lato', sans-serif;
        font-weight: 300;
    }

    h3{
        width: 100%;
        margin-bottom: 10px;
        font-size: 19px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        color: #FFFFFF;
    }

    p{
        width: 100%;
        margin-bottom: 10px;
        font-size: 17px;
        font-family: 'Lato', sans-serif;
        font-weight: 400;
        color: #B7B7B7;
    }
`

export const Sidebar = styled.div`
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    border-radius: 15px;
    color: #FFFFFF;
    box-sizing: border-box;
    background-color: #171717;
    position: sticky;
    top: 193px;


    h2{
        width: 100%;
        padding: 10px;
        font-size: 27px;
        font-family: 'Oswald', sans-serif;
    }

    @media(max-width: 980px){
        display: none;
    }
`

export const Line = styled.div`
    height: 1px;
    background-color: #484848;
`

export const Hashtags = styled.div`
    display: flex;
    flex-direction: column;
    padding: 10px;
    
    p{
        font-size: 19px;
        font-family: 'Lato', sans-serif;
        font-weight: 700;
        margin-bottom: 10px;
    }


    box-sizing: border-box;
    a{
        text-decoration: none;
        color: white;
    }
`

export const LoadSpinner = styled.div`
position: absolute;
width: 100%;
height: 240px;
display: flex;
justify-content: center;
align-items: center;
z-index: 1;
margin-top: 240px;
`

export const Preview = styled.div`
height: 150px;
display: flex;
justify-content: space-between;
border: 1px solid #4D4D4D;
border-radius: 10px;
cursor: pointer;
overflow: hidden;
box-sizing: border-box;

img {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 0 10px 10px 0;
}
`

export const Infos = styled.div`
display: flex;
width: 100%;
flex-direction: column;
justify-content: space-around;
padding: 20px;
box-sizing: border-box;

h2{
    font-size: 16px;
    color: #CECECE;
    font-family: 'Lato', sans-serif;
    word-break: break-all;
}

h3{
    font-size: 11px;
    color: #9B9595;
    font-family: 'Lato', sans-serif;
    word-break: break-all;
}

h4{
    font-size: 11px;
    color: #CECECE;
    font-family: 'Lato', sans-serif;
    word-break: break-all;
}
`

// export const Main = styled.div`
    
// `

