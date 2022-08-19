import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { BASE_URL, config } from '../../../mock/data';
import UserContext from '../../contexts/UserContext';
import { Comment, CommentMessage, CommentTextContainer, CommentUserName, Container, CreateNewComment, ExtraInfo, FormButton, FormInput, FormInputContainer } from './CommentStyle';
import { IoPaperPlaneOutline } from 'react-icons/io5';
import UpdateContext from "../../contexts/UpdateContext.js";

export default function CommentPost({ displayComments, commentsList, setCommentsList, id, posterId, followingList }) {

    const { user } = useContext(UserContext);
    const {updatePage, setUpdatePage} = useContext(UpdateContext);
    const [userInfo, setUserInfo] = useState();
    const [commentText, setCommentText] = useState("");
    const verifyUser = user === undefined;
    const verifyUserInfo = userInfo === undefined;

    useEffect(() => {
        getUserInfo();
    }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        , [updatePage])

    function getUserInfo() {
        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);

        axios.get(`${BASE_URL}/user/me`, token)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    function submitForm(e) {
        e.preventDefault();

        const content = { commentText };
        const headers = config(verifyUser ? "" : user.token);
        const { name, imageUrl } = userInfo;

        const commentContent = { commentText, name, imageUrl };

        axios.post(`${BASE_URL}/comment/${id}`, content, headers)
            .then(response => { 
                setCommentsList([...commentsList, commentContent]);
                setCommentText("");
                setUpdatePage(!updatePage)
            })
            .catch(error => {
                console.error(error);
                alert("Oops! Something went wrong in here...")
            });
    }

    function checkIfIFollowCommenter(commenterId){
        for(let following of followingList) {
            if(following.id === commenterId) return true;
        }

        return false;
    }

    return (
        <Container displayComments={displayComments}>
            {
                commentsList ? commentsList.map((comment, index) => {
                    return (
                        <Comment key={index}>
                            <img src={comment.imageUrl} alt="" />

                            <CommentTextContainer>
                                <div style={{ display: 'flex' }}>
                                    <CommentUserName>{comment.name}</CommentUserName>
                                    <ExtraInfo>{comment.commenterId === posterId ? "• post's author" : ""}</ExtraInfo>
                                    <ExtraInfo>{followingList ? (checkIfIFollowCommenter(comment.commenterId) ? "• following" : "") : ""}</ExtraInfo>
                                </div>
                                <CommentMessage>{comment.commentText}</CommentMessage>
                            </CommentTextContainer>
                        </Comment>
                    )
                })
                    : <></>
            }

            <CreateNewComment>
                <img src={verifyUserInfo ? "" : userInfo.imageUrl} alt="" />
                <FormInputContainer>
                    <FormInput value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder="write a comment..." />
                    <FormButton onClick={submitForm}>
                        <IoPaperPlaneOutline />
                    </FormButton>
                </FormInputContainer>
            </CreateNewComment>
        </Container>
    )
}