import { BsTrash, BsFillPencilFill } from 'react-icons/bs';
import { Edit, PostModal } from "./EditPostStyle.jsx";
import Modal from "react-modal";
import axios from 'axios';
import { config, BASE_URL } from '../../../mock/data.js';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext.js';
import Loading from "../../Loading/Loading.js";

export default function EditPost({ id, modalIsOpen, setIsOpen, setPosts }) {
    const { user } = useContext(UserContext);
    const [loading, setLoading] = useState(false)
    Modal.setAppElement(document.getElementById('root'));
    function deletePost() {
        setLoading(true)
        const promise = axios.delete(`${BASE_URL}/post/${id}`, config(user.token));
        promise
            .then((res) => {
                setTimeout(() =>  setLoading(false), 1000)
                setTimeout( () => setIsOpen(false), 2000)
                setPosts(res.data)
            })
            .catch((err) => {
                console.log(err)
   
                setTimeout( () => {setLoading(false); alert(
                    err
                )}, 1000)
                setTimeout( () => setIsOpen(false), 2000)  
            });
    }

    return (
        <Edit>
            <div>
                <BsFillPencilFill color="#FFFFFF" size={18} cursor='pointer' onClick={() => ''} />
            </div>
            <div>
                <BsTrash color="#FFFFFF" size={18} cursor='pointer' onClick={() => setIsOpen(true)} />
            </div>
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
                            <h2>Are you sure you want <br />to delete this post?</h2>
                            <div>
                                <button onClick={() => setIsOpen(false)}>No, go back</button>
                                <button onClick={() => deletePost()}>Yes, delete it</button>
                            </div>
                        </PostModal>

                }

            </Modal>

        </Edit>

    )
}