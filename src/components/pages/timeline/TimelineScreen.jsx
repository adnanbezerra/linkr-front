import { Container, Main, Panel, Posts, Sidebar, Line, Hashtags, TimelineTitle, WarningNewPosts, LoadingWarning } from "./TimelineStyle";
import UserContext from '../../contexts/UserContext.js';
import UpdateContext from "../../contexts/UpdateContext.js";
import { useEffect, useState, useContext } from "react";
import axios from 'axios';
import Header from "../../templates/Header/Header";
import { config, BASE_URL, getCookieByName } from "../../../mock/data";
import { useNavigate, Link } from "react-router-dom";
import SearchBox from "../../templates/SearchBox/SearchBox";
import { CreateNewPost, GetPosts } from "./auxiliaryFunctions";
import useInterval from 'use-interval';
import { BsArrowCounterclockwise } from 'react-icons/bs';
import InfiniteScroll from 'react-infinite-scroller';


function TimeLine() {
    const [url, setUrl] = useState('')
    const [description, setDescription] = useState('')
    const [disable, setDisable] = useState(false)
    const [loading, setLoading] = useState(false)
    const { updatePage, setUpdatePage } = useContext(UpdateContext);
    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([])
    const [messagePost, setMessagePost] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const verifyUser = user === undefined;
    const [userInfo, setUserInfo] = useState();

    const [lastPostsUpdate, setLastPostsUpdate] = useState('-infinity');
    const [newposts, setNewposts] = useState([]);
    const [numberOfNewposts, setNumberOfNewposts] = useState(0);
    const [cut, setCut] = useState(0);
    const [areMorePosts, setAreMorePosts] = useState(true);


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

        const promise = axios.get(`${BASE_URL}/timeline?cut=${cut}`, header)
        promise.then((res) => {
            if (typeof (res.data) === "string") {
                setMessagePost(res.data)
            }
            else {
                setMessagePost('')
                setPosts(res.data)
                setCut(cut + res.data.length);
            }
            setLoading(false);
            if (res.data.length === 0) {
                setAreMorePosts(false);
            }
        }).catch((err) => {
            console.error(err)
        })

        //obtendo timestamp atual
        axios.get(`${BASE_URL}/currentTime`, header).then((res) => {
            setLastPostsUpdate(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.error(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage])

    function morePosts(page) {
        const header = verifyUser ? "" : config(user.token);

        const promise = axios.get(`${BASE_URL}/timeline?cut=${cut}`, header)
        promise.then((res) => {
            setPosts([...posts, ...res.data]);
            setLoading(false);
            setCut(cut + res.data.length);
            if (res.data.length === 0) {
                setAreMorePosts(false);
            }
        }).catch((err) => {
            console.error(err)
        })
    }





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


    //atualização de post novos a cada 15 segundos
    useInterval(() => {
        const header = verifyUser ? "" : config(user.token);

        const promise = axios.get(`${BASE_URL}/timeline?time=${lastPostsUpdate}`, header)
        promise.then((res) => {
            if (res.data.length > 0) {
                setNewposts([...res.data, ...newposts]);
                setNumberOfNewposts(numberOfNewposts + res.data.length);
                setCut(cut + res.data.length);
            }

        }).catch((err) => {
            console.error(err)
        })

        //obtendo timestamp atual
        axios.get(`${BASE_URL}/currentTime`, header).then((res) => {
            setLastPostsUpdate(res.data);
            console.log(res.data);
        }).catch((err) => {
            console.error(err)
        })
    }, 15000);

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


                                {numberOfNewposts === 0 ? '' : <WarningNewPosts onClick={() => {
                                    setPosts([...newposts, ...posts]);
                                    setNewposts([]);
                                    setNumberOfNewposts(0);
                                }}>{numberOfNewposts} new posts, load more!<BsArrowCounterclockwise color="#FFFFFF" />
                                </WarningNewPosts>}

                                <div style={{ height: '500px', overflow: 'auto' }}>
                                    {posts.length === 0 ? <h1>There are no posts yet</h1> : <InfiniteScroll
                                        pageStart={0}
                                        loadMore={morePosts}
                                        hasMore={areMorePosts}
                                        loader={<LoadingWarning key={0}>Loading more posts...</LoadingWarning>}
                                        threshold={0}
                                        useWindow={false}

                                    >
                                        {posts.length === 0 ? <h1>There are no posts yet</h1> : posts.map((item, index) => { return (<GetPosts key={index} item={item} loading={loading} setPosts={setPosts} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} navigate={navigate} />) })}
                                    </InfiniteScroll>}
                                    
                                </div>
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
