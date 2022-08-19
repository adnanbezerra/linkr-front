import { BiRepost } from 'react-icons/bi';
import Modal from "react-modal";
import { useContext, useState, useEffect, useCallback } from 'react';
import { BASE_URL, config } from '../../../mock/data';
import UserContext from '../../contexts/UserContext.js';
import Loading from "../../Loading/Loading.js";
import { PostModal } from "./EditPostStyle.jsx";
import axios from 'axios';
import UpdateContext from "../../contexts/UpdateContext.js";
import { useNavigate } from "react-router-dom";

export default function Repost( {id }) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false)
    const [infoRepost, setInfoRepost] = useState()
    const verifyUser = user === undefined;
    const {updatePage, setUpdatePage} = useContext(UpdateContext);
    const userToken = verifyUser ? "" : user.token;
    const token = config(userToken);
    const navigate = useNavigate();

    function searchRepost(){
        setLoading(true)
        const repostInfo = axios.get(`${BASE_URL}/repost/${id}`)
        repostInfo
        .then((res) => { setLoading(false); setInfoRepost(res.data[0].totalrepost)})
        .catch((err)=> { setLoading(false); console.log(err)})
    }

    useEffect(() => { searchRepost() }, [updatePage]);

    function postRepost() {
        setLoading(true)
        const repost = axios.post(`${BASE_URL}/repost/${id}`, {} , token)
        repost
        .then((res) => {setLoading(false); navigate("/") ; setIsOpen(false)})
        .catch((err) => {setLoading(false); alert("Nao foi possivel repostar"); console.log(err); setIsOpen(false)})
    }


    return (
        <>
            <BiRepost color="#FFFFFF" size={25} cursor='pointer' onClick={() => setIsOpen(true)} />
            <p> {infoRepost} re-post </p>
            <Modal isOpen={modalIsOpen}
                style={{
                    content: {
                        height: '270px',
                        width: '597px',
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        border: 'none',
                        borderRadius: '15px',
                        background: 'rgba(255, 255, 255, 0.7)',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}>
                {
                    loading ?
                        <PostModal>
                            <Loading />
                        </PostModal>
                        :
                        <PostModal>
                            <h2>Are you want to re-post <br /> this link?</h2>
                            <div>
                                <button onClick={() => setIsOpen(false)}>No, go back</button>
                                <button onClick={() => postRepost()}>Yes, re-post</button>
                            </div>
                        </PostModal>

                }

            </Modal>

        </>
    )
}