import { Container, Main, Panel, Posts, NewPost, Post, Perfil, PostContent, Sidebar, Line, Hashtags, LoadSpinner, Preview, Infos } from "./TimelineStyle";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import UserContext from '../../contexts/UserContext.js'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useEffect, useState, useContext } from "react";
import Loading from "../../Loading/Loading.js";
import axios from 'axios';
import EditPost from "../EditPost/EditPost.jsx";
import Header from "../Header/Header";
import { getCookieByName } from "../../../mock/data";

function TimeLine() {
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [updatePage, setUpdatePage] = useState(true)
    const [posts, setPosts] = useState([])

    const image = 'https://rd1.com.br/wp-content/uploads/2022/08/20220805-neymargol-300x300.jpg'

    const [modalIsOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(UserContext)

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

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {

        const config = {
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        }

        const promise = axios.get('http://localhost:5000/timeline')

        promise.then((res) => {
            setPosts(res.data)
            setLoading(!loading)
        }).catch((err) => {
            console.log(err)
        })
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage])

    function GetPosts({ item }) {

        const [liked, setLiked] = useState(false)

        const url = 'https://medium.com/@pshrmn/a-simple-react-router'

        return (
            <Post>
                <Perfil>
                    <img src={image} alt="" />
                    {(!liked) ?
                        <AiOutlineHeart color="#FFFFFF" size={20} cursor='pointer' onClick={() => setLiked(!liked)} /> :
                        <AiFillHeart color="red" size={20} cursor='pointer' onClick={() => setLiked(!liked)} />}
                    <p>115 likes</p>
                </Perfil>
                <PostContent>
                    <h3>{item.name} </h3>
                    <p>{item.description}</p>
                    <Preview onClick={() => { window.open(url, '_blank') }}>
                        <Infos>
                            <h2>Como aplicar o Material UI em um
                                projeto React</h2>
                            <h3>Hey! I have moved this tutorial to my personal blog. Same content, new location. Sorry about making you click through to another page.</h3>
                            <h4>{url}</h4>
                        </Infos>
                        <img src={image} />
                    </Preview>

                    <EditPost id = {item.id} modalIsOpen = {modalIsOpen} setIsOpen = {setIsOpen} /> 

                </PostContent>
            </Post>
        )
    }

    function GetHashtags({ item }) {

        return (
            <p># {item.hashtag}</p>
        )
    }

    function publish(event) {
        event.preventDefault();
        const body = {
            url,
            description
        }

        const urlEmpty = url.length === 0
        const descriptionEmpty = url.length === 0

        if (urlEmpty) {
            alert('Data cannot be empty')
            setDisable(!disable)
            return
        }

        const promise = axios.post('http://localhost:5000/timeline', body)

        promise.then((res) => {
            setUpdatePage(!updatePage)
        }).catch((err) => {
            alert('Houve um erro ao publicar seu link')
            console.log(err)
        })

        setDisable(!disable)
        setDescription('')
        setUrl('')
    }

    function ShowPosts() {

        if (posts.length === 0) {
            return (
                <h1>There are no posts yet</h1>
            )
        }
        else {
            return (
                posts.map((item, index) => { return (<GetPosts key={index} item={item} />) })
            )
        }
    }

    return (
        <Container>
            <Header />
            {/* <div>
                <LinkPreview url="https://github.com/wei/socialify" width="400px" height={100} />
            </div> */}
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
                                    <input type='text' placeholder="http://..." onChange={(e) => { setUrl(e.target.value) }} value={url} />
                                    <textarea placeholder="Awesome article about #javascript" onChange={(e) => { setDescription(e.target.value) }} value={description}></textarea>
                                    <button disabled={disable} onClick={() => {
                                        setDisable(true)
                                    }}>{disable ? 'Publishing' : 'Publish'}</button>
                                </form>
                            </PostContent>
                        </NewPost>
                        {loading ?
                            <ShowPosts /> :
                            <LoadSpinner>
                                <Loading />
                            </LoadSpinner>}
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