import { BsTrash, BsFillPencilFill } from 'react-icons/bs';
import { useState } from 'react';
import { Edit, PostModal } from "./EditPostStyle.jsx";
import Modal from "react-modal";

export default function EditPost({setDelete, isDelete} ) {

    const [modalIsOpen, setIsOpen] = useState(false);
    Modal.setAppElement(document.getElementById('root'))

    function deletePost() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
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
                <BsTrash color="#FFFFFF" size={18} cursor='pointer' onClick={() => deletePost()} />
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
                        <button onClick={closeModal}>No, go back</button>
                        <button onClick={() => { setDelete(true); closeModal() }}>Yes, delete it</button>
                    </div>
                </PostModal>

            </Modal>

        </Edit>
    )
}