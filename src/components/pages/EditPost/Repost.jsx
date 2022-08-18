import { BiRepost } from 'react-icons/bi';
import Modal from "react-modal";
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext.js';
import Loading from "../../Loading/Loading.js";
import { PostModal } from "./EditPostStyle.jsx";


export default function Repost() {
    const [loading, setLoading] = useState(false)
    const [modalIsOpen, setIsOpen] = useState(false)
    return (
        <>
            <BiRepost color="#FFFFFF" size={25} cursor='pointer' onClick={() => setIsOpen(true)} />
            <p> 0 </p>
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
                                <button onClick={() => ''}>Yes, re-post</button>
                            </div>
                        </PostModal>

                }

            </Modal>

        </>
    )
}