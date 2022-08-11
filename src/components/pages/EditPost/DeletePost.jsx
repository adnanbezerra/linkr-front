import { BsTrash, BsFillPencilFill } from 'react-icons/bs';
import { Edit, PostModal } from "./DeletePostStyle.jsx";
import Modal from "react-modal";
import axios from 'axios';
import { config, BASE_URL } from '../../../mock/data.js';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';

export default function DeletePost({ id, modalIsOpen, setIsOpen, setPosts, setLoading }) {
    const { user } = useContext(UserContext);
    Modal.setAppElement(document.getElementById('root'));
    function deletePost() {
        setLoading(true)
        const promise = axios.delete(`${BASE_URL}/post/${id}`, config(user.token));
        promise
            .then((res) => {
                setIsOpen(false)
                setLoading(false)
                setPosts(res.data)
            })
            .catch((err) => {
                setIsOpen(false);
                setLoading(false)
                alert(
                    "An error occured while trying to delete the post, please try again later",
                );
            });
    }

    function editPost() {
        console.log("b")
    }
    return (
        <Edit>
            <div>
                <BsFillPencilFill color="#FFFFFF" size={18} cursor='pointer' onClick={() => editPost()} />
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
                        <PostModal>
                            <h2>Are you sure you want <br />to delete this post?</h2>
                            <div>
                                <button onClick={() => setIsOpen(false)}>No, go back</button>
                                <button onClick={() => deletePost()}>Yes, delete it</button>
                            </div>
                        </PostModal>

            </Modal>
        
        </Edit>
       
        )
}