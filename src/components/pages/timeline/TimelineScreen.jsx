
import { Container, Main, Panel, Posts, NewPost, Post, Perfil, PostContent, Sidebar, Line, Hashtags, LoadSpinner, Preview, Infos, TimelineTitle } from "./TimelineStyle";
import UserContext from '../../contexts/UserContext.js'
import { useEffect, useState, useContext, useRef } from "react";
import Loading from "../../Loading/Loading.js";
import axios from 'axios';
import EditPost from "../EditPost/EditPost.jsx";
import DeletePost from "../EditPost/DeletePost.jsx"
import Header from "../Header/Header";
import { config, BASE_URL, getCookieByName } from "../../../mock/data";
import LikePost from "../LikePost/LikePost.jsx";
import { useNavigate, Link } from "react-router-dom";
import { BiUserCircle } from 'react-icons/bi';
import SearchBox from "../SearchBox/SearchBox";
import { ReactTagify } from "react-tagify";

function TimeLine() {
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [updatePage, setUpdatePage] = useState(true);
    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(UserContext)
    const navigate = useNavigate();
    const verifyUser = user === undefined;

    const [userInfo, setUserInfo] = useState();

    // const profilePicture = userInfo === undefined ? <BiUserCircle /> : <img src={verifyUser ? "" : userInfo.imageUrl} alt="" />;

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
        }
        if (verifyUser) {
            navigate('/', { replace: true });
        } else {
            getUserInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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

        const config = {
            headers: {
                "Authorization": `Bearer ${verifyUser ? "" : user.token}`
            }
        }

        const promise = axios.get(`${BASE_URL}/timeline`)
        promise.then((res) => {
            setPosts(res.data)
            setLoading(false)
        }).catch((err) => {
            console.error(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage])

    function GetHashtags({ item }) {
        return (
            <p># {item.hashtag}</p>
        )
    }

    //requisição de trends
    useEffect(() => {
        const trends = axios.get(`${BASE_URL}/trends`, config(user.token));
        trends.then((r) => {
            setTrends(r.data);
        }).catch((err) => {
            console.log(err)
        })
    }, [updatePage]);


    function GetHashtags({ item }) {

        return (
            <Link to={`/hashtag/${item.name}`}>
                <p># {item.name}</p>
            </Link>

        )
    }

    function GetPosts({ item }) {
        //variaveis para uso na biblioteca tagify
        const tagStyle = {
            fontWeight: 900,
            color: 'white',
            cursor: 'pointer'
        }


        const url = 'https://medium.com/@pshrmn/a-simple-react-router'
        return (
            <Post>
                <Perfil>
                    <img src={item.imageUrl} alt={item.name} />
                    <LikePost id={item.id} />
                </Perfil>
                <PostContent>
                    <h3 onClick={()=>navigate(`/user/${item.userId}`)}>{item.name} </h3>
                    {/*o item.description foi incorporado no contentString*/}
                    <ReactTagify
                        tagStyle={tagStyle}
                        tagClicked={(tag) => navigate(`/hashtag/${tag.substring(1, tag.length)}`)}>
                        <p>
                            {item.description}
                        </p>
                    </ReactTagify>

                    <Preview onClick={() => { window.open(item.url, '_blank') }}>
                        <Infos>
                            <h2>{item.titlePreview}</h2>
                            <h3>{item.descriptionPreview}</h3>
                            <h4>{item.url}</h4>
                        </Infos>
                        <img src={item.imagePreview} />
                    </Preview>
                    <DeletePost id={item.id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setPosts={setPosts} setLoading={setLoading} />
                </PostContent>
            </Post>
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
            return;
        }

        const promise = axios.post(`${BASE_URL}/timeline`, body, config(user.token))

        promise.then((res) => {
            console.log('postei')
            setUpdatePage(!updatePage)
            setDisable(false)
            setDescription('')
            setUrl('')
        }).catch((err) => {
            alert('Houve um erro ao publicar seu link')
            console.error(err)
        })
    }

    return (
        <Container>
            <Header userInfo={verifyUser ? "" : userInfo} />
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <SearchBox setUpdatePage={setUpdatePage} updatePage={updatePage} />
            </div>
            <Main>
                <Panel>
                    <div>
                        <TimelineTitle>timeline</TimelineTitle>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <Posts>
                                <CreateNewPost userInfo={userInfo} publish={publish} setUrl={setUrl} url={url} setDescription={setDescription} description={description} disable={disable} setDisable={setDisable} />
                                {
                                    posts.length === 0 ? <h1>There are no posts yet</h1> :
                                        posts.map((item, index) => { return (<GetPosts key={index} item={item} loading={loading} setPosts={setPosts} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />) })
                                }
                            </Posts>
                            <Sidebar>
                                <h2>Trending</h2>
                                <Line></Line>
                                <Hashtags>
                                    {hashs.map((item, index) => { return (<GetHashtags key={index} item={item} />) })}
                                </Hashtags>
                            </Sidebar>
                        </div>
                    </div>
                </Panel>
            </Main>
        </Container>
    )
}
function CreateNewPost({ userInfo, publish, setUrl, url, setDescription, description, disable, setDisable }) {
    return (
        <NewPost>
            <Perfil>
                <img src={userInfo === undefined ? "" : userInfo.imageUrl} alt="" />
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
    )
}

function GetPosts({ item, loading, setPosts, modalIsOpen, setIsOpen }) {
    const url = 'https://medium.com/@pshrmn/a-simple-react-router'
    const [message, setMessage] = useState(item.description)
    const [editMode, setEditMode] = useState(false)
    return (
        <>
            {loading ?
                <LoadSpinner>
                    <Loading />
                </LoadSpinner> :
                <Post>
                    <Perfil>
                        <img src={item.imageUrl} alt="" />
                        <LikePost id={item.id} />
                    </Perfil>
                    <PostContent>
                        <h3>{item.name} </h3>

                        <EditPost description={item.description} editMode={editMode} setEditMode={setEditMode} message={message} setMessage={setMessage} id={item.id} setPosts={setPosts} />
                        <Preview onClick={() => { window.open(item.url, '_blank') }}>
                            <Infos>
                                <h2>{item.titlePreview}</h2>
                                <h3>{item.descriptionPreview}</h3>
                                <h4>{item.url}</h4>
                            </Infos>
                            <img src={item.imagePreview} alt="" />
                        </Preview>

                        {
                            item.isMyPost === "true" ?
                                <DeletePost id={item.id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setPosts={setPosts} setEditMode={setEditMode} editMode={editMode} /> :
                                ``
                        }

                    </PostContent>
                </Post>
            }

        </>
    )
}
export default TimeLine;
