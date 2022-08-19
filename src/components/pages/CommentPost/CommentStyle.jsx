import styled from "styled-components";

export const Container = styled.div`
    display: ${props => props.displayComments ? "flex" : "none"};
    flex-direction: column;
    justify-content: center;
    width: 100%;
    background-color: #1E1E1E;
    color:#ACACAC;
    height: fit-content;
    padding: 25px;
    padding-top: 13px;
    box-sizing: border-box;
    border-radius: 16px;

    img{
        width: 40px;
        height: 40px;
        border-radius: 50%;
    }
`

export const FormButton = styled.div`
    background-color: #252525;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    color: #fff;

    :hover {
        cursor: pointer;
    }
`

export const FormInputContainer = styled.div`
    display: flex;
    border-radius: 8px;
    width: 90%;
    height: 40px;
    background-color: #252525;
    padding-left: 20px;
    box-sizing: border-box;
`

export const FormInput = styled.input`
    background-color: #252525;
    border: 0;
    outline: none;
    width: 90%;
    color: #fff;

    ::placeholder{
        color: #575757;
        font-size: 14px;
        font-style: italic;
    }
`

export const CreateNewComment = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const Comment = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    padding-bottom: 16px;

    border-bottom: 1px solid #353535;

    margin-bottom: 16px;
`

export const CommentTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 18px;
`

export const CommentUserName = styled.p`
    color: #f3f3f3;
    font-weight: 700;    
    font-size: 14px;
    margin-bottom: 3px;
`

export const CommentMessage = styled.p`
    color: #ACACAC;
    font-weight: 400;
    font-size: 14px;
`

export const ExtraInfo = styled.p`
    color: #565656;
    font-size: 14px;
    font-weight: 400;
    margin-left: 5px;
`