import axios from "axios";
import { BASE_URL, config } from "../../../mock/data";
import { useContext, useEffect, useRef, useState } from 'react';
import UserContext from '../../contexts/UserContext.js';
import { ReactTagify } from "react-tagify";
import { useNavigate } from "react-router-dom";

export default function EditPost({ description, editMode, setEditMode, message, setMessage, id, setPosts }) {

  const navigate = useNavigate();

  const tagStyle = {
    fontWeight: 900,
    color: 'white',
    cursor: 'pointer'
  }

  const descriptionRef = useRef(null)
  const [disabled, setDisabled] = useState(false)
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (editMode) {
      descriptionRef.current.focus();
    }
  }, [editMode]);


  function sendEditedPost() {
    const request = axios.patch(`${BASE_URL}/post/${id}`, { message }, config(user.token))
    request
      .then((res) => { setPosts(res.data); console.log(res.data); setDisabled(false) })
      .catch((res) => { console.log(res); setDisabled(false) })
  }


  function editPost(e) {
    if (e.keyCode === 13) {
      setDisabled(true)
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
          disabled={disabled}> asdasd </textarea> : <ReactTagify
            tagStyle={tagStyle}
            tagClicked={(tag) => navigate(`/hashtag/${tag.substring(1, tag.length)}`)}><p>{description}</p></ReactTagify>
      }
    </>
  )
}