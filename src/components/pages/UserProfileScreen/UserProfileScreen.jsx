<<<<<<< HEAD
import { Container, Main, Panel, Posts, Sidebar, Line, Hashtags, TimelineTitle } from "./UserProfileScreenStyle.jsx";
=======
import { Container, Main, Panel, Posts, Post, Perfil, PostContent, Sidebar, Line, Hashtags, LoadSpinner, Preview, Infos } from ".//UserProfileScreenStyle.jsx";
>>>>>>> e4be4e13159fa9cff0b478b1935fbf15016082ca
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
<<<<<<< HEAD
import UpdateContext from "../../contexts/UpdateContext.js";
import { GetPosts } from "../timeline/auxiliaryFunctions.js";

export default function UserPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const { updatePage, setUpdatePage } = useContext(UpdateContext);
=======
import FollowerButton from "./Follower.jsx";

export default function UserPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [updatePage, setUpdatePage] = useState(true);
>>>>>>> e4be4e13159fa9cff0b478b1935fbf15016082ca
    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const verifyUser = user === undefined;
<<<<<<< HEAD
    const [userData,setUserData] = useState();

    const [userInfo, setUserInfo] = useState();
=======
    const [userInfo, setUserInfo] = useState();

    const [follower, setFollower] = useState(false);

>>>>>>> e4be4e13159fa9cff0b478b1935fbf15016082ca

    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
<<<<<<< HEAD
=======
            navigate(`/user/${id}`, { replace: true });
>>>>>>> e4be4e13159fa9cff0b478b1935fbf15016082ca
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
<<<<<<< HEAD
=======

        axios.get(`${BASE_URL}/user/me`, token)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

>>>>>>> e4be4e13159fa9cff0b478b1935fbf15016082ca

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


        const promise = axios.get(`${BASE_URL}/UserPosts/${id}`, config(user.token));

        promise.then((res) => {
            setPosts(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);



    //requisição de trends
    useEffect(() => {
        const header = verifyUser ? "" : config(user.token);
        const trends = axios.get(`${BASE_URL}/trends`, header);
        trends.then((r) => {
            setTrends(r.data);
        }).catch((err) => {
            console.log(err)
        })
<<<<<<< HEAD

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);
=======
>>>>>>> e4be4e13159fa9cff0b478b1935fbf15016082ca

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);

    function GetHashtags({ item }) {

        let name = (item.name).replace('#', '')

        let name = (item.name).replace('#', '')

        return (
            <Link to={`/hashtag/${name}`} onClick={() => setUpdatePage(!updatePage)}>
                <p> {item.name}</p>
            </Link>

        )
    }
<<<<<<< HEAD
    return (
        <Container>
            <Header userInfo={verifyUser ? "" : userInfo} />
            <SearchBox />
            <Main>
=======

    function GetPosts({ item, updatePage }) {
        //variaveis para uso na biblioteca tagify
        const tagStyle = {
            fontWeight: 900,
            color: 'white',
            cursor: 'pointer'
        }
        const [contentString, setContentString] = useState(item.description);
        //

        //requisição de hashtags por post
        useEffect(() => {
            axios.get(`${BASE_URL}/hashtags/${item.id}`, config(user.token)).then((r) => {
                let hashs = '';
                for (let i = 0; i < r.data.length; i++) {
                    hashs += ' #' + r.data[i].name;
                }
                setContentString(contentString + hashs);
            }).catch((err) => {
                console.log(err)
            })

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        //
        return (
            <Post>
                <Perfil>
                    <img src={item.imageUrl} alt={item.name} />
                    <LikePost id={item.id} />
                </Perfil>
                <PostContent>
                    <h3 onClick={() => {
                        navigate(`/user/${item.userId}`);
                        setUpdatePage(!updatePage);
                    }}>{item.name} </h3>
                    {/*o item.description foi incorporado no contentString*/}
                    <ReactTagify
                        tagStyle={tagStyle}
                        tagClicked={(tag) => {
                            navigate(`/hashtag/${tag.substring(1, tag.length)}`);
                            setUpdatePage(!updatePage);
                        }}>
                        <p>
                            {contentString}
                        </p>
                    </ReactTagify>

                    <Preview onClick={() => { window.open(item.url, '_blank') }}>
                        <Infos>
                            <h2>{item.titlePreview}</h2>
                            <h3>{item.descriptionPreview}</h3>
                            <h4>{item.url}</h4>
                        </Infos>
                        <img src={item.imagePreview} alt="" />
                    </Preview>
                    <DeletePost id={item.id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setPosts={setPosts} setLoading={setLoading} />
                </PostContent>
            </Post>
        )
    }

    function ShowPosts() {

        if (posts.length === 0) {
            return (
                <h1>There are no posts yet</h1>
            )
        }
        else {
            return (
                posts.map((item, index) => { return (<GetPosts key={index} item={item} updatePage={updatePage} />) })
            )
        }
    }

    return (
        <Container>
            <Header userInfo={verifyUser ? "" : userInfo} />
            <SearchBox setUpdatePage={setUpdatePage} updatePage={updatePage} />
            <Main>
                <div>
                    <img src={userData === undefined ? '' : userData.imageUrl} alt={userData === undefined ? '' : userData.name} />
                    <h1>{userData === undefined ? '' : `${userData.name}'s posts`}</h1>
                    {userData === undefined ?
                        '' :
                        <FollowerButton follower={follower} setFollower={setFollower} id={id} updatePage={updatePage} />}
                </div>
>>>>>>> e4be4e13159fa9cff0b478b1935fbf15016082ca
                <Panel>
                    <div>
                        <div>
                            <img src={userData === undefined ? '' : userData.imageUrl} alt={userData === undefined ? '' : userData.name} />
                            <h1>{userData === undefined ? '' : <TimelineTitle>{userData.name}'s posts</TimelineTitle>}</h1>
                        </div>
                        <div style={{ display: 'flex', width: '100%' }}>
                            <Posts>
                                {
                                    posts.length === 0 ? <h1>There are no posts yet</h1> :
                                        posts.map((item, index) => { return (<GetPosts key={index} item={item} loading={loading} setPosts={setPosts} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} navigate={navigate} />) })
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



