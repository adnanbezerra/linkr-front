import axios from "axios";
import { BASE_URL, config } from "../../../mock/data";
import { useContext, useEffect, useRef } from 'react';
import UserContext from '../../contexts/UserContext.js';

export default function EditPost({description, editMode, setEditMode, message , setMessage, id, setPosts}) {
    const descriptionRef = useRef(null)
    useEffect(() => {
        if (editMode) {
          descriptionRef.current.focus();
        }
      }, [editMode]);

    const { user } = useContext(UserContext);
    function sendEditedPost() {
        const request = axios.put(`${BASE_URL}/post/${id}`, message, config(user.token))
        request
            .then((res) => setPosts(res.data))
            .catch((res) => console.log(res))
    }


    function editPost(e) {
        if (e.keyCode === 13) {
            sendEditedPost()

        } else if (e.keyCode === 27) {
          setMessage(message);
          setEditMode(false);
        }
      }
    
    return (
        <>
            {
                editMode ? <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    ref={descriptionRef}
                    onKeyDown={editPost}
                    disabled={''}> asdasd </textarea> : <p>{description}</p>
            }
        </>
    )
}