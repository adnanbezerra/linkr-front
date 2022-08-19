import { Container, Main, Panel, Posts, Sidebar, Line, Hashtags, TimelineTitle } from "./TimelineStyle";
import UserContext from '../../contexts/UserContext.js';
import UpdateContext from "../../contexts/UpdateContext.js";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import Header from "../../templates/Header/Header";
import { config, BASE_URL, getCookieByName } from "../../../mock/data";
import { useNavigate, Link } from "react-router-dom";
import SearchBox from "../../templates/SearchBox/SearchBox";
import { CreateNewPost, GetPosts } from "./auxiliaryFunctions";


function TimeLine() {
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const {updatePage, setUpdatePage} = useContext(UpdateContext);
    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([])
    const [messagePost, setMessagePost] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const verifyUser = user === undefined;

    const [userInfo, setUserInfo] = useState();

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

    useEffect(() => {
        const header = verifyUser ? "" : config(user.token);

        const promise = axios.get(`${BASE_URL}/timeline`, header)
        promise.then((res) => {
            console.log("entrei")
            if (typeof (res.data) === "string") {
                setMessagePost(res.data)
            }
            else {
                setMessagePost('')
                setPosts(res.data)
            }
            setLoading(false)
        }).catch((err) => {
            console.error(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage])

    //requisição de trends
    useEffect(() => {
        const header = verifyUser ? "" : config(user.token);
        const trends = axios.get(`${BASE_URL}/trends`, header);
        trends.then((r) => {
            setTrends(r.data);
        }).catch((err) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);


    function GetHashtags({ item }) {

        let name = (item.name).replace('#', '')

        return (
            <Link to={`/hashtag/${name}`}>
                <p> {item.name}</p>
            </Link>

        )
    }

    function publish(event) {

        event.preventDefault();

        setDisable(!disable)
        const body = {
            url,
            description
        }

        const urlEmpty = url.length === 0

        if (urlEmpty) {
            alert('Data cannot be empty')
            return;
        }

        const header = verifyUser ? "" : config(user.token);
        const promise = axios.post(`${BASE_URL}/timeline`, body, header)

        promise.then((res) => {
            
            setDisable(false)
            setDescription('')
            setUrl('')
            navigate('/')
        }).catch((err) => {
            alert('Houve um erro ao publicar seu link')
            console.error(err)

        })
    }

    function MessagePost({ messagePost }) {
        return (
            <h1>{messagePost}</h1>
        )
    }


    return (
        <Container>
            <Header userInfo={verifyUser ? "" : userInfo} />
            <SearchBox />
            <Main>
                <Panel>
                    <div>
                        <TimelineTitle>timeline</TimelineTitle>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <Posts>
                                <CreateNewPost userInfo={userInfo} publish={publish} setUrl={setUrl} url={url} setDescription={setDescription} description={description} disable={disable} setDisable={setDisable} />
                                {
                                    posts.length === 0 ? '' :
                                        posts.map((item, index) => { return (<GetPosts key={index} item={item} loading={loading} setPosts={setPosts} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} navigate={navigate} />) })
                                }
                                {
                                    (messagePost === '') ? '' : <MessagePost messagePost={messagePost} />
                                }
                            </Posts>
                            <Sidebar>
                                <h2>Trending</h2>
                                <Line></Line>
                                <Hashtags>
                                    {(trends.length === 0) ? '' : trends.map((item, index) => { return (<GetHashtags key={index} item={item} />) })}
                                </Hashtags>
                            </Sidebar>
                        </div>
                    </div>
                </Panel>
            </Main>
        </Container>
    )
}

export default TimeLine;
