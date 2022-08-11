import { Container, Main, Panel, Posts, NewPost, Post, Perfil, PostContent, Sidebar, Line, Hashtags, LoadSpinner } from "./HashTag'sPostsScreenStyle";
import { LinkPreview } from "@dhaiwat10/react-link-preview";
import UserContext from '../../contexts/UserContext.js'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { useEffect, useState, useContext } from "react";
import Loading from "../../Loading/Loading.js";
import axios from 'axios'
import Header from "../Header/Header";
import { getCookieByName, config, BASE_URL } from "../../../mock/data";
import { useNavigate, Link, useParams } from "react-router-dom";

export default function PostsWithHashTag() {
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const [updatePage, setUpdatePage] = useState(true)
    const [posts, setPosts] = useState([]);
    const [trends, setTrends] = useState([]);

    const { user, setUser } = useContext(UserContext);

    const {hashtag} = useParams();


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

    //requisição de trends
    useEffect(() => {
        const trends = axios.get(`${BASE_URL}/trends`, config(user.token));
        trends.then((r) => {
            setTrends(r.data);
        }).catch((err) => {
            console.log(err)
        })
    }, []);

    function GetHashtags({ item }) {

        return (
            <Link to={`/hashtag/${item.name}`}>
                <p># {item.name}</p>
            </Link>

        )
    }

    function GetPosts({ item }) {
        const [liked, setLiked] = useState(false)
        const [isDelete, setDelete] = useState(false)
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
                    <h3>{item.name} </h3>
                    <p>{item.description}</p>
                    <h3>preview</h3>
                    {/*<EditPost setDelete = {setDelete} isDelete = {isDelete} />*/}
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
                <h1># {hashtag}</h1>
                <Panel>
                    <Posts>
                        {loading ?
                            <ShowPosts /> :
                            <LoadSpinner>
                                <Loading />
                            </LoadSpinner>}
                    </Posts>
                    <Sidebar>
                        <h2>Trendings</h2>
                        <Line></Line>
                        <Hashtags>
                            {trends.length === 0 ? 'No trends at the moment' : trends.map((item, index) => { return (<GetHashtags key={index} item={item} />) })}
                        </Hashtags>
                    </Sidebar>
                </Panel>
            </Main>
        </Container>
    )
}
