import { Container, Main, Panel, Posts, NewPost, Post, Perfil, PostContent, Sidebar, Line, Hashtags,  Edit, PostModal } from "./TimelineStyle.jsx";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import Modal from "react-modal";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { BsTrash, BsFillPencilFill } from 'react-icons/bs';
import { useState } from "react";

function TimeLine() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [urlPreview, setUrlPreview] = useState('')
    const [description, setDescription] = useState('')
    const hashs = [
        { hashtag: 'neymito' },
        { hashtag: 'neymito' },
        { hashtag: 'neymito' },
        { hashtag: 'neymito' },
        { hashtag: 'neymito' },
        { hashtag: 'neymito' },
        { hashtag: 'neymito' },
        { hashtag: 'neymito' },
        { hashtag: 'neymito' }
    ]

    const posts = [
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        },
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        },
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        },
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        },
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        },
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        },
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        },
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        },
        {
            user: 'neymitinho',
            description: 'olaolaoala',
            urlPreview: 'dlfsdjkhfhds'
        }
    ]

    function GetPosts({ item }) {
        const [isDelete, setDelete] = useState(false)
        const [liked, setLiked] = useState(false)
        Modal.setAppElement(document.getElementById('root'))
        
        return (
            <Post>
                <Perfil>
                    <img src="https://rd1.com.br/wp-content/uploads/2022/08/20220805-neymargol-300x300.jpg" alt="" />
                    {(!liked) ?
                        <AiOutlineHeart color="#FFFFFF" size={20} cursor='pointer' onClick={() => setLiked(!liked)} /> :
                        <AiFillHeart color="red" size={20} cursor='pointer' onClick={() => setLiked(!liked)} />}
                    <p>115 likes</p>
                </Perfil>
                <PostContent>
                    <h3>{item.user} </h3>
                    <p>{item.description}</p>
                    <h3>preview</h3>
                    <Edit>
                        <div>
                            <BsFillPencilFill color="#FFFFFF" size={18} cursor='pointer' onClick={() => editPost()} />
                        </div>
                        <div>
                            <BsTrash color="#FFFFFF" size={18} cursor='pointer' onClick={() => deletePost()}/>
                        </div>
                        <Modal isOpen={modalIsOpen}   aria={{
    labelledby: "heading",
    describedby: "full_description"
  }} style={ {  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    background: 'rgba(255, 255, 255, 0.7)',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
                        }}}>
                        <PostModal>      
                            <h2>Are you sure you want <br />to delete this post?</h2>
                            <div>
                                <button onClick={closeModal}>No, go back</button>
                                <button onClick={() => {setDelete(true); closeModal()}}>Yes, delete it</button>
                            </div>          
                        </PostModal>

                        </Modal>
                        
                    </Edit>
                </PostContent>
            </Post>
        )
    }

    function deletePost() {
        setIsOpen(true);
    }
    
    function closeModal() {
        setIsOpen(false);
    }

    function editPost() {
        console.log("b")
    }

    function GetHashtags({ item }) {

        return (
            <p># {item.hashtag}</p>
        )
    }

    function publish(event) {
        event.preventDefault();
        const body = {
            urlPreview,
            description
        }

        const urlEmpty = urlPreview.length === 0
        const descriptionEmpty = urlPreview.length === 0

        if (urlEmpty || descriptionEmpty) {
            alert('Data cannot be empty')
            return
        }

        console.log(body)
        setDescription('')
        setUrlPreview('')
    }

    return (
        <Container>
            <div>
                <LinkPreview url="https://github.com/wei/socialify" width="400px" height={100} />
            </div>
            <Main>
                <h1>timeline</h1>
                <Panel>
                    <Posts>
                        <NewPost>
                            <Perfil>
                                <img src="https://rd1.com.br/wp-content/uploads/2022/08/20220805-neymargol-300x300.jpg" alt="" />
                            </Perfil>
                            <PostContent>
                                <h2>What are you going to share today?</h2>
                                <form onSubmit={publish}>
                                    <input type='text' placeholder="http://..." onChange={(e) => { setUrlPreview(e.target.value) }} value={urlPreview} />
                                    <textarea placeholder="Awesome article about #javascript" onChange={(e) => { setDescription(e.target.value) }} value={description}></textarea>
                                    <button>Publish</button>
                                </form>
                            </PostContent>
                        </NewPost>
                        {posts.map((item, index) => { return (<GetPosts key={index} item={item} />) })}
                    </Posts>
                    <Sidebar>
                        <h2>Trending</h2>
                        <Line></Line>
                        <Hashtags>
                            {hashs.map((item, index) => { return (<GetHashtags key={index} item={item} />) })}
                        </Hashtags>
                    </Sidebar>
                </Panel>
            </Main>
        </Container>
    )
}

export default TimeLine;