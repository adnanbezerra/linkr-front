import { Container, Main, Panel, Posts, Sidebar, Line, Hashtags, TimelineTitle, LoadingWarning, Perfil } from "./UserProfileScreenStyle.jsx";
import FollowerButton from "./Follower.jsx";
import UserContext from '../../contexts/UserContext.js'
import { useEffect, useState, useContext } from "react";
import Loading from "../../Loading/Loading.js";
import axios from 'axios';
import DeletePost from "../EditPost/DeletePost.jsx";
import Header from "../../templates/Header/Header";
import { getCookieByName, config, BASE_URL } from "../../../mock/data";
import { useNavigate, Link, useParams } from "react-router-dom";
import LikePost from "../LikePost/LikePost.jsx";
import { ReactTagify } from "react-tagify";
import SearchBox from "../../templates/SearchBox/SearchBox.jsx";
import UpdateContext from "../../contexts/UpdateContext.js";
import { GetPosts } from "../timeline/auxiliaryFunctions.js";
import InfiniteScroll from 'react-infinite-scroller';

export default function UserPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { updatePage, setUpdatePage } = useContext(UpdateContext);

    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const verifyUser = user === undefined;
    const [userData, setUserData] = useState();
    const [userInfo, setUserInfo] = useState();

    const [follower, setFollower] = useState(false);

    const [lastPostsUpdate, setLastPostsUpdate] = useState('-infinity');
    const [newposts, setNewposts] = useState([]);
    const [numberOfNewposts, setNumberOfNewposts] = useState(0);
    const [cut, setCut] = useState(0);
    const [areMorePosts, setAreMorePosts] = useState(true);

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
            navigate(`/user/${id}`, { replace: true });
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

    //requisição de dados do usuario
    useEffect(() => {


        const promise = axios.get(`${BASE_URL}/user/${id}`, config(user.token));

        promise.then((res) => {
            setUserData(res.data)
            setFollower(res.data.following)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);

    //requisição de posts com o id usuario
    useEffect(() => {

        const header = verifyUser ? "" : config(user.token);

        const promise = axios.get(`${BASE_URL}/UserPosts/${id}?cut=${cut}`, header);

        promise.then((res) => {
            setPosts(res.data)
            setLoading(false)
            setCut(cut + res.data.length);
            if (res.data.length === 0) {
                setAreMorePosts(false);
            }
        }).catch((err) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);

    function morePosts(page) {
        const header = verifyUser ? "" : config(user.token);

        const promise = axios.get(`${BASE_URL}/UserPosts/${id}?cut=${cut}`, header);
        promise.then((res) => {
            setPosts([...posts, ...res.data]);
            setLoading(false);
            setCut(cut + res.data.length);
            if (res.data.length === 0) {
                setAreMorePosts(false);
                console.log('finished')
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

    function GetHashtags({ item }) {

        let name = (item.name).replace('#', '');

        return (
            <Link to={`/hashtag/${name}`} onClick={() => setUpdatePage(!updatePage)}>
                <p> {item.name}</p>
            </Link>

        )
    }
    return (
        <Container>
            <Header userInfo={verifyUser ? "" : userInfo} />
            <SearchBox />
            <Main>
                <div>
                    <img src={userData === undefined ? '' : userData.imageUrl} alt={userData === undefined ? '' : userData.name} />
                    <h1>{userData === undefined ? '' : `${userData.name}'s posts`}</h1>
                </div>
                <Panel>
                    <div>
                        <div>
                            <img src={userData === undefined ? '' : userData.imageUrl} alt={userData === undefined ? '' : userData.name} />
                            <h1>{userData === undefined ? '' : <TimelineTitle>{userData.name}'s posts</TimelineTitle>}</h1>
                            {userData === undefined ?
                                '' :
                                <FollowerButton follower={follower} setFollower={setFollower} id={id} updatePage={updatePage} />}
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <Posts>
                                <div style={{ height: '500px', overflow: 'auto' }}>
                                    <InfiniteScroll
                                        pageStart={0}
                                        loadMore={morePosts}
                                        hasMore={areMorePosts}
                                        loader={<LoadingWarning key={0}>Loading more posts...</LoadingWarning>}
                                        threshold={0}
                                        useWindow={false}

                                    >
                                        {posts.length === 0 ? <h1>There are no posts yet</h1> : posts.map((item, index) => { return (<GetPosts key={index} item={item} loading={loading} setPosts={setPosts} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} navigate={navigate} />) })}
                                    </InfiniteScroll>
                                </div>
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



